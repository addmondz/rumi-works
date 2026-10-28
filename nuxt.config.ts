const rawSiteUrl = process.env.NUXT_PUBLIC_SITE_URL?.trim() || ''
let siteUrl = ''
try {
  const parsed = new URL(rawSiteUrl)
  if (parsed.protocol === 'https:' && !['localhost', '127.0.0.1'].includes(parsed.hostname) && !parsed.username && !parsed.password) siteUrl = parsed.origin
} catch { /* An unset site URL is an intentionally non-indexable preview. */ }
const indexable = process.env.NUXT_PUBLIC_SITE_MODE === 'production' && Boolean(siteUrl)

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en-MY' },
      title: 'Rumi Works — Websites & custom software',
      meta: [
        { name: 'theme-color', content: '#f5f4ec' },
        { name: 'robots', content: indexable ? 'index, follow' : 'noindex, nofollow' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl,
      indexable,
      whatsapp: process.env.NUXT_PUBLIC_WHATSAPP || '',
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || ''
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: ['/', '/website-development', '/custom-software', '/packages', '/work', '/about', '/contact', '/insights', '/insights/website-cost-malaysia', '/privacy']
    }
  },
  typescript: { strict: true }
})
