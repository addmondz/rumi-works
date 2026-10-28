<script setup lang="ts">
useSeoMeta({
  title: 'Website development for KL & Selangor businesses | Rumi Works',
  description: 'Thoughtful, mobile-friendly business websites for SMEs in Kuala Lumpur and Selangor. Explore proposed packages, what is included, and how the project works.',
})
</script>

<template>
  <div>
    <section class="page-hero container">
      <p class="eyebrow">01 / Website development</p>
      <h1 class="display-title">A better first<br>impression.<br><span class="text-green">A clearer next step.</span></h1>
      <p class="lead">Give your business a home that explains what you do, feels good on a phone, and makes getting in touch simple.</p>
      <NuxtLink class="button button-dark" to="/contact">Let's plan your website <span aria-hidden="true">↗</span></NuxtLink>
    </section>

    <section class="section container" aria-labelledby="website-purpose">
      <div class="section-heading">
        <p class="section-kicker">Built around your business</p>
        <h2 id="website-purpose">Not just a website.<br>A useful part of your day.</h2>
      </div>
      <div class="three-col">
        <article class="info-card"><span class="card-number">01</span><h3>Make your offer clear</h3><p>Turn your services, strengths, and frequently asked questions into a straightforward story people can understand.</p></article>
        <article class="info-card"><span class="card-number">02</span><h3>Make enquiries easier</h3><p>Guide visitors to the right next step, whether that is a WhatsApp conversation, an email, or a scoped enquiry form.</p></article>
        <article class="info-card"><span class="card-number">03</span><h3>Make room to grow</h3><p>Start with the pages you need. Add content, new services, or a separately scoped integration when the business is ready.</p></article>
      </div>
    </section>

    <section class="section container">
      <div class="two-col">
        <div><p class="section-kicker">The essentials, considered</p><h2>Small details.<br>A better experience.</h2><p class="lead">A good business website should be clear, usable, and manageable—not a pile of features you do not need.</p></div>
        <ul class="check-list">
          <li><strong>Responsive layouts</strong><span>Designed for the phones, tablets, and laptops your visitors use.</span></li>
          <li><strong>Clear content structure</strong><span>Meaningful headings, readable pages, and deliberate calls to action.</span></li>
          <li><strong>Search-ready foundations</strong><span>Page titles, descriptions, and sensible indexing setup. No ranking guarantees.</span></li>
          <li><strong>Practical handover</strong><span>Agreed access, editing guidance where applicable, and a documented renewal plan.</span></li>
        </ul>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading"><p class="section-kicker">A straightforward process</p><h2>Know what happens next.</h2></div>
      <ol class="numbered-list">
        <li><div><h3>Get the brief right</h3><p>Discuss your business, audience, must-have pages, existing content, and what a useful enquiry looks like.</p></div></li>
        <li><div><h3>Agree the scope</h3><p>Confirm the deliverables, responsibilities, review rounds, schedule, and fixed project quote before work begins.</p></div></li>
        <li><div><h3>Design, build, review</h3><p>Bring the structure to life, review it together, and test the agreed pages and interactions across screen sizes.</p></div></li>
        <li><div><h3>Prepare for launch</h3><p>Check the domain, real contact details, approved content, privacy information, and handover before publication.</p></div></li>
      </ol>
    </section>

    <section class="section container">
      <div class="callout"><div><p class="section-kicker">A sensible starting point</p><h2>Website packages<br>from a proposed RM990.</h2><p>From a focused single page to a content-managed business website. Final pricing depends on the agreed scope.</p></div><NuxtLink class="button button-dark" to="/packages">Compare packages <span aria-hidden="true">↗</span></NuxtLink></div>
    </section>
    <SiteCta />
  </div>
</template>
