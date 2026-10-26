<script setup>
import { skillGroups } from '../../data/skills'
</script>

<template>
  <section
    id="skills"
    class="px-[var(--layout-gutter)] py-[var(--space-section)]"
    aria-labelledby="skills-title"
  >
    <div class="mx-auto max-w-[var(--layout-content-width)]">
      <header class="grid gap-5 border-t border-hairline pt-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <p class="font-code text-xs font-medium tracking-[0.16em] text-muted">TECHNICAL SKILLS</p>
        <div class="min-w-0">
          <h2
            id="skills-title"
            class="max-w-3xl font-editorial text-3xl font-medium leading-tight tracking-[-0.045em] text-ink sm:text-4xl"
          >
            Tools for building and investigating digital products.
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-7 text-muted">
            A selection drawn from documented project work, this portfolio, and research.
          </p>
        </div>
      </header>

      <div class="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="(group, index) in skillGroups"
          :key="group.id"
          class="min-w-0 rounded-surface border border-hairline bg-surface/35 p-5 sm:p-6"
          :aria-labelledby="`skill-group-${group.id}`"
        >
          <div class="flex items-start justify-between gap-3">
            <h3
              :id="`skill-group-${group.id}`"
              class="font-editorial text-xl font-medium tracking-[-0.03em] text-ink"
            >
              {{ group.name }}
            </h3>
            <span class="pt-1 font-code text-[0.68rem] text-brand" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          <ul class="mt-5 flex flex-wrap gap-2" :aria-label="`${group.name} skills`">
            <li
              v-for="skill in group.skills"
              :key="skill"
              class="max-w-full break-words rounded-full border border-hairline px-3 py-1.5 font-code text-xs leading-5 text-muted"
            >
              {{ skill }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
