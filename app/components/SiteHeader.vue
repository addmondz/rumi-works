<script setup lang="ts">
const route = useRoute()
const open = ref(false)
const toggle = ref<HTMLButtonElement | null>(null)
const links = [
  { label: 'Websites', to: '/website-development' },
  { label: 'Software', to: '/custom-software' },
  { label: 'Our approach', to: '/work' },
  { label: 'Packages', to: '/packages' },
  { label: 'About', to: '/about' },
  { label: 'Showcase', to: '/showcase' }
]
watch(() => route.path, () => { open.value = false })
function closeMenu() { open.value = false; toggle.value?.focus() }
</script>
<template>
  <header class="site-header" @keydown.esc="closeMenu">
    <div class="container nav-bar">
      <NuxtLink to="/" class="brand" aria-label="Rumi Works home"><svg viewBox="0 0 34 34" aria-hidden="true"><path d="M2 2h10v30H2zM16 2h11v12H16zM16 20h16v12H16z" fill="currentColor" /></svg><span>rumi<span class="brand-light">works</span><span class="brand-dot">.</span></span></NuxtLink>
      <nav class="desktop-nav" aria-label="Main navigation"><NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink></nav>
      <NuxtLink class="button button-dark header-cta" to="/create-website">Try your website <span aria-hidden="true">↗</span></NuxtLink>
      <button ref="toggle" class="menu-toggle" :aria-expanded="open" aria-controls="mobile-navigation" :aria-label="open ? 'Close navigation' : 'Open navigation'" @click="open = !open"><span>{{ open ? 'Close' : 'Menu' }}</span><span aria-hidden="true">{{ open ? '×' : '☰' }}</span></button>
    </div>
    <nav v-if="open" id="mobile-navigation" class="mobile-nav container" aria-label="Mobile navigation"><NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }} <span aria-hidden="true">↗</span></NuxtLink><NuxtLink to="/create-website">Try your website <span aria-hidden="true">↗</span></NuxtLink></nav>
  </header>
</template>
