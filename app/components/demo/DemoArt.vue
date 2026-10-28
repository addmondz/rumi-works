<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'atrium' | 'studio' | 'courtyard'; caption?: string }>(), { variant: 'atrium', caption: 'Original architectural illustration · concept only' })
</script>
<template>
  <figure class="forme-art" :class="`forme-art--${variant}`">
    <div class="forme-art-scene" aria-hidden="true">
      <div class="forme-sun"></div><div class="forme-wall forme-wall-back"></div><div class="forme-wall forme-wall-side"></div>
      <div class="forme-window"></div><div class="forme-plinth forme-plinth-one"></div><div class="forme-plinth forme-plinth-two"></div>
      <div class="forme-sphere"></div><div class="forme-floor-lines"></div><div class="forme-tree"><i></i><i></i><i></i></div>
      <span class="forme-art-cross">+</span><span class="forme-art-coordinate">F / 01 — SPACE STUDY</span>
    </div>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>
