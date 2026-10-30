export const routes = ['/', '/website-development', '/custom-software', '/packages', '/work', '/about', '/contact', '/insights', '/insights/website-cost-malaysia', '/privacy', '/showcase', '/create-website']
// Fictional demo routes are prerendered but intentionally excluded from the sitemap.
export const demoRoutes = ['/demos/launch', ...['', '/about', '/services', '/work', '/contact'].map(path => '/demos/business' + path), ...['', '/about', '/services', '/work', '/contact', '/insights', '/insights/a-better-workplace-brief', '/studio'].map(path => '/demos/growth' + path)]
export function getSeoConfig(env = process.env) {
  let siteUrl = ''
  try {
    const url = new URL((env.NUXT_PUBLIC_SITE_URL || '').trim())
    if (url.protocol === 'https:' && !['localhost', '127.0.0.1'].includes(url.hostname) && !url.username && !url.password) siteUrl = url.origin
  } catch { /* Preview is the safe default. */ }
  return { siteUrl, indexable: env.NUXT_PUBLIC_SITE_MODE === 'production' && Boolean(siteUrl) }
}
