<script setup lang="ts">
useSeoMeta({
  title: 'Website packages & transparent pricing | Rumi Works',
  description: 'Compare proposed Rumi Works website packages from RM990, RM2490, and RM4490. See page limits, first-year hosting, annual renewals, and optional editing support.',
})
</script>

<template>
  <div>
    <section class="page-hero container">
      <p class="eyebrow">Website packages</p>
      <h1 class="display-title">A clear start.<br><span class="text-green">Room to grow.</span></h1>
      <p class="lead">Choose the scale that fits your business today. Every project starts with an agreed scope—not an unexpected invoice.</p>
      <p class="small-note">Proposed package pricing in Malaysian ringgit. Final pricing, deliverables, and timeline are confirmed in your quotation.</p>
    </section>

    <section class="container pricing-section" aria-label="Compare proposed website packages"><PricingCards /></section>

    <section class="section container">
      <div class="two-col">
        <div><p class="section-kicker">Included in every package</p><h2>The foundations,<br>without the guesswork.</h2></div>
        <ul class="check-list">
          <li><strong>Responsive website</strong><span>Layouts adapted for desktop, tablet, and mobile.</span></li>
          <li><strong>First-year hosting and SSL</strong><span>Included for the agreed website setup. Domain registration is separate.</span></li>
          <li><strong>Basic search setup</strong><span>Page titles, descriptions, and indexing foundations. Search rankings are not guaranteed.</span></li>
          <li><strong>Agreed handover</strong><span>A clear record of included deliverables, access, and renewal responsibilities.</span></li>
        </ul>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading"><p class="section-kicker">Plan beyond launch</p><h2>Know the ongoing costs.</h2></div>
      <div class="three-col">
        <article class="info-card"><p class="eyebrow">Annual renewal</p><h3>RM499 / RM699 / RM999</h3><p>Proposed annual hosting and SSL renewal for the one-page, up-to-five-page, and up-to-eight-page packages respectively, after the included first year.</p><p class="small-note">Domain renewal and third-party subscriptions are separate.</p></article>
        <article class="info-card"><p class="eyebrow">Optional website care</p><h3>RM149 / month</h3><p>Up to 30 minutes of small website content edits each month. Unused time does not roll over.</p><p class="small-note">New pages, redesigns, new features, and custom-software support are not included.</p></article>
        <article class="info-card"><p class="eyebrow">Payment structure</p><h3>Two clear milestones</h3><p>Proposed terms: 50% to begin after the scope is agreed, and 50% after the agreed build is approved, before launch or final handover.</p><p class="small-note">Milestone acceptance and payment terms are recorded in the quotation.</p></article>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading"><p class="section-kicker">Before you choose</p><h2>The small print,<br>in plain language.</h2></div>
      <div class="faq-grid">
        <details open><summary>What counts as a page or section?</summary><p>A page is a distinct website URL, such as About or Services. A section is a content block within a page, such as the introduction, services, or FAQ. The RM990 proposal covers one page with up to six sections.</p></details>
        <details><summary>What does standard CMS mean?</summary><p>The RM4490 proposal includes a standard content-management setup for agreed content. The platform, editable fields, access, hosting requirements, and any licence costs are confirmed during scoping. Bespoke dashboards and workflows are not a standard CMS.</p></details>
        <details><summary>Do you provide the content and domain?</summary><p>Domain registration and renewal are separate. You provide approved business information, images, and core copy unless writing or asset sourcing is specifically included in the quote. Brand design, photography, and translations are separately scoped.</p></details>
        <details><summary>Can I add booking, payments, or ecommerce?</summary><p>These need a separate scope. Payment gateways, online stores, booking systems, integrations, data migration, and third-party subscription fees are not included by default.</p></details>
        <details><summary>How long does a project take?</summary><p>A schedule is agreed after reviewing the scope, content readiness, dependencies, and approval process. Package pricing alone does not promise a delivery date.</p></details>
        <details><summary>Are these final prices?</summary><p>No. They are proposed starting packages, subject to final scope and a written quotation. The quotation should confirm any applicable taxes, third-party fees, and additional work before you commit.</p></details>
      </div>
      <NuxtLink class="text-link" to="/insights/website-cost-malaysia">Read the website budgeting guide <span aria-hidden="true">↗</span></NuxtLink>
    </section>
    <SiteCta />
  </div>
</template>
