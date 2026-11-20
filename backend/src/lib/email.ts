// Sends email through the Resend API. If RESEND_API_KEY is empty (development),
// the email is printed to the terminal instead of being sent.
type Mail = { to: string; subject: string; html: string; replyTo?: string };

export async function sendEmail({ to, subject, html, replyTo }: Mail): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'Danksradar <no-reply@danksradar.com>';

  if (!key) {
    console.info(`[email skipped: no RESEND_API_KEY] to=${to} subject="${subject}"`);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, html, reply_to: replyTo }),
  });
  if (!res.ok) console.error('Email failed', res.status, await res.text());
}

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Table of the submitted fields, for the sales alert email */
export function fieldsTable(fields: Record<string, unknown>): string {
  const rows = Object.entries(fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#241446"><b>${esc(k)}</b></td><td>${esc(Array.isArray(v) ? v.join(', ') : v)}</td></tr>`
    )
    .join('');
  return `<table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table>`;
}

export function confirmationHtml(name: string, what: string): string {
  return `<div style="font-family:Arial,sans-serif;font-size:15px;color:#241446">
<p>Hi ${esc(name)},</p>
<p>Thanks for your ${esc(what)}. A member of the Danksradar team will contact you within one working day.</p>
<p>Danksradar, a subsidiary of Dankslite</p></div>`;
}
