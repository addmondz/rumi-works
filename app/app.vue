<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
useHead(() => ({ link: config.public.siteUrl ? [{ rel: 'canonical', href: `${config.public.siteUrl}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}` }] : [] }))
useSeoMeta({ ogSiteName: 'Rumi Works', ogType: 'website', twitterCard: 'summary' })
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <SiteHeader />
  <main id="main-content"><NuxtPage /></main>
  <SiteFooter />
</template>
