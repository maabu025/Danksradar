import { factories } from '@strapi/strapi';

// Read-only for the website; staff edit content in the admin panel
export default factories.createCoreRouter('api::product.product', {
  only: ['find', 'findOne'],
});
