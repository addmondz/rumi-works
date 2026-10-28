<script setup lang="ts">
import { createDemoBrief } from '~/utils/demo-content'
const ready = ref(false)
onMounted(() => { ready.value = true })
const name = ref('')
const focus = ref('Workplace strategy')
const message = ref('')
const preview = ref('')
function buildPreview() { preview.value = createDemoBrief(name.value, focus.value, message.value) }
function reset() { name.value = ''; focus.value = 'Workplace strategy'; message.value = ''; preview.value = '' }
</script>
<template>
  <div class="forme-contact-grid">
    <div><p class="forme-kicker">Let’s make space</p><h2>A good project starts<br>with a conversation.</h2><p>This is a fictional business. Try the form to see how a clear enquiry flow could work. It only creates a local preview; nothing is sent or saved.</p><div class="forme-contact-details"><span>Example email · not a contact link</span><strong>hello@forme.example</strong><span>Example phone · not a contact link</span><strong>+60 XX-XXX XXXX</strong></div></div>
    <form class="forme-form" @submit.prevent="buildPreview">
      <p class="forme-form-notice">Demo form · no live submission</p><noscript><p class="forme-form-notice">Enable JavaScript to create a local preview. Submission is disabled; nothing is sent.</p></noscript>
      <label for="forme-name">Your name <span>(sample text only)</span></label><input id="forme-name" v-model="name" autocomplete="off" maxlength="100" placeholder="e.g. Alex Tan">
      <label for="forme-focus">What are you exploring?</label><select id="forme-focus" v-model="focus"><option>Workplace strategy</option><option>Spatial design</option><option>Delivery planning</option><option>Still working it out</option></select>
      <label for="forme-message">A little about the project <span>(sample text only)</span></label><textarea id="forme-message" v-model="message" maxlength="1000" rows="4" placeholder="An example brief, not personal or confidential information."></textarea>
      <div class="forme-form-actions"><button type="submit" class="forme-button" :disabled="!ready">Preview enquiry <span aria-hidden="true"><svg class="rw-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></span></button><button type="button" class="forme-reset" @click="reset">Reset</button></div>
      <p class="forme-small">Stays in this page’s memory. Leaving or reloading discards the form.</p>
      <div v-if="preview" class="forme-brief-result" role="status" aria-live="polite"><h3>Your local preview</h3><pre>{{ preview }}</pre></div>
    </form>
  </div>
</template>
