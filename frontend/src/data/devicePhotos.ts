// Real photos of each device, keyed by product slug.
//
// To add a photo:
//   1. Get the official product photo from the partner (media kit, partner portal or their website).
//      A cut-out PNG on a transparent or white background looks best.
//   2. Save it in  public/images/products/devices/  named after the product slug,
//      e.g.  teltonika-fmb920.png
//   3. Add one line below, e.g.  'teltonika-fmb920': '/images/products/devices/teltonika-fmb920.png',
//
// Products without a line here keep showing their category illustration.
// Slugs: see src/data/products.ts.

const dir = '/images/products/devices'

export const devicePhotos: Record<string, string> = {
  'jimi-vl802': `${dir}/jimi-vl802.png`,
  'jimi-jc170': `${dir}/jimi-jc170.png`,
  'jimi-jc400': `${dir}/jimi-jc400.png`,
  'jimi-vl103m': `${dir}/jimi-vl103m.png`,
  'jimi-jc450': `${dir}/jimi-jc450.png`,
  'jimi-jc181': `${dir}/jimi-jc181.png`,
  'teltonika-fmc130': `${dir}/teltonika-fmc130.png`,
  'teltonika-fmb920': `${dir}/teltonika-fmb920.png`,
  'teltonika-fmb120': `${dir}/teltonika-fmb120.png`,
  'teltonika-fmc003': `${dir}/teltonika-fmc003.png`,
  'teltonika-tat100': `${dir}/teltonika-tat100.png`,
  'teltonika-dualcam': `${dir}/teltonika-dualcam.png`,
  'lytx-drivecam-sf300': `${dir}/lytx-drivecam-sf300.png`,
  'lytx-surfsight-ai12': `${dir}/lytx-surfsight-ai12.png`,
  'targa-asset-tracker': `${dir}/targa-asset-tracker.png`,
  // Still needed: 'jimi-gt06n', 'jimi-at4', 'targa-vehicle-tracker'
  // TODO: replace targa-asset-tracker (small, from a retailer) and teltonika-fmb120 (edges cut off) with official photos
}
