export type DemoTier = 'launch' | 'business' | 'growth'
export type DemoPage = 'home' | 'about' | 'services' | 'work' | 'contact' | 'insights' | 'article' | 'studio'
export type DemoContent = { headline: string; articleTitle: string; articleExcerpt: string }
export const demoDefaults: DemoContent = {
  headline: 'Make room for better work.',
  articleTitle: 'A better workplace starts with a better brief.',
  articleExcerpt: 'Before choosing a floor plan, decide what your workplace needs to make possible. A practical starting point for your next space.'
}
export const demoRoutes: Record<DemoTier, { slug: string; page: DemoPage; label: string }[]> = {
  launch: [{ slug: '', page: 'home', label: 'Overview' }],
  business: [
    { slug: '', page: 'home', label: 'Home' },
    { slug: '/about', page: 'about', label: 'About' },
    { slug: '/services', page: 'services', label: 'Services' },
    { slug: '/work', page: 'work', label: 'Work' },
    { slug: '/contact', page: 'contact', label: 'Contact' }
  ],
  growth: [
    { slug: '', page: 'home', label: 'Home' },
    { slug: '/about', page: 'about', label: 'About' },
    { slug: '/services', page: 'services', label: 'Services' },
    { slug: '/work', page: 'work', label: 'Work' },
    { slug: '/contact', page: 'contact', label: 'Contact' },
    { slug: '/insights', page: 'insights', label: 'Journal' },
    { slug: '/insights/a-better-workplace-brief', page: 'article', label: 'A better workplace brief' },
    { slug: '/studio', page: 'studio', label: 'CMS preview' }
  ]
}
export const demoTitles: Record<DemoPage, string> = {
  home: 'Workplace strategy & design', about: 'Our approach to the workplace', services: 'Strategy, design & delivery', work: 'Workplace concept studies', contact: 'Start a workplace brief', insights: 'Workplace journal', article: 'A better workplace brief', studio: 'Try the content editor'
}
export const demoDescriptions: Record<DemoPage, string> = {
  home: 'Explore FORME, a fictional workplace consultancy website demonstrating a Rumi Works package.',
  about: 'Meet the thinking behind FORME, a fictional workplace consultancy in this Rumi Works website demo.',
  services: 'Explore workplace strategy, spatial design and delivery content on this fictional business website demo.',
  work: 'Explore three clearly labelled workplace concept studies created for this Rumi Works package demonstration.',
  contact: 'Try a non-sending enquiry preview. This fictional FORME website has no live form submission or booking.',
  insights: 'Read sample editorial content on the Growth package demonstration for fictional workplace consultancy FORME.',
  article: 'A sample article about defining a workplace brief, created to demonstrate a content-led Growth package website.',
  studio: 'Try editing sample website content in browser memory. No backend, account or publishing service is connected.'
}
export function resolveDemoPage(tier: DemoTier, slug = ''): DemoPage | undefined {
  const normalized = slug.replace(/^\/+|\/+$/g, '')
  return demoRoutes[tier].find(route => route.slug === (normalized ? `/${normalized}` : ''))?.page
}
export function validateDemoContent(input: DemoContent): string {
  if (!input.headline.trim() || !input.articleTitle.trim() || !input.articleExcerpt.trim()) return 'Complete all three fields before applying the preview.'
  if (input.headline.trim().length > 70 || input.articleTitle.trim().length > 100 || input.articleExcerpt.trim().length > 240) return 'Keep the headline to 70 characters, article title to 100, and summary to 240.'
  return ''
}
export function cleanDemoContent(input: DemoContent): DemoContent {
  return { headline: input.headline.trim(), articleTitle: input.articleTitle.trim(), articleExcerpt: input.articleExcerpt.trim() }
}
export function createDemoBrief(name: string, focus: string, message: string): string {
  return `LOCAL PREVIEW ONLY — nothing has been sent.\n\nName: ${name.trim() || 'Not provided'}\nProject focus: ${focus}\nBrief: ${message.trim() || 'Not provided'}`
}
