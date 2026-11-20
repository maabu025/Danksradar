import type { Core } from '@strapi/strapi';
import type { ZodType } from 'zod';

import { verifyCaptcha } from '../../../lib/captcha';
import { confirmationHtml, fieldsTable, sendEmail } from '../../../lib/email';
import { rateLimit } from '../../../lib/rate-limit';
import { contactSchema, demoRequestSchema, fleetSizes, quoteRequestSchema } from '../../../lib/validation';

type Ctx = {
  request: { ip: string; body: unknown };
  status: number;
  body: unknown;
};

type LeadUid = 'api::demo-request.demo-request' | 'api::quote-request.quote-request' | 'api::contact-message.contact-message';

type Base = { fullName: string; email: string; captchaToken?: string };

type Options<T extends Base> = {
  schema: ZodType<T>;
  uid: LeadUid;
  toRecord?: (data: Omit<T, 'captchaToken'>) => Record<string, unknown>;
  alertSubject: (data: T) => string;
  confirmWhat: string;
};

/** Shared steps for every form: rate limit, validate, captcha, save, email. */
async function handle<T extends Base>(strapi: Core.Strapi, ctx: Ctx, opts: Options<T>) {
  const ip = ctx.request.ip;

  if (!rateLimit(ip)) {
    ctx.status = 429;
    ctx.body = { ok: false, error: 'Too many requests. Please try again later.' };
    return;
  }

  const parsed = opts.schema.safeParse(ctx.request.body);
  if (!parsed.success) {
    ctx.status = 422;
    ctx.body = { ok: false, error: 'Please check the form.', fieldErrors: parsed.error.flatten().fieldErrors };
    return;
  }
  const data = parsed.data;

  if (!(await verifyCaptcha(data.captchaToken, ip))) {
    ctx.status = 400;
    ctx.body = { ok: false, error: 'Spam check failed. Please try again.' };
    return;
  }

  const { captchaToken: _drop, ...clean } = data;
  const record = opts.toRecord ? opts.toRecord(clean) : clean;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await strapi.documents(opts.uid).create({ data: { ...record, status: 'new' } as any });
  } catch (err) {
    strapi.log.error(`Could not save ${opts.uid}: ${(err as Error).message}`);
    ctx.status = 500;
    ctx.body = { ok: false, error: 'Something went wrong. Please try again.' };
    return;
  }

  const sales = process.env.SALES_EMAIL;
  await Promise.allSettled([
    sales
      ? sendEmail({ to: sales, subject: opts.alertSubject(data), html: fieldsTable(clean), replyTo: data.email })
      : Promise.resolve(),
    sendEmail({ to: data.email, subject: 'We received your message', html: confirmationHtml(data.fullName, opts.confirmWhat) }),
  ]);

  ctx.status = 200;
  ctx.body = { ok: true };
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async demoRequest(ctx: Ctx) {
    await handle(strapi, ctx, {
      schema: demoRequestSchema,
      uid: 'api::demo-request.demo-request',
      toRecord: (d) => ({ ...d, fleetSize: fleetSizes[d.fleetSize] }),
      alertSubject: (d) => `New demo request: ${d.company || d.fullName} (${d.fleetSize} vehicles)`,
      confirmWhat: 'demo request',
    });
  },

  async quoteRequest(ctx: Ctx) {
    await handle(strapi, ctx, {
      schema: quoteRequestSchema,
      uid: 'api::quote-request.quote-request',
      alertSubject: (d) => `Quote request: ${d.quantity} × ${d.product}`,
      confirmWhat: 'quote request',
    });
  },

  async contact(ctx: Ctx) {
    await handle(strapi, ctx, {
      schema: contactSchema,
      uid: 'api::contact-message.contact-message',
      alertSubject: (d) => `New message: ${d.subject}`,
      confirmWhat: 'message',
    });
  },
});
