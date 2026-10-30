<script setup lang="ts">
defineProps<{ kind: 'food' | 'botanical' | 'architecture' | 'studio' | 'abstract' }>()
</script>

<template>
  <svg class="gp-art" viewBox="0 0 800 840" fill="none" aria-hidden="true" focusable="false">
    <rect width="800" height="840" fill="var(--art-bg, #e8cbb5)" />
    <path d="M0 600 800 360V840H0Z" fill="var(--art-light, #f3dfca)" />
    <circle cx="690" cy="140" r="190" fill="var(--art-light, #f3dfca)" opacity=".65" />
    <g v-if="kind === 'food'">
      <path d="m70 250 410-90 225 540-450 100Z" fill="var(--art-paper, #fff5e5)" />
      <path d="m95 290 410-90m-390 145 410-90m-390 145 410-90m-390 145 410-90m-390 145 410-90m-390 145 410-90m-390 145 410-90m-390 145 410-90" stroke="var(--art-accent, #aa543d)" stroke-width="3" opacity=".25" />
      <ellipse cx="420" cy="500" rx="233" ry="152" fill="var(--art-dark, #48372e)" opacity=".15" />
      <ellipse cx="400" cy="458" rx="224" ry="160" fill="var(--art-paper, #fff5e5)" />
      <ellipse cx="400" cy="458" rx="177" ry="119" stroke="var(--art-bg, #e8cbb5)" stroke-width="4" />
      <path d="M514 324c110-23 113 113 10 104" stroke="var(--art-accent, #aa543d)" stroke-width="31" />
      <path d="M282 301h257v120c0 125-257 125-257 0Z" fill="var(--art-accent, #aa543d)" />
      <ellipse cx="411" cy="302" rx="129" ry="70" fill="var(--art-paper, #fff5e5)" />
      <ellipse cx="411" cy="305" rx="111" ry="53" fill="var(--art-dark, #48372e)" />
      <path d="M359 299c22-40 52 0 52 0s30-40 52 0c19 33-52 44-52 44s-71-11-52-44Z" fill="var(--art-light, #f3dfca)" />
      <path d="m136 618 73-38 68 120-73 38Z" fill="var(--art-dark, #48372e)" opacity=".75" />
    </g>
    <g v-else-if="kind === 'botanical'">
      <ellipse cx="402" cy="730" rx="210" ry="36" fill="var(--art-dark, #48372e)" opacity=".13" />
      <path d="M397 587V202m0 254L236 303m161 61 153-155m-153 89L295 171m102 355 189-108" stroke="var(--art-dark, #48372e)" stroke-width="7" />
      <path d="M397 327c-96-46-130-167-88-212 91 48 128 151 88 212Zm-23 109c-143-1-218-74-211-152 129-7 230 74 211 152Zm37-79c8-145 88-215 166-204-1 131-82 226-166 204Zm0 169c26-124 138-167 205-126-35 118-134 177-205 126Z" fill="var(--art-accent, #aa543d)" />
      <path d="M280 550h236l38 130c21 81-319 81-298 0Z" fill="var(--art-paper, #fff5e5)" />
      <ellipse cx="398" cy="550" rx="118" ry="21" fill="var(--art-light, #f3dfca)" />
      <path d="M286 585h224m-233 37h244m-255 37h266m-266 37h266" stroke="var(--art-bg, #e8cbb5)" stroke-width="3" />
    </g>
    <g v-else-if="kind === 'architecture'">
      <path d="M90 720V270a220 220 0 0 1 440 0v450Z" fill="var(--art-paper, #fff5e5)" />
      <path d="M173 720V288a137 137 0 0 1 274 0v432Z" fill="var(--art-dark, #48372e)" />
      <path d="M255 720V325a93 93 0 0 1 186-3v398Z" fill="var(--art-accent, #aa543d)" />
      <path d="M530 720V270L700 150v470Z" fill="var(--art-accent, #aa543d)" />
      <path d="m0 840 173-120h274l200 120Z" fill="var(--art-bg, #e8cbb5)" />
      <circle cx="615" cy="642" r="74" fill="var(--art-light, #f3dfca)" />
      <path d="M530 270 700 150M90 720h440" stroke="var(--art-dark, #48372e)" stroke-opacity=".2" stroke-width="2" />
    </g>
    <g v-else-if="kind === 'studio'">
      <path d="m115 240 396-101 142 453-396 101Z" fill="var(--art-dark, #48372e)" opacity=".18" transform="translate(25 36)" />
      <path d="m115 240 396-101 142 453-396 101Z" fill="var(--art-paper, #fff5e5)" />
      <circle cx="380" cy="400" r="147" fill="var(--art-accent, #aa543d)" />
      <path d="m285 251 209 297m-205 28 211-310" stroke="var(--art-light, #f3dfca)" stroke-width="46" />
      <path d="m192 289 291-73m-276 110 141-35m-56 324 275-70m-261 104 172-44" stroke="var(--art-dark, #48372e)" stroke-width="5" />
      <circle cx="584" cy="635" r="88" fill="var(--art-accent, #aa543d)" />
    </g>
    <g v-else>
      <ellipse cx="409" cy="725" rx="238" ry="42" fill="var(--art-dark, #48372e)" opacity=".15" />
      <path d="M174 678V410a222 222 0 0 1 444 0v268H496V410a100 100 0 0 0-200 0v268Z" fill="var(--art-accent, #aa543d)" />
      <path d="M174 678h122V410c0-55 45-100 100-100v-122c-122 0-222 99-222 222Z" fill="var(--art-paper, #fff5e5)" opacity=".68" />
      <circle cx="396" cy="560" r="88" fill="var(--art-dark, #48372e)" />
      <path d="m480 102 128 74-128 74-128-74Z" fill="var(--art-paper, #fff5e5)" />
      <path d="M352 176v140l128 74V250Z" fill="var(--art-light, #f3dfca)" />
      <path d="M608 176v140l-128 74V250Z" fill="var(--art-accent, #aa543d)" />
    </g>
  </svg>
</template>
