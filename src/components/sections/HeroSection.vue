<script setup>
import { ref } from 'vue'
import { ArrowDownRight } from '@lucide/vue'

const contactNotice = ref('')

function showContactNotice() {
  contactNotice.value = 'Contact details will be added in a future milestone.'
}
</script>

<template>
  <section
    id="home"
    class="hero-atmosphere relative isolate flex min-h-[min(52rem,calc(100svh-5rem))] items-center overflow-hidden px-[var(--layout-gutter)] py-20 md:min-h-[min(56rem,calc(100svh-6rem))]"
    aria-labelledby="hero-title"
  >
    <div class="relative mx-auto w-full max-w-[var(--layout-content-width)]">
      <p class="mb-6 flex items-center gap-3 font-code text-[0.68rem] font-medium tracking-[0.16em] text-muted sm:text-xs">
        <span class="size-1.5 rounded-full bg-brand" aria-hidden="true"></span>
        SOFTWARE ENGINEER <span class="text-brand" aria-hidden="true">&middot;</span> CREATIVE TECHNOLOGIST
      </p>

      <h1
        id="hero-title"
        class="max-w-6xl font-editorial text-[clamp(3rem,8.5vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.065em] text-ink"
      >
        Engineering ideas.<br class="hidden sm:block" />
        <span class="text-white/65">Designing experiences.</span>
      </h1>

      <p class="mt-7 max-w-xl text-base leading-7 text-muted sm:mt-9 sm:text-lg sm:leading-8">
        I build thoughtful digital products through software engineering, research, and creative exploration.
      </p>

      <div class="mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:items-center">
        <a
          href="#work"
          class="motion-color inline-flex min-h-12 items-center justify-center gap-3 rounded-control-sm bg-ink px-5 py-3 text-sm font-semibold text-page no-underline hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
        >
          Explore my work
          <ArrowDownRight :size="17" :stroke-width="1.8" aria-hidden="true" />
        </a>
        <button
          type="button"
          class="motion-color inline-flex min-h-12 items-center justify-center rounded-control-sm border border-hairline bg-surface/50 px-5 py-3 text-sm font-medium text-ink hover:-translate-y-0.5 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
          @click="showContactNotice"
        >
          Get in touch
        </button>
      </div>
      <p v-if="contactNotice" class="mt-4 text-sm text-muted" role="status" aria-live="polite">
        {{ contactNotice }}
      </p>
    </div>
  </section>
</template>
