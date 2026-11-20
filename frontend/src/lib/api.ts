// Everything the frontend needs to talk to the backend (Strapi) lives here.

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337').replace(/\/$/, '')

/** Form endpoints on the backend */
export const formEndpoints = {
  demoRequest: `${API_URL}/api/forms/demo-request`,
  contact: `${API_URL}/api/forms/contact`,
  quoteRequest: `${API_URL}/api/forms/quote-request`,
}

type StrapiList<T> = {
  data: T[]
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } }
}

/**
 * Reads published content from Strapi's REST API, e.g.
 *   const { data } = await fetchCollection('products', 'populate[0]=partner&populate[1]=category&sort=sortOrder:asc')
 *   const { data } = await fetchCollection('products', 'filters[slug][$eq]=jimi-vl802&populate=*')
 * Results are cached and refreshed every 60 seconds.
 * Pages currently use the starter content in src/data; switch to this once the
 * admin panel has the real products, partners and platforms.
 */
export async function fetchCollection<T>(collection: string, query = ''): Promise<StrapiList<T>> {
  const res = await fetch(`${API_URL}/api/${collection}${query ? `?${query}` : ''}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Could not load ${collection} (${res.status})`)
  return res.json()
}

/** Full address of an image uploaded in the admin panel */
export const mediaUrl = (url?: string | null) => (!url ? undefined : url.startsWith('http') ? url : `${API_URL}${url}`)
