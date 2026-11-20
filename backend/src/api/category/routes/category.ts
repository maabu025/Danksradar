import { factories } from '@strapi/strapi';

// Read-only for the website; staff edit content in the admin panel
export default factories.createCoreRouter('api::category.category', {
  only: ['find', 'findOne'],
});
