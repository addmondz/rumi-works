import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { routes } from '../scripts/seo-config.mjs'
const built = existsSync('.output/public/index.html')
for (const route of routes) test(`generated ${route} has page content and metadata`, { skip: !built }, () => {
  const html = readFileSync(`.output/public${route === '/' ? '/' : route + '/'}index.html`, 'utf8')
  assert.match(html, /<title>[^<]+<\/title>/)
  assert.match(html, /name="description"/)
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1)
  assert.ok(!html.includes('undefined'))
})
test('contact placeholders are visible without being send links', { skip: !built }, () => {
  const html = readFileSync('.output/public/contact/index.html', 'utf8')
  assert.match(html, /hello@rumiworks\.example/)
  assert.match(html, /\+60 XX-XXX XXXX/)
  assert.ok(!/href="(?:mailto:|https:\/\/wa\.me\/)/.test(html))
  assert.match(html, /Copy project brief/)
})
test('concept work is explicitly disclosed', { skip: !built }, () => {
  const html = readFileSync('.output/public/work/index.html', 'utf8')
  assert.match(html, /not commissioned client work/)
  assert.match(html, /sample data/)
})
