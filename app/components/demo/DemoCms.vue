<script setup lang="ts">
import { cleanDemoContent, demoDefaults, validateDemoContent, type DemoContent } from '~/utils/demo-content'
const ready = ref(false)
onMounted(() => { ready.value = true })
const content = useState<DemoContent>('forme-growth-demo-content', () => ({ ...demoDefaults }))
const draft = reactive({ ...content.value })
const status = ref('')
const invalid = ref(false)
function applyPreview() {
  const error = validateDemoContent(draft)
  invalid.value = Boolean(error)
  if (error) { status.value = error; return }
  content.value = cleanDemoContent(draft)
  status.value = 'Preview updated in this browser session. Nothing has been published or saved to a server.'
}
function resetPreview() {
  content.value = { ...demoDefaults }
  Object.assign(draft, demoDefaults)
  invalid.value = false
  status.value = 'The original sample content is restored.'
}
</script>
<template>
  <section class="forme-cms-grid forme-wrap forme-section">
    <div class="forme-cms-intro"><p class="forme-kicker">An interactive content preview</p><h2>Your words.<br>Your next chapter.</h2><p>Edit the sample headline and article below, then follow the links to see your changes on the Growth demo. They remain only in this browser tab’s app memory and disappear on a full reload.</p><p>This is a frontend illustration, not an installed CMS, login or publishing system. A standard CMS setup is included in the proposed Growth package; the actual setup, permissions and any additional integrations are agreed in your quotation.</p><ol class="forme-cms-steps"><li>Edit the sample text.</li><li>Apply your preview.</li><li>Visit the homepage or journal.</li><li>Reset whenever you like.</li></ol></div>
    <div class="forme-editor"><div class="forme-editor-heading"><span class="forme-editor-dot"></span> FORME / Content studio <span>DEMO</span></div><form @submit.prevent="applyPreview"><p class="forme-form-notice">No account. No server. No publishing.</p><noscript><p class="forme-form-notice">Enable JavaScript to try temporary content edits. No changes can be submitted without it.</p></noscript><label for="cms-headline">Homepage headline <span>70 characters maximum</span></label><textarea id="cms-headline" v-model="draft.headline" rows="2" maxlength="70" required></textarea><label for="cms-article">Article title <span>100 characters maximum</span></label><textarea id="cms-article" v-model="draft.articleTitle" rows="2" maxlength="100" required></textarea><label for="cms-excerpt">Article summary <span>240 characters maximum</span></label><textarea id="cms-excerpt" v-model="draft.articleExcerpt" rows="4" maxlength="240" required></textarea><div class="forme-form-actions"><button type="submit" class="forme-button" :disabled="!ready">Apply preview <span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></button><button type="button" class="forme-reset" @click="resetPreview">Reset sample content</button></div><p v-if="status" class="forme-cms-status" :class="{ 'is-error': invalid }" role="status" aria-live="polite">{{ status }}</p></form><div class="forme-editor-links"><NuxtLink to="/demos/growth">View homepage <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></NuxtLink><NuxtLink to="/demos/growth/insights">View journal <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></NuxtLink><NuxtLink to="/demos/growth/insights/a-better-workplace-brief">View article <svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></NuxtLink></div></div>
  </section>
</template>
