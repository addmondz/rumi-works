<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
// Derive the root class from the route so client navigation and Back/Forward
// remove homepage snapping automatically, without persistent DOM listeners.
useHead(() => ({ htmlAttrs: { class: route.path === '/' ? 'home-scroll-snap' : '' }, link: config.public.siteUrl ? [{ rel: 'canonical', href: `${config.public.siteUrl}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}` }] : [] }))
useSeoMeta({ ogSiteName: 'Rumi Works', ogType: 'website', twitterCard: 'summary' })
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <SiteHeader />
  <main id="main-content"><NuxtPage /></main>
  <SiteFooter />
</template>
