<template>
  <!-- Hero -->
  <section class="relative h-[580px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw-C775UX2Hc1-x0GSyuPOIprYgdPNpu15AKM28v-Wl6UIXDYFMaaOvj9iP0aO4-dwsi2df6SP2l6YZvhrOZnyHeFXvW7SCXwLCiUDNZMKC_CoqI6ZExsW7e6zvyH4PkJavv6pvVNHCqXpcR5gyB_2LpuXUlqNBnwEeuZnkFCHIi35Nfz7Ja76gLcyWn5RIqxhtgwzKRy6y5SIegGbf-jHHW9RGLfToFCNxBrdGIVE-2pJRw4ZeYlRzzurdrp-828MEMJJamJMlN8"
        alt="Modern Nigerian duplex in Asaba"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/75 to-transparent"></div>
    </div>
    <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
      <div class="max-w-2xl">
        <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
          Premium Real Estate
        </span>
        <h1 class="text-[56px] font-extrabold leading-[1.1] text-white mb-6" style="font-family: 'Plus Jakarta Sans', sans-serif;">
          Quality Properties<br />in Asaba
        </h1>
        <p class="text-white/80 text-lg mb-8 leading-relaxed">
          Modern housing solutions designed for comfort and built for the future in the heart of Delta State.
        </p>
        <div class="flex gap-4 flex-wrap">
          <a href="#listings" class="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all">
            Browse Properties
          </a>
          <a href="#enquiry" class="border-2 border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all">
            Speak to an Agent
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Real Estate Services -->
  <section class="py-20 bg-white">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What We Offer</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Our Real Estate Services</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="svc in services" :key="svc.title" class="service-card bg-white p-6 rounded-xl hover:shadow-md transition-all text-center">
          <span class="material-symbols-outlined text-primary text-[44px] mb-4 block" style="font-variation-settings:'FILL' 1;">{{ svc.icon }}</span>
          <h3 class="font-bold text-[17px] text-gray-900 mb-2" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ svc.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ svc.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Listings -->
  <section id="listings" class="bg-[#f4f6f8] py-20">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Properties</p>
          <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Current Listings</h2>
        </div>
        <!-- Filter tabs -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in filters"
            :key="tab"
            @click="activeFilter = tab"
            class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            :class="activeFilter === tab ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-300 hover:border-primary hover:text-primary'"
          >
            {{ tab }}
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="prop in filteredListings" :key="prop.title" class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
          <div class="relative">
            <img :src="prop.img" :alt="prop.title" class="w-full aspect-video object-cover" />
            <span class="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
              :class="{
                'bg-green-100 text-green-800': prop.status === 'For Sale',
                'bg-blue-100 text-blue-800': prop.status === 'For Rent',
                'bg-amber-100 text-amber-800': prop.status === 'Off-Plan',
              }">
              {{ prop.status }}
            </span>
          </div>
          <div class="p-5">
            <h4 class="font-bold text-[17px] text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ prop.title }}</h4>
            <div class="flex items-center gap-1 text-sm text-gray-500 mt-1 mb-3">
              <span class="material-symbols-outlined text-[15px]">location_on</span>
              {{ prop.location }}
            </div>
            <div class="flex gap-4 text-sm text-gray-600 mb-4">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-primary">bed</span> {{ prop.beds }} Beds</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-primary">bathtub</span> {{ prop.baths }} Baths</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px] text-primary">square_foot</span> {{ prop.sqm }} sqm</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-bold text-primary text-lg" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ prop.price }}</span>
              <a href="#enquiry" class="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                View Details <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
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
        <h2 class="text-4xl font-bold text-gray-900 mb-5" style="font-family: 'Plus Jakarta Sans', sans-serif;">Why Buy From IKEBEST</h2>
        <ul class="space-y-5">
          <li v-for="point in trustPoints" :key="point.title" class="flex gap-4 items-start">
            <span class="material-symbols-outlined text-primary bg-green-50 p-2.5 rounded-lg text-[22px] flex-shrink-0" style="font-variation-settings:'FILL' 1;">{{ point.icon }}</span>
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

  <!-- Enquiry Form -->
  <section id="enquiry" class="py-20 bg-[#f4f6f8]">
    <div class="max-w-[700px] mx-auto px-6 text-center">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Contact Us</p>
      <h2 class="text-4xl font-bold text-gray-900 mb-4" style="font-family: 'Plus Jakarta Sans', sans-serif;">Interested in a Property?</h2>
      <p class="text-gray-500 mb-10">Talk to our real estate team today and let us help you find the right property.</p>
      <form class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-left space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block font-semibold text-sm text-gray-900 mb-1.5">Full Name</label>
            <input class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" placeholder="Your name" type="text" />
          </div>
          <div>
            <label class="block font-semibold text-sm text-gray-900 mb-1.5">Phone Number</label>
            <input class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" placeholder="080 000 0000" type="tel" />
          </div>
        </div>
        <div>
          <label class="block font-semibold text-sm text-gray-900 mb-1.5">I'm Looking To</label>
          <select class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm bg-white">
            <option>Buy a Property</option>
            <option>Rent a Property</option>
            <option>Buy Land</option>
            <option>Invest in Off-Plan</option>
          </select>
        </div>
        <div>
          <label class="block font-semibold text-sm text-gray-900 mb-1.5">Budget Range</label>
          <select class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm bg-white">
            <option>Below ₦10 million</option>
            <option>₦10M – ₦30M</option>
            <option>₦30M – ₦80M</option>
            <option>Above ₦80M</option>
          </select>
        </div>
        <div>
          <label class="block font-semibold text-sm text-gray-900 mb-1.5">Additional Notes</label>
          <textarea class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm resize-none" rows="3" placeholder="Location preference, specific requirements..."></textarea>
        </div>
        <button class="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all">
          Send Enquiry
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ['All', 'For Sale', 'For Rent', 'Land']
const activeFilter = ref('All')

const listings = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKxy35nklOqIW314MHs1N8XIT_SaE7D1jAwVqPxElkURqNzZ3oRvU7tbQh6H4LmMc2rQG2RZpNtl8Cebx9mTLobCyAh7OxiG5eQHz30q-VICnYAjfhEeun_A0EVgu6zla1tb7syRC31ICo9TClZgGg_8qhonkzKYJTqMcjXx_a2_zAC4kKg5CFQJ0Vgf2NZCxKD4viufM03KVTAABgRvWRTQObzNFLgTQJ6usujXWF8dj4Bz9hNWc1B7GkTdtszVODir_bGtphEGQ',
    status: 'For Sale', title: '4-Bedroom Duplex', location: 'GRA, Asaba', beds: 4, baths: 3, sqm: 350, price: '₦45,000,000',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuvbvRA1H_UkJZ4I3kHEE4g8sX5Br9perf3HSr69A4_d7MeIKEpzxfs5DX5UbDbKn4fzKYsD20WMqal88XvJayw90qRM-cBZEPOHel7BDQFrWMHOaIWnOjZ484kDZroNzRL3T4p1s8mBh2HM4OV2Zf-phCUrIxDStlyiwE91bHNFAFpV2zFxXGWPsKS20S6t0yJd83knQ6DbzAgyz5aJJNkNYc-VpCx-IPl7eXeM2eQ_W3e4HdU2WPJIURq0l8Y3h9MpJecyQby7o',
    status: 'For Rent', title: '3-Bedroom Bungalow', location: 'Okpanam Road, Asaba', beds: 3, baths: 2, sqm: 220, price: '₦1,500,000/yr',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw-C775UX2Hc1-x0GSyuPOIprYgdPNpu15AKM28v-Wl6UIXDYFMaaOvj9iP0aO4-dwsi2df6SP2l6YZvhrOZnyHeFXvW7SCXwLCiUDNZMKC_CoqI6ZExsW7e6zvyH4PkJavv6pvVNHCqXpcR5gyB_2LpuXUlqNBnwEeuZnkFCHIi35Nfz7Ja76gLcyWn5RIqxhtgwzKRy6y5SIegGbf-jHHW9RGLfToFCNxBrdGIVE-2pJRw4ZeYlRzzurdrp-828MEMJJamJMlN8',
    status: 'Off-Plan', title: '5-Bedroom Luxury Duplex', location: 'Ibusa, Delta State', beds: 5, baths: 4, sqm: 480, price: '₦65,000,000',
  },
]

const filteredListings = computed(() =>
  activeFilter.value === 'All'
    ? listings
    : listings.filter(l => l.status === activeFilter.value)
)

const services = [
  { icon: 'home_work', title: 'Property Development', body: 'We build premium residential projects from ground up in prime Asaba locations.' },
  { icon: 'sell', title: 'Property Sales', body: 'Buy or sell residential and commercial properties with our experienced agents.' },
  { icon: 'landscape', title: 'Land Sales', body: 'Verified serviced plots of land in secure estates across Delta State.' },
  { icon: 'manage_accounts', title: 'Estate Management', body: 'Professional management for landlords — from tenant screening to maintenance.' },
]

const trustPoints = [
  { icon: 'gavel', title: 'Clear Title Documentation', body: 'All our properties come with verified and clean title documents — C of O, deeds, and receipts.' },
  { icon: 'location_on', title: 'Prime Asaba Locations', body: 'We develop and sell in established, growing neighbourhoods in and around Asaba.' },
  { icon: 'construction', title: 'Quality Construction', body: 'Built with quality materials and to Nigerian building standards for durability.' },
  { icon: 'support_agent', title: 'Post-Sale Support', body: 'We remain available after the sale for documentation, transfers, and related needs.' },
]
</script>
