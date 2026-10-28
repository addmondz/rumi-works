<script setup lang="ts">
useSeoMeta({
  title: 'Custom software for business workflows | Rumi Works',
  description: 'Explore practical custom software for SME workflows: customer portals, internal dashboards, and connected business processes. Scope first, build with purpose.',
})
</script>

<template>
  <div>
    <section class="page-hero container">
      <p class="eyebrow">02 / Custom software</p>
      <h1 class="display-title">Less busywork.<br><span class="text-green">More business.</span></h1>
      <p class="lead">When spreadsheets and disconnected tools start getting in the way, build a simpler way to work.</p>
      <NuxtLink class="button button-dark" to="/contact">Talk through a workflow <span aria-hidden="true">↗</span></NuxtLink>
    </section>

    <section class="section container">
      <div class="section-heading"><p class="section-kicker">Start with the problem</p><h2>Useful software.<br>Not software for its own sake.</h2></div>
      <div class="three-col">
        <article class="info-card"><span class="card-number">01</span><h3>Internal dashboards</h3><p>Bring the information your team needs into one place, with clear views of work, statuses, and next actions.</p><p class="small-note">Possible uses: job tracking, approvals, reporting.</p></article>
        <article class="info-card"><span class="card-number">02</span><h3>Customer portals</h3><p>Give customers a dedicated place to view agreed information or make requests without another long message thread.</p><p class="small-note">Possible uses: project updates, requests, documents.</p></article>
        <article class="info-card"><span class="card-number">03</span><h3>Connected workflows</h3><p>Explore where an integration or a small automation could reduce repeated data entry and avoidable handoffs.</p><p class="small-note">Feasibility depends on third-party systems and access.</p></article>
      </div>
    </section>

    <section class="section container">
      <div class="two-col">
        <div><p class="section-kicker">Right-sized from day one</p><h2>Build the useful part first.</h2><p class="lead">You do not need to replace every tool at once. Start with one defined workflow and a small, testable release.</p></div>
        <ol class="numbered-list">
          <li><div><h3>Map the current process</h3><p>Who does what, which tools are involved, where work slows down, and what needs to stay the same.</p></div></li>
          <li><div><h3>Choose the smallest useful scope</h3><p>Agree the core users, essential features, acceptance criteria, and a practical first version.</p></div></li>
          <li><div><h3>Build and validate</h3><p>Test with representative workflows and sample data before a separately agreed production rollout.</p></div></li>
          <li><div><h3>Plan for ownership</h3><p>Clarify access, support, backups, third-party costs, and future changes before handover.</p></div></li>
        </ol>
      </div>
    </section>

    <section class="section container">
      <div class="callout"><div><p class="section-kicker">Scope before price</p><h2>Your workflow is unique.<br>Your quote should be, too.</h2><p>Custom software is quoted separately from website packages. Features, permissions, integrations, data migration, and ongoing hosting all affect the scope.</p></div><NuxtLink class="button button-dark" to="/contact">Describe your idea <span aria-hidden="true">↗</span></NuxtLink></div>
    </section>

    <section class="section container">
      <div class="section-heading"><p class="section-kicker">Good questions</p><h2>Before we build anything.</h2></div>
      <div class="faq-grid">
        <details><summary>Do I definitely need custom software?</summary><p>Not always. An existing tool, a better setup, or a simpler process may be a better fit. The first conversation should establish the problem, not assume the solution.</p></details>
        <details><summary>Can it connect to our current tools?</summary><p>Potentially. We would first check the available APIs, account permissions, data formats, vendor terms, and integration costs. An integration is only included when it is explicitly scoped.</p></details>
        <details><summary>What about sensitive information?</summary><p>Data sensitivity, access controls, retention, backups, and any compliance requirements need to be identified during discovery. Avoid sharing production credentials or confidential customer data in an initial brief.</p></details>
        <details><summary>What happens after launch?</summary><p>Support, maintenance, hosting, and future development are agreed separately. The website edit plan does not include custom-software support.</p></details>
      </div>
    </section>
    <SiteCta />
  </div>
</template>
