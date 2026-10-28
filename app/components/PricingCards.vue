<script setup lang="ts">
const packages = [
  { name: 'Launch', price: '990', description: 'A focused first impression.', pages: '1 page · up to 6 sections', renewal: '499', features: ['Mobile-friendly design', 'Clear enquiry call-to-actions', 'Basic page titles & metadata', 'Your content, neatly presented'], key: 'launch' },
  { name: 'Business', price: '2,490', description: 'Room to tell your whole story.', pages: 'Up to 5 pages', renewal: '699', features: ['Everything in Launch', 'Dedicated service pages', 'Thoughtful site navigation', 'A structure ready to grow'], key: 'business' },
  { name: 'Growth', price: '4,490', description: 'More content. More control.', pages: 'Up to 8 pages · standard CMS', renewal: '999', features: ['Everything in Business', 'Standard CMS setup', 'Edit agreed content yourself', 'Content handover guidance'], key: 'growth' }
]
</script>
<template>
  <div class="pricing-grid">
    <article v-for="(item, index) in packages" :key="item.key" class="price-card" :class="{ 'price-card-featured': item.key === 'business' }" :aria-labelledby="`plan-${item.key}`">
      <div class="price-card-top">
        <span class="eyebrow">WEBSITE PACKAGE / 0{{ index + 1 }}</span>
        <span v-if="item.key === 'business'" class="recommended-badge">Recommended</span>
      </div>
      <h3 :id="`plan-${item.key}`" class="package-name">{{ item.name }}</h3>
      <p class="package-description">{{ item.description }}</p>
      <p class="package-price"><span>RM</span> {{ item.price }}</p>
      <p class="price-context">Proposed starting price</p>
      <div class="package-size">{{ item.pages }}</div>
      <ul class="check-list"><li v-for="feature in item.features" :key="feature">{{ feature }}</li></ul>
      <NuxtLink class="button" :class="item.key === 'business' ? 'button-light' : 'button-dark'" :to="`/contact?package=${item.key}`">Explore {{ item.name }} <span aria-hidden="true">↗</span></NuxtLink>
      <p class="renewal"><strong>RM{{ item.renewal }}/year after year one</strong><span>Hosting &amp; SSL renewal</span></p>
    </article>
  </div>
  <p class="pricing-note">Proposed starting prices, subject to final scope. First-year hosting &amp; SSL included. Domain registration is separate.</p>
</template>
