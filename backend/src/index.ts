import type { Core } from '@strapi/strapi';

// Content the website may read without logging in (read-only)
const PUBLIC_READ = [
  'api::product.product.find',
  'api::product.product.findOne',
  'api::category.category.find',
  'api::category.category.findOne',
  'api::partner.partner.find',
  'api::partner.partner.findOne',
  'api::platform.platform.find',
  'api::platform.platform.findOne',
  'api::site-setting.site-setting.find',
];

export default {
  register() {},

  /**
   * Runs every time the backend starts: makes sure the website can read
   * products, partners, platforms and site settings. Leads (demo requests,
   * quotes, messages) stay private: only staff in the admin panel see them.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });
    if (!publicRole) return;

    for (const action of PUBLIC_READ) {
      const exists = await strapi.db
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action, role: publicRole.id } });
      if (!exists) {
        await strapi.db
          .query('plugin::users-permissions.permission')
          .create({ data: { action, role: publicRole.id } });
      }
    }
  },
};
