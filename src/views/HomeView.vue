<template>
  <!-- Hero -->
  <section class="relative min-h-[640px] flex items-center overflow-hidden">
    <!-- Video background -->
    <video
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source
        src="https://videos.pexels.com/video-files/3150048/3150048-hd_1920_1080_25fps.mp4"
        type="video/mp4"
      />
    </video>
    <!-- Dark overlay -->
    <div class="absolute inset-0 z-10 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent"></div>
    <!-- Content -->
    <div class="relative z-20 max-w-[1200px] mx-auto w-full px-6 py-24">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-sm">
          <span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1;">verified</span>
          Asaba's Trusted Technology Company
        </div>
        <h1 class="text-[56px] font-extrabold leading-[1.1] tracking-tight text-white mb-6" style="font-family: 'Plus Jakarta Sans', sans-serif;">
          Powering Homes &amp; Businesses<br />
          <span class="text-green-400">Across Delta State.</span>
        </h1>
        <p class="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
          Solar energy, CCTV security, real estate, and smart home solutions — all from one trusted company in Asaba.
        </p>
        <div class="flex flex-wrap gap-4">
          <RouterLink to="/about" class="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all active:scale-95">
            Get a Free Quote
          </RouterLink>
          <RouterLink to="/solar-energy" class="border-2 border-white/50 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all">
            Our Services
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust Bar -->
  <section class="bg-[#eef4ff] py-12 border-y border-gray-200">
    <div class="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div v-for="stat in stats" :key="stat.label">
        <div class="text-4xl font-extrabold text-primary" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ stat.value }}</div>
        <div class="text-xs font-semibold uppercase tracking-widest text-gray-500 mt-1">{{ stat.label }}</div>
      </div>
    </div>
  </section>

  <!-- About Preview -->
  <section class="py-20 px-6 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
    <div class="grid grid-cols-2 gap-3">
      <div class="space-y-3">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_QWIi73l7IDotwrCsDpOeFro5ZgJLv1h2fBTiw-OiZfCCn6dl23KlqPJTVU-EFmfcKW6AJwrLc429HDGaUsXw80AOCA7T04i95HPezjlKJHOgZmJ374v-Xeb7p-dmuHnfBqcyfJtvV_OEwSdwO1z2UadVcBkbLa-4qO-zoB9yG0S7gOkWWWEVi01ZFXwIYoBjGC9eqgps18W5vRvrJfUJ8eR_pqxtoptQvonYxqbxOjUkDMR5spt5F6gwOQHER3QmKP6VD4iFJBs"
          alt="IKEBEST technician installing CCTV"
          class="rounded-xl aspect-[3/4] object-cover shadow-sm w-full"
        />
        <div class="bg-primary p-5 rounded-xl text-white">
          <span class="font-bold text-lg" style="font-family: 'Plus Jakarta Sans', sans-serif;">Local</span>
          <p class="text-sm opacity-90 mt-1">Expertise on the ground in Delta State.</p>
        </div>
      </div>
      <div class="pt-10">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuvbvRA1H_UkJZ4I3kHEE4g8sX5Br9perf3HSr69A4_d7MeIKEpzxfs5DX5UbDbKn4fzKYsD20WMqal88XvJayw90qRM-cBZEPOHel7BDQFrWMHOaIWnOjZ484kDZroNzRL3T4p1s8mBh2HM4OV2Zf-phCUrIxDStlyiwE91bHNFAFpV2zFxXGWPsKS20S6t0yJd83knQ6DbzAgyz5aJJNkNYc-VpCx-IPl7eXeM2eQ_W3e4HdU2WPJIURq0l8Y3h9MpJecyQby7o"
          alt="Modern Nigerian residential building"
          class="rounded-xl aspect-[3/5] object-cover shadow-sm w-full"
        />
      </div>
    </div>
    <div class="space-y-6">
      <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Building the Future of<br />Modern Living.</h2>
      <p class="text-gray-600 leading-relaxed">
        IKEBEST GROUP is more than a service provider — we are your partners in progress. We integrate technology with reliable infrastructure to elevate your lifestyle and business operations in Delta State and beyond.
      </p>
      <div class="grid grid-cols-2 gap-5 pt-2">
        <div v-for="service in aboutServices" :key="service.title" class="flex items-start gap-3">
          <span class="material-symbols-outlined text-primary bg-green-50 p-2.5 rounded-lg text-[22px]" style="font-variation-settings:'FILL' 1;">{{ service.icon }}</span>
          <div>
            <div class="font-semibold text-sm text-gray-900">{{ service.title }}</div>
            <div class="text-xs text-gray-500 mt-0.5">{{ service.sub }}</div>
          </div>
        </div>
      </div>
      <RouterLink to="/about" class="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
        Learn More About Us
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </RouterLink>
    </div>
  </section>

  <!-- Services Section -->
  <section class="bg-[#f4f6f8] py-20">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14 space-y-3">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary">What We Do</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Our Core Services</h2>
        <p class="text-gray-500 max-w-2xl mx-auto text-[15px]">Expertly delivered solutions tailored for the unique needs of Nigerian homes and businesses.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="svc in services"
          :key="svc.title"
          class="service-card bg-white p-6 rounded-xl flex flex-col h-full hover:shadow-lg transition-all group"
        >
          <span class="material-symbols-outlined text-primary text-[48px] mb-5" style="font-variation-settings:'FILL' 1;">{{ svc.icon }}</span>
          <h3 class="font-bold text-xl mb-2 text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ svc.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed flex-grow mb-5">{{ svc.body }}</p>
          <RouterLink :to="svc.to" class="text-primary font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
            Learn More <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <section class="py-20 px-6 max-w-[1200px] mx-auto">
    <div class="text-center mb-14">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Our Advantage</p>
      <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Why Choose IKEBEST</h2>
      <p class="text-gray-500 mt-3 text-[15px]">The difference is in our commitment to excellence and local presence.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-for="reason in reasons" :key="reason.title" class="space-y-2">
        <span class="material-symbols-outlined text-primary text-[32px]">{{ reason.icon }}</span>
        <h4 class="font-bold text-[18px] text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ reason.title }}</h4>
        <p class="text-gray-500 text-sm leading-relaxed">{{ reason.body }}</p>
      </div>
    </div>
  </section>

  <!-- Recent Projects -->
  <section class="bg-[#f4f6f8] py-20">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Our Work</p>
          <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Recent Projects</h2>
        </div>
        <a href="#" class="text-primary font-semibold border-b-2 border-primary pb-0.5 text-sm">View All Projects</a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="proj in projects" :key="proj.title" class="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white">
          <img :src="proj.img" :alt="proj.alt" class="w-full aspect-video object-cover" />
          <div class="p-5 space-y-1.5">
            <span class="bg-green-50 text-primary text-[11px] font-bold uppercase px-2 py-0.5 rounded">{{ proj.tag }}</span>
            <h4 class="font-bold text-[17px] text-gray-900 mt-1" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ proj.title }}</h4>
            <div class="flex items-center gap-1 text-sm text-gray-500">
              <span class="material-symbols-outlined text-[15px]">location_on</span>
              <span>{{ proj.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-20 px-6 max-w-[1200px] mx-auto">
    <p class="text-xs font-semibold uppercase tracking-widest text-primary text-center mb-2">Client Reviews</p>
    <h2 class="text-4xl font-bold text-center text-gray-900 mb-12" style="font-family: 'Plus Jakarta Sans', sans-serif;">What Our Clients Say</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="t in testimonials" :key="t.name" class="bg-[#f4f6f8] p-8 rounded-xl border border-gray-200">
        <div class="flex text-primary mb-4">
          <span v-for="n in 5" :key="n" class="material-symbols-outlined text-[18px]" style="font-variation-settings:'FILL' 1;">star</span>
        </div>
        <p class="text-gray-600 italic text-sm leading-relaxed mb-5">"{{ t.review }}"</p>
        <div class="font-semibold text-gray-900 text-sm">{{ t.name }}</div>
        <div class="text-xs text-gray-500">{{ t.role }}</div>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="max-w-[1200px] mx-auto px-6 mb-20">
    <div class="bg-primary rounded-3xl p-16 text-center text-white">
      <h2 class="text-4xl font-extrabold mb-4" style="font-family: 'Plus Jakarta Sans', sans-serif;">Ready to Get Started?</h2>
      <p class="text-white/85 max-w-xl mx-auto mb-8 text-[15px] leading-relaxed">
        Contact us today for a free consultation and let us bring your vision to life with power, security, and smart technology.
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="tel:+2348004532378" class="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
          Call Us Now
        </a>
        <RouterLink to="/about" class="border-2 border-white/50 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
          Send a Message
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '500+', label: 'Solar Installations' },
  { value: '300+', label: 'CCTV Systems' },
  { value: '50+', label: 'Properties Managed' },
  { value: '10+', label: 'Years Experience' },
]

const aboutServices = [
  { icon: 'solar_power', title: 'Solar Power', sub: 'Reliable energy solutions' },
  { icon: 'videocam', title: 'CCTV Security', sub: 'Advanced surveillance' },
  { icon: 'real_estate_agent', title: 'Real Estate', sub: 'Premium property sales' },
  { icon: 'home_iot_device', title: 'Smart Home', sub: 'Seamless automation' },
]

const services = [
  { icon: 'solar_power', title: 'Solar Energy', body: 'Clean, uninterrupted power for your home or office. Hybrid and off-grid systems designed for Nigerian conditions.', to: '/solar-energy' },
  { icon: 'security', title: 'CCTV & Security', body: 'High-definition monitoring and integrated security systems to keep your loved ones and assets safe 24/7.', to: '/cctv-security' },
  { icon: 'home_work', title: 'Real Estate', body: 'Buy, sell, or manage properties with trust. Expert guidance in the booming Delta State property market.', to: '/real-estate' },
  { icon: 'nest_remote_comfort_sensor', title: 'Smart Home', body: 'Control lighting, cooling, and security from your smartphone. Modern comfort at your fingertips.', to: '/smart-home' },
]

const reasons = [
  { icon: 'groups', title: 'Local Team in Asaba', body: 'We are based in Asaba, ensuring rapid response times for maintenance and support.' },
  { icon: 'high_quality', title: 'Quality Equipment Only', body: 'We only use tier-1 solar panels and top-rated security hardware with full warranties.' },
  { icon: 'engineering', title: 'Expert Engineering', body: 'Our technicians are certified professionals with years of hands-on experience.' },
  { icon: 'visibility', title: 'Transparent Pricing', body: 'No hidden costs. Detailed quotes that respect your budget and project scope.' },
  { icon: 'support_agent', title: 'After-Sales Support', body: 'Our relationship does not end at installation. We offer periodic check-ups and ongoing help.' },
  { icon: 'verified', title: 'Proven Track Record', body: 'Over 800 successful projects delivered across Delta and neighbouring states.' },
]

const projects = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP53TJvyKm7xp28Lg9xxOC49yZBrmV6xWiwggWTrSRwhUs5MFVl1MWavHHwimIi8aP4mZnhif6J6klEvAocQ4_dkgAI_gbAFVTNYzHJdeq8qRHE9xZjWPKOjSL4nSes5cDWvBW9KoLZT_E-1cFnjgTWhsAn6wKwz-K5j7S-4fIF05ZSAvFCN8xBWCtFaJormnVVZJfzsqGd2yarfk10_Zkh4302vCAXv8MJhv6eTQIIG3_sACt1TX-a4UMe-sARLnNRurQcM41qwU',
    alt: 'Corporate security installation',
    tag: 'Smart Office',
    title: 'Corporate HQ Security',
    location: 'Okpanam Road, Asaba',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL34Ca8KsyOQkzuiPdOs7jQusaWX5tb7PMvzU_jJZH3BDt3d2igyjLZAdBLsYrs_B4I9BcRTbEbWLdj060VXGuAOHkeNeBuX1qEk0TUoXwDn-AsAGJHeclJDVginojQtZAkuD9zPwgVUXTFyIBjl9r6daA1k2DP3ziSecNPcmUEJTe-r7zhgs0pjcN5cogiH8MiqV8REUpT0wd2-XtQJ6rCBtEMj4X94XFyImEEO1l87MXDyjp_wXzPJTFwz3Vo5to5LrltD3pG2s',
    alt: 'Solar installation on estate rooftop',
    tag: 'Solar Power',
    title: '15kW Hybrid Estate System',
    location: 'GRA Phase 2, Asaba',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKxy35nklOqIW314MHs1N8XIT_SaE7D1jAwVqPxElkURqNzZ3oRvU7tbQh6H4LmMc2rQG2RZpNtl8Cebx9mTLobCyAh7OxiG5eQHz30q-VICnYAjfhEeun_A0EVgu6zla1tb7syRC31ICo9TClZgGg_8qhonkzKYJTqMcjXx_a2_zAC4kKg5CFQJ0Vgf2NZCxKD4viufM03KVTAABgRvWRTQObzNFLgTQJ6usujXWF8dj4Bz9hNWc1B7GkTdtszVODir_bGtphEGQ',
    alt: 'Residential property development',
    tag: 'Real Estate',
    title: 'Prime Residential Plots',
    location: 'Ibusa, Delta State',
  },
]

const testimonials = [
  { name: 'Chief Benson O.', role: 'Business Owner, Asaba', review: 'IKEBEST installed my solar system two years ago. I haven\'t had a single day of blackout since then. Their service is truly exceptional.' },
  { name: 'Mrs. Amaka E.', role: 'Retail Manager', review: 'Their security systems gave me peace of mind. I can monitor my warehouse from anywhere in the world. Highly recommended!' },
  { name: 'Dr. Jude Williams', role: 'Property Investor', review: 'Finding a trustworthy real estate partner in Delta is hard, but IKEBEST made the process of buying my land so smooth and transparent.' },
]
</script>
