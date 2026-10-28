import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import { routes, demoRoutes } from '../scripts/seo-config.mjs'
import {
  demoRoutes as demoNavigation,
  demoDefaults,
  cleanDemoContent,
  createDemoBrief,
  resolveDemoPage,
  validateDemoContent
} from '../app/utils/demo-content.ts'

const read = path => readFileSync(path, 'utf8')
const generatedPath = path => `.output/public${path === '/' ? '' : path}/index.html`
const built = existsSync(generatedPath('/showcase'))
const pageHtml = path => read(generatedPath(path))
const textContent = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1]
const metadata = (html, name) => [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]).filter(tag => attr(tag, 'name') === name || attr(tag, 'property') === name).map(tag => attr(tag, 'content'))
const title = html => html.match(/<title>([^<]*)<\/title>/)?.[1]

// The same registry drives the sitemap and expected generated paths.
test('showcase has 11 agency routes and exactly 1 / 5 / 8 independent demo routes', () => {
  assert.equal(routes.length, 11)
  assert.ok(routes.includes('/showcase'))
  assert.equal(demoRoutes.length, 14)
  assert.equal(demoRoutes.filter(path => path.startsWith('/demos/launch')).length, 1)
  assert.equal(demoRoutes.filter(path => path.startsWith('/demos/business')).length, 5)
  assert.equal(demoRoutes.filter(path => path.startsWith('/demos/growth')).length, 8)
  assert.equal(new Set([...routes, ...demoRoutes]).size, 25)
  assert.ok(routes.every(path => !path.startsWith('/demos/')))
  const fromNavigation = Object.entries(demoNavigation).flatMap(([tier, entries]) => entries.map(entry => `/demos/${tier}${entry.slug}`))
  assert.deepEqual([...demoRoutes].sort(), fromNavigation.sort())
  const prerenderList = read('nuxt.config.ts').match(/routes:\s*\[([^\]]+)\]/)?.[1] || ''
  const configuredRoutes = [...prerenderList.matchAll(/'([^']+)'/g)].map(match => match[1])
  assert.deepEqual(configuredRoutes.sort(), [...routes, ...demoRoutes].sort())
})

test('production sitemap includes the agency showcase but no fictional demo', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'rumi-showcase-seo-'))
  try {
    execFileSync(process.execPath, [resolve('scripts/prepare-seo.mjs')], {
      cwd: directory,
      env: { ...process.env, NUXT_PUBLIC_SITE_MODE: 'production', NUXT_PUBLIC_SITE_URL: 'https://confirmed.example' }
    })
    const sitemap = await readFile(join(directory, 'public/sitemap.xml'), 'utf8')
    assert.match(sitemap, /<loc>https:\/\/confirmed\.example\/showcase<\/loc>/)
    assert.equal((sitemap.match(/<url>/g) || []).length, 11)
    assert.doesNotMatch(sitemap, /\/demos\//)
  } finally { await rm(directory, { recursive: true, force: true }) }
})

for (const route of ['/showcase', ...demoRoutes]) test(`generated ${route} is visible HTML with unique page metadata`, { skip: !built }, () => {
  const html = pageHtml(route)
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1)
  assert.ok(title(html)?.length > 15)
  assert.equal(metadata(html, 'description').length, 1)
  assert.ok(metadata(html, 'description')[0]?.length > 45)
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || ''
  assert.ok(textContent(main).length > 400, 'page should carry useful text in server-rendered HTML')
  assert.ok(!html.includes('undefined'))
  const robots = metadata(html, 'robots')
  assert.equal(robots.length, 1, 'conflicting robots tags must not survive head deduplication')
  assert.equal(robots[0], route.startsWith('/demos/') ? 'noindex, follow' : 'noindex, nofollow')
  assert.equal(metadata(html, 'og:url').length, 0, 'default preview must not invent an OG origin')
  assert.doesNotMatch(html, /<link\b[^>]*rel="canonical"/i, 'default preview must not invent a canonical origin')
  if (route.startsWith('/demos/')) {
    assert.match(textContent(main), /fictional/i)
    assert.match(html, /href="\/showcase"/)
  }
})

test('all 15 new pages have different titles and descriptions', { skip: !built }, () => {
  const html = ['/showcase', ...demoRoutes].map(pageHtml)
  assert.equal(new Set(html.map(title)).size, html.length)
  assert.equal(new Set(html.map(page => metadata(page, 'description')[0])).size, html.length)
})

test('all generated internal page links and fragment targets resolve', { skip: !built }, () => {
  for (const route of [...routes, ...demoRoutes]) {
    for (const match of pageHtml(route).matchAll(/<a\b[^>]*>/gi)) {
      const href = attr(match[0], 'href')?.replaceAll('&amp;', '&')
      if (!href || !/^(?:\/|#)/.test(href) || href.startsWith('//')) continue
      const url = new URL(href, `https://test.example${route}`)
      const path = url.pathname.replace(/\/$/, '') || '/'
      const target = generatedPath(path)
      assert.ok(existsSync(target), `${route}: ${href} must resolve to a generated page`)
      if (url.hash) {
        const fragment = decodeURIComponent(url.hash.slice(1))
        const targetHtml = read(target)
        assert.ok([...targetHtml.matchAll(/\bid="([^"]+)"/g)].some(item => item[1] === fragment), `${route}: ${href} must resolve to an existing anchor`)
      }
    }
  }
})

test('showcase puts package comparison immediately after hero and keeps commercial values', { skip: !built }, () => {
  const html = pageHtml('/showcase')
  const sections = [...html.matchAll(/<section\b[^>]*>/g)].map(match => match[0])
  assert.match(sections[0], /sc-hero/)
  assert.equal(attr(sections[1], 'id'), 'packages')
  const text = textContent(html)
  for (const amount of ['990', '2,490', '4,490', 'RM499/year', 'RM699/year', 'RM999/year', 'RM149/month']) assert.ok(text.includes(amount), `missing unchanged price ${amount}`)
  assert.match(text, /not commissioned client work/i)
  assert.match(text, /front-end demonstration/i)
  assert.match(text, /Domain registration is separate/i)
  assert.match(text, /standard CMS setup/i)
  assert.match(html, /<details>/)
  assert.match(html, /<summary>/)
})

test('showcase metadata and schema use only a configured origin', () => {
  const shell = read('app/app.vue')
  const showcase = read('app/pages/showcase.vue')
  assert.match(shell, /config\.public\.siteUrl\s*\?\s*\[\{\s*rel:\s*'canonical'/)
  assert.match(shell, /ogUrl:\s*\(\)\s*=>\s*config\.public\.siteUrl\s*\?/)
  assert.match(showcase, /script:\s*config\.public\.siteUrl\s*\?/)
  assert.doesNotMatch(showcase, /['"](?:aggregateRating|reviewRating|LocalBusiness|streetAddress)['"]/)
})

test('motion is progressive, has reduced-motion fallbacks, and never hijacks scrolling', () => {
  const source = read('app/pages/showcase.vue')
  const css = read('app/assets/css/showcase.css')
  assert.match(source, /prefers-reduced-motion: reduce/)
  assert.match(source, /onBeforeUnmount\(/)
  assert.match(source, /observer\?\.disconnect\(\)/)
  assert.match(source, /chapterObserver\?\.disconnect\(\)/)
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/)
  assert.match(css, /opacity:1!important/)
  assert.doesNotMatch(css, /\[data-reveal\]\s*\{[^}]*\b(?:opacity:\s*0|visibility:\s*hidden|display:\s*none)/)
  assert.doesNotMatch(source, /(?:addEventListener|@)(?:\(\s*['"])?(?:wheel|touchmove)/)
  assert.doesNotMatch(source, /(?:document\.body|document\.documentElement)\.style\.overflow/)
  assert.match(css, /@media\(max-width:800px\)/)
  assert.match(css, /\.sc-sticky-stage\{position:relative;top:auto/)
})

test('homepage and dedicated showcase/demo shells are route-scoped', () => {
  const source = read('app/app.vue')
  assert.match(source, /route\.path\s*===\s*'\/'\s*\?\s*'home-scroll-snap'\s*:\s*''/)
  assert.match(source, /route\.path\.startsWith\('\/demos\/'\)/)
  assert.match(source, /isDemo\.value\s*\|\|[\s\S]*===\s*'\/showcase'/)
  assert.match(source, /<SiteHeader v-if="!customShell"/)
  assert.match(source, /<SiteFooter v-if="!customShell"/)
  assert.match(read('app/components/SiteHeader.vue'), /to: '\/showcase'/)
})

test('demo route resolver rejects out-of-scope pages and normalizes supported slugs', () => {
  assert.equal(resolveDemoPage('launch'), 'home')
  assert.equal(resolveDemoPage('business', '/services/'), 'services')
  assert.equal(resolveDemoPage('growth', 'insights/a-better-workplace-brief'), 'article')
  assert.equal(resolveDemoPage('growth', '//studio//'), 'studio')
  assert.equal(resolveDemoPage('business', 'insights'), undefined)
  assert.equal(resolveDemoPage('launch', 'about'), undefined)
  assert.equal(resolveDemoPage('growth', 'not-a-page'), undefined)
})

test('CMS preview validates required fields and agreed text length boundaries', () => {
  assert.equal(validateDemoContent({ ...demoDefaults }), '')
  for (const field of ['headline', 'articleTitle', 'articleExcerpt']) assert.ok(validateDemoContent({ ...demoDefaults, [field]: '   ' }))
  for (const [field, max] of [['headline', 70], ['articleTitle', 100], ['articleExcerpt', 240]]) {
    assert.equal(validateDemoContent({ ...demoDefaults, [field]: 'x'.repeat(max) }), '')
    assert.ok(validateDemoContent({ ...demoDefaults, [field]: 'x'.repeat(max + 1) }))
  }
})

test('CMS preview creates clean independent content without mutating sample defaults', () => {
  const original = { ...demoDefaults }
  const draft = { headline: '  A new headline.  ', articleTitle: '  A new idea. ', articleExcerpt: ' A different summary.  ' }
  const result = cleanDemoContent(draft)
  assert.deepEqual(result, { headline: 'A new headline.', articleTitle: 'A new idea.', articleExcerpt: 'A different summary.' })
  assert.equal(draft.headline, '  A new headline.  ')
  result.headline = 'Changed later'
  assert.deepEqual(demoDefaults, original)
})

test('enquiry preview is explicit, local, repeatable and handles blank sample fields', () => {
  const brief = createDemoBrief('  Alex  ', 'Spatial design', '  A test project.  ')
  assert.match(brief, /^LOCAL PREVIEW ONLY — nothing has been sent\./)
  assert.match(brief, /Name: Alex\n/)
  assert.match(brief, /Project focus: Spatial design\n/)
  assert.match(brief, /Brief: A test project\.$/)
  assert.equal(createDemoBrief('  Alex  ', 'Spatial design', '  A test project.  '), brief)
  const empty = createDemoBrief('', 'Workplace strategy', '   ')
  assert.match(empty, /Name: Not provided/)
  assert.match(empty, /Brief: Not provided/)
})

test('demo forms have no network submission or persistent storage and reset to defaults', () => {
  const cms = read('app/components/demo/DemoCms.vue')
  const contact = read('app/components/demo/DemoContact.vue')
  for (const source of [cms, contact]) {
    assert.match(source, /@submit\.prevent=/)
    assert.doesNotMatch(source, /(?:\$fetch|\bfetch|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|indexedDB)\b/)
    assert.doesNotMatch(source, /<form\b[^>]*\baction=/)
    assert.doesNotMatch(source, /href="(?:mailto:|tel:|https:\/\/wa\.me)/)
    assert.match(source, /type="button"[^>]*@click="reset/)
    assert.match(source, /aria-live="polite"/)
  }
  assert.match(cms, /content\.value\s*=\s*\{\s*\.\.\.demoDefaults\s*\}/)
  assert.match(cms, /Object\.assign\(draft, demoDefaults\)/)
  assert.match(contact, /preview\.value\s*=\s*''/)
  assert.match(contact, /hello@forme\.example/)
  assert.match(contact, /\+60 XX-XXX XXXX/)
})

test('dedicated shell survives static-host trailing-slash redirects and route changes', async () => {
  const { runInNewContext } = await import('node:vm')
  const route = { path: '/showcase' }
  const context = { useRoute: () => route, useRuntimeConfig: () => ({ public: { siteUrl: '', indexable: false } }), computed: getter => ({ get value() { return getter() } }), useHead: () => {}, useSeoMeta: () => {} }
  const script = read('app/app.vue').match(/<script setup[^>]*>([\s\S]*?)<\/script>/)[1]
  runInNewContext(script + '\nglobalThis.readCustomShell = () => customShell.value', context)
  for (const path of ['/showcase', '/showcase/', ...demoRoutes, ...demoRoutes.map(path => path + '/')]) { route.path = path; assert.equal(context.readCustomShell(), true, path) }
  for (const path of ['/', '/packages', '/about/']) { route.path = path; assert.equal(context.readCustomShell(), false, path) }
})
