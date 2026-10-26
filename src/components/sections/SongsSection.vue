<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { ExternalLink, Pause, Play, Radio, SkipBack, SkipForward } from '@lucide/vue'
import { songs } from '../../data/songs'
import { useMusicPlayer } from '../../composables/useMusicPlayer'

const playerTarget = ref(null)
const player = useMusicPlayer(songs)
const currentTrack = computed(() => player.currentTrack.value)
onBeforeUnmount(player.dispose)

function startPlayback() {
  if (playerTarget.value) player.toggle(playerTarget.value)
}
</script>

<template>
  <section
    id="songs"
    class="px-[var(--layout-gutter)] py-[var(--space-section)]"
    aria-labelledby="songs-title"
  >
    <div class="mx-auto max-w-[var(--layout-content-width)]">
      <header class="grid gap-5 border-t border-hairline pt-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <p class="font-code text-xs font-medium tracking-[0.16em] text-muted">BEYOND CODES</p>
        <div class="min-w-0">
          <h2
            id="songs-title"
            class="max-w-3xl font-editorial text-3xl font-medium leading-tight tracking-[-0.045em] text-ink sm:text-4xl"
          >
            A soundtrack for the spaces between projects.
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-7 text-muted">
            A personal radio playlist. Choose a track and start playback on its original platform.
          </p>
        </div>
      </header>

      <div class="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.1fr)]">
        <section
          class="min-w-0 rounded-surface border border-hairline bg-surface/55 p-5 sm:p-7"
          aria-label="Music player"
        >
          <div class="flex items-center gap-3 text-brand">
            <Radio :size="20" :stroke-width="1.8" aria-hidden="true" />
            <p class="font-code text-xs tracking-[0.12em]">NOW TUNING</p>
          </div>

          <div class="mt-7 min-w-0">
            <p class="font-code text-[0.68rem] text-muted">{{ currentTrack.platform }}</p>
            <h3 class="mt-2 break-words font-editorial text-2xl font-medium leading-tight tracking-[-0.035em] text-ink sm:text-3xl">
              {{ currentTrack.title }}
            </h3>
            <p class="mt-2 break-words text-sm leading-6 text-muted">
              {{ currentTrack.artists.join(', ') }}
            </p>
          </div>

          <div class="mt-6 flex items-center gap-3" aria-label="Playback controls">
            <button
              type="button"
              class="player-control"
              aria-label="Previous track"
              @click="player.previous"
            >
              <SkipBack :size="18" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="player-control player-control--primary"
              :aria-label="player.isPlaying.value ? 'Pause playback' : 'Play selected track'"
              :aria-pressed="player.isPlaying.value"
              :disabled="player.status.value === 'loading'"
              @click="startPlayback"
            >
              <Pause v-if="player.isPlaying.value" :size="19" aria-hidden="true" />
              <Play v-else :size="19" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="player-control"
              aria-label="Next track"
              @click="player.next"
            >
              <SkipForward :size="18" aria-hidden="true" />
            </button>
            <span class="ml-2 font-code text-xs text-muted" role="status" aria-live="polite">
              <template v-if="player.status.value === 'loading'">Connecting…</template>
              <template v-else-if="player.isPlaying.value">Playing</template>
              <template v-else-if="player.status.value === 'error'">Playback unavailable</template>
              <template v-else-if="player.status.value === 'ready'">Ready</template>
              <template v-else>Ready when you are</template>
            </span>
          </div>

          <p v-if="player.error.value" class="mt-4 text-sm leading-6 text-muted">
            {{ player.error.value }}
          </p>

          <div class="mt-6 overflow-hidden rounded-lg bg-[#080A12]">
            <div ref="playerTarget" class="music-embed" :class="`music-embed--${currentTrack.platform.toLowerCase()}`" />
          </div>
          <a
            :href="currentTrack.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-muted underline decoration-hairline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Open on {{ currentTrack.platform }}
            <ExternalLink :size="15" aria-hidden="true" />
          </a>
        </section>

        <section class="min-w-0" aria-labelledby="song-list-title">
          <div class="flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
            <h3 id="song-list-title" class="font-editorial text-xl font-medium text-ink">
              My Songs
            </h3>
            <span class="font-code text-xs text-muted">{{ songs.length }} TRACKS</span>
          </div>
          <ol class="max-h-[36rem] overflow-y-auto overscroll-contain">
            <li v-for="(song, index) in songs" :key="song.id" class="border-b border-hairline">
              <button
                type="button"
                class="song-row w-full min-w-0 rounded-sm px-2 py-4 text-left transition-colors hover:bg-surface/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                :class="{ 'song-row--active': song.id === currentTrack.id }"
                :aria-current="song.id === currentTrack.id ? 'true' : undefined"
                @click="player.select(index)"
              >
                <span class="flex min-w-0 items-center gap-4">
                  <span class="w-6 shrink-0 text-right font-code text-xs text-muted">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block break-words font-medium leading-5 text-ink">{{ song.title }}</span>
                    <span class="mt-1 block break-words text-xs leading-5 text-muted">
                      {{ song.artists.join(', ') }}
                    </span>
                  </span>
                  <span class="shrink-0 font-code text-[0.65rem] text-muted">{{ song.platform }}</span>
                </span>
              </button>
            </li>
          </ol>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.player-control {
  display: inline-grid;
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text-primary);
  transition: background-color 160ms ease, border-color 160ms ease;
}

.player-control:hover:not(:disabled) { background: color-mix(in srgb, var(--color-accent) 55%, transparent); }
.player-control:focus-visible { outline: 2px solid white; outline-offset: 3px; }
.player-control:disabled { cursor: wait; opacity: 0.6; }
.player-control--primary { width: 3.25rem; height: 3.25rem; border-color: #537aa9; background: #112e59; }
.song-row--active { background: color-mix(in srgb, var(--color-accent) 28%, transparent); }
.music-embed { min-height: 0; }
.music-embed--youtube { min-height: 200px; aspect-ratio: 16 / 9; }
.music-embed--youtube :deep(iframe) { width: 100%; height: 100%; min-height: 200px; }
.music-embed--spotify :deep(iframe) { display: block; width: 100%; height: 152px; }

@media (prefers-reduced-motion: reduce) {
  .player-control, .song-row { transition: none; }
}
</style>
