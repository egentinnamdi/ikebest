<template>
  <div class="bg-surface text-on-surface font-body min-h-screen">
    <AppTopBar />
    <AppNav />
    <main>
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
