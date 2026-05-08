<template>
  <!-- Hero -->
  <section class="relative min-h-[520px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGVAgB0rxfW1jbdn3wN6MgCSIsdk0Rg7pVlCjQwiOjrG4nSwXiB6lNUm1uEkfedRfOpb_06UDz-z-b2QLy7TfesxX4FHJ-Vhbq6DqfDW4y-pMmL7bfwU_CDBxA1rDgtZj0rkUdIaIbx7hX1PHzikpJmkakXQjNH-X8_z4Z2ZwrKN5gKPZ6kTpIcPnfhzsZvPQbt-uLMv8C-M3RGBy75SkGsI0J6irOV3KDZmhlp3wMSsb0gF_3h7NKaeDBr7IH_u9G9LWo1_q1KvE"
        alt="IKEBEST Group corporate office in Asaba"
        class="w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-[#161B30]/65"></div>
    </div>
    <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full py-24">
      <h1 class="text-[36px] md:text-[56px] font-extrabold leading-[1.1] text-white mb-4" style="font-family: 'Montserrat', sans-serif;">
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
        alt="IKEBEST team working in Asaba"
        class="rounded-xl shadow-lg w-full aspect-[4/3] object-cover"
      />
    </div>
  </section>

  <!-- Stats -->
  <section class="bg-primary py-16">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        <div v-for="stat in stats" :key="stat.value">
          <div class="text-4xl font-extrabold mb-2" style="font-family: 'Montserrat', sans-serif;">{{ stat.value }}</div>
          <div class="text-white/80 text-sm font-medium uppercase tracking-wide">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission & Values -->
  <section class="py-20 bg-[#f4f6f8]">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What Drives Us</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Montserrat', sans-serif;">Our Mission & Values</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="item in values" :key="item.title" class="bg-white service-card p-8 rounded-xl hover:shadow-md transition-all text-center">
          <div class="w-14 h-14 bg-[#FAC030]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings:'FILL' 1;">{{ item.icon }}</span>
          </div>
          <h3 class="font-bold text-[22px] text-gray-900 mb-3" style="font-family: 'Montserrat', sans-serif;">{{ item.title }}</h3>
          <p class="text-gray-500 text-[15px] leading-relaxed">{{ item.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Divisions -->
  <section class="py-20 max-w-[1200px] mx-auto px-6">
    <p class="text-xs font-semibold uppercase tracking-widest text-primary text-center mb-2">What We Do</p>
    <h2 class="text-4xl font-bold text-center text-gray-900 mb-14" style="font-family: 'Montserrat', sans-serif;">Our Business Divisions</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="div in divisions" :key="div.title" class="flex gap-5 bg-[#f4f6f8] p-6 rounded-xl items-start hover:bg-[#FAC030]/10 transition-all">
        <span class="material-symbols-outlined text-primary text-[36px] flex-shrink-0 mt-1" style="font-variation-settings:'FILL' 1;">{{ div.icon }}</span>
        <div>
          <h4 class="font-bold text-[17px] text-gray-900 mb-1" style="font-family: 'Montserrat', sans-serif;">{{ div.title }}</h4>
          <p class="text-gray-500 text-sm leading-relaxed">{{ div.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-primary py-16">
    <div class="max-w-[800px] mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-white mb-4" style="font-family: 'Montserrat', sans-serif;">Ready to Work With Us?</h2>
      <p class="text-white/80 mb-8">Get in touch with our team in Asaba and let's discuss what IKEBEST can do for you.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="tel:+2348004532378" class="bg-white text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2">
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
const stats = [
  { value: '10+', label: 'Years in Business' },
  { value: '500+', label: 'Solar Installations' },
  { value: '300+', label: 'Security Projects' },
  { value: '50+', label: 'Properties Sold' },
]

const values = [
  { icon: 'verified', title: 'Integrity', body: 'We operate with honesty and transparency. Every quote, timeline, and promise is one we keep.' },
  { icon: 'engineering', title: 'Technical Excellence', body: 'Our team is trained and certified in the latest technologies and installation best practices.' },
  { icon: 'groups', title: 'Client Focus', body: 'From first contact to after-sales support, we put the client\'s needs and satisfaction first.' },
]

const divisions = [
  { icon: 'solar_power', title: 'Solar Energy', body: 'Grid-tied and off-grid solar power systems for homes, businesses, and industrial clients across Delta State and beyond.' },
  { icon: 'videocam', title: 'CCTV & Security', body: 'End-to-end security solutions — from HD cameras and biometrics to electric fencing and video intercoms.' },
  { icon: 'home_work', title: 'Real Estate', body: 'Property development, sales, and estate management for residential and commercial clients in Asaba.' },
  { icon: 'home_iot_device', title: 'Smart Home', body: 'Intelligent home automation — lighting, locks, gates, climate, and CCTV integrated into a single app.' },
]
</script>
