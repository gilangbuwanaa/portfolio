<script setup>
import { organizations } from '../../data/organizations'
</script>

<template>
  <section
    id="organizations"
    class="px-[var(--layout-gutter)] py-[var(--space-section)]"
    aria-labelledby="organizations-title"
  >
    <div class="mx-auto max-w-[var(--layout-content-width)]">
      <header class="grid gap-5 border-t border-hairline pt-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <p class="font-code text-xs font-medium tracking-[0.16em] text-muted">
          ORGANIZATIONAL EXPERIENCE
        </p>
        <div class="min-w-0">
          <h2
            id="organizations-title"
            class="max-w-3xl font-editorial text-3xl font-medium leading-tight tracking-[-0.045em] text-ink sm:text-4xl"
          >
            Leadership and service beyond employment.
          </h2>
        </div>
      </header>

      <ol class="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2">
        <li v-for="organization in organizations" :key="organization.id" class="min-w-0">
          <article
            class="h-full overflow-hidden rounded-surface border border-hairline bg-surface/35"
            :aria-labelledby="`organization-role-${organization.id}`"
          >
            <div class="grid min-w-0 sm:grid-cols-[minmax(10rem,0.8fr)_minmax(0,1.2fr)]">
              <div class="aspect-[4/3] overflow-hidden bg-surface sm:aspect-auto sm:min-h-full">
                <img
                  :src="organization.image"
                  :alt="organization.imageAlt"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="min-w-0 p-5 sm:p-6">
                <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p class="font-editorial text-xl font-semibold tracking-[-0.03em] text-ink">
                    {{ organization.name }}
                  </p>
                  <p class="font-code text-[0.68rem] text-muted">{{ organization.period }}</p>
                </div>
                <h3
                  :id="`organization-role-${organization.id}`"
                  class="mt-4 font-editorial text-lg font-medium leading-snug text-ink"
                >
                  {{ organization.role }}
                </h3>
                <p class="mt-3 text-sm leading-6 text-muted">{{ organization.description }}</p>
              </div>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>
