// Fills an empty database with the starter categories, partners, products and platforms.
// Run once after the first start:   npm run seed
// Running it again skips anything that already exists.
'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');

const categories = ['GPS trackers', 'AI dashcams', 'Asset trackers', 'Fleet software'];

// TODO: confirm partnership levels with management
const partners = [
  { name: 'Jimi IoT', slug: 'jimi-iot', level: 'strategic_partner', darkLogoBg: true, summary: 'GPS trackers, AI dashcams and the Tracksolid platform.', website: 'https://www.jimiiot.com', sortOrder: 1 },
  { name: 'Targa Telematics', slug: 'targa-telematics', level: 'technology_partner', summary: 'Fleet management software and insurance telematics.', website: 'https://www.targatelematics.com', sortOrder: 2 },
  { name: 'Teltonika', slug: 'teltonika', level: 'authorised_distributor', summary: 'Reliable GPS tracking hardware for every vehicle.', website: 'https://teltonika-gps.com', sortOrder: 3 },
  { name: 'Lytx', slug: 'lytx', level: 'technology_partner', summary: 'Video safety and the DriveCam platform.', website: 'https://www.lytx.com', sortOrder: 4 },
];

// TODO: replace with the final product list
const products = [
  { name: 'Jimi IoT VL802', slug: 'jimi-vl802', partner: 'jimi-iot', category: 'GPS trackers', summary: '4G vehicle tracker for live tracking and fleet control.', features: ['4G connectivity', 'Live tracking', 'Remote engine cut-off', 'Works with Tracksolid'] },
  { name: 'Jimi IoT JC400', slug: 'jimi-jc400', partner: 'jimi-iot', category: 'AI dashcams', summary: 'Connected dashcam with live video and event recording.', features: ['Live video', 'Event recording', 'GPS location', 'Works with Tracksolid'] },
  { name: 'Teltonika FMC130', slug: 'teltonika-fmc130', partner: 'teltonika', category: 'GPS trackers', summary: '4G tracker with inputs for sensors and accessories.', features: ['4G connectivity', 'Digital and analogue inputs', 'Backup battery'] },
  { name: 'Lytx DriveCam', slug: 'lytx-drivecam', partner: 'lytx', category: 'AI dashcams', summary: 'AI video safety camera for driver coaching.', features: ['Risk detection', 'Driver coaching', 'In-cab alerts'] },
  { name: 'Targa fleet platform', slug: 'targa-fleet-platform', partner: 'targa-telematics', category: 'Fleet software', summary: 'Cloud software to run your whole fleet in one place.', features: ['Live map', 'Trip reports', 'Maintenance reminders'] },
  { name: 'Jimi IoT asset tracker', slug: 'jimi-asset-tracker', partner: 'jimi-iot', category: 'Asset trackers', summary: 'Long-battery tracker for trailers, containers and goods.', features: ['Long battery life', 'Magnetic mount', 'Movement alerts'] },
];

const platforms = [
  { name: 'Tracksolid', slug: 'tracksolid', partner: 'jimi-iot', summary: 'Track vehicles, watch live video and get alerts from one dashboard.', features: ['Live map', 'Video playback', 'Geofence alerts', 'Mobile app'] },
  { name: 'Targa Telematics platform', slug: 'targa', partner: 'targa-telematics', summary: 'Fleet and insurance telematics with clear reports.', features: ['Fleet reports', 'Driver scoring', 'Insurance data'] },
  { name: 'Lytx DriveCam', slug: 'lytx', partner: 'lytx', summary: 'Video safety that turns risky moments into coaching.', features: ['Risk detection', 'Coaching workflow', 'Safety scores'] },
];

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function upsert(app, uid, slug, data, publish) {
  const existing = await app.documents(uid).findFirst({ filters: { slug } });
  if (existing) return existing;
  return app.documents(uid).create({ data: { ...data, slug }, ...(publish ? { status: 'published' } : {}) });
}

async function main() {
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';

  const cat = {};
  for (const name of categories) cat[name] = await upsert(app, 'api::category.category', slugify(name), { name }, false);

  const par = {};
  for (const p of partners) par[p.slug] = await upsert(app, 'api::partner.partner', p.slug, p, true);

  const prod = {};
  for (const p of products) {
    prod[p.slug] = await upsert(
      app,
      'api::product.product',
      p.slug,
      { ...p, partner: par[p.partner].documentId, category: cat[p.category].documentId },
      true
    );
  }

  for (const p of platforms) {
    const linked = products.filter((x) => x.partner === p.partner).map((x) => prod[x.slug].documentId);
    await upsert(app, 'api::platform.platform', p.slug, { ...p, partner: par[p.partner].documentId, products: linked }, true);
  }

  const settings = await app.documents('api::site-setting.site-setting').findFirst();
  if (!settings) {
    await app.documents('api::site-setting.site-setting').create({
      data: {
        phone: '+233 00 000 0000', // TODO
        email: 'info@danksradar.com', // TODO
        address: 'Obuasi, Ghana', // TODO
        whatsapp: '233000000000', // TODO
        stats: [],
      },
    });
  }

  console.log('Seed done: categories, partners, products, platforms and site settings are in the database.');
  await app.destroy();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
