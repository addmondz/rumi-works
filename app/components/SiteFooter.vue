<template>
  <footer class="site-footer">
    <div class="container footer-top">
      <div><NuxtLink to="/" class="brand footer-brand">rumi<span class="brand-light">works</span><span class="brand-dot">.</span></NuxtLink><p>Good ideas. Thoughtfully built.<br>For businesses in KL &amp; Selangor.</p></div>
      <div class="footer-links"><span class="eyebrow">What we do</span><NuxtLink to="/website-development">Website development</NuxtLink><NuxtLink to="/custom-software">Custom software</NuxtLink><NuxtLink to="/packages">Packages &amp; pricing</NuxtLink></div>
      <div class="footer-links"><span class="eyebrow">Get to know us</span><NuxtLink to="/work">Concept work</NuxtLink><NuxtLink to="/about">About Rumi Works</NuxtLink><NuxtLink to="/insights">Insights</NuxtLink><NuxtLink to="/contact">Start a conversation ↗</NuxtLink></div>
    </div>
    <div class="container footer-bottom"><span>© {{ new Date().getFullYear() }} Rumi Works. Built with intention.</span><NuxtLink to="/privacy">Privacy &amp; site information</NuxtLink><span class="footer-location"><span class="status-dot" /> Kuala Lumpur · Selangor</span></div>
  </footer>
</template>
