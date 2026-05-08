<template>
  <div class="bg-surface text-on-surface font-body min-h-screen">
    <!-- Fixed header — always opaque, 2-section -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <AppTopBar />
      <AppNav />
    </div>
    <!-- Main: always padded to clear the fixed header (topbar ~40px + nav ~88px = 128px) -->
    <main class="pt-[128px]">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppTopBar from './components/AppTopBar.vue'
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue'
</script>

