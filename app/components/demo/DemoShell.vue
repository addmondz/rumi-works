<script setup lang="ts">
import { demoRoutes, type DemoTier } from '~/utils/demo-content'
const props = defineProps<{ tier: DemoTier }>()
const route = useRoute()
const base = computed(() => `/demos/${props.tier}`)
const packageNames = { launch: 'Launch', business: 'Business', growth: 'Growth' }
const nav = computed(() => demoRoutes[props.tier].filter(item => !['article', 'studio'].includes(item.page)))
const launchNav = [{ label: 'Approach', hash: '#approach' }, { label: 'Services', hash: '#services' }, { label: 'Concept', hash: '#work' }, { label: 'Enquire', hash: '#enquire' }]
</script>
<template>
  <div class="forme-demo" :class="`forme-demo--${tier}`">
    <div class="forme-preview-bar">
      <NuxtLink to="/showcase" class="forme-return"><span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 12H4m7-7-7 7 7 7" /></svg></span> Rumi Works / Showcase</NuxtLink>
      <span class="forme-preview-label">Fictional business · {{ packageNames[tier] }} demo</span>
      <nav aria-label="Compare package demos" class="forme-tier-nav">
        <NuxtLink v-for="(label, key) in packageNames" :key="key" :to="`/demos/${key}`" :aria-current="tier === key ? 'true' : undefined" :class="{ 'is-selected': tier === key }">{{ label }}</NuxtLink>
      </nav>
    </div>
    <header class="forme-header forme-wrap">
      <NuxtLink :to="base" class="forme-brand" aria-label="FORME demo home">FORME<span>·</span></NuxtLink>
      <span class="forme-brand-line">Spaces for<br>what comes next.</span>
      <nav aria-label="FORME concept navigation" class="forme-nav">
        <template v-if="tier === 'launch'"><a v-for="item in launchNav" :key="item.hash" :href="item.hash">{{ item.label }}</a></template>
        <template v-else><NuxtLink v-for="item in nav" :key="item.slug" :to="base + item.slug" :aria-current="route.path.replace(/\/$/, '') === base + item.slug ? 'page' : undefined">{{ item.label }}</NuxtLink></template>
      </nav>
    </header>
    <slot />
    <footer class="forme-footer">
      <div class="forme-wrap forme-footer-top"><NuxtLink :to="base" class="forme-brand">FORME<span>·</span></NuxtLink><p>A fictional workplace consultancy.<br>A real example of what your website could do.</p><NuxtLink to="/showcase#packages" class="forme-link">Compare the packages <span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></NuxtLink></div>
      <div class="forme-wrap forme-footer-bottom"><span>Concept brand & sample content. Not a real business.</span><span>No enquiries, bookings or payments are sent.</span><NuxtLink v-if="tier === 'growth'" :to="`${base}/studio`">Try the CMS preview <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></NuxtLink><NuxtLink v-else to="/contact">Discuss your Rumi Works website <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></NuxtLink></div>
    </footer>
  </div>
</template>
