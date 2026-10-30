<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const isDemo = computed(() => route.path.startsWith('/demos/'))
const customShell = computed(() => isDemo.value || route.path.replace(/\/$/, '') === '/showcase' || route.path.replace(/\/$/, '') === '/create-website')
// Derive the root class from the route so client navigation and Back/Forward
// remove homepage snapping automatically, without persistent DOM listeners.
useHead(() => ({ htmlAttrs: { class: route.path === '/' ? 'home-scroll-snap' : '' }, link: config.public.siteUrl ? [{ rel: 'canonical', href: `${config.public.siteUrl}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}` }] : [] }))
useSeoMeta({ ogSiteName: 'Rumi Works', ogType: 'website', twitterCard: 'summary', ogUrl: () => config.public.siteUrl ? `${config.public.siteUrl}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}` : undefined })
useHead(() => ({ meta: [{ name: 'robots', content: isDemo.value ? 'noindex, follow' : config.public.indexable ? 'index, follow' : 'noindex, nofollow' }] }))
</script>

<template>
  <a class="skip-link" :href="route.path.replace(/\/$/, '') === '/create-website' && route.hash.startsWith('#preview') ? '#preview-top' : '#main-content'">Skip to content</a>
  <SiteHeader v-if="!customShell" />
  <main id="main-content"><NuxtPage /></main>
  <SiteFooter v-if="!customShell" />
</template>
