<script setup>
import { ref } from 'vue'
import { Menu, X } from '@lucide/vue'

const isMenuOpen = ref(false)
const navigationNotice = ref('')

function closeMenu() {
  isMenuOpen.value = false
}

function announcePlannedSection(section) {
  navigationNotice.value = `${section} will be added in a future milestone.`
  closeMenu()
}
</script>

<template>
  <header class="site-header px-[var(--layout-gutter)] pt-5 md:pt-7">
    <div class="site-header__inner mx-auto flex max-w-[var(--layout-content-width)] items-center justify-between">
      <a
        href="#home"
        class="font-editorial text-base font-semibold tracking-[-0.04em] text-ink no-underline sm:text-lg"
        @click="closeMenu"
      >
        Gilang <span class="text-muted">Andhika Buwana</span>
      </a>

      <button
        type="button"
        class="motion-color grid size-11 place-items-center rounded-control-sm border border-hairline bg-surface/70 text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring md:hidden"
        :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
        :aria-expanded="isMenuOpen"
        aria-controls="primary-navigation"
        @click="isMenuOpen = !isMenuOpen"
      >
        <X v-if="isMenuOpen" :size="20" :stroke-width="1.8" aria-hidden="true" />
        <Menu v-else :size="20" :stroke-width="1.8" aria-hidden="true" />
      </button>

      <nav
        id="primary-navigation"
        class="site-header__nav flex-col gap-1 rounded-surface border border-hairline bg-surface p-2 text-sm text-muted shadow-xl md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none"
        :class="{ 'site-header__nav--open': isMenuOpen }"
        aria-label="Primary navigation"
      >
        <a href="#home" class="motion-color rounded-control-sm px-3 py-2 hover:text-ink" @click="closeMenu">
          Home
        </a>
        <a href="#work" class="motion-color rounded-control-sm px-3 py-2 hover:text-ink" @click="closeMenu">
          Work
        </a>
        <a
          href="#about"
          class="motion-color rounded-control-sm px-3 py-2 hover:text-ink"
          @click.prevent="announcePlannedSection('About')"
        >
          About
        </a>
        <a
          href="#contact"
          class="motion-color rounded-control-sm px-3 py-2 hover:text-ink"
          @click.prevent="announcePlannedSection('Contact')"
        >
          Contact
        </a>
      </nav>
    </div>
    <p v-if="navigationNotice" class="mx-auto mt-4 max-w-[var(--layout-content-width)] text-right text-xs text-muted" role="status">
      {{ navigationNotice }}
    </p>
  </header>
</template>
