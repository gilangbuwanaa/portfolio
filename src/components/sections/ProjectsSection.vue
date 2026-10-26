<script setup>
import { computed, ref } from 'vue'
import { ArrowUpRight, ChevronLeft, ChevronRight } from '@lucide/vue'
import { projects as defaultProjects, projectPlaceholderImage } from '../../data/projects'

const props = defineProps({
  projects: {
    type: Array,
    default: () => defaultProjects,
  },
})

const visibleProjects = computed(() => props.projects.slice(0, 3))
const activeProjectId = ref(defaultProjects[0]?.id ?? null)
const activeIndex = computed(() => {
  const index = visibleProjects.value.findIndex((project) => project.id === activeProjectId.value)
  return index < 0 ? 0 : index
})
const positionedProjects = computed(() => {
  const count = visibleProjects.value.length

  return visibleProjects.value.map((project, index) => {
    const relativePosition = (index - activeIndex.value + count) % count
    const position = relativePosition === 0 ? 'active' : relativePosition === 1 ? 'next' : 'previous'

    return { project, position }
  })
})
const positionLabel = computed(() => {
  const total = visibleProjects.value.length
  const current = total ? activeIndex.value + 1 : 0

  return `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
})

function imageSource(project) {
  return project.image || projectPlaceholderImage
}

function imageDescription(project) {
  if (!project.image || project.image === projectPlaceholderImage) {
    return `Temporary preview placeholder for ${project.name}`
  }

  return project.imageAlt || `${project.name} project preview`
}

function safeExternalUrl(value) {
  if (typeof value !== 'string') return null

  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null
  } catch {
    return null
  }
}

function setActiveProject(projectId) {
  if (visibleProjects.value.some((project) => project.id === projectId)) {
    activeProjectId.value = projectId
  }
}

function moveActiveProject(direction) {
  const count = visibleProjects.value.length
  if (count < 2) return

  const nextIndex = (activeIndex.value + direction + count) % count
  activeProjectId.value = visibleProjects.value[nextIndex].id
}
</script>

<template>
  <section
    id="work"
    class="px-[var(--layout-gutter)] py-[var(--space-section)]"
    aria-labelledby="projects-title"
  >
    <div class="mx-auto max-w-[var(--layout-content-width)]">
      <div class="grid gap-5 border-t border-hairline pt-8 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-10">
        <p class="font-code text-xs font-medium tracking-[0.16em] text-muted">SELECTED WORK</p>
        <div>
          <h2
            id="projects-title"
            class="font-editorial text-3xl font-medium tracking-[-0.045em] text-ink sm:text-4xl"
          >
            Selected projects
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-7 text-muted">
            A considered selection of software projects, presented with details supported by verified source material.
          </p>
        </div>
      </div>

      <p
        v-if="visibleProjects.length === 0"
        class="mt-12 max-w-xl border-l-2 border-brand pl-5 text-sm leading-6 text-muted md:mt-16"
      >
        Selected projects will appear here as verified project details are prepared.
      </p>

      <template v-else>
        <div
          class="project-carousel mt-12 md:mt-16"
          role="group"
          aria-roledescription="carousel"
          aria-label="Selected projects"
        >
          <article
            v-for="{ project, position } in positionedProjects"
            :key="project.id"
            class="project-carousel__card"
            :class="`project-carousel__card--${position}`"
            :data-position="position"
            :aria-current="position === 'active' ? 'true' : undefined"
            :aria-labelledby="`project-title-${project.id}`"
          >
            <button
              v-if="position !== 'active'"
              type="button"
              class="project-carousel__select"
              :aria-label="`Show ${project.name} as the active project`"
              @click="setActiveProject(project.id)"
            ></button>

            <div class="project-carousel__image-frame">
              <img
                :src="imageSource(project)"
                :alt="imageDescription(project)"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div class="project-carousel__content">
              <h3
                :id="`project-title-${project.id}`"
                class="font-editorial text-xl font-medium tracking-[-0.035em] text-ink sm:text-2xl"
              >
                {{ project.name }}
              </h3>
              <p v-if="project.shortDescription" class="mt-2 text-sm font-medium text-ink">
                {{ project.shortDescription }}
              </p>
              <p v-if="project.date || project.platform" class="mt-3 font-code text-xs text-muted">
                <span v-if="project.date">{{ project.date }}</span>
                <span v-if="project.date && project.platform" aria-hidden="true">&middot;</span>
                <span v-if="project.platform">{{ project.platform }}</span>
              </p>
              <template v-if="project.description">
                <p class="project-carousel__description mt-3 text-sm leading-6 text-muted">
                  {{ project.description }}
                </p>
              </template>

              <div class="project-carousel__technology-slot mt-auto pt-4">
                <ul
                  v-if="project.technologies?.length"
                  class="flex flex-wrap gap-2"
                  aria-label="Technologies"
                >
                  <li
                    v-for="technology in project.technologies"
                    :key="technology"
                    class="rounded-full border border-hairline px-2.5 py-1 font-code text-[0.65rem] text-muted"
                  >
                    {{ technology }}
                  </li>
                </ul>
              </div>

              <div
                v-if="position === 'active' && (safeExternalUrl(project.liveUrl) || safeExternalUrl(project.repositoryUrl))"
                class="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"
              >
                <a
                  v-if="safeExternalUrl(project.liveUrl)"
                  :href="safeExternalUrl(project.liveUrl)"
                  class="motion-color inline-flex items-center gap-2 text-ink underline decoration-hairline underline-offset-4 hover:text-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live project <ArrowUpRight :size="15" aria-hidden="true" />
                </a>
                <a
                  v-if="safeExternalUrl(project.repositoryUrl)"
                  :href="safeExternalUrl(project.repositoryUrl)"
                  class="motion-color inline-flex items-center gap-2 text-ink underline decoration-hairline underline-offset-4 hover:text-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source repository <ArrowUpRight :size="15" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            class="motion-color grid size-11 place-items-center rounded-full border border-hairline bg-surface text-ink hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous project"
            :disabled="visibleProjects.length < 2"
            @click="moveActiveProject(-1)"
          >
            <ChevronLeft :size="19" :stroke-width="1.8" aria-hidden="true" />
          </button>
          <span class="min-w-16 text-center font-code text-xs text-muted" aria-live="polite">
            {{ positionLabel }}
            <span class="sr-only">
              {{ visibleProjects[activeIndex]?.name }} is active
            </span>
          </span>
          <button
            type="button"
            class="motion-color grid size-11 place-items-center rounded-full border border-hairline bg-surface text-ink hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next project"
            :disabled="visibleProjects.length < 2"
            @click="moveActiveProject(1)"
          >
            <ChevronRight :size="19" :stroke-width="1.8" aria-hidden="true" />
          </button>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.project-carousel {
  position: relative;
  height: 37rem;
  margin-inline: auto;
  max-width: 72rem;
  perspective: 90rem;
  isolation: isolate;
}

.project-carousel__card {
  --card-border: rgb(255 255 255 / 12%);
  --card-shadow: 0 1.25rem 3.5rem rgb(0 0 0 / 24%);
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  width: min(30vw, 24rem);
  height: 34rem;
  min-width: 0;
  flex-direction: column;
  padding: 0.875rem;
  overflow: hidden;
  border: 1px solid var(--card-border);
  border-radius: var(--radius-surface);
  background:
    linear-gradient(145deg, rgb(255 255 255 / 8%), transparent 42%),
    rgb(14 19 33 / 88%);
  box-shadow: var(--card-shadow), inset 0 1px rgb(255 255 255 / 8%);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  transform-style: preserve-3d;
  transition:
    transform 520ms cubic-bezier(0.22, 0.75, 0.2, 1),
    opacity 520ms cubic-bezier(0.22, 0.75, 0.2, 1),
    border-color 520ms cubic-bezier(0.22, 0.75, 0.2, 1),
    box-shadow 520ms cubic-bezier(0.22, 0.75, 0.2, 1);
  will-change: transform;
}

.project-carousel__card--previous {
  z-index: 1;
  transform: translate(-160%, -50%) scale(0.88);
  opacity: 0.86;
}

.project-carousel__card--active {
  --card-border: rgb(141 187 255 / 42%);
  --card-shadow: 0 1.75rem 4.5rem rgb(0 0 0 / 38%), 0 0 1.5rem rgb(17 46 89 / 20%);
  z-index: 3;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.project-carousel__card--next {
  z-index: 1;
  transform: translate(60%, -50%) scale(0.88);
  opacity: 0.86;
}

.project-carousel__image-frame {
  flex: 0 0 auto;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius-surface) - 0.25rem);
  background: var(--color-background-elevated);
}

.project-carousel__image-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-carousel__content {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
}

.project-carousel__description {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.project-carousel__technology-slot {
  min-height: 3.25rem;
  flex: 0 0 auto;
}

.project-carousel__full-description summary {
  width: fit-content;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 0.75rem;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.project-carousel__full-description summary:focus-visible {
  border-radius: 0.125rem;
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

.project-carousel__full-description p {
  max-height: 9rem;
  overflow-y: auto;
}

.project-carousel__select {
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: var(--radius-surface);
  background: transparent;
  cursor: pointer;
}

.project-carousel__select:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -4px;
}

@media (min-width: 48rem) and (max-width: 63.999rem) {
  .project-carousel__card {
    width: min(30vw, 21rem);
    height: 32rem;
  }

  .project-carousel__card--previous {
    transform: translate(-158%, -50%) scale(0.88);
  }

  .project-carousel__card--next {
    transform: translate(58%, -50%) scale(0.88);
  }
}

@media (max-width: 47.999rem) {
  .project-carousel {
    height: 33rem;
    max-width: 28rem;
  }

  .project-carousel__card:not(.project-carousel__card--active) {
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    opacity: 0;
    pointer-events: none;
  }

  .project-carousel__card:not(.project-carousel__card--active) .project-carousel__select {
    display: none;
  }

  .project-carousel__card {
    width: 100%;
    height: 31rem;
    padding: 0.75rem;
  }

  .project-carousel__card--previous,
  .project-carousel__card--next,
  .project-carousel__card--active {
    transform: translate(-50%, -50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-carousel__card {
    transition: none;
    will-change: auto;
  }

  .project-carousel__card--previous,
  .project-carousel__card--next {
    opacity: 0.9;
  }

  .project-carousel__card--previous {
    transform: translate(-160%, -50%) scale(0.96);
  }

  .project-carousel__card--active {
    transform: translate(-50%, -50%);
  }

  .project-carousel__card--next {
    transform: translate(60%, -50%) scale(0.96);
  }
}
</style>
