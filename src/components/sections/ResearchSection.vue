<script setup>
import { ArrowUpRight } from '@lucide/vue'
import { researchRecords } from '../../data/research'
</script>

<template>
  <section
    id="research"
    class="px-[var(--layout-gutter)] py-[var(--space-section)]"
    aria-labelledby="research-title"
  >
    <div class="mx-auto max-w-[var(--layout-content-width)]">
      <header class="grid gap-5 border-t border-hairline pt-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <p class="font-code text-xs font-medium tracking-[0.16em] text-muted">
          RESEARCH &amp; PUBLICATIONS
        </p>
        <div class="min-w-0">
          <h2
            id="research-title"
            class="max-w-3xl font-editorial text-3xl font-medium leading-tight tracking-[-0.045em] text-ink sm:text-4xl"
          >
            Research into image-based weather classification.
          </h2>
        </div>
      </header>

      <ol class="mt-10 grid gap-5 md:mt-12 md:grid-cols-2">
        <li v-for="record in researchRecords" :key="record.id" class="min-w-0">
          <a
            :href="record.url"
            target="_blank"
            rel="noopener noreferrer"
            class="research-paper group flex h-full min-w-0 flex-col rounded-surface border border-[#d8dce5] bg-[#f5f6f8] p-5 text-[#151923] shadow-[0_12px_30px_rgb(0_0_0_/_0.18)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[0.25deg] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-7 motion-reduce:transform-none motion-reduce:transition-none"
            :aria-labelledby="`research-record-${record.id}`"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <span class="font-code text-[0.68rem] font-medium tracking-[0.1em] text-[#254878]">
                {{ record.type }}
              </span>
              <time :datetime="record.dateTime" class="font-code text-xs text-[#525969]">
                {{ record.date }}
              </time>
            </div>
            <h3
              :id="`research-record-${record.id}`"
              class="mt-6 break-words font-editorial text-2xl font-medium leading-snug tracking-[-0.035em] sm:text-[1.7rem]"
            >
              {{ record.title }}
            </h3>
            <div class="mt-auto flex items-end justify-between gap-4 border-t border-[#cbd0d9] pt-6">
              <div class="flex min-w-0 items-baseline gap-3">
                <p class="shrink-0 font-editorial text-4xl font-medium leading-none tracking-[-0.05em] text-[#173d70]">
                  {{ record.finding.value }}
                </p>
                <p class="text-sm leading-5 text-[#525969]">{{ record.finding.label }}</p>
              </div>
              <ArrowUpRight
                :size="20"
                :stroke-width="1.8"
                aria-hidden="true"
                class="shrink-0 text-[#254878] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </div>
            <span class="sr-only">Opens the research record in a new tab</span>
          </a>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.research-paper {
  transform-style: preserve-3d;
}

@media (prefers-reduced-motion: reduce) {
  .research-paper { transform: none !important; }
}
</style>
