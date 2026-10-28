import test from 'node:test'
import assert from 'node:assert/strict'
import { getSeoConfig, routes } from '../scripts/seo-config.mjs'

test('unset environment is non-indexable with no invented URL', () => assert.deepEqual(getSeoConfig({}), { siteUrl: '', indexable: false }))
test('URL alone does not enable indexing', () => assert.equal(getSeoConfig({ NUXT_PUBLIC_SITE_URL: 'https://example.com' }).indexable, false))
test('production requires a safe HTTPS origin', () => {
  for (const value of ['', 'not a url', 'http://example.com', 'https://localhost', 'https://user:pass@example.com']) assert.equal(getSeoConfig({ NUXT_PUBLIC_SITE_MODE: 'production', NUXT_PUBLIC_SITE_URL: value }).indexable, false)
})
test('production strips URL path, query and fragment consistently', () => assert.deepEqual(getSeoConfig({ NUXT_PUBLIC_SITE_MODE: 'production', NUXT_PUBLIC_SITE_URL: 'https://example.com/base/?q=yes#section' }), { siteUrl: 'https://example.com', indexable: true }))
test('all intended routes are unique and absolute', () => { assert.equal(routes.length, 11); assert.equal(new Set(routes).size, routes.length); assert.ok(routes.every(route => route.startsWith('/'))) })

test('SEO generator writes production sitemap and removes it again for preview', async () => {
  const { mkdtemp, readFile, access, rm } = await import('node:fs/promises')
  const { tmpdir } = await import('node:os')
  const { resolve, join } = await import('node:path')
  const { execFileSync } = await import('node:child_process')
  const directory = await mkdtemp(join(tmpdir(), 'rumi-seo-'))
  const script = resolve('scripts/prepare-seo.mjs')
  try {
    execFileSync(process.execPath, [script], { cwd: directory, env: { ...process.env, NUXT_PUBLIC_SITE_MODE: 'production', NUXT_PUBLIC_SITE_URL: 'https://example.com' } })
    assert.match(await readFile(join(directory, 'public/robots.txt'), 'utf8'), /Sitemap: https:\/\/example.com\/sitemap.xml/)
    const sitemap = await readFile(join(directory, 'public/sitemap.xml'), 'utf8')
    assert.equal((sitemap.match(/<url>/g) || []).length, 11)
    execFileSync(process.execPath, [script], { cwd: directory, env: { ...process.env, NUXT_PUBLIC_SITE_MODE: 'preview', NUXT_PUBLIC_SITE_URL: '' } })
    assert.equal(await readFile(join(directory, 'public/robots.txt'), 'utf8'), 'User-agent: *\nDisallow: /\n')
    await assert.rejects(access(join(directory, 'public/sitemap.xml')))
  } finally { await rm(directory, { recursive: true, force: true }) }
})
