import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { routes } from '../scripts/seo-config.mjs'

const read = path => readFileSync(path, 'utf8')
const app = read('app/app.vue')
const home = read('app/pages/index.vue')
const pricing = read('app/components/PricingCards.vue')
const css = read('app/assets/css/main.css').replace(/\/\*[\s\S]*?\*\//g, '')
const built = existsSync('.output/public/index.html')
const generated = route => read(`.output/public${route === '/' ? '/' : `${route}/`}index.html`)
const text = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

// Collect leaf style rules together with the media queries that contain them.
function rules(source, parents = []) {
  const found = []
  let position = 0
  while (position < source.length) {
    const opening = source.indexOf('{', position)
    if (opening < 0) break
    let closing = opening + 1
    let depth = 1
    while (closing < source.length && depth) {
      if (source[closing] === '{') depth++
      if (source[closing] === '}') depth--
      closing++
    }
    const selector = source.slice(position, opening).trim()
    const body = source.slice(opening + 1, closing - 1)
    if (body.includes('{')) found.push(...rules(body, [...parents, selector]))
    else found.push({ selector, body, parents })
    position = closing
  }
  return found
}
const styles = rules(css)
const compact = value => value.replace(/\s+/g, '')
const properties = body => Object.fromEntries(body.split(';').map(part => {
  const colon = part.indexOf(':')
  return colon < 0 ? [] : [part.slice(0, colon).trim(), part.slice(colon + 1).trim()]
}).filter(pair => pair.length === 2))
const palette = selector => Object.assign({}, ...styles.filter(rule => rule.selector === selector).map(rule => properties(rule.body)))

function luminance(hex) {
  assert.match(hex, /^#[0-9a-f]{6}$/i, 'Contrast tests require explicit six-digit palette colors')
  const rgb = hex.slice(1).match(/../g).map(channel => parseInt(channel, 16) / 255)
    .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
}
function contrast(foreground, background) {
  const lightness = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (lightness[0] + 0.05) / (lightness[1] + 0.05)
}

test('homepage snap class is reactive and removed on every non-home route', () => {
  const route = { path: '/' }
  const headEntries = []
  const script = app.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)?.[1]
  assert.ok(script, 'App shell has an inspectable setup script')
  runInNewContext(script, {
    useRoute: () => route,
    useRuntimeConfig: () => ({ public: { siteUrl: '' } }),
    useHead: entry => headEntries.push(entry),
    useSeoMeta: () => {},
  })
  const classes = () => headEntries.flatMap(entry => {
    const value = typeof entry === 'function' ? entry() : entry
    return String(value?.htmlAttrs?.class || '').split(/\s+/)
  })
  assert.ok(classes().includes('home-scroll-snap'))
  for (const path of routes.filter(path => path !== '/')) {
    route.path = path
    assert.ok(!classes().includes('home-scroll-snap'), `Snap class removed on ${path}`)
  }
  route.path = '/'
  assert.ok(classes().includes('home-scroll-snap'), 'Returning home restores snapping')
})

test('native snapping is scoped to eligible desktop homepages and respects reduced motion', () => {
  const snapRules = styles.filter(rule => /scroll-snap-type\s*:\s*y\s+mandatory/.test(rule.body))
  assert.ok(snapRules.length > 0, 'Native vertical snapping is present')
  for (const rule of snapRules) {
    assert.equal(compact(rule.selector), 'html.home-scroll-snap')
    const media = compact(rule.parents.join(' '))
    for (const condition of ['min-width:64rem', 'min-height:44rem', 'hover:hover', 'pointer:fine', 'prefers-reduced-motion:no-preference']) {
      assert.ok(media.includes(`(${condition})`), `Desktop eligibility includes ${condition}`)
    }
    assert.match(rule.body, /scroll-padding-top\s*:\s*var\(--home-header-height\)/)
  }
  const reduced = styles.find(rule => rule.parents.some(parent => /prefers-reduced-motion\s*:\s*reduce\)/.test(parent)) && /scroll-behavior\s*:\s*auto/.test(rule.body))
  assert.ok(reduced, 'Reduced-motion users get immediate rather than smooth scrolling')
  assert.doesNotMatch(app + home, /(?:@wheel|addEventListener\(\s*['"](?:wheel|mousewheel|keydown)['"]|preventDefault\()/)
})

test('snap sections grow with content and preserve reachable navigation', () => {
  const sectionRules = styles.filter(rule => compact(rule.selector).includes('.home-page>.home-section'))
  assert.ok(sectionRules.some(rule => /min-height\s*:\s*calc\(100svh\s*-\s*var\(--home-header-height\)\)/.test(rule.body)))
  assert.ok(sectionRules.some(rule => /scroll-snap-align\s*:\s*start/.test(rule.body)))
  assert.ok(sectionRules.some(rule => /scroll-snap-stop\s*:\s*always/.test(rule.body)))
  for (const rule of sectionRules) {
    const declaration = properties(rule.body)
    assert.ok(!declaration.height && !declaration['max-height'], 'Content is not fixed to viewport height')
    assert.ok(!/hidden|clip/.test(declaration.overflow || ''), 'Tall content is not clipped')
  }
  assert.ok(styles.some(rule => rule.selector.includes('home-scroll-snap') && rule.selector.includes('.site-header') && /position\s*:\s*sticky/.test(rule.body)))
})

test('pricing text palettes meet WCAG AA normal-text contrast', () => {
  const regular = palette('.price-card')
  const featured = { ...regular, ...palette('.price-card-featured') }
  for (const [name, colors] of [['regular', regular], ['featured', featured]]) {
    for (const property of ['--price-ink', '--price-muted']) {
      const ratio = contrast(colors[property], colors['--price-surface'])
      assert.ok(ratio >= 4.5, `${name} ${property} contrast ${ratio.toFixed(2)} must be at least 4.5:1`)
    }
  }
  assert.notEqual(featured['--price-surface'], regular['--price-surface'])
  const root = palette(':root')
  assert.ok(contrast(root['--ink'], root['--lime']) >= 4.5, 'Featured lime CTA has readable dark text')
  assert.match(pricing, /Recommended/)
  assert.doesNotMatch(pricing, /most popular/i)
})

test('generated homepage leads directly from hero to prices, then distinct anchored sections', { skip: !built }, () => {
  const html = generated('/')
  const expected = ['home-intro', 'home-packages', 'home-services', 'home-work', 'home-process', 'home-contact']
  const sections = [...html.matchAll(/<section\b([^>]+)>/g)]
    .map(match => match[1].match(/\bid="([^"]+)"/)?.[1]).filter(Boolean)
  assert.deepEqual(sections, expected)
  for (const id of expected.slice(1)) {
    assert.match(html, new RegExp(`<a\\b[^>]*href="#${id}"[^>]*>`), `A native next-section link reaches ${id}`)
    const target = html.match(new RegExp(`<section\\b(?=[^>]*\\bid="${id}")([^>]+)>`))?.[1]
    assert.match(target || '', /tabindex="-1"/, 'Anchor destinations can receive keyboard focus')
  }
  assert.doesNotMatch(html.slice(html.indexOf('id="home-intro"'), html.indexOf('id="home-packages"')), /class="value-strip"/)
})

for (const route of routes) test(`generated ${route} only opts into home snap when appropriate`, { skip: !built }, () => {
  const opening = generated(route).match(/<html\b[^>]*>/)?.[0] || ''
  assert.equal(opening.includes('home-scroll-snap'), route === '/')
})

for (const route of ['/', '/packages']) test(`generated ${route} has clearly labelled packages and unchanged commercial values`, { skip: !built }, () => {
  const html = generated(route)
  const cards = [...html.matchAll(/<article\b(?=[^>]*class="[^"]*\bprice-card\b)[^>]*>[\s\S]*?<\/article>/g)].map(match => match[0])
  assert.equal(cards.length, 3)
  const plans = [['Launch', '990', '499', 'launch'], ['Business', '2,490', '699', 'business'], ['Growth', '4,490', '999', 'growth']]
  for (const [index, [name, initial, renewal, key]] of plans.entries()) {
    const card = cards[index]
    assert.match(card, new RegExp(`<h3\\b[^>]*>${name}<\\/h3>`), 'Plan name is the semantic heading')
    const price = card.match(/<p\b(?=[^>]*class="[^"]*\bpackage-price\b)[^>]*>([\s\S]*?)<\/p>/)?.[1]
    assert.ok(text(price || '').includes(`RM ${initial}`), `${name} initial price remains visible`)
    assert.ok(text(card).includes(`RM${renewal}/year`), `${name} annual renewal remains visible`)
    assert.match(card, new RegExp(`href="/contact\\?package=${key}"`))
    assert.match(card, /class="[^"]*\bbutton\b/)
    assert.ok(card.includes(name === 'Business' ? 'button-light' : 'button-dark'), 'Package actions use high-contrast filled buttons')
    assert.equal(card.includes('Recommended'), name === 'Business')
  }
  assert.match(cards[1], /\bprice-card-featured\b/)
  assert.match(cards[1], /\bbutton-light\b/)
  assert.match(text(cards[0]), /1 page · up to 6 sections/)
  assert.match(text(cards[1]), /Up to 5 pages/)
  assert.match(text(cards[2]), /Up to 8 pages · standard CMS/)
  assert.match(text(html), /First-year hosting (?:&amp;|&) SSL included/)
  assert.match(text(html), /Domain registration is separate/)
})
