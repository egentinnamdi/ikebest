<template>
  <!-- Hero -->
  <section class="relative min-h-[580px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKuaXg5bWiPM2y4pJ9RyGdgdujOustxP_T_TX-MoH-lqybr0hubXM3mZ8yDuZM46kShmc1jOqYGzaFaALLm6fG1eEptXEpoRjRXywGiAkRMR47pLhbjdebRZ99RZQXA5R_Zo2vLIv3TiXmICEGM2T8ADr-26Xk6ia4kaUAF92j2lZttQagxy6j6yM6WdKsl6gCWm2k-teO8rELHjRPpF99M-Z2YvMKsCKRpX0BjXPsYIpMTc4d6_m3TrC4w0u-wfN2g-k4UEkgpdk"
        alt="Nigerian duplex with solar panels"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
    </div>
    <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full py-20">
      <div class="max-w-2xl">
        <span class="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
          Solar Energy Solutions
        </span>
        <h1 class="text-[22px] sm:text-[36px] md:text-[56px] font-extrabold leading-[1.15] tracking-tight text-white mb-6" style="font-family: 'Montserrat', sans-serif;">
          Cut Your Electricity<br />Bills With Solar Power
        </h1>
        <p class="text-white/85 text-lg mb-8 leading-relaxed">
          Reliable energy for Nigerian homes and businesses. Say goodbye to blackouts and rising fuel costs with our high-efficiency solar installations.
        </p>
        <div class="flex gap-4 flex-wrap">
          <a href="tel:+2348139522490" class="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#1E2545] transition-all">
            Call for a Free Quote
          </a>
          <a href="#how-it-works" class="border-2 border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all">
            How It Works
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Solar -->
  <section class="py-20 max-w-[1200px] mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <img
        src="https://images.unsplash.com/photo-1719848576338-9516ba7ccd8b?w=800&q=80&auto=format&fit=crop"
        alt="Solar technician installing panels on rooftop"
        class="rounded-xl shadow-lg w-full aspect-[4/5] object-cover object-right"
      />
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Why Solar in Nigeria</p>
        <h2 class="text-4xl font-bold text-gray-900 mb-5" style="font-family: 'Montserrat', sans-serif;">Why Switch to Solar Today?</h2>
        <p class="text-gray-500 leading-relaxed mb-8">
          Nigeria's power grid remains unpredictable, but the sun is constant. We help you harness this natural resource to gain true energy independence.
        </p>
        <ul class="space-y-6">
          <li v-for="reason in whyReasons" :key="reason.title" class="flex gap-4 items-start">
            <div class="bg-[#FAC030] p-2.5 rounded-lg text-[#161B30] flex-shrink-0">
              <span class="material-symbols-outlined text-[22px]">{{ reason.icon }}</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">{{ reason.title }}</h4>
              <p class="text-gray-500 text-sm leading-relaxed">{{ reason.body }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Solar Solutions Grid -->
  <section class="py-20 bg-[#f4f6f8]">
    <div class="max-w-[1280px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What We Offer</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Montserrat', sans-serif;">Solar Solutions for Every Need</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        <div v-for="sol in solutions" :key="sol.title" class="rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all group">
          <div class="relative h-[240px] overflow-hidden">
            <img :src="sol.img" :alt="sol.title" class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#161B30]/80 via-[#161B30]/20 to-transparent"></div>
            <div class="absolute bottom-5 left-5 flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[#161B30] text-[20px] bg-[#FAC030] p-2 rounded-lg" style="font-variation-settings:'FILL' 1;">{{ sol.icon }}</span>
              <h4 class="font-extrabold text-white text-[18px]" style="font-family: 'Montserrat', sans-serif;">{{ sol.title }}</h4>
            </div>
          </div>
          <div class="p-7">
            <p class="text-gray-500 text-[15px] leading-relaxed">{{ sol.body }}</p>
            <a href="tel:+2348139522490" class="inline-flex items-center gap-1.5 mt-5 text-[#161B30] font-bold text-sm hover:text-[#FAC030] transition-colors">
              Get a Quote <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section id="how-it-works" class="py-20 max-w-[1200px] mx-auto px-6">
    <p class="text-xs font-semibold uppercase tracking-widest text-primary text-center mb-2">The Process</p>
    <h2 class="text-4xl font-bold text-center text-gray-900 mb-16" style="font-family: 'Montserrat', sans-serif;">Your Path to Clean Energy</h2>
    <div class="relative grid grid-cols-1 md:grid-cols-4 gap-10">
      <div class="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gray-200 -z-10"></div>
      <div v-for="(step, i) in steps" :key="step.title" class="text-center group">
        <div class="w-24 h-24 bg-white border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-3xl group-hover:text-white text-primary">{{ step.icon }}</span>
        </div>
        <h4 class="font-semibold text-gray-900 mb-1">{{ i + 1 }}. {{ step.title }}</h4>
        <p class="text-xs text-gray-500 leading-relaxed">{{ step.body }}</p>
      </div>
    </div>
  </section>

  <!-- Project Gallery -->
  <section class="py-20 bg-gray-900">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-4xl font-bold text-white" style="font-family: 'Montserrat', sans-serif;">Recent Installations</h2>
          <p class="text-gray-400 mt-1 text-sm">Quality craftsmanship across commercial and residential projects.</p>
        </div>
        <a href="tel:+2348139522490" class="text-[#FAC030] font-semibold border-b border-[#FAC030] pb-0.5 text-sm hidden sm:block">Get a Free Quote</a>
      </div>
      <!-- 3 large hero cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <div
          v-for="(img, i) in galleryCards"
          :key="img.src"
          class="relative group rounded-2xl overflow-hidden h-[320px] sm:h-[400px]"
        >
          <img :src="img.src" :alt="img.alt" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent rounded-2xl"></div>
          <div class="absolute bottom-0 left-0 p-6">
            <p class="text-[#FAC030] text-[10px] uppercase tracking-widest font-bold mb-1">{{ img.tag }}</p>
            <h3 class="text-white font-bold text-[16px] leading-snug">{{ img.title }}</h3>
          </div>
        </div>
      </div>
      <!-- 3 smaller bottom cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          v-for="(img, i) in galleryMore"
          :key="img.src"
          class="relative group rounded-2xl overflow-hidden h-[220px]"
        >
          <img :src="img.src" :alt="img.alt" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
          <div class="absolute bottom-0 left-0 p-5">
            <p class="text-white font-semibold text-[14px]">{{ img.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Client Testimonials & Feedback Section (Curated by Admin) -->
  <section class="py-20 bg-[#f8f9fb]">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="flex flex-wrap items-end justify-between gap-4 mb-12">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-[#161B30] mb-2">Verified Solar Client Reviews</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900" style="font-family: 'Montserrat', sans-serif;">
            What Our Solar Clients Say
          </h2>
        </div>
        <RouterLink
          to="/feedback"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAC030] text-[#161B30] font-bold text-xs sm:text-sm hover:bg-yellow-300 transition-all shadow-sm"
        >
          <span class="material-symbols-outlined text-[18px]">rate_review</span>
          <span>Submit Your Solar Feedback</span>
        </RouterLink>
      </div>

      <div v-if="solarReviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="rev in solarReviews"
          :key="rev.id"
          class="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex text-amber-400 text-sm">
                <span v-for="s in 5" :key="s">{{ s <= rev.rating ? '★' : '☆' }}</span>
              </div>
              <span class="text-[11px] text-gray-400">{{ formatDate(rev.createdAt) }}</span>
            </div>
            <h4 v-if="rev.title" class="font-bold text-gray-900 text-base mb-2">"{{ rev.title }}"</h4>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">"{{ rev.review }}"</p>
          </div>
          <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <div class="font-bold text-gray-900 text-sm">{{ rev.customerName }}</div>
              <div class="text-xs text-gray-500">{{ rev.location }}</div>
            </div>
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Verified Client</span>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 bg-white rounded-2xl border border-gray-100 p-8">
        <p class="text-gray-500 text-sm mb-4">No reviews have been published for Solar Energy yet.</p>
        <RouterLink to="/feedback" class="text-[#161B30] font-bold underline text-sm">
          Be the first to leave a solar review
        </RouterLink>
      </div>
    </div>
  </section>

</template>

<script setup>
import { computed } from 'vue'
import { getPublishedFeedbacks, formatDate } from '../services/dataStore.js'

const solarReviews = computed(() => getPublishedFeedbacks('solar'))

const whyReasons = [
  { icon: 'flash_off', title: 'End NEPA Unreliability', body: 'Stop worrying about sudden blackouts. Our systems switch over instantly, keeping your life running.' },
  { icon: 'payments', title: 'Massive Long-term Savings', body: 'Eliminate monthly electricity bills and the high cost of diesel or petrol for generators.' },
  { icon: 'eco', title: 'Clean & Silent Energy', body: 'Remove the noise and air pollution of generators from your environment with silent solar technology.' },
]

const solutions = [
  {
    icon: 'home',
    title: 'Residential Solar',
    body: 'Custom rooftop installations for duplexes and bungalows across Delta State and beyond.',
    img: 'https://images.unsplash.com/photo-1694248407533-d74c41fb5b68?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: 'apartment',
    title: 'Commercial Systems',
    body: 'Power your office, hotel, or hospital with high-capacity solar grids designed for uptime.',
    img: 'https://images.unsplash.com/photo-1545209575-704d1434f9cd?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: 'battery_charging_full',
    title: 'Battery Backup',
    body: 'Advanced Lithium-ion and deep cycle storage solutions to keep you powered through the night.',
    img: 'https://images.unsplash.com/photo-1711214622639-42bb82a167e8?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: 'lightbulb',
    title: 'Smart Street Lighting',
    body: 'Solar-powered street lights for estates, local governments, and private driveways.',
    img: 'https://images.unsplash.com/photo-1561115867-be8460fbebfe?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: 'agriculture',
    title: 'Solar Water Pumps',
    body: 'Reliable irrigation and borehole pumping solutions for farms and rural communities.',
    img: 'https://images.unsplash.com/photo-1680050973241-fcff29ca2c7c?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: 'build_circle',
    title: 'Maintenance & Repair',
    body: 'Professional panel cleaning, inverter servicing, and comprehensive system upgrades.',
    img: 'https://images.unsplash.com/photo-1668097613572-40b7c11c8727?w=800&q=80&auto=format&fit=crop',
  },
]

const steps = [
  { icon: 'map', title: 'Site Visit', body: 'Our engineers assess your roof and energy needs at no charge.' },
  { icon: 'description', title: 'Quote', body: 'You receive a transparent, itemised proposal.' },
  { icon: 'engineering', title: 'Installation', body: 'Fast, professional setup by certified experts.' },
  { icon: 'support_agent', title: 'Support', body: '24/7 monitoring and dedicated local support.' },
]

const galleryCards = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq9LCpDwfPlcT6MX0ogahmxaHtcvjkwurNjVUILumsDp-tiEYDIkwPkW2_CncahMk2O3uYoIiC3I5ZMLRbnBLmN2zRJ87AxxM-s1QiKNNPavrKu7KKmlrlnjqQaukop6TNqZKTRyA86dSvw6MyTtuNrrdwxEV1tu084abTQSRak_1_lSMXXD-j6zkKUzX1REY0OFjomSVT0g9Gsbhsbs3jnH0GHxphxrhR_a6RgGJQgQDURpwZB1UDtpt_Jw5zfICaiA8PNEmwQuM',
    alt: 'Commercial solar array', tag: 'Commercial', title: 'Commercial Solar Array Installation'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbGQQVa4dlh34PMS3x2DgiKuXCHwWUer6KHkklhLrDB2DySFno61oWhnjC5Xptx_8cwtPznoE0cWT3lSrVvfVO_svvSCu8NxXqX20htRZE0aoOYQX7oJ7jkhoHJ1uS9xB2rgs-a0JwWqoffes5cNSe_wUi13EPjmh5bolethxLVYyubSQMUjE3E1cNamwG1Dxb7DyxYkVtjvCqg9PrhWH4Gz9ZqeUuVfV7et1A8eVL-TAyAB5at9kRqwzSGYPkAwJMWPvw3hZsPsU',
    alt: 'Home solar installation', tag: 'Residential', title: 'Home Rooftop Solar System'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK7IYhPAFzepfm1gimj8fEtWB9PiL5KgW3N90ro7kiZb62AQQsv52zcs_OdLEA3fYMSvQqLfhMaUL1Xjpf72ifeucLA-u3BKZtWTySM_p-aq7_HsSTi5_Mka2egqtaWAkNmiHGYRWsPTpNksubK3WGKqIOzWYr1s1Bn15YZshP0kWUNRCnvg7cf8Dw9AC3GZYJEmJ1O9x9ZxlG95nYcJ2oTOX1UFHwr5y0TlPFEVo0GMNUnBNeYDZOwTwR7GWkT0CQg39oFIYxdVc',
    alt: 'Team installing solar panels', tag: 'Installation', title: 'Professional Panel Installation'
  },
]

const galleryMore = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATULrpM0mT7t-7gPstsSoknE4e729YUwuDLBz-eOGRZc5KIjL0S7qykOyWbwNofnS7XPZ_zd_6FCe-SGNOZr-b2AUKfaJzl7RnLQ3z3_xkd9vo2Z63ZckX7g3sHjvCwPkEMYJLLX9FhOp0mAMFALl750rqYTVi6887WmDJMzLjfZb-q3GryVsHqpRF7nNEuNARCnB17OCADICGIEy5Z4VxVmck5yNwtuLJvW4u2636SpOFV2YUJ1NZq-g0ZsN30MvNQ0tMpLlpE4U',
    alt: 'Solar inverter installation', title: 'Inverter & Battery Setup'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLmZhkfKft7BSVSGCCTkMy2i7Ggsd6jr0GN3vScWkm1FelF8ZuXDlA4aTinikK7vKzVPBeSqOkjxIJtvRIk7KI5mMBS_cTs-Wa5ft7i3xWU874DcSnmk3ln_A9pcnsac2KurUyvZuccGDoLLGO-mgwSwkCqUUDx_AGgWoMKOvMKinUBzHQPsMC5kNwD13YISHZ6D65VWU3JRC_dZ3M9bBOq8CI5OTB4mf0ft_fcQxzgRO_Yxgr5dQoXp__n3yGXUbhxYVQufiMIJs',
    alt: 'Solar street lights', title: 'Solar Street Lighting'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK7IYhPAFzepfm1gimj8fEtWB9PiL5KgW3N90ro7kiZb62AQQsv52zcs_OdLEA3fYMSvQqLfhMaUL1Xjpf72ifeucLA-u3BKZtWTySM_p-aq7_HsSTi5_Mka2egqtaWAkNmiHGYRWsPTpNksubK3WGKqIOzWYr1s1Bn15YZshP0kWUNRCnvg7cf8Dw9AC3GZYJEmJ1O9x9ZxlG95nYcJ2oTOX1UFHwr5y0TlPFEVo0GMNUnBNeYDZOwTwR7GWkT0CQg39oFIYxdVc',
    alt: 'Rural community solar', title: 'Rural Community Solar Project'
  },
]
</script>
