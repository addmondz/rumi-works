import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { parse } from '@vue/compiler-sfc'
import { compile, parse as parseHtml } from '@vue/compiler-dom'
import * as Vue from 'vue'
import { renderToString } from 'vue/server-renderer'
import ts from 'typescript'
import * as model from '../app/utils/website-preview.ts'
import { routes, demoRoutes } from '../scripts/seo-config.mjs'

const source = readFileSync('app/pages/create-website.vue', 'utf8')
const css = readFileSync('app/assets/css/generator.css', 'utf8')
const descriptor = parse(source).descriptor
const render = new Function('Vue', compile(descriptor.template.content, { mode: 'function', prefixIdentifiers: true }).code)(Vue)
const noop = () => {}

// This renders the actual Vue template with known state, not a browser or Nuxt router.
async function renderPage(overrides = {}) {
  const state = {
    showPreview: false, session: { genre: '', style: 'fancy', preview: null },
    preview: null, ready: false, error: '', count: 0, editOpen: false,
    generate: noop, editChoices: noop, reset: noop,
    ...overrides
  }
  const app = Vue.createSSRApp({ render, setup: () => state })
  app.component('NuxtLink', { props: ['to'], setup: (props, { slots }) => () => Vue.h('a', { href: props.to }, slots.default?.()) })
  for (const name of ['GeneratorPreviewArt', 'GeneratorArrow', 'GeneratorSpark']) {
    app.component(name, { render: () => Vue.h('svg', { 'aria-hidden': 'true' }) })
  }
  return renderToString(app)
}

// Executes actual setup logic with Vue reactivity and controlled router/lifecycle
// dependencies. It intentionally does not claim browser focus or history coverage.
function setupHarness({ indexable = false, reducedMotion = false } = {}) {
  const route = Vue.reactive({ path: '/create-website', hash: '' })
  const state = Vue.ref({ genre: '', style: 'fancy', preview: null })
  const navigations = []
  const lifecycle = { mount: [], unmount: [], stops: [], metadata: [] }
  const effects = { inputFocus: 0, previewFocus: 0, disconnect: 0, observed: 0, scroll: 0 }
  class Observer {
    observe() { effects.observed++ }
    unobserve() {}
    disconnect() { effects.disconnect++ }
  }
  const context = {
    exports: {},
    require: name => { assert.equal(name, '~/utils/website-preview'); return model },
    ref: Vue.ref, computed: Vue.computed, nextTick: Vue.nextTick,
    watch: (...args) => { const stop = Vue.watch(...args); lifecycle.stops.push(stop); return stop },
    useRoute: () => route,
    useRuntimeConfig: () => ({ public: { indexable } }),
    useState: () => state,
    useSeoMeta: entry => lifecycle.metadata.push(entry),
    onMounted: callback => lifecycle.mount.push(callback),
    onBeforeUnmount: callback => lifecycle.unmount.push(callback),
    navigateTo: async (location, options) => { navigations.push({ location: { ...location }, options }); Object.assign(route, location) },
    IntersectionObserver: Observer,
    window: { IntersectionObserver: Observer, matchMedia: () => ({ matches: reducedMotion }), scrollTo: () => { effects.scroll++ } }
  }
  const instrumented = `${descriptor.scriptSetup.content}\nglobalThis.subject = { session, ready, error, editOpen, genreInput, previewHeading, previewRoot, showPreview, preview, count, generate, editChoices, reset, observePreview }`
  const javascript = ts.transpileModule(instrumented, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText
  runInNewContext(javascript, context)
  const subject = context.subject
  subject.genreInput.value = { focus: () => { effects.inputFocus++ } }
  subject.previewHeading.value = { focus: () => { effects.previewFocus++ } }
  subject.previewRoot.value = { querySelectorAll: () => [{}, {}] }
  return {
    subject, route, navigations, lifecycle, effects,
    mount: () => lifecycle.mount.forEach(callback => callback()),
    dispose: () => { lifecycle.unmount.forEach(callback => callback()); lifecycle.stops.forEach(stop => stop()) }
  }
}

function countTags(html, tag) { return (html.match(new RegExp(`<${tag}(?:\\s|>)`, 'g')) || []).length }

function attributes(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, 'g'))].map(match => match[1])
}

test('generator template SSR has exactly the two requested inputs and accessible native controls', async () => {
  const html = await renderPage()
  const inputs = attributes(html, 'input')
  assert.equal(inputs.length, 3, 'One industry text field and a two-option radio group')
  assert.equal(inputs.filter(input => /type="text"/.test(input)).length, 1)
  assert.equal(inputs.filter(input => /type="radio"/.test(input)).length, 2)
  assert.ok(inputs.some(input => /id="website-genre"/.test(input) && /aria-describedby="genre-help"/.test(input)))
  assert.match(html, /<label[^>]*for="website-genre"/)
  assert.match(html, /<fieldset[\s\S]*<legend[^>]*>[\s\S]*What’s the focus\?/)
  for (const value of ['fancy', 'informative']) assert.ok(inputs.some(input => input.includes(`value="${value}"`) && /name="website-focus"/.test(input)))
  assert.equal(countTags(html, 'h1'), 1)
  assert.match(html, /<button[^>]*type="submit"[^>]*disabled/)
  assert.match(html, /0 \/ 80/)
  assert.match(html, /<noscript>[\s\S]*JavaScript[\s\S]*href="\/showcase"[\s\S]*href="\/packages"[\s\S]*<\/noscript>/)
  assert.match(html, /Template-based, not AI-generated/)
  assert.doesNotMatch(html, /<input[^>]*type="(?:email|password|tel)"/)
})

test('generator SSR exposes validation feedback and over-limit count without silently truncating text', async () => {
  const genre = 'x'.repeat(81)
  const html = await renderPage({ session: { genre, style: 'fancy' }, count: 81, error: model.validateGenre(genre), ready: true })
  assert.match(html, /aria-invalid="true"/)
  assert.match(html, /aria-describedby="genre-help genre-error"/)
  assert.match(html, /id="genre-error"[^>]*role="alert"/)
  assert.match(html, /81 \/ 80/)
  assert.ok(html.includes(`value="${genre}"`))
  assert.match(html, /80 characters or fewer/)
})

test('both generated directions render one complete draft and only inert preview contact content', async () => {
  for (const style of ['fancy', 'informative']) {
    const preview = model.generateWebsitePreview('Interior design', style)
    const html = await renderPage({ showPreview: true, preview, ready: true })
    const article = html.match(/<article id="preview-top"[\s\S]*?<\/article><div class="gw-next"/)?.[0]
    assert.ok(article, 'Generated concept has its own article boundary')
    assert.equal(countTags(html, 'h1'), 1)
    assert.match(html, /<h1[^>]*tabindex="-1"/)
    assert.ok(html.includes(`gp-${style}`))
    for (const id of ['preview-services', 'preview-about', 'preview-contact']) assert.ok(html.includes(`id="${id}"`))
    for (const service of preview.services) assert.ok(html.includes(service.title))
    assert.match(html, /draft placeholders, not verified business facts/)
    assert.match(article, /No messages can be sent/)
    assert.doesNotMatch(article, /<form\b|href="(?:mailto:|tel:|https?:)/)
    assert.match(html, /href="\/contact"/, 'Agency contact remains a separate, explicit CTA')
  }
})

test('Vue SSR escapes custom genres and every editable text field, including attribute contexts', async () => {
  const payload = '<img src=x onerror=alert(1)>"&'
  const preview = model.generateWebsitePreview(payload, 'fancy')
  for (const field of ['brand', 'headline', 'intro', 'aboutTitle', 'about', 'ctaTitle', 'ctaText']) preview[field] = payload
  preview.services.forEach(service => { service.title = payload; service.description = payload })
  const html = await renderPage({ showPreview: true, preview, ready: true, editOpen: true })
  assert.doesNotMatch(html, /<img\b|<script\b/)
  const actualAttributes = []
  function inspect(node) {
    for (const property of node.props || []) if (property.type === 6) actualAttributes.push(property.name)
    for (const child of node.children || []) inspect(child)
  }
  inspect(parseHtml(html))
  assert.ok(!actualAttributes.some(name => /^on/i.test(name)), 'Escaped payload never creates an event-handler attribute')
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;&quot;&amp;/)
  assert.match(html, /aria-label="Discuss &lt;img/)
  assert.ok(attributes(html, 'a').every(anchor => !/href="(?:javascript:|data:)/.test(anchor)))
  assert.doesNotMatch(source, /\bv-html\b|innerHTML|outerHTML|insertAdjacentHTML/)
})

test('preview editor uses labelled, bounded native fields and explicitly warns that regeneration replaces edits', async () => {
  const preview = model.generateWebsitePreview('Cafe', 'fancy')
  const html = await renderPage({ showPreview: true, preview, ready: true, editOpen: true })
  assert.match(html, /aria-expanded="true" aria-controls="preview-editor"/)
  assert.match(html, /id="preview-editor"/)
  assert.match(html, /Generating again replaces these edits/)
  const editor = html.match(/<div id="preview-editor"[\s\S]*?<p class="gw-draft-note"/)?.[0]
  assert.ok(editor)
  assert.ok(attributes(editor, 'input').every(input => /maxlength="\d+"/.test(input)))
  assert.ok(attributes(editor, 'textarea').every(input => /maxlength="\d+"/.test(input)))
  assert.equal(countTags(editor, 'label'), countTags(editor, 'input') + countTags(editor, 'textarea'))
})

test('setup logic validates before generating and supports edits, repeated generation, Back/Forward states and reset', async () => {
  const harness = setupHarness()
  try {
    const { subject, route, navigations, effects } = harness
    assert.equal(subject.ready.value, false)
    harness.mount()
    assert.equal(subject.ready.value, true)
    await subject.generate()
    assert.equal(subject.session.value.preview, null)
    assert.ok(subject.error.value)
    assert.equal(navigations.length, 0)
    assert.ok(effects.inputFocus > 0)
    subject.session.value.genre = '  Cafe  '
    await subject.generate()
    assert.equal(subject.session.value.genre, 'Cafe')
    assert.equal(subject.showPreview.value, true)
    assert.equal(subject.preview.value.category, 'food')
    await subject.editChoices()
    assert.equal(subject.showPreview.value, false)
    subject.session.value.genre = 'Novel widget craft'
    subject.session.value.style = 'informative'
    await subject.generate()
    assert.equal(subject.preview.value.genre, 'Novel widget craft')
    assert.equal(subject.preview.value.style, 'informative')
    route.hash = '#edit'
    assert.equal(subject.showPreview.value, false)
    route.hash = '#preview-about'
    assert.equal(subject.showPreview.value, true, 'Preview anchors retain preview mode')
    subject.preview.value.headline = 'Locally edited headline'
    route.hash = '#edit'
    route.hash = '#preview'
    assert.equal(subject.preview.value.headline, 'Locally edited headline')
    await subject.reset()
    assert.equal(subject.preview.value, null)
    assert.equal(subject.session.value.genre, '')
    assert.equal(subject.session.value.style, 'fancy')
    route.hash = '#preview'
    assert.equal(subject.showPreview.value, false, 'Old preview history never resurrects a cleared draft')
    assert.ok(navigations.every(entry => !JSON.stringify(entry).includes('Novel widget craft') && !('query' in entry.location)))
  } finally { harness.dispose() }
})

test('synchronous repeated generation leaves the newest genre and style in the result', async () => {
  const harness = setupHarness()
  try {
    harness.mount()
    const { subject } = harness
    subject.session.value.genre = 'Cafe'
    const first = subject.generate()
    subject.session.value.genre = 'Florist'
    subject.session.value.style = 'informative'
    const second = subject.generate()
    await Promise.all([first, second])
    assert.equal(subject.preview.value.genre, 'Florist')
    assert.equal(subject.preview.value.style, 'informative')
    assert.equal(subject.preview.value.category, 'botanical')
    assert.match(descriptor.scriptSetup.content, /current !== generation/, 'Stale post-navigation work is guarded')
  } finally { harness.dispose() }
})

test('metadata stays generic while generated drafts become noindex even in production', async () => {
  const harness = setupHarness({ indexable: true })
  try {
    const meta = harness.lifecycle.metadata[0]
    assert.equal(meta.robots(), 'index, follow')
    harness.subject.session.value.genre = 'Private uncommon business genre'
    await harness.subject.generate()
    assert.equal(meta.robots(), 'noindex, nofollow')
    for (const key of ['title', 'description', 'ogTitle', 'ogDescription', 'twitterTitle', 'twitterDescription']) {
      assert.equal(typeof meta[key], 'string')
      assert.ok(!meta[key].includes('Private uncommon business genre'))
    }
    await harness.subject.reset()
    assert.equal(meta.robots(), 'index, follow')
    assert.ok(routes.includes('/create-website'))
    assert.ok([...routes, ...demoRoutes].every(route => !/[?#]/.test(route)))
    const shell = readFileSync('app/app.vue', 'utf8')
    assert.doesNotMatch(parse(shell).descriptor.scriptSetup.content, /route\.(?:hash|fullPath|query)/, 'Canonical and social URLs exclude transient user state')
  } finally { harness.dispose() }
})

test('motion observer skips reduced motion and is disconnected on cleanup; content is not hidden pending script', async () => {
  for (const reducedMotion of [true, false]) {
    const harness = setupHarness({ reducedMotion })
    harness.subject.observePreview()
    assert.equal(harness.effects.observed, reducedMotion ? 0 : 2)
    harness.dispose()
    if (!reducedMotion) assert.ok(harness.effects.disconnect > 0)
  }
  assert.match(css, /prefers-reduced-motion:reduce[\s\S]*animation:none!important[\s\S]*scroll-behavior:auto!important/)
  assert.doesNotMatch(css, /\[data-preview-reveal\]\s*\{[^}]*opacity\s*:\s*0(?:;|\})/)
  assert.match(css, /\.gw-style:has\(input:focus-visible\)/)
  assert.match(css, /@media\(max-width:380px\)/)
  assert.match(css, /\.gp-informative \.gp-service-list\{display:grid/)
  assert.match(css, /\.gp-hero h1\{font:[^}]*Georgia/)
  assert.match(css, /\.gp-informative \.gp-hero h1\{font:[^}]*Arial/)
})

test('generation has no network request, fake wait, persistent storage or user-data URL construction', () => {
  assert.doesNotMatch(descriptor.scriptSetup.content, /\b(?:fetch|\$fetch|useFetch|setTimeout|setInterval)\s*\(|localStorage|sessionStorage|indexedDB|document\.cookie|URLSearchParams/)
  assert.doesNotMatch(source, /:href="[^"\n]*(?:preview\.|session\.)|:to="[^"\n]*(?:preview\.|session\.)/)
  assert.match(source, /refreshing clears it/)
  assert.match(source, /Nothing is published or sent/)
  for (const file of ['app/components/SiteHeader.vue', 'app/pages/index.vue', 'app/pages/showcase.vue']) {
    assert.ok(readFileSync(file, 'utf8').includes('/create-website'), `Generator is discoverable in ${file}`)
  }
})

const generatedPath = '.output/public/create-website/index.html'
test('prerendered generator landing keeps generic SEO, one h1, an empty draft and a useful no-JS path', { skip: !existsSync(generatedPath) }, () => {
  const html = readFileSync(generatedPath, 'utf8')
  assert.equal(countTags(html, 'h1'), 1)
  assert.match(html, /<title>Instant website preview/)
  assert.match(html, /name="description"/)
  assert.match(html, /name="robots" content="noindex, nofollow"/)
  assert.match(html, /<noscript>[\s\S]*explore our website showcase[\s\S]*<\/noscript>/)
  assert.match(html, /id="website-genre"/)
  assert.doesNotMatch(html, /<article id="preview-top"|id="preview-editor"/)
  assert.ok(!html.includes('undefined'))
})

// The same target must exist after refresh/reset, when the preview hash can remain
// in browser history but the intentionally ephemeral draft no longer exists.
test('preview skip target exists exactly once with or without a generated draft', async () => {
  const landing = await renderPage()
  const result = await renderPage({ showPreview: true, preview: model.generateWebsitePreview('Florist', 'fancy'), ready: true })
  for (const html of [landing, result]) assert.equal((html.match(/id="preview-top"/g) || []).length, 1)
})
