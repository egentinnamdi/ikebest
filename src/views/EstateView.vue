<template>
  <!-- Hero -->
  <section class="relative min-h-[580px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw-C775UX2Hc1-x0GSyuPOIprYgdPNpu15AKM28v-Wl6UIXDYFMaaOvj9iP0aO4-dwsi2df6SP2l6YZvhrOZnyHeFXvW7SCXwLCiUDNZMKC_CoqI6ZExsW7e6zvyH4PkJavv6pvVNHCqXpcR5gyB_2LpuXUlqNBnwEeuZnkFCHIi35Nfz7Ja76gLcyWn5RIqxhtgwzKRy6y5SIegGbf-jHHW9RGLfToFCNxBrdGIVE-2pJRw4ZeYlRzzurdrp-828MEMJJamJMlN8"
        alt="Modern Nigerian duplex in Asaba"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/75 to-transparent"></div>
    </div>
    <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full py-20">
      <div class="max-w-2xl">
        <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
          Premium Real Estate
        </span>
        <h1 class="text-[22px] sm:text-[36px] md:text-[56px] font-extrabold leading-[1.15] text-white mb-6" style="font-family: 'Montserrat', sans-serif;">
          Quality Properties<br />in Asaba
        </h1>
        <p class="text-white/80 text-lg mb-8 leading-relaxed">
          Modern housing solutions designed for comfort and built for the future in the heart of Delta State.
        </p>
        <div class="flex gap-4 flex-wrap">
          <a href="#services" class="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#1E2545] transition-all">
            Our Services
          </a>
          <a href="tel:+2348139522490" class="border-2 border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all">
            Speak to an Agent
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Real Estate Services -->
  <section id="services" class="py-20 bg-[#f4f6f8]">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What We Offer</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Montserrat', sans-serif;">Our Real Estate Services</h2>
        <p class="text-gray-500 mt-3 max-w-xl mx-auto text-[15px]">From land to luxury — every step of the property journey, handled with expertise.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div v-for="svc in services" :key="svc.title" class="rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300 group">
          <div class="relative h-[220px] overflow-hidden">
            <img :src="svc.img" :alt="svc.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#161B30]/85 via-[#161B30]/20 to-transparent"></div>
            <div class="absolute bottom-5 left-5 flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[#161B30] bg-[#FAC030] p-2 rounded-lg text-[20px]" style="font-variation-settings:'FILL' 1;">{{ svc.icon }}</span>
              <h4 class="font-extrabold text-white text-[18px]" style="font-family: 'Montserrat', sans-serif;">{{ svc.title }}</h4>
            </div>
          </div>
          <div class="p-7">
            <p class="text-gray-500 text-[15px] leading-relaxed">{{ svc.body }}</p>
            <a href="tel:+2348139522490" class="inline-flex items-center gap-1.5 mt-5 text-[#161B30] font-bold text-sm hover:text-[#FAC030] transition-colors">
              Contact Us <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Buy From IKEBEST -->
  <section class="py-20 bg-white">
    <div class="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Why Choose Us</p>
        <h2 class="text-4xl font-bold text-gray-900 mb-5" style="font-family: 'Montserrat', sans-serif;">Why Buy From IKEBEST</h2>
        <ul class="space-y-5">
          <li v-for="point in trustPoints" :key="point.title" class="flex gap-4 items-start">
            <span class="material-symbols-outlined text-[#161B30] bg-[#FAC030] p-2.5 rounded-lg text-[22px] flex-shrink-0" style="font-variation-settings:'FILL' 1;">{{ point.icon }}</span>
            <div>
              <h4 class="font-semibold text-gray-900 mb-0.5">{{ point.title }}</h4>
              <p class="text-gray-500 text-sm leading-relaxed">{{ point.body }}</p>
            </div>
          </li>
        </ul>
      </div>
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKxy35nklOqIW314MHs1N8XIT_SaE7D1jAwVqPxElkURqNzZ3oRvU7tbQh6H4LmMc2rQG2RZpNtl8Cebx9mTLobCyAh7OxiG5eQHz30q-VICnYAjfhEeun_A0EVgu6zla1tb7syRC31ICo9TClZgGg_8qhonkzKYJTqMcjXx_a2_zAC4kKg5CFQJ0Vgf2NZCxKD4viufM03KVTAABgRvWRTQObzNFLgTQJ6usujXWF8dj4Bz9hNWc1B7GkTdtszVODir_bGtphEGQ"
        alt="Nigerian property development"
        class="rounded-xl shadow-lg w-full aspect-[4/3] object-cover"
      />
    </div>
  </section>

</template>

<script setup>
const services = [
  { icon: 'home_work', title: 'Property Development', body: 'We build premium residential projects from ground up in prime Asaba locations.', img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop' },
  { icon: 'sell', title: 'Property Sales', body: 'Buy or sell residential and commercial properties with our experienced agents.', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop' },
  { icon: 'landscape', title: 'Land Sales', body: 'Verified serviced plots of land in secure estates across Delta State.', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80&auto=format&fit=crop' },
  { icon: 'manage_accounts', title: 'Estate Management', body: 'Professional management for landlords — from tenant screening to maintenance.', img: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80&auto=format&fit=crop' },
]

const trustPoints = [
  { icon: 'gavel', title: 'Clear Title Documentation', body: 'All our properties come with verified and clean title documents — C of O, deeds, and receipts.' },
  { icon: 'location_on', title: 'Prime Asaba Locations', body: 'We develop and sell in established, growing neighbourhoods in and around Asaba.' },
  { icon: 'construction', title: 'Quality Construction', body: 'Built with quality materials and to Nigerian building standards for durability.' },
  { icon: 'support_agent', title: 'Post-Sale Support', body: 'We remain available after the sale for documentation, transfers, and related needs.' },
]
</script>
