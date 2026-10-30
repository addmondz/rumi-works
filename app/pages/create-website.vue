<script setup lang="ts">
import { generateWebsitePreview, normalizeGenre, validateGenre } from '~/utils/website-preview'
import type { PreviewStyle, WebsitePreview } from '~/utils/website-preview'

const route = useRoute()
const config = useRuntimeConfig()
const session = useState<{
  genre: string
  style: PreviewStyle
  preview: WebsitePreview | null
}>('instant-website-preview', () => ({ genre: '', style: 'fancy', preview: null }))
const ready = ref(false)
const error = ref('')
const editOpen = ref(false)
const genreInput = ref<HTMLInputElement | null>(null)
const previewHeading = ref<HTMLElement | null>(null)
const previewRoot = ref<HTMLElement | null>(null)
const showPreview = computed(() => route.hash.startsWith('#preview') && Boolean(session.value.preview))
const preview = computed(() => session.value.preview)
const count = computed(() => Array.from(normalizeGenre(session.value.genre)).length)
let observer: IntersectionObserver | undefined
let generation = 0

const title = 'Instant website preview — your genre, your style | Rumi Works'
const description = 'Type your business or industry, choose Fancy or Informative, and instantly explore a personalised one-page website preview. No signup needed.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, twitterTitle: title, twitterDescription: description,
  robots: () => showPreview.value ? 'noindex, nofollow' : config.public.indexable ? 'index, follow' : 'noindex, nofollow'
})

function observePreview() {
  observer?.disconnect()
  if (!previewRoot.value || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('gp-visible'); observer?.unobserve(entry.target) }
  }), { threshold: 0.12 })
  previewRoot.value.querySelectorAll('[data-preview-reveal]').forEach(element => observer?.observe(element))
}

async function generate() {
  const current = ++generation
  error.value = validateGenre(session.value.genre) || ''
  if (error.value) { genreInput.value?.focus(); return }
  session.value.genre = normalizeGenre(session.value.genre)
  session.value.preview = generateWebsitePreview(session.value.genre, session.value.style)
  editOpen.value = false
  await navigateTo({ path: '/create-website', hash: '#preview' })
  await nextTick()
  if (current !== generation || !showPreview.value) return
  previewHeading.value?.focus({ preventScroll: true })
  window.scrollTo({ top: 0, behavior: 'instant' })
  observePreview()
}

async function editChoices() {
  generation++
  await navigateTo({ path: '/create-website', hash: '#edit' })
}

async function reset() {
  generation++
  session.value = { genre: '', style: 'fancy', preview: null }
  editOpen.value = false
  error.value = ''
  await navigateTo({ path: '/create-website', hash: '' }, { replace: true })
  await nextTick()
  genreInput.value?.focus()
}

watch(showPreview, async (showing) => {
  editOpen.value = false
  observer?.disconnect()
  await nextTick()
  if (showing) { previewHeading.value?.focus({ preventScroll: true }); observePreview() }
  else if (ready.value) genreInput.value?.focus({ preventScroll: true })
})
onMounted(() => { ready.value = true; if (showPreview.value) observePreview() })
onBeforeUnmount(() => { generation++; observer?.disconnect() })
</script>

<template>
  <div class="generator-page">
    <header class="gw-header">
      <NuxtLink to="/" class="gw-brand" aria-label="Rumi Works home">rumi<span>works</span><i>.</i></NuxtLink>
      <span class="gw-header-label">THE WEBSITE PREVIEW STUDIO</span>
      <NuxtLink to="/showcase" class="gw-exit">Explore our work <span aria-hidden="true"><GeneratorArrow /></span></NuxtLink>
    </header>

    <div v-if="!showPreview" id="preview-top" class="gw-start">
      <div class="gw-intro">
        <p class="gw-kicker"><span /> YOUR IDEA. A LITTLE MORE REAL.</p>
        <h1>Your business.<br>A <em>first look.</em></h1>
        <p class="gw-lead">Tell us what you do. Pick a direction.<br>See your website take shape, instantly.</p>
        <div class="gw-sample" aria-hidden="true">
          <div class="gw-sample-top"><span>YOUR NEXT CHAPTER</span><span><GeneratorArrow /></span></div>
          <div class="gw-sample-content"><div><span>A little<br>possibility.</span><i>Made for your kind of business.</i><b>Explore the idea <GeneratorArrow /></b></div><GeneratorPreviewArt kind="botanical" /></div>
          <div class="gw-sample-foot"><span>ONE IDEA. YOUR OWN DIRECTION.</span><span>01 — 02</span></div>
        </div>
        <p class="gw-sample-caption">A starting point to make your own. Not a finished website.</p>
      </div>

      <form class="gw-form" novalidate @submit.prevent="generate">
        <div class="gw-form-heading"><span>LET’S MAKE IT TANGIBLE</span><span aria-hidden="true"><GeneratorArrow /></span></div>
        <label for="website-genre" class="gw-label"><span>01</span> What do you do?</label>
        <input id="website-genre" ref="genreInput" v-model="session.genre" type="text" autocomplete="off" autocapitalize="sentences" placeholder="e.g. café, interior design, dog grooming" :aria-invalid="Boolean(error)" :aria-describedby="error ? 'genre-help genre-error' : 'genre-help'" @input="error = ''">
        <div id="genre-help" class="gw-input-help"><span>Your business or industry. Any genre is welcome.</span><span :class="{ 'gw-over-limit': count > 80 }">{{ count }} / 80</span></div>
        <p v-if="error" id="genre-error" class="gw-error" role="alert">{{ error }}</p>

        <fieldset class="gw-focus">
          <legend class="gw-label"><span>02</span> What’s the focus?</legend>
          <div class="gw-style-options">
            <label class="gw-style" :class="{ 'gw-selected': session.style === 'fancy' }">
              <input v-model="session.style" type="radio" name="website-focus" value="fancy">
              <span class="gw-style-art gw-style-art-fancy" aria-hidden="true"><i>A bold<br>first look.</i><b><GeneratorSpark /></b></span>
              <span class="gw-style-name">Fancy <span aria-hidden="true">{{ session.style === 'fancy' ? '●' : '○' }}</span></span>
              <span class="gw-style-description">Expressive. Visual.<br>Made to catch the eye.</span>
            </label>
            <label class="gw-style" :class="{ 'gw-selected': session.style === 'informative' }">
              <input v-model="session.style" type="radio" name="website-focus" value="informative">
              <span class="gw-style-art gw-style-art-info" aria-hidden="true"><i>A clear<br>way forward.</i><b><span /><span /><span /></b></span>
              <span class="gw-style-name">Informative <span aria-hidden="true">{{ session.style === 'informative' ? '●' : '○' }}</span></span>
              <span class="gw-style-description">Clear. Considered.<br>Built to explain what you do.</span>
            </label>
          </div>
        </fieldset>
        <button class="gw-generate" type="submit" :disabled="!ready">Generate website <span aria-hidden="true"><GeneratorArrow /></span></button>
        <p class="gw-form-note">No signup. No waiting. Just a website preview.</p>
        <p class="gw-privacy">Template-based, not AI-generated. Your input stays in this tab’s memory; refreshing clears it. Nothing is published or sent.</p>
        <noscript><p class="gw-nojs">This interactive preview needs JavaScript. You can still <a href="/showcase">explore our website showcase</a> and <a href="/packages">compare packages</a> without it.</p></noscript>
      </form>
      <div class="gw-bottom-line"><span>A SMALL START. A WHOLE NEW POSSIBILITY.</span><NuxtLink to="/packages">Already have a direction? Explore packages <span aria-hidden="true"><GeneratorArrow /></span></NuxtLink></div>
    </div>

    <div v-else-if="preview" class="gw-result">
      <div class="gw-toolbar">
        <div><strong>Your website preview</strong><span>{{ preview.style === 'fancy' ? 'Fancy' : 'Informative' }} direction · Draft content</span></div>
        <div class="gw-toolbar-actions"><button type="button" @click="editChoices">Edit genre / style</button><button type="button" :aria-expanded="editOpen" aria-controls="preview-editor" @click="editOpen = !editOpen">{{ editOpen ? 'Close text editor' : 'Edit preview text' }}</button><button type="button" @click="reset">Start over</button></div>
      </div>
      <div v-if="editOpen" id="preview-editor" class="gw-editor">
        <h2>Make the words yours.</h2><p>Edits appear immediately. They stay in this tab only. Generating again replaces these edits.</p>
        <div class="gw-editor-grid">
          <label>Business name<input v-model="preview.brand" maxlength="60" type="text"></label>
          <label>Headline<input v-model="preview.headline" maxlength="140" type="text"></label>
          <label>Introduction<textarea v-model="preview.intro" maxlength="350" rows="3" /></label>
          <label>About heading<input v-model="preview.aboutTitle" maxlength="100" type="text"></label>
          <label class="gw-editor-wide">About your business<textarea v-model="preview.about" maxlength="600" rows="3" /></label>
          <template v-for="(service, index) in preview.services" :key="index"><label>Offer {{ index + 1 }} title<input v-model="service.title" maxlength="80" type="text"></label><label>Offer {{ index + 1 }} description<textarea v-model="service.description" maxlength="300" rows="2" /></label></template>
          <label>Next-step heading<input v-model="preview.ctaTitle" maxlength="100" type="text"></label>
          <label>Next-step text<textarea v-model="preview.ctaText" maxlength="300" rows="2" /></label>
        </div>
      </div>
      <p class="gw-draft-note">A template-based starting point for <strong>{{ preview.genre }}</strong>. All copy and illustrations are draft placeholders, not verified business facts. Nothing here is live.</p>

      <article id="preview-top" ref="previewRoot" class="generated-preview" :class="[`gp-${preview.style}`, `gp-palette-${preview.palette}`]" aria-label="Your generated website preview">
        <header class="gp-nav gp-wrap"><a href="#preview-top" class="gp-brand">{{ preview.brand }}<span aria-hidden="true">.</span></a><nav aria-label="Preview website"><a href="#preview-about">About</a><a href="#preview-services">{{ preview.style === 'fancy' ? 'Explore' : 'What we do' }}</a><a href="#preview-contact">Let’s talk <span aria-hidden="true"><GeneratorArrow /></span></a></nav></header>
        <section class="gp-hero gp-wrap">
          <div class="gp-hero-copy"><p class="gp-eyebrow">{{ preview.genre }}</p><h1 ref="previewHeading" tabindex="-1">{{ preview.headline }}</h1><p class="gp-intro">{{ preview.intro }}</p><a class="gp-button" href="#preview-services">{{ preview.style === 'fancy' ? 'Discover the possibilities' : 'Explore what we do' }} <span aria-hidden="true"><GeneratorArrow /></span></a><span class="gp-hero-footnote">{{ preview.eyebrow }}</span></div>
          <figure class="gp-hero-art"><GeneratorPreviewArt :kind="preview.art" /><figcaption>ILLUSTRATIVE DIRECTION <span>MADE TO BE YOURS <GeneratorArrow /></span></figcaption></figure>
        </section>
        <div class="gp-divider gp-wrap"><span>{{ preview.style === 'fancy' ? 'A DIFFERENT POINT OF VIEW.' : 'GET TO KNOW YOUR NEXT STEP.' }}</span><span aria-hidden="true"><GeneratorArrow class="gw-arrow-down" /></span></div>
        <section id="preview-services" class="gp-services gp-wrap" data-preview-reveal>
          <div class="gp-section-heading"><p class="gp-eyebrow">01 / WHAT WE DO</p><h2>{{ preview.style === 'fancy' ? 'Good things, thoughtfully made.' : 'The right place to begin.' }}</h2><p>Suggested offers for your {{ preview.genre }} website. Edit these to match what you actually provide.</p></div>
          <div class="gp-service-list"><article v-for="(service, index) in preview.services" :key="index"><span class="gp-service-number">0{{ index + 1 }}</span><div><h3>{{ service.title }}</h3><p>{{ service.description }}</p></div><a href="#preview-contact" :aria-label="`Discuss ${service.title}`"><span aria-hidden="true"><GeneratorArrow /></span></a></article></div>
        </section>
        <section id="preview-about" class="gp-about" data-preview-reveal><div class="gp-wrap gp-about-grid"><div class="gp-about-mark" aria-hidden="true"><span><GeneratorSpark /></span><small>ROOM FOR YOUR STORY.</small></div><div><p class="gp-eyebrow">02 / A LITTLE ABOUT US</p><h2>{{ preview.aboutTitle }}</h2><p>{{ preview.about }}</p><a class="gp-text-link" href="#preview-contact">Let’s start a conversation <span aria-hidden="true"><GeneratorArrow /></span></a></div></div></section>
        <section id="preview-contact" class="gp-contact gp-wrap" data-preview-reveal><p class="gp-eyebrow">03 / THE NEXT CHAPTER</p><h2>{{ preview.ctaTitle }}</h2><p>{{ preview.ctaText }}</p><div class="gp-contact-placeholder"><span aria-hidden="true"><GeneratorArrow /></span><div><strong>Your contact details go here.</strong><span>Add your real email, phone or booking link before launch. No messages can be sent from this preview.</span></div></div></section>
        <footer class="gp-footer gp-wrap"><span>{{ preview.brand }}</span><span>{{ preview.genre }} · Website concept</span><a href="#preview-top">Back to top <GeneratorArrow /></a></footer>
      </article>
      <div class="gw-next"><div><p class="gw-kicker">LIKE WHERE THIS IS GOING?</p><h2>Make the first look<br>your next chapter.</h2><p>This is a preview, not a published website. A real build starts with your content and an agreed scope.</p></div><NuxtLink to="/contact" class="gw-generate">Talk to Rumi Works <span aria-hidden="true"><GeneratorArrow /></span></NuxtLink></div>
    </div>
    <footer class="gw-footer"><span>Rumi Works · A little possibility, made practical.</span><NuxtLink to="/privacy">Privacy &amp; site information</NuxtLink></footer>
  </div>
</template>
