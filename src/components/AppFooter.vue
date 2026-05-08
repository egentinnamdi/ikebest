<template>
  <footer class="bg-[#0d1120] text-white">
    <div class="max-w-[1280px] mx-auto px-8 pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

      <!-- Col 1: Brand -->
      <div>
        <img src="https://res.cloudinary.com/dtetfimeq/image/upload/v1778254790/footer-logo_zasbdc.png" alt="IKEBEST Group" class="h-16 w-auto mb-6" />
        <p class="text-gray-400 text-sm leading-relaxed mb-7">Leading the way in power, security, and smart space solutions for the modern Nigerian home and business.</p>
        <div class="flex items-center gap-4 mb-7">
          <div class="w-12 h-12 rounded-full bg-[#FAC030] flex items-center justify-center shrink-0">
            <i class="fa-solid fa-phone text-[#161B30] text-[17px]"></i>
          </div>
          <div>
            <p class="text-gray-400 text-xs mb-0.5">Call support 24/7</p>
            <p class="text-white font-bold text-[17px]">08139522490</p>
          </div>
        </div>
        <div class="flex gap-3">
          <a v-for="s in socials" :key="s.fa" :href="s.href"
            class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-[#FAC030] hover:text-[#FAC030] transition-colors text-gray-400">
            <i :class="s.fa + ' text-[14px]'"></i>
          </a>
        </div>
      </div>

      <!-- Col 2: Quick Links -->
      <div>
        <h4 class="text-[#FAC030] font-bold text-xs uppercase tracking-[0.18em] mb-6">Quick Links</h4>
        <ul class="space-y-4">
          <li><RouterLink to="/about" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">About IKEBEST</RouterLink></li>
          <li><RouterLink to="/about" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">Our History</RouterLink></li>
          <li><RouterLink to="/solar-energy" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">Our Team</RouterLink></li>
          <li><RouterLink to="/solar-energy" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">Get a Quote</RouterLink></li>
          <li><RouterLink to="/cctv-security" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">Our Pricing</RouterLink></li>
        </ul>
      </div>

      <!-- Col 3: Contact Us -->
      <div>
        <h4 class="text-[#FAC030] font-bold text-xs uppercase tracking-[0.18em] mb-6">Contact Us</h4>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            <i class="fa-solid fa-location-dot text-[#FAC030] text-[14px] shrink-0 mt-1"></i>
            <span class="text-gray-300 text-[15px] leading-snug">Solar house behind NTA,<br />Okpanam Road, Asaba</span>
          </li>
          <li class="flex items-center gap-3">
            <i class="fa-regular fa-clock text-[#FAC030] text-[14px] shrink-0"></i>
            <span class="text-gray-300 text-[15px]">Mon - Sat: 8:00 AM - 6:00 PM</span>
          </li>
          <li class="flex items-center gap-3">
            <i class="fa-solid fa-phone text-[#FAC030] text-[14px] shrink-0"></i>
            <span class="text-gray-300 text-[15px]">08139522490</span>
          </li>
          <li class="flex items-center gap-3">
            <i class="fa-solid fa-envelope text-[#FAC030] text-[14px] shrink-0"></i>
            <span class="text-gray-300 text-[15px]">info@ikebest.com</span>
          </li>
        </ul>
      </div>

      <!-- Col 4: Service List -->
      <div>
        <h4 class="text-[#FAC030] font-bold text-xs uppercase tracking-[0.18em] mb-6">Service List</h4>
        <ul class="space-y-4">
          <li><RouterLink to="/solar-energy" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">Solar Energy Systems</RouterLink></li>
          <li><RouterLink to="/cctv-security" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">CCTV &amp; Security</RouterLink></li>
          <li><RouterLink to="/smart-home" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">Smart Home</RouterLink></li>
          <li><RouterLink to="/real-estate" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">Real Estate</RouterLink></li>
          <li><a href="#" class="text-gray-300 text-[15px] hover:text-[#FAC030] transition-colors">General Contracting</a></li>
        </ul>
      </div>

    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/10 py-5 px-8 text-center">
      <p class="text-gray-500 text-sm">© 2025 IKEBEST GROUP. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { fa: 'fa-brands fa-facebook-f', href: '#' },
  { fa: 'fa-brands fa-linkedin-in', href: '#' },
  { fa: 'fa-brands fa-instagram', href: '#' },
  { fa: 'fa-brands fa-x-twitter', href: '#' },
  { fa: 'fa-brands fa-whatsapp', href: '#' },
]
</script>
