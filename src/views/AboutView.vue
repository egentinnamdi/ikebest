<template>
  <!-- Hero -->
  <section class="relative min-h-[520px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGVAgB0rxfW1jbdn3wN6MgCSIsdk0Rg7pVlCjQwiOjrG4nSwXiB6lNUm1uEkfedRfOpb_06UDz-z-b2QLy7TfesxX4FHJ-Vhbq6DqfDW4y-pMmL7bfwU_CDBxA1rDgtZj0rkUdIaIbx7hX1PHzikpJmkakXQjNH-X8_z4Z2ZwrKN5gKPZ6kTpIcPnfhzsZvPQbt-uLMv8C-M3RGBy75SkGsI0J6irOV3KDZmhlp3wMSsb0gF_3h7NKaeDBr7IH_u9G9LWo1_q1KvE"
        alt="IKEBEST Group corporate office"
        class="w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-[#161B30]/65"></div>
    </div>
    <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full py-24">
      <h1 class="text-[22px] sm:text-[36px] md:text-[56px] font-extrabold leading-[1.15] text-white mb-4" style="font-family: 'Montserrat', sans-serif;">
        About IKEBEST Group
      </h1>
      <p class="text-white/80 text-xl max-w-2xl">
        Building Nigeria's future through integrated power, security, and real estate solutions.
      </p>
    </div>
  </section>

  <!-- Our Story -->
  <section class="py-20 max-w-[1200px] mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div class="space-y-6">
        <div class="inline-block px-4 py-1.5 rounded-full bg-[#FAC030]/15 text-[#161B30] text-xs font-semibold uppercase tracking-widest">
          Our Heritage
        </div>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Montserrat', sans-serif;">The IKEBEST Journey</h2>
        <p class="text-gray-500 leading-relaxed">
          Founded with a vision to bridge the infrastructure gap in Delta State and beyond, IKEBEST Group has evolved from a specialised technical firm into a multi-sector company. Our roots are embedded in a pursuit of excellence and reliability.
        </p>
        <p class="text-gray-500 leading-relaxed">
          Today, we lead the way in renewable energy adoption, cutting-edge security surveillance, modern real estate development, and smart home automation. We don't just provide services — we build the foundations for a safer, more sustainable Nigeria.
        </p>
      </div>
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZWdD7jA1T1gv6Rsfw7XvWcGDiWVfVW1sg9rtmL2uBV0WVJx7LLQoJdqcKF2-R9_bSspnatbRHBsQmWCDSQyJFbooeB7Sg_ZBU-cNCp-MHWLAVbpo2JGsU63Q9iouba_y9imnXDup5uBlut-AYB43U7a3oGvJIUAEAo51z0B4OzVLDpx1i5zg8wfyer96AnzEIVqc_WcyOf_86Bc4LJjKjVGPxEa80Imnt6w_L0LkOtq1yO1Vt3QMnMQY-2gfnngn3ny2DBaV6qLk"
        alt="IKEBEST team working on a project"
        class="rounded-xl shadow-lg w-full aspect-[4/3] object-cover"
      />
    </div>
  </section>

  <!-- Stats -->
  <section class="bg-white py-16">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 sm:grid-cols-3">
        <div v-for="(stat, i) in stats" :key="stat.label" :data-raw="stat.raw"
          class="flex items-center gap-4 md:gap-8 px-6 md:px-16 py-8 sm:py-4"
        >
          <div class="text-[48px] sm:text-[60px] md:text-[72px] font-extrabold text-[#161B30] leading-none shrink-0" style="font-family: 'Montserrat', sans-serif;">
            <span class="about-counter" :data-suffix="stat.suffix">{{ stat.display }}</span>
          </div>
          <div class="border-l-4 border-[#FAC030] pl-4 md:pl-5">
            <div class="font-bold text-[15px] md:text-[17px] text-[#161B30] leading-snug">{{ stat.label }}</div>
            <div class="text-gray-500 text-sm mt-1 leading-snug line-clamp-2">{{ stat.sub }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission & Values -->
  <section class="py-0 overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-3">
      <div v-for="(item, i) in values" :key="item.title"
        class="relative flex flex-col justify-end min-h-[340px] p-10 group overflow-hidden"
        :class="i === 1 ? 'bg-[#FAC030]' : i === 0 ? 'bg-[#161B30]' : 'bg-[#1E2545]'"
      >
        <!-- big faint icon in background -->
        <span
          class="material-symbols-outlined absolute top-8 right-8 text-[120px] opacity-10 select-none pointer-events-none"
          :class="i === 1 ? 'text-[#161B30]' : 'text-white'"
          style="font-variation-settings:'FILL' 1;"
        >{{ item.icon }}</span>
        <div class="relative z-10">
          <span
            class="material-symbols-outlined text-[32px] mb-5 block"
            :class="i === 1 ? 'text-[#161B30]' : 'text-[#FAC030]'"
            style="font-variation-settings:'FILL' 1;"
          >{{ item.icon }}</span>
          <h3
            class="font-extrabold text-[26px] mb-3 leading-tight"
            :class="i === 1 ? 'text-[#161B30]' : 'text-white'"
            style="font-family: 'Montserrat', sans-serif;"
          >{{ item.title }}</h3>
          <p class="text-[15px] leading-relaxed" :class="i === 1 ? 'text-[#161B30]/75' : 'text-white/70'">{{ item.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Divisions -->
  <section class="py-20 bg-[#f4f6f8]">
    <div class="max-w-[1280px] mx-auto px-6">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary text-center mb-2">What We Do</p>
      <h2 class="text-4xl font-bold text-center text-gray-900 mb-14" style="font-family: 'Montserrat', sans-serif;">Our Business Divisions</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-7">
        <div v-for="div in divisions" :key="div.title" class="rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all group">
          <div class="relative h-[280px] overflow-hidden">
            <img :src="div.img" :alt="div.title" class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#161B30]/80 via-[#161B30]/20 to-transparent"></div>
            <div class="absolute bottom-5 left-5 flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[#161B30] text-[20px] bg-[#FAC030] p-2 rounded-lg" style="font-variation-settings:'FILL' 1;">{{ div.icon }}</span>
              <h4 class="font-extrabold text-white text-[20px]" style="font-family: 'Montserrat', sans-serif;">{{ div.title }}</h4>
            </div>
          </div>
          <div class="p-7">
            <p class="text-gray-500 text-[15px] leading-relaxed">{{ div.body }}</p>
            <RouterLink :to="div.to" class="inline-flex items-center gap-1.5 mt-5 text-[#161B30] font-bold text-sm hover:text-[#FAC030] transition-colors">
              Learn more <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-primary py-16">
    <div class="max-w-[800px] mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-white mb-4" style="font-family: 'Montserrat', sans-serif;">Ready to Work With Us?</h2>
      <p class="text-white/80 mb-8">Get in touch with our team and let's discuss what IKEBEST can do for you.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="tel:+2348139522490" class="bg-white text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px]">call</span> Call Us Now
        </a>
        <RouterLink to="/solar-energy" class="border-2 border-white text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all">
          Explore Our Services
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const container = el.closest('[data-raw]')
        if (!container) return
        const target = parseInt(container.dataset.raw)
        const suffix = el.dataset.suffix || ''
        let start = 0
        const duration = 1800
        const steps = 60
        const increment = target / steps
        const tick = () => {
          start += increment
          if (start >= target) {
            el.textContent = target + suffix
            return
          }
          el.textContent = Math.floor(start) + suffix
          requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.unobserve(el)
      }
    })
  }, { threshold: 0.4 })
  document.querySelectorAll('.about-counter').forEach(el => observer.observe(el))
})

const stats = [
  { display: '10+', raw: 10, suffix: '+', label: 'Years in Business', sub: 'Serving Delta State and beyond' },
  { display: '500+', raw: 500, suffix: '+', label: 'Solar Installations', sub: 'Homes and businesses powered' },
  { display: '300+', raw: 300, suffix: '+', label: 'Security Projects', sub: 'Properties protected 24/7' },
]

const values = [
  { icon: 'verified', title: 'Integrity', body: 'We operate with honesty and transparency. Every quote, timeline, and promise is one we keep.' },
  { icon: 'engineering', title: 'Technical Excellence', body: 'Our team is trained and certified in the latest technologies and installation best practices.' },
  { icon: 'groups', title: 'Client Focus', body: 'From first contact to after-sales support, we put the client\'s needs and satisfaction first.' },
]

const divisions = [
  {
    icon: 'solar_power',
    title: 'Solar Energy',
    body: 'Grid-tied and off-grid solar power systems for homes, businesses, and industrial clients across Delta State and beyond.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq9LCpDwfPlcT6MX0ogahmxaHtcvjkwurNjVUILumsDp-tiEYDIkwPkW2_CncahMk2O3uYoIiC3I5ZMLRbnBLmN2zRJ87AxxM-s1QiKNNPavrKu7KKmlrlnjqQaukop6TNqZKTRyA86dSvw6MyTtuNrrdwxEV1tu084abTQSRak_1_lSMXXD-j6zkKUzX1REY0OFjomSVT0g9Gsbhsbs3jnH0GHxphxrhR_a6RgGJQgQDURpwZB1UDtpt_Jw5zfICaiA8PNEmwQuM',
    to: '/solar-energy',
  },
  {
    icon: 'videocam',
    title: 'CCTV & Security',
    body: 'End-to-end security solutions — from HD cameras and biometrics to electric fencing and video intercoms.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_QWIi73l7IDotwrCsDpOeFro5ZgJLv1h2fBTiw-OiZfCCn6dl23KlqPJTVU-EFmfcKW6AJwrLc429HDGaUsXw80AOCA7T04i95HPezjlKJHOgZmJ374v-Xeb7p-dmuHnfBqcyfJtvV_OEwSdwO1z2UadVcBkbLa-4qO-zoB9yG0S7gOkWWWEVi01ZFXwIYoBjGC9eqgps18W5vRvrJfUJ8eR_pqxtoptQvonYxqbxOjUkDMR5spt5F6gwOQHER3QmKP6VD4iFJBs',
    to: '/cctv-security',
  },
  {
    icon: 'home_work',
    title: 'Real Estate',
    body: 'Property development, sales, and estate management for residential and commercial clients.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKxy35nklOqIW314MHs1N8XIT_SaE7D1jAwVqPxElkURqNzZ3oRvU7tbQh6H4LmMc2rQG2RZpNtl8Cebx9mTLobCyAh7OxiG5eQHz30q-VICnYAjfhEeun_A0EVgu6zla1tb7syRC31ICo9TClZgGg_8qhonkzKYJTqMcjXx_a2_zAC4kKg5CFQJ0Vgf2NZCxKD4viufM03KVTAABgRvWRTQObzNFLgTQJ6usujXWF8dj4Bz9hNWc1B7GkTdtszVODir_bGtphEGQ',
    to: '/real-estate',
  },
]
</script>
