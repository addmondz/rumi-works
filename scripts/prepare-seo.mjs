import { mkdir, writeFile, rm } from 'node:fs/promises'
import { getSeoConfig, routes } from './seo-config.mjs'
// Match Nuxt's .env loading without introducing another package.
try { process.loadEnvFile('.env') } catch (error) { if (error.code !== 'ENOENT') throw error }
const { siteUrl, indexable } = getSeoConfig()
await mkdir('public', { recursive: true })
await writeFile('public/robots.txt', indexable ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n')
if (indexable) {
  const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
  await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${escape(siteUrl + route)}</loc></url>`).join('')}</urlset>\n`)
} else {
  await rm('public/sitemap.xml', { force: true })
}
console.log(`SEO: ${indexable ? `production (${siteUrl})` : 'preview — indexing disabled, no sitemap'}`)
