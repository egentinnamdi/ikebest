<template>
  <header class="w-full bg-white border-b border-gray-200 shadow-sm">
    <div class="flex justify-between items-center max-w-[1280px] mx-auto px-8 py-4">

      <!-- Logo -->
      <RouterLink to="/" class="flex-shrink-0">
        <img
          src="https://res.cloudinary.com/dtetfimeq/image/upload/v1778246625/ikebest-logo_cgx4cg.png"
          alt="IKEBEST Group"
          class="h-10 md:h-16 w-auto"
        />
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-gray-600 hover:text-[#161B30] transition-colors font-medium text-[15px]"
          active-class="text-[#161B30] font-semibold border-b-2 border-[#FAC030] pb-1"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- CTA + Hamburger -->
      <div class="flex items-center gap-3">
        <RouterLink
          to="/about"
          class="hidden md:inline-flex px-7 py-3 rounded-xl bg-[#FAC030] text-[#161B30] font-bold text-[15px] hover:bg-yellow-300 transition-all active:scale-95 shadow-sm"
        >
          Get a Quote
        </RouterLink>
        <button
          class="md:hidden p-2 text-gray-800"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
        >
          <span class="material-symbols-outlined">{{ mobileOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileOpen" class="md:hidden px-6 pb-6 space-y-3 border-t border-gray-100 bg-white">
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="block font-medium py-2.5 text-base text-gray-700 hover:text-[#161B30] border-b border-gray-100"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </RouterLink>
      <RouterLink
        to="/about"
        class="block text-center px-6 py-3 rounded-xl bg-[#FAC030] text-[#161B30] font-bold text-[15px] mt-2"
        @click="mobileOpen = false"
      >
        Get a Quote
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

