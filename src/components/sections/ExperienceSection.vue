<script setup>
import { experiences } from '../../data/experience'
</script>

<template>
  <section
    id="experience"
    class="px-[var(--layout-gutter)] py-[var(--space-section)]"
    aria-labelledby="experience-title"
  >
    <div class="mx-auto max-w-[var(--layout-content-width)]">
      <header class="grid gap-5 border-t border-hairline pt-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <p class="font-code text-xs font-medium tracking-[0.16em] text-muted">
          PROFESSIONAL EXPERIENCE
        </p>
        <div class="min-w-0">
          <h2
            id="experience-title"
            class="max-w-3xl font-editorial text-3xl font-medium leading-tight tracking-[-0.045em] text-ink sm:text-4xl"
          >
            Experience across academic and public-sector teams.
          </h2>
        </div>
      </header>

      <ol class="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
        <li v-for="entry in experiences" :key="entry.id" class="min-w-0">
          <article
            class="h-full rounded-surface border border-hairline bg-surface/40 p-5 sm:p-6"
            :aria-labelledby="`experience-role-${entry.id}`"
          >
            <div class="flex min-w-0 items-start gap-4">
              <div class="grid size-[4.5rem] shrink-0 place-items-center overflow-hidden rounded-xl border border-hairline bg-white p-1.5 sm:size-20">
                <img
                  :src="entry.logo"
                  :alt="entry.logoAlt"
                  class="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div class="min-w-0 flex-1 pt-1">
                <p class="font-code text-[0.68rem] leading-5 text-muted">{{ entry.period }}</p>
                <h3
                  :id="`experience-role-${entry.id}`"
                  class="mt-2 font-editorial text-xl font-medium leading-snug tracking-[-0.03em] text-ink"
                >
                  {{ entry.role }}
                </h3>
                <p class="mt-1 break-words text-sm leading-6 text-muted">
                  {{ entry.organization }}
                </p>
              </div>
            </div>
            <p class="mt-6 border-t border-hairline pt-4 text-sm leading-6 text-muted">
              {{ entry.summary }}
            </p>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>
