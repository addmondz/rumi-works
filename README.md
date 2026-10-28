# Rumi Works

A responsive, English-language marketing website for a proposed website and custom-software business serving SMEs in Kuala Lumpur and Selangor. Built with **Nuxt 4, Vue 3, and TypeScript**, with 25 prerendered routes (11 agency pages and 14 fictional demo pages) and a warm ivory, charcoal, and green visual system.

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

Generate **before** testing: the generated-HTML checks are skipped if build output is absent. The contact fixture checks intentionally expect unconfigured, non-sendable preview placeholders. Automated tests are not an accessibility audit, a security audit, or browser coverage. Responsive and interaction QA must be performed separately; there is no `test:e2e` script. The automated build, typecheck, static generation, and all 35 Node tests passed after the homepage update. The tests include homepage-only snap eligibility, reactive route-class cleanup, section order and anchors, pricing structure, unchanged commercial values, and palette contrast calculations. Managed browser QA remains unverified: the Nuxt development server hit a sandbox network-interface restriction, and a generated static preview could not be reached by the managed browser. These source/static checks do not establish real mouse/trackpad, mobile, zoom, or Back/Forward interaction behavior. The production dependency audit reported no moderate, high, or critical issues; seven low-severity transitive advisories remain.

### Homepage navigation and pricing

The homepage now leads with **Hero → Packages → Services → Work → Process → Contact**, using distinct ivory, sage, forest, white, and pale-lime sections. The shared cards on the homepage and `/packages` emphasize the Business proposal without changing package prices or scope.

Native CSS section snapping is enabled only for fine-pointer, hover-capable desktop viewports at least 64rem wide and 44rem high, when reduced motion is not requested. Small/short viewports and touch devices use normal scrolling. Section height can grow with content; nothing is clipped to fit a screen. The homepage class is derived reactively from the route, so other pages do not snap. Native “next section” links offer a precise alternative to scrolling. Browser/trackpad momentum still controls gestures; snapping does not guarantee exactly one section for every wheel movement.

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

The 14 fictional `/demos/` pages always use `noindex, follow`, including in production, and are deliberately excluded from the sitemap. They show package functionality; they are not real businesses to promote in search. In preview, `robots.txt` still disallows the entire site. Robots directives are not access controls.

Production indexing requires **both** `NUXT_PUBLIC_SITE_MODE=production` and a valid, non-local HTTPS `NUXT_PUBLIC_SITE_URL`. Generation then emits canonical URLs, an allow-crawl `robots.txt`, and `sitemap.xml` containing the 11 agency routes (including `/showcase`). The configured URL is normalized to its origin. Preview indexing controls are not authentication or access control.

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

Keep the prerender list in `nuxt.config.ts` aligned with both `routes` (agency sitemap pages) and `demoRoutes` (fictional, noindex demonstration pages) in `scripts/seo-config.mjs`.

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

## Corporate showcase and working package demos

`/showcase` is an additional, self-contained premium editorial design direction; the existing homepage and its chapter/snap behavior are preserved. It is discoverable from the shared main navigation and footer. All three packages use the same considered visual identity: **design style is not a package tier**. Page allowance and content management distinguish the packages. Bespoke interaction work is agreed in the written scope, not added as an unlimited inclusion.

The showcase uses original local SVG architectural artwork, a charcoal/ivory/lime palette, a pricing section immediately after the hero, an illustrative sticky browser stage, a practical process and native accessible FAQ disclosures. No client logos, endorsements, revenue metrics or fabricated delivery results are used. No heavy video, external runtime fonts, animation libraries or new dependencies were added.

### Exact demonstration routes

All demonstrations use **FORME**, a prominently labelled fictional workplace consultancy.

| Package | Pages | Routes (under prefix) |
| --- | ---: | --- |
| Launch | 1 | `/demos/launch` — six sections: hero, approach, services, concept work, process and enquiry preview |
| Business | 5 | `/demos/business`, `/about`, `/services`, `/work`, `/contact` |
| Growth | 8 | `/demos/growth`, `/about`, `/services`, `/work`, `/contact`, `/insights`, `/insights/a-better-workplace-brief`, `/studio` |

The suffixes in the table are relative to each package prefix, not additional agency routes. Every page has its own meaningful prerendered content, heading, title and description. The Growth article and content studio count toward the eight-page demonstration, not as extra promised pages. These are illustrative scope examples; the actual client page list is agreed in the quotation.

### Safe interactive examples

- Enquiry forms build a text preview only. Nothing is sent, booked or stored. Example contact details are inert `.example` / `XX` placeholders. Form data disappears when its page is left or fully reloaded.
- The Growth studio edits a sample homepage headline and article title/summary using Nuxt app memory. Follow the studio links to see the changes; reset restores the original copy. A full reload discards the edits. No localStorage, database, authentication or publishing backend is used.
- Preview submit buttons require hydration; without JavaScript, content and navigation remain readable and forms cannot submit.
- Growth still includes the proposed standard CMS setup. The preview does **not** claim that a production CMS is installed. Actual platform, editable fields, permissions, integrations and handover are agreed in scope; custom workflows are quoted separately.

### SEO and motion

The showcase uses a single H1, native navigation and FAQ elements, rendered copy, descriptive metadata and links into every demo. Canonical and Open Graph URLs, Organization and breadcrumb structured data are emitted only when the existing HTTPS-origin configuration is set. Schema uses only the Rumi Works name and configured website, with no invented address, ratings, customer list or business registration. Agency pages retain the existing preview/production indexing gate.

Reveals progressively enhance visible content after IntersectionObserver detects an entrance; no content is hidden while awaiting JavaScript. With reduced motion, transforms, entrances and sticky positioning are removed. Mobile uses a normal, single-column document flow. No wheel interception or custom scroll engine is installed; the original homepage-only snap logic is unchanged.

Additional sources: `app/pages/showcase.vue`, `app/assets/css/showcase.css`, `app/pages/demos/`, `app/components/demo/`, `app/utils/demo-content.ts`, `app/assets/css/demos.css`, and the two original `public/showcase-*.svg` assets. Tests in `tests/showcase.test.mjs` cover the route contract, content helpers, safe forms, metadata, local links, disclosure, reduced-motion and visible-source invariants. Static/source assertions are not a substitute for a rendered responsive/accessibility audit.

### Showcase verification (October 2026)

The final update passed Nuxt typecheck, production build, static generation and all 66 Node tests. An isolated production-mode fixture also verified all 25 canonical/OG URL and robots values, the truthful showcase schema and the 11-entry agency-only sitemap; the generated output was then restored to the safe default preview configuration.

The managed Nuxt development preview returned “Dev server is unavailable.” A supported managed **static preview of the generated output** worked, so browser QA was completed there—not on a deployment. Desktop checks covered the showcase and Growth compositions, the pricing links, actual CMS edit/apply/navigation/reset/reload behavior, repeated enquiry preview/reset, and normal scrolling outside the homepage. Home → Back to showcase → Forward to home restored/removed the homepage snap class correctly in the browser. Narrow-layout checks used a 393-CSS-pixel viewport via browser zoom: no horizontal overflow, menu open/close, Escape focus restoration and dismissal after navigation. Browser device emulation was unavailable because organization policy blocks DevTools; a physical mobile device and runtime reduced-motion emulation were not tested. Reduced-motion and no-JavaScript safety are covered by source/generated-output checks, not claimed as complete browser audits. A direct-refresh trailing-slash shell issue found during QA was fixed and regression-tested. Decorative arrow glyphs were replaced with inline SVG after the browser exposed missing font glyphs.
