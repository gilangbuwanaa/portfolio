<script setup>
import { toolMarqueeRows } from '../../data/skills'
</script>

<template>
  <section
    id="skills"
    class="skills-section px-[var(--layout-gutter)] py-[var(--space-section)]"
    aria-labelledby="skills-title"
  >
    <div class="mx-auto max-w-[var(--layout-content-width)]">
      <header class="grid gap-5 border-t border-hairline pt-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <p class="font-code text-xs font-medium tracking-[0.16em] text-muted">TOOLS &amp; TECHNOLOGY</p>
        <div class="min-w-0">
          <h2
            id="skills-title"
            class="max-w-3xl font-editorial text-3xl font-medium leading-tight tracking-[-0.045em] text-ink sm:text-4xl"
          >
            A toolkit spanning development and creative work.
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-7 text-muted">
            Tools and technologies used across software projects, research, and creative practice.
          </p>
        </div>
      </header>

      <div class="skills-marquees mt-10 space-y-4 sm:mt-12" aria-label="Tools by category">
        <div
          v-for="row in toolMarqueeRows"
          :key="row.id"
          class="skills-marquee"
          :class="`skills-marquee--${row.direction}`"
        >
          <div class="skills-marquee__track">
            <ul
              v-for="copy in 2"
              :key="`${row.id}-${copy}`"
              class="skills-marquee__set"
              :aria-hidden="copy === 2 ? 'true' : undefined"
            >
              <li
                v-for="category in row.categories"
                :key="`${category.id}-${copy}`"
                class="skills-category"
              >
                <h3 class="font-editorial text-lg font-medium tracking-[-0.025em] text-ink">
                  {{ category.name }}
                </h3>
                <ul class="mt-4 flex flex-wrap gap-2.5">
                  <li
                    v-for="tool in category.tools"
                    :key="tool.name"
                    class="inline-flex min-h-10 max-w-full items-center gap-2 rounded-full border border-hairline bg-background/70 px-3 py-2 font-code text-xs leading-4 text-muted"
                  >
                    <img
                      v-if="tool.icon"
                      :src="tool.icon"
                      alt=""
                      class="h-4 w-4 shrink-0 object-contain"
                      loading="lazy"
                    />
                    <span class="break-words">{{ tool.name }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-marquee {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);
}

.skills-marquee__track {
  display: flex;
  width: max-content;
  animation: skills-marquee-left 58s linear infinite;
}

.skills-marquee--right .skills-marquee__track {
  animation-name: skills-marquee-right;
  animation-duration: 64s;
}

.skills-marquee:hover .skills-marquee__track,
.skills-marquee:focus-within .skills-marquee__track {
  animation-play-state: paused;
}

.skills-marquee__set {
  display: flex;
  width: max-content;
  align-items: stretch;
  gap: 1rem;
  padding-right: 1rem;
}

.skills-category {
  width: min(26rem, calc(100vw - 3rem));
  flex: 0 0 auto;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-surface);
  background: color-mix(in srgb, var(--color-background-elevated) 48%, transparent);
}

@keyframes skills-marquee-left {
  to { transform: translateX(-50%); }
}

@keyframes skills-marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .skills-marquees { display: grid; gap: 1rem; }
  .skills-marquee { overflow: visible; mask-image: none; }
  .skills-marquee__track,
  .skills-marquee--right .skills-marquee__track { display: block; width: 100%; animation: none; }
  .skills-marquee__set,
  .skills-marquee__set[aria-hidden='true'] { display: grid; width: 100%; grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr)); gap: 1rem; padding: 0; }
  .skills-marquee__set[aria-hidden='true'] { display: none; }
  .skills-category { width: auto; }
}
</style>
