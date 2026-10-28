# Rumi Works

A responsive, English-language marketing website for a proposed website and custom-software business serving SMEs in Kuala Lumpur and Selangor. Built with **Nuxt 4, Vue 3, and TypeScript**, with ten prerendered routes and a warm ivory, charcoal, and green visual system.

This repository is a website implementation—not a live deployment. Contact channels, business details, commercial terms, and the privacy draft need owner approval before launch. The work gallery contains **illustrated concept demos with sample data**, not real client projects, testimonials, or claimed results.

## Local development

Use **Node.js 24 LTS** (see `.nvmrc`) and npm. The lockfile is committed for reproducible installation.

```sh
nvm use                  # optional, if you use nvm
npm ci
cp .env.example .env
npm run dev
```

Open the local URL printed by Nuxt. No external service credentials are needed for the default preview.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Prepare preview/production SEO files and start the development server. |
| `npm run typecheck` | Run Nuxt/Vue TypeScript checks. |
| `npm run build` | Create the Nuxt production server build. |
| `npm run generate` | Build and prerender the static website into `.output/public/`. |
| `npm run prerender` | Alias for `npm run generate`. |
| `npm run preview` | Preview the generated production build locally. |
| `npm test` | Run Node's SEO configuration and generated-HTML tests. |

### Verification

Run the checks against the default preview configuration: `NUXT_PUBLIC_SITE_MODE=preview`, with the site URL and contact fields empty.

```sh
npm run typecheck
npm run build
npm run generate
npm test
```

Generate **before** testing: the generated-HTML checks are skipped if build output is absent. The contact fixture checks intentionally expect unconfigured, non-sendable preview placeholders. Automated tests are not an accessibility audit, a security audit, or browser coverage. Responsive and interaction QA must be performed separately; there is no `test:e2e` script. In the implementation environment, the managed preview reported “Dev server is unavailable”, so browser/mobile interaction checks and visual screenshots remain unverified. The automated build, typecheck, static generation, and all 18 Node tests passed. The production dependency audit reported no moderate, high, or critical issues; seven low-severity transitive advisories remain.

## Configuration

Copy `.env.example` to `.env`, or set the same variables in your build environment. These are **public, build-time values**. Never place secrets in them or commit `.env`.

| Variable | Default / format | Purpose |
| --- | --- | --- |
| `NUXT_PUBLIC_SITE_MODE` | `preview` | Set to `production` only after launch review. |
| `NUXT_PUBLIC_SITE_URL` | Empty; final HTTPS origin | Enables canonical URLs and, together with production mode, indexable SEO output. Use an origin such as `https://your-confirmed-domain.tld`, not a subdirectory. |
| `NUXT_PUBLIC_WHATSAPP` | Empty; international digits only | Confirmed WhatsApp recipient, without `+`, spaces, or punctuation. |
| `NUXT_PUBLIC_CONTACT_EMAIL` | Empty; valid email address | Confirmed business email recipient. |

For a static deployment, changing these values after upload does **not** change the site. Update the build configuration, regenerate, retest, and replace the generated files.

### Contact behavior

The contact page builds a project brief in browser memory. It has **no form submission backend, no database, and no draft storage**. The visitor can copy the brief to their clipboard; navigating away or reloading can discard it. The site does not report simulated delivery or form success.

Until real details are configured, `hello@rumiworks.example` and `+60 XX-XXX XXXX` appear only as clearly labelled, inert placeholders. They are not send links. A configured channel exposes an email-app or WhatsApp link containing the brief. The visitor must review the recipient and message and send it in that external application; opening a link does not confirm delivery. Either channel can be configured independently.

### Preview versus production SEO

The safe default is a non-indexable preview:

- `noindex, nofollow` robots metadata;
- `robots.txt` disallows crawling;
- no generated sitemap or invented canonical domain.

Production indexing requires **both** `NUXT_PUBLIC_SITE_MODE=production` and a valid, non-local HTTPS `NUXT_PUBLIC_SITE_URL`. Generation then emits canonical URLs, an allow-crawl `robots.txt`, and `sitemap.xml` containing all ten routes. The configured URL is normalized to its origin. Preview indexing controls are not authentication or access control.

## Pages and source map

| Route | Source |
| --- | --- |
| `/` | `app/pages/index.vue` |
| `/website-development` | `app/pages/website-development.vue` |
| `/custom-software` | `app/pages/custom-software.vue` |
| `/packages` | `app/pages/packages.vue` |
| `/work` | `app/pages/work.vue` |
| `/about` | `app/pages/about.vue` |
| `/contact` | `app/pages/contact.vue` |
| `/insights` | `app/pages/insights/index.vue` |
| `/insights/website-cost-malaysia` | `app/pages/insights/website-cost-malaysia.vue` |
| `/privacy` | `app/pages/privacy.vue` |

- `app/components/`: shared navigation, footer, pricing, calls to action, and illustrated project previews.
- `app/assets/css/main.css`: global design system and responsive layouts.
- `app/app.vue`: application shell and shared metadata behavior.
- `nuxt.config.ts`: Nuxt setup, public configuration, and prerendered routes.
- `scripts/prepare-seo.mjs` and `scripts/seo-config.mjs`: environment-aware robots and sitemap generation.
- `tests/`: SEO configuration and generated-page assertions.
- `public/`: local public assets; generated robots and sitemap files are intentionally ignored by Git.

Keep the route list in `nuxt.config.ts` and `scripts/seo-config.mjs` aligned when adding or removing pages.

## Proposed commercial content

The following is **draft package content, subject to final scope and a written quotation**, not an automatic checkout or binding offer.

| Package | Proposed initial price | Scope | Proposed annual renewal after year one |
| --- | ---: | --- | ---: |
| Launch | RM990 | One page, up to six sections | RM499 |
| Business | RM2,490 | Up to five pages | RM699 |
| Growth | RM4,490 | Up to eight pages and a standard CMS setup | RM999 |

First-year hosting and SSL are included in the proposals; domain registration and renewal are separate. Optional website care is RM149/month for up to 30 minutes of small content edits, with no rollover. It excludes new pages, redesigns, new features, and custom-software support.

Proposed payment terms are 50% after scope agreement to begin, and 50% after approval of the agreed build, before launch or final handover. Confirm applicable taxes, review rounds, milestones, timelines, licences, and third-party costs in the quotation. Search rankings are not guaranteed. Custom software is quoted separately. The Growth package describes a future scoped client CMS deliverable; this marketing website does not include an installed CMS backend.

## Static deployment, when separately authorized

The current delivery is source code for GitHub; **no hosting deployment is part of it**.

When deployment is authorized:

1. Complete the launch checklist below and set the confirmed build-time values.
2. Run `npm ci`, `npm run typecheck`, and `npm run generate`.
3. Upload the complete **`.output/public/`** directory to a static host. Do not publish source files, `.env`, or `node_modules`.
4. Configure directory-index handling so direct requests to deep routes, such as `/packages` and `/insights/website-cost-malaysia`, serve their generated `index.html` files. Preserve `/_nuxt/` assets and use the generated `404.html` for unknown routes where supported. Do not redirect every deep URL to `/`.
5. Verify HTTPS, the intended domain, deep-link refreshes, asset paths, contact recipients, canonical URLs, robots, sitemap, and mobile interactions on the actual host.

The site assumes deployment at the domain root. Subdirectory hosting needs explicit Nuxt base-URL and SEO changes plus fresh testing. There is no server endpoint to deploy for the contact brief tool.

## Launch checklist

- [ ] Confirm the operating business identity and the right to use “Rumi Works”; perform appropriate business-name, domain, and trademark checks.
- [ ] Configure and independently verify the real WhatsApp number and email address. Test the actual destinations without sending unapproved messages.
- [ ] Approve package scope, recurring costs, payment milestones, applicable taxes, review rounds, delivery expectations, and legal/commercial terms.
- [ ] Finalize the privacy information: responsible entity/controller, genuine contact, hosting provider, logs, retention, processors, and applicable requirements. The current page is expressly a draft.
- [ ] Retain prominent concept-demo labels, or replace concepts only with real work and assets approved for publication. Do not add invented clients, reviews, performance claims, or team credentials.
- [ ] Review all content, spelling, accessibility basics, keyboard navigation, focus states, mobile layouts, and contrast.
- [ ] Test navigation, deep-link refresh, FAQ toggles, mobile menu, brief editing, repeated copy actions, clipboard fallback, and configured contact links. Confirm that no backend submission is implied.
- [ ] Confirm the final HTTPS origin and production-mode setting, then regenerate. Check each page's title, description, canonical URL, robots directives, sitemap, and error page.
- [ ] Confirm domain/hosting ownership, renewal responsibility, handover access, and backup arrangements before authorized deployment.

## Framework reference

[Nuxt prerendering documentation](https://nuxt.com/docs/4.x/getting-started/prerendering)
