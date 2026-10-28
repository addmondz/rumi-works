<script setup lang="ts">
const config = useRuntimeConfig()
const pageTitle = 'Corporate website design & package demos | Rumi Works'
const description = 'Explore a modern corporate website direction by Rumi Works. Try working Launch, Business and Growth demos, compare RM990–RM4,490 packages, and see what changes.'
useSeoMeta({ title: pageTitle, description, ogTitle: pageTitle, ogDescription: description, twitterTitle: pageTitle, twitterDescription: description })
useHead(() => ({ script: config.public.siteUrl ? [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'Organization', name: 'Rumi Works', url: config.public.siteUrl }, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${config.public.siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Website showcase', item: `${config.public.siteUrl}/showcase` }] }] }) }] : [] }))
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
function closeMenu() { menuOpen.value = false; menuButton.value?.focus() }
const activeChapter = ref(0)
const page = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined
let chapterObserver: IntersectionObserver | undefined
onMounted(() => {
  if (!page.value || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer?.unobserve(entry.target) }
  }), { threshold: 0.12 })
  page.value.querySelectorAll('[data-reveal]').forEach(element => observer?.observe(element))
  chapterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) activeChapter.value = Number((entry.target as HTMLElement).dataset.chapter || 0)
  }), { rootMargin: '-25% 0px -35% 0px', threshold: 0 })
  page.value.querySelectorAll('[data-chapter]').forEach(element => chapterObserver?.observe(element))
})
onBeforeUnmount(() => { observer?.disconnect(); chapterObserver?.disconnect() })
const packages = [
  { key: 'launch', name: 'Launch', number: '01', price: '990', renewal: '499', scope: 'One page. One clear story.', pages: '1 page · up to 6 sections', fit: 'A focused introduction for a new business or a single offer.', detail: 'A complete one-page journey: introduction, services, approach, concept work, process and enquiry preview.', interaction: 'Scroll the full story. Try the enquiry preview.', label: 'Open the one-page demo' },
  { key: 'business', name: 'Business', number: '05', price: '2,490', renewal: '699', scope: 'Give every question its place.', pages: 'Up to 5 pages', fit: 'A fuller company presence with space for services and work.', detail: 'Five connected pages: home, about, services, work and contact. Follow a visitor’s path from first impression to project enquiry.', interaction: 'Explore the navigation. Compare the depth.', label: 'Explore all five pages' },
  { key: 'growth', name: 'Growth', number: '08', price: '4,490', renewal: '999', scope: 'A website that keeps moving.', pages: 'Up to 8 pages · standard CMS', fit: 'A growing content library and agreed content you can edit.', detail: 'Eight connected pages, including an insights index, a full article and a front-end content studio preview.', interaction: 'Edit a sample headline. See it change. Reset it.', label: 'Explore the eight-page demo' }
]
const questions = [
  { q: 'Is a premium design only available in Growth?', a: 'No. Visual direction and package size are different decisions. Every demo uses the same considered brand language. Launch, Business and Growth differ in page count and content management scope; any bespoke interaction is agreed in your quotation.' },
  { q: 'Are these real client websites?', a: 'No. FORME is a fictional workplace consultancy created to demonstrate the packages. Its project examples, content and enquiry flows are illustrative, not commissioned client work or claimed results.' },
  { q: 'What does the Growth content studio show?', a: 'A browser-only demonstration of editing content, not an installed CMS, user account or publishing backend. Changes are temporary and nothing is sent. Growth includes a standard CMS setup; the actual platform, editable content, access and handover are agreed in the written scope. Custom workflows are quoted separately.' },
  { q: 'What is included in the proposed price?', a: 'The stated page allowance, responsive website design and first-year hosting and SSL. Domain registration and renewal are separate. Annual hosting and SSL renewal is RM499 for Launch, RM699 for Business or RM999 for Growth after year one. Final scope, taxes and third-party costs are confirmed in a written quotation.' },
  { q: 'How are motion and search visibility handled?', a: 'The main content is rendered into the page, with descriptive titles, internal links and a clear heading structure. Animation enhances that content instead of unlocking it. Reduced-motion settings are respected. Search rankings are not guaranteed; production indexing is enabled only after the final website address is confirmed.' },
  { q: 'Can you maintain the website after launch?', a: 'Optional website care is RM149 per month for up to 30 minutes of small content edits, without rollover. It does not include new pages, redesigns, new features or custom-software support. Those are scoped separately.' }
]
</script>

<template>
  <div ref="page" class="showcase-page">
    <header class="sc-header" @keydown.esc="closeMenu">
      <NuxtLink class="sc-brand" to="/" aria-label="Rumi Works home">rumi<span>works</span><i aria-hidden="true">.</i></NuxtLink>
      <nav class="sc-desktop-nav" aria-label="Showcase navigation"><a href="#packages">Packages</a><a href="#experience">The experience</a><a href="#approach">Our approach</a></nav>
      <NuxtLink class="sc-header-contact" to="/contact">Let’s talk <span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></NuxtLink>
      <button ref="menuButton" class="sc-menu-button" :aria-expanded="menuOpen" aria-controls="showcase-menu" @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close −' : 'Menu +' }}</button>
      <nav v-if="menuOpen" id="showcase-menu" class="sc-mobile-nav" aria-label="Showcase mobile navigation" @click="menuOpen = false"><a href="#packages">Packages</a><a href="#experience">The experience</a><a href="#approach">Our approach</a><NuxtLink to="/contact">Let’s talk</NuxtLink></nav>
    </header>

    <section class="sc-hero" aria-labelledby="showcase-title">
      <div class="sc-wrap">
        <div class="sc-kicker"><span class="sc-live-dot" /> Independent digital craft <span>Kuala Lumpur · Selangor</span></div>
        <h1 id="showcase-title">Business websites.<br><span>Anything but</span><br><em>business as usual.</em></h1>
        <div class="sc-hero-bottom"><p>A sharper presence. A clearer story.<br>Websites that make your business feel<br>as considered as the work you do.</p><a href="#packages" class="sc-round-link"><span>Find your<br>starting point</span><span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6 18 18M6 18h12V6" /></svg></span></a></div>
        <div class="sc-hero-visual" aria-label="Original architectural illustration for the fictional FORME concept website" role="img"><img src="/showcase-architecture.svg" alt="" width="1200" height="1000" fetchpriority="high"><div class="sc-visual-overlay"><span>FORME / Concept direction</span><strong>Space for<br>what’s next.</strong><span>Original illustration · Fictional business</span></div><span class="sc-corner-mark" aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></div>
        <div class="sc-hero-caption"><span>DESIGN WITH INTENTION. BUILD WITH CLARITY.</span><a href="#packages">Explore the possibilities <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 4v16M5 13l7 7 7-7" /></svg></a></div>
      </div>
    </section>

    <section id="packages" class="sc-packages sc-section" aria-labelledby="sc-packages-title">
      <div class="sc-wrap">
        <div class="sc-section-label"><span>01 / Your starting point</span><span>Clear scope. Considered design.</span></div>
        <div class="sc-heading-row" data-reveal><h2 id="sc-packages-title">Three packages.<br>Zero guesswork.</h2><p>Choose the depth your business needs.<br>Not a different standard of design.</p></div>
        <div class="sc-package-grid">
          <article v-for="(item, index) in packages" :key="item.key" class="sc-package" :class="{ 'sc-package-featured': item.key === 'business' }" :aria-labelledby="`sc-plan-${item.key}`" data-reveal>
            <div class="sc-package-label"><span>0{{ index + 1 }} / Website</span><span v-if="item.key === 'business'">The fuller picture <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></div>
            <h3 :id="`sc-plan-${item.key}`">{{ item.name }}</h3><p class="sc-package-fit">{{ item.fit }}</p>
            <p class="sc-price"><span>RM</span>{{ item.price }}</p><p class="sc-price-note">Proposed starting price</p>
            <div class="sc-package-inclusions"><strong>{{ item.pages }}</strong><span>Responsive design · first-year hosting &amp; SSL</span><span>{{ item.key === 'growth' ? 'Standard CMS setup & content handover' : 'Page titles, metadata & clear navigation' }}</span></div>
            <NuxtLink :to="`/demos/${item.key}`" class="sc-package-link">Experience {{ item.name }} <span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></NuxtLink>
            <p class="sc-renewal">RM{{ item.renewal }}/year after year one<br><span>Hosting &amp; SSL renewal</span></p>
          </article>
        </div>
        <p class="sc-scope-note">Proposed prices, subject to final written scope. Domain registration is separate. Optional care: RM149/month for up to 30 minutes of small content edits, no rollover. <NuxtLink to="/packages">Full package terms <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></NuxtLink></p>
      </div>
    </section>

    <section id="experience" class="sc-experience sc-section" aria-labelledby="sc-experience-title">
      <div class="sc-wrap">
        <div class="sc-section-label"><span>02 / A working example</span><span>FORME · Fictional workplace consultancy</span></div>
        <div class="sc-heading-row" data-reveal><h2 id="sc-experience-title">Don’t imagine it.<br>Experience it.</h2><p>One fictional brand. Three complete journeys.<br>Open the demos to see exactly what<br>more pages and content control change.</p></div>
        <div class="sc-story-grid">
          <div class="sc-sticky-stage">
            <div class="sc-stage-meta"><span>FORME / {{ packages[activeChapter]?.name }}</span><span>{{ packages[activeChapter]?.number }} {{ activeChapter === 0 ? 'PAGE' : 'PAGES' }}</span></div>
            <div class="sc-browser" :class="`sc-browser-${activeChapter}`" aria-hidden="true"><div class="sc-browser-chrome"><span>● ● ●</span><span>forme.example / concept</span><span><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></div><div class="sc-browser-nav"><strong>FORME<span>·</span></strong><span>{{ activeChapter === 0 ? 'About / Expertise / Enquire' : 'About / Services / Work / Contact' }}</span></div><div class="sc-browser-hero"><span>WORKPLACE STRATEGY &amp; DESIGN</span><strong>Space for<br><em>better work.</em></strong><img src="/showcase-architecture.svg" alt="" width="1200" height="1000" loading="lazy"></div><div class="sc-browser-lower"><span>{{ activeChapter === 0 ? 'A clear beginning.' : activeChapter === 1 ? 'Thoughtfully connected.' : 'Ideas worth sharing.' }}</span><span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></div><div v-if="activeChapter === 2" class="sc-browser-cms"><span>CONTENT STUDIO / PREVIEW</span><strong>Your next idea, in your hands.</strong><div><span>Headline</span><span>Edit <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" /></svg> Preview <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" /></svg> Reset</span></div></div></div>
            <div class="sc-stage-foot"><span>Illustrated preview. Open the real demo <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" /></svg></span><div aria-hidden="true"><i v-for="(_, index) in packages" :key="index" :class="{ active: activeChapter === index }" /></div></div>
          </div>
          <div class="sc-story-chapters">
            <article v-for="(item, index) in packages" :key="item.key" class="sc-chapter" :data-chapter="index" :aria-labelledby="`chapter-${item.key}`"><span class="sc-chapter-number">{{ item.number }}<small>{{ index === 0 ? 'page' : 'pages' }}</small></span><p class="sc-small-label">The {{ item.name }} experience</p><h3 :id="`chapter-${item.key}`">{{ item.scope }}</h3><p>{{ item.detail }}</p><p class="sc-interaction">{{ item.interaction }}</p><NuxtLink :to="`/demos/${item.key}`" class="sc-inline-link">{{ item.label }} <span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></NuxtLink></article>
          </div>
        </div>
        <div class="sc-demo-disclaimer"><span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 4v13h15m-6-6 6 6-6 6" /></svg></span><p>These are illustrative concepts, not commissioned client work. All businesses, projects and content are fictional. Enquiry forms send nothing. The Growth studio is a temporary, front-end demonstration—not a production CMS or account system. Actual client CMS configuration is agreed in scope.</p></div>
      </div>
    </section>

    <section id="approach" class="sc-approach sc-section" aria-labelledby="sc-approach-title"><div class="sc-wrap"><div class="sc-section-label"><span>03 / Behind the feeling</span><span>Substance, not just surface.</span></div><div class="sc-approach-grid"><div class="sc-approach-art" data-reveal><img src="/showcase-detail.svg" width="1000" height="1200" alt="Original architectural study of light, columns and a lime sphere" loading="lazy"><span>STRUCTURE / RHYTHM / INTENTION</span></div><div class="sc-approach-copy"><h2 id="sc-approach-title" data-reveal>Built to be seen.<br><em>Made to be used.</em></h2><p class="sc-approach-intro">The impressive part is how naturally it works. A deliberate balance of visual confidence, useful content and considered engineering.</p><ol class="sc-principles"><li data-reveal><span>01</span><div><h3>A story with a clear next step.</h3><p>Content hierarchy, relevant service detail and clear enquiry paths. Designed around what your visitor needs to understand.</p></div></li><li data-reveal><span>02</span><div><h3>Motion that earns its place.</h3><p>Subtle entrances and a sticky visual narrative. Natural scrolling, no scroll hijacking, and a calmer experience when reduced motion is preferred.</p></div></li><li data-reveal><span>03</span><div><h3>Foundations beyond the fold.</h3><p>Prerendered content, descriptive metadata, semantic headings and internal links. Responsive layouts without heavy video or external runtime fonts.</p></div></li></ol><NuxtLink to="/website-development" class="sc-inline-link">Explore our website approach <span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></NuxtLink></div></div></div></section>

    <section class="sc-process sc-section" aria-labelledby="sc-process-title"><div class="sc-wrap"><div class="sc-section-label"><span>04 / How we work</span><span>A clear way forward.</span></div><div class="sc-heading-row" data-reveal><h2 id="sc-process-title">From the first conversation<br>to the final detail.</h2></div><ol class="sc-process-list"><li><span>01 — ALIGN</span><h3>Understand the business.</h3><p>Agree your audience, content, required pages and commercial scope before the build begins.</p></li><li><span>02 — SHAPE</span><h3>Make the direction tangible.</h3><p>Establish the visual language and page structure. Review the important choices together.</p></li><li><span>03 — BUILD</span><h3>Connect design and detail.</h3><p>Develop the responsive website, prepare metadata and test the agreed visitor journeys.</p></li><li><span>04 — HAND OVER</span><h3>Launch with clarity.</h3><p>Review the finished scope, confirm domain and hosting details, and agree the handover.</p></li></ol></div></section>

    <section class="sc-faq sc-section" aria-labelledby="sc-faq-title"><div class="sc-wrap sc-faq-grid"><div><p class="sc-small-label">05 / A few useful answers</p><h2 id="sc-faq-title">Good questions.<br>Straight answers.</h2><NuxtLink to="/contact" class="sc-inline-link">Ask us something else <span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></NuxtLink></div><div><details v-for="item in questions" :key="item.q"><summary>{{ item.q }}<span aria-hidden="true">+</span></summary><p>{{ item.a }}</p></details></div></div></section>

    <section class="sc-close" aria-labelledby="sc-close-title"><div class="sc-wrap"><p class="sc-small-label">A better first impression starts here.</p><h2 id="sc-close-title">Let’s make<br><em>your next move.</em></h2><div><NuxtLink class="sc-close-link" to="/contact">Tell us what you have in mind <span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></NuxtLink><p>Websites &amp; custom software.<br>For businesses in KL &amp; Selangor.</p></div></div></section>
    <footer class="sc-footer"><div class="sc-wrap"><NuxtLink to="/" class="sc-brand">rumi<span>works</span><i aria-hidden="true">.</i></NuxtLink><nav aria-label="Showcase footer"><NuxtLink to="/">Original homepage</NuxtLink><NuxtLink to="/packages">Package terms</NuxtLink><NuxtLink to="/privacy">Privacy &amp; site information</NuxtLink></nav><span>© {{ new Date().getFullYear() }} Rumi Works</span></div></footer>
  </div>
</template>
