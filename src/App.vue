<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import HeroSection from './components/sections/HeroSection.vue'
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <div
      id="work"
      class="work-anchor mx-auto max-w-[var(--layout-content-width)] px-[var(--layout-gutter)] pb-16 text-sm text-muted"
    >
      Selected work will be introduced in a future milestone.
    </div>
  </main>
</template>
