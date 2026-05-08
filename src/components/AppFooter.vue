<template>
  <footer class="bg-[#27313e] text-white">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 py-20 max-w-[1200px] mx-auto">
      <!-- Brand -->
      <div>
        <div class="font-bold text-2xl text-white mb-4" style="font-family: 'Plus Jakarta Sans', sans-serif;">IKEBEST GROUP</div>
        <p class="text-gray-400 text-sm leading-relaxed mb-6">Leading the way in power, security, and smart space solutions for the modern Nigerian home and business.</p>
        <p class="text-xs text-gray-500 italic">Power. Security. Space. Comfort.</p>
      </div>

      <!-- Services -->
      <div>
        <h4 class="text-white font-semibold mb-4">Our Services</h4>
        <ul class="space-y-3">
          <li v-for="link in serviceLinks" :key="link.to">
            <RouterLink :to="link.to" class="text-gray-400 text-sm hover:text-green-400 transition-colors">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h4 class="text-white font-semibold mb-4">Company</h4>
        <ul class="space-y-3">
          <li><RouterLink to="/about" class="text-gray-400 text-sm hover:text-green-400 transition-colors">About Us</RouterLink></li>
          <li><a href="#" class="text-gray-400 text-sm hover:text-green-400 transition-colors">Projects</a></li>
          <li><a href="#" class="text-gray-400 text-sm hover:text-green-400 transition-colors">Contact</a></li>
          <li><a href="#" class="text-gray-400 text-sm hover:text-green-400 transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="text-gray-400 text-sm hover:text-green-400 transition-colors">Terms of Service</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-white font-semibold mb-4">Head Office</h4>
        <p class="text-gray-400 text-sm mb-2">Asaba, Delta State, Nigeria</p>
        <p class="text-gray-400 text-sm mb-2">Mon – Sat: 8:00 AM – 6:00 PM</p>
        <p class="text-green-400 font-semibold mt-4">+234 800 453 2378</p>
        <p class="text-gray-400 text-sm mt-1">info@ikebestgroup.com</p>
      </div>
    </div>

    <div class="max-w-[1200px] mx-auto px-6 py-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2">
      <p class="text-gray-500 text-sm">© 2025 IKEBEST GROUP. All Rights Reserved.</p>
      <p class="text-gray-600 text-xs">Power. Security. Space. Comfort.</p>
    </div>
  </footer>
</template>

<script setup>
const serviceLinks = [
  { to: '/solar-energy', label: 'Solar Energy' },
  { to: '/cctv-security', label: 'CCTV & Security' },
  { to: '/real-estate', label: 'Real Estate' },
  { to: '/smart-home', label: 'Smart Home' },
]
</script>
