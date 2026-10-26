<script setup>
import { profile } from '../../data/profile'
</script>

<template>
  <section
    id="about"
    class="px-[var(--layout-gutter)] py-[var(--space-section)]"
    aria-labelledby="about-title"
  >
    <div class="mx-auto max-w-[var(--layout-content-width)]">
      <header class="grid gap-5 border-t border-hairline pt-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <p class="font-code text-xs font-medium tracking-[0.16em] text-muted">ABOUT &amp; EXPERTISE</p>
        <div class="min-w-0">
          <h2
            id="about-title"
            class="max-w-3xl font-editorial text-3xl font-medium leading-tight tracking-[-0.045em] text-ink sm:text-4xl"
          >
            Building software with an inquiring mindset.
          </h2>
          <p class="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {{ profile.introduction }}
          </p>
        </div>
      </header>

      <div class="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div class="min-w-0">
          <div class="border-l-2 border-brand pl-5">
            <p class="font-code text-[0.68rem] font-medium tracking-[0.14em] text-muted">EDUCATION</p>
            <h3 class="mt-3 font-editorial text-xl font-medium tracking-[-0.03em] text-ink">
              {{ profile.education.degree }}
            </h3>
            <p class="mt-1 break-words text-sm leading-6 text-muted">
              {{ profile.education.institution }}
            </p>
            <p class="mt-3 font-code text-xs text-muted">
              GPA <span class="text-ink">{{ profile.education.gpa }}</span>
            </p>
          </div>

          <div class="mt-10">
            <h3 class="font-code text-[0.68rem] font-medium tracking-[0.14em] text-muted">
              SELECTED EXPERIENCE
            </h3>
            <ul class="mt-4 divide-y divide-hairline border-y border-hairline">
              <li v-for="item in profile.experience" :key="item.role" class="py-4">
                <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <p class="font-medium text-ink">{{ item.role }}</p>
                  <p class="shrink-0 font-code text-[0.68rem] text-muted">{{ item.period }}</p>
                </div>
                <p class="mt-1 break-words text-sm leading-6 text-muted">{{ item.organization }}</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="min-w-0">
          <h3 class="font-code text-[0.68rem] font-medium tracking-[0.14em] text-muted">
            AREAS OF FOCUS
          </h3>
          <ol class="mt-4 border-y border-hairline">
            <li
              v-for="(area, index) in profile.expertise"
              :key="area.title"
              class="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-hairline py-5 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4 sm:py-6"
            >
              <span class="pt-1 font-code text-xs text-brand" aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <div class="min-w-0">
                <h4 class="font-editorial text-xl font-medium tracking-[-0.025em] text-ink">
                  {{ area.title }}
                </h4>
                <p class="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                  {{ area.description }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
