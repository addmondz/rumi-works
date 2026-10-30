<script setup lang="ts">
useSeoMeta({
  title: 'Privacy information — launch draft | Rumi Works',
  description: 'How this website preview handles your enquiry brief and contact links, and what needs to be confirmed before production launch.',
})
</script>

<template>
  <div>
    <section class="page-hero container">
      <p class="eyebrow">Privacy information · Launch draft</p>
      <h1 class="display-title">Your information.<br><span class="text-green">No guesswork.</span></h1>
      <p class="lead">This page explains the current website implementation. It is a draft that the business owner must complete and review before launch.</p>
    </section>
    <section class="section container prose article-body">
      <h2>The enquiry brief stays in your browser</h2>
      <p>The contact page helps you prepare a project brief. There is no enquiry submission service in this website. Entering information into that tool does not send it to Rumi Works.</p>
      <p>If you choose to copy the brief, your browser places it on your device's clipboard. Avoid including passwords, financial account details, confidential business records, or other sensitive information.</p>
      <h2>Your website preview is temporary</h2>
      <p>The instant website preview uses local templates. Your business genre and text edits stay in memory in the current browser tab; they are not added to the page URL, sent to an AI service, saved to an account, or published. They can remain while you navigate within this site, but refreshing or closing the tab clears them. Start over clears the current draft. The preview does not send contact enquiries.</p>
      <h2>Email and WhatsApp are separate services</h2>
      <p>When configured, contact links can open your email application or WhatsApp. Those services have their own privacy terms. Review the recipient and message before choosing to send. Opening a link is not confirmation that a message has been delivered.</p>
      <p>Until genuine contact details are configured, the site displays hello@rumiworks.example and +60 XX-XXX XXXX as clearly labelled, inactive placeholders. Email and WhatsApp sending stay disabled. The brief tool never simulates a submission.</p>
      <h2>Analytics and cookies</h2>
      <p>No analytics, advertising trackers, or marketing cookies have been intentionally added to this implementation. The final hosting platform and any future integrations must be checked before the production privacy information is approved.</p>
      <h2>Hosting and technical information</h2>
      <p>The eventual hosting provider may process technical information such as IP addresses, requested pages, and access logs to deliver and protect the site. The provider, log retention, and related handling have not yet been confirmed for this preview.</p>
      <h2>Before production launch</h2>
      <p>The business owner needs to confirm the operating entity, a genuine privacy contact, hosting arrangements, any third-party processors, retention practices, and the process for handling privacy requests. This draft does not replace a completed privacy policy or a review of applicable requirements.</p>
      <p><NuxtLink class="text-link" to="/contact">Go to the contact page <span aria-hidden="true">↗</span></NuxtLink></p>
    </section>
  </div>
</template>
