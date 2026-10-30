import test from 'node:test'
import assert from 'node:assert/strict'
import { generateWebsitePreview, normalizeGenre, validateGenre } from '../app/utils/website-preview.ts'

test('genre normalization trims whitespace and strips invisible controls without truncation', () => {
  assert.equal(normalizeGenre(' \t  Artisan\n bakery \r '), 'Artisan bakery')
  assert.equal(normalizeGenre('\u0000Cafe\u0001\u202e\u200b'), 'Cafe')
  assert.equal(normalizeGenre('Cafe \u0000 \u202e bakery'), 'Cafe bakery')
  assert.equal(normalizeGenre('Cafe\u0301'), 'Café')
  assert.equal(normalizeGenre('a'.repeat(81)), 'a'.repeat(81))
  for (const value of [null, undefined, 42, {}, ['Cafe']]) assert.equal(normalizeGenre(value), '')
})

test('validation rejects missing, very short and overlong inputs and counts Unicode code points', () => {
  for (const value of ['', '   ', '\u0000', null, 0, {}, 'x', '🌱']) assert.ok(validateGenre(value), String(value))
  for (const value of ['ab', '花店', '🌱🌷', 'é'.repeat(80), '🌱'.repeat(80)]) assert.equal(validateGenre(value), null)
  assert.match(validateGenre('x'.repeat(81)), /80/)
  assert.match(validateGenre('🌱'.repeat(81)), /80/)
  assert.equal(validateGenre(`  ${'x'.repeat(80)}  `), null)
})

test('known genres select appropriate starter content and local art directions', () => {
  const examples = [
    ['Independent café', 'food', 'food', 'clay'],
    ['bakery & coffee', 'food', 'food', 'clay'],
    ['Landscape gardening', 'botanical', 'botanical', 'moss'],
    ['FLORIST', 'botanical', 'botanical', 'moss'],
    ['Interior design', 'architecture', 'architecture', 'sand'],
    ['Photography studio', 'creative', 'studio', 'plum'],
    ['Software consulting', 'services', 'abstract', 'blue'],
    ['Pilates', 'wellness', 'botanical', 'sage']
  ]
  for (const [genre, category, art, palette] of examples) {
    const result = generateWebsitePreview(genre, 'fancy')
    assert.equal(result.category, category, genre)
    assert.equal(result.art, art, genre)
    assert.equal(result.palette, palette, genre)
  }
})

test('matching uses complete words, accepts custom genres and keeps the submitted genre', () => {
  for (const genre of ['Cartography', 'Barcodes', 'Coffeehousekeeping', 'Novel moon-globe restoration', '花店']) {
    const result = generateWebsitePreview(genre, 'informative')
    assert.equal(result.category, 'custom', genre)
    assert.equal(result.genre, genre)
    assert.ok(result.headline.includes(genre))
    assert.ok(result.intro.includes(genre))
  }
})

test('both styles produce complete, deterministic drafts without generated facts or contact links', () => {
  const required = ['genre', 'style', 'category', 'brand', 'eyebrow', 'headline', 'intro', 'aboutTitle', 'about', 'ctaTitle', 'ctaText', 'art', 'palette']
  for (const genre of ['Cafe', 'Garden', 'Interiors', 'Photographer', 'Wellness', 'Consultancy', 'Custom widget craft']) {
    for (const style of ['fancy', 'informative']) {
      const result = generateWebsitePreview(genre, style)
      assert.deepEqual(result, generateWebsitePreview(genre, style))
      for (const key of required) assert.ok(typeof result[key] === 'string' && result[key].length, `${genre}: ${key}`)
      assert.equal(result.brand, 'Your business name')
      assert.equal(result.services.length, 3)
      assert.ok(result.services.every(service => service.title && service.description))
      assert.doesNotMatch(JSON.stringify(result), /https?:\/\/|mailto:|tel:|RM\d|five.star|trusted by|award.winning/i)
      assert.match(result.ctaText, /does not send enquiries/)
    }
    assert.notEqual(generateWebsitePreview(genre, 'fancy').headline, generateWebsitePreview(genre, 'informative').headline)
  }
})

test('drafts do not share editable service objects', () => {
  const first = generateWebsitePreview('Cafe', 'fancy')
  first.services[0].title = 'Changed'
  assert.notEqual(generateWebsitePreview('Cafe', 'fancy').services[0].title, 'Changed')
})

test('untrusted input stays literal text and never becomes HTML or a URL structure', () => {
  const input = '<img src=x onerror=alert(1)>'
  const result = generateWebsitePreview(input, 'fancy')
  assert.equal(result.genre, input)
  assert.equal(result.eyebrow, input)
  assert.ok(result.headline.includes(input))
  assert.equal(result.category, 'custom')
  assert.ok(!('html' in result) && !('url' in result))
  assert.equal(generateWebsitePreview('javascript:alert(1)', 'informative').genre, 'javascript:alert(1)')
})

test('invalid input and unexpected focus fail instead of creating a misleading draft', () => {
  for (const input of ['', 'x', 'a'.repeat(81), {}, undefined]) assert.throws(() => generateWebsitePreview(input, 'fancy'))
  for (const focus of ['Fancy', '', 'unknown', null, undefined]) assert.throws(() => generateWebsitePreview('Cafe', focus), /Choose Fancy or Informative/)
})
