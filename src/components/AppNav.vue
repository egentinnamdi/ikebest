<template>
  <header
    class="sticky top-0 bg-white shadow-sm z-40 border-b border-gray-200"
  >
    <div class="flex justify-between items-center w-full px-6 py-4 max-w-[1200px] mx-auto">
      <!-- Logo -->
      <RouterLink to="/" class="font-bold text-2xl text-primary tracking-tight" style="font-family: 'Plus Jakarta Sans', sans-serif;">
        IKEBEST GROUP
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-10">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-gray-600 hover:text-primary transition-colors duration-200 font-medium text-[15px]"
          active-class="text-primary font-semibold border-b-2 border-primary pb-1"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- CTA + Mobile Toggle -->
      <div class="flex items-center gap-3">
        <RouterLink
          to="/about"
          class="hidden md:inline-flex bg-primary text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-container transition-all active:scale-95"
        >
          Get a Free Quote
        </RouterLink>
        <button
          class="md:hidden p-2 text-on-background"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
        >
          <span class="material-symbols-outlined">{{ mobileOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileOpen" class="md:hidden bg-white border-t border-gray-100 px-6 pb-6 space-y-4">
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="block text-gray-700 hover:text-primary font-medium py-2 text-base"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </RouterLink>
      <RouterLink
        to="/about"
        class="block bg-primary text-white text-center px-6 py-3 rounded-xl font-semibold text-sm"
        @click="mobileOpen = false"
      >
        Get a Free Quote
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/solar-energy', label: 'Solar Energy' },
  { to: '/cctv-security', label: 'CCTV & Security' },
  { to: '/real-estate', label: 'Real Estate' },
  { to: '/smart-home', label: 'Smart Home' },
]
</script>
