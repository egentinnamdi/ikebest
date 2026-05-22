<template>
  <!-- Hero — full-screen video, centered content, Solarva style -->
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
    <!-- Video background -->
    <video
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source
        src="https://res.cloudinary.com/dtetfimeq/video/upload/v1778246332/SnapInsta.to_AQOzt4R1X8nqrHsg2S4ggiY-6IJUeqSqJqE_jaZrxHaN7MMPS13rt9F95Lm5KLcq8voHdAfaflYYBj18vytVeD6h46ve7f79IdvzHd8_gfbqyr.mp4"
        type="video/mp4"
      />
    </video>
    <!-- Dark overlay -->
    <div class="absolute inset-0 z-10 bg-[#161B30]/65"></div>

    <!-- Centered content -->
    <div class="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full">
      <!-- Badge label -->
      <div class="inline-flex items-center gap-2 border border-white/30 text-white/90 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em] px-4 py-2 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-[#FAC030] inline-block shrink-0"></span>
        <span>IKEBEST TECHNOLOGIES, NIGERIA</span>
      </div>

      <!-- Headline -->
      <h1 class="text-[30px] sm:text-[44px] md:text-[64px] font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight text-white mb-5 sm:mb-6" style="font-family: 'Montserrat', sans-serif;">
        Powering Homes &amp; Businesses<br />
        <span class="text-[#FAC030]">Across Nigeria.</span>
      </h1>

      <!-- Subtitle -->
      <p class="text-white/75 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
        Solar energy, CCTV security, real estate and smart home solutions, all from one trusted company in Nigeria.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <RouterLink
          to="/solar-energy"
          class="bg-[#FAC030] text-[#161B30] px-8 py-3.5 sm:px-9 sm:py-4 rounded-full font-bold text-[14px] sm:text-[15px] hover:bg-yellow-300 transition-all active:scale-95 shadow-lg"
        >
          Explore Our Services
        </RouterLink>
        <RouterLink
          to="/about"
          class="border-2 border-white/50 text-white px-8 py-3.5 sm:px-9 sm:py-4 rounded-full font-bold text-[14px] sm:text-[15px] hover:border-[#FAC030] hover:text-[#FAC030] transition-all active:scale-95"
        >
          About Us
        </RouterLink>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/40 text-xs uppercase tracking-widest">
      <span>Scroll</span>
      <span class="material-symbols-outlined text-[18px] animate-bounce">keyboard_arrow_down</span>
    </div>
  </section>

  <!-- Stats Bar -->
  <section id="about" class="bg-white py-16">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 sm:grid-cols-3">
        <div v-for="(stat, i) in stats" :key="stat.label" :data-raw="stat.raw"
          class="flex items-center gap-4 md:gap-8 px-6 md:px-16 py-8 sm:py-4"
        >
          <div class="text-[48px] sm:text-[60px] md:text-[72px] font-extrabold text-[#161B30] leading-none shrink-0" style="font-family: 'Montserrat', sans-serif;">
            <span class="counter-num" :data-suffix="stat.suffix">{{ stat.display }}</span>
          </div>
          <div class="border-l-4 border-[#FAC030] pl-4 md:pl-5">
            <div class="font-bold text-[15px] md:text-[17px] text-[#161B30] leading-snug">{{ stat.label }}</div>
            <div class="text-gray-500 text-sm mt-1 leading-snug line-clamp-2">{{ stat.sub }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- About Preview -->
  <section class="py-14 md:py-28 bg-[#f8f9fb]">
    <div class="max-w-[1400px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      <!-- Images: hidden on mobile, shown on lg+ -->
      <div class="hidden lg:grid grid-cols-2 gap-5" v-animate="'left'">
        <div class="space-y-5">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_QWIi73l7IDotwrCsDpOeFro5ZgJLv1h2fBTiw-OiZfCCn6dl23KlqPJTVU-EFmfcKW6AJwrLc429HDGaUsXw80AOCA7T04i95HPezjlKJHOgZmJ374v-Xeb7p-dmuHnfBqcyfJtvV_OEwSdwO1z2UadVcBkbLa-4qO-zoB9yG0S7gOkWWWEVi01ZFXwIYoBjGC9eqgps18W5vRvrJfUJ8eR_pqxtoptQvonYxqbxOjUkDMR5spt5F6gwOQHER3QmKP6VD4iFJBs"
            alt="IKEBEST technician installing CCTV"
            class="rounded-2xl object-cover shadow-lg w-full h-[520px]"
          />
          <div class="bg-[#161B30] p-7 rounded-2xl text-white">
            <div class="text-[#FAC030] font-extrabold text-4xl mb-1">Local</div>
            <p class="text-white/75 text-base mt-2 leading-relaxed">Deep expertise on the ground in Delta State and beyond.</p>
          </div>
        </div>
        <div class="pt-16">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuvbvRA1H_UkJZ4I3kHEE4g8sX5Br9perf3HSr69A4_d7MeIKEpzxfs5DX5UbDbKn4fzKYsD20WMqal88XvJayw90qRM-cBZEPOHel7BDQFrWMHOaIWnOjZ484kDZroNzRL3T4p1s8mBh2HM4OV2Zf-phCUrIxDStlyiwE91bHNFAFpV2zFxXGWPsKS20S6t0yJd83knQ6DbzAgyz5aJJNkNYc-VpCx-IPl7eXeM2eQ_W3e4HdU2WPJIURq0l8Y3h9MpJecyQby7o"
            alt="Modern Nigerian residential building"
            class="rounded-2xl object-cover shadow-lg w-full h-[640px]"
          />
        </div>
      </div>
      <!-- Mobile: single image -->
      <div class="block lg:hidden rounded-2xl overflow-hidden shadow-lg">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuvbvRA1H_UkJZ4I3kHEE4g8sX5Br9perf3HSr69A4_d7MeIKEpzxfs5DX5UbDbKn4fzKYsD20WMqal88XvJayw90qRM-cBZEPOHel7BDQFrWMHOaIWnOjZ484kDZroNzRL3T4p1s8mBh2HM4OV2Zf-phCUrIxDStlyiwE91bHNFAFpV2zFxXGWPsKS20S6t0yJd83knQ6DbzAgyz5aJJNkNYc-VpCx-IPl7eXeM2eQ_W3e4HdU2WPJIURq0l8Y3h9MpJecyQby7o"
          alt="Modern Nigerian residential building"
          class="object-cover w-full h-[260px]"
        />
      </div>
      <!-- Text -->
      <div class="space-y-6 md:space-y-8" v-animate="'right'">
        <p class="text-sm font-bold uppercase tracking-[0.18em] text-[#FAC030]">About IKEBEST Group</p>
        <h2 class="text-[32px] sm:text-[40px] md:text-5xl font-extrabold text-[#161B30] leading-[1.1]" style="font-family: 'Montserrat', sans-serif;">Building the Future of<br />Modern Living.</h2>
        <p class="text-gray-600 text-base md:text-lg leading-relaxed">
          IKEBEST GROUP is more than a service provider. We are your partners in progress. We integrate technology with reliable infrastructure to elevate your lifestyle and business operations in Delta State and beyond.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-2">
          <div v-for="service in aboutServices" :key="service.title" class="flex items-start gap-3 md:gap-4">
            <span class="material-symbols-outlined text-[#161B30] bg-[#FAC030] p-2.5 md:p-3 rounded-xl text-[24px] md:text-[28px] shrink-0" style="font-variation-settings:'FILL' 1;">{{ service.icon }}</span>
            <div>
              <div class="font-bold text-[14px] md:text-[16px] text-[#161B30]">{{ service.title }}</div>
              <div class="text-xs md:text-sm text-gray-500 mt-0.5">{{ service.sub }}</div>
            </div>
          </div>
        </div>
        <RouterLink to="/about" class="inline-flex items-center gap-2 text-[#161B30] font-bold text-[16px] hover:text-[#FAC030] hover:gap-3 transition-all">
          Learn More About Us
          <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="py-24 bg-[#eef5ee]" v-animate style="background: linear-gradient(180deg,#eef5ee 0%,#f5faf5 100%);">
    <div class="max-w-[1280px] mx-auto px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="block w-8 h-0.5 bg-[#161B30]"></span>
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#161B30]">Our Services</p>
          </div>
          <h2 class="text-[42px] font-extrabold text-[#161B30] leading-tight" style="font-family: 'Montserrat', sans-serif;">Complete technology solutions<br />for homes &amp; businesses</h2>
        </div>
        <div class="flex gap-3">
          <button @click="prevService" class="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-white transition-all">
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button @click="nextService" class="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-white transition-all">
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="svc in visibleServices"
          :key="svc.title"
          class="bg-white rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-xl transition-all group border border-transparent hover:border-[#FAC030]/30"
        >
          <div class="w-16 h-16 bg-[#161B30] rounded-xl flex items-center justify-center mb-7">
            <span class="material-symbols-outlined text-white text-[30px]" style="font-variation-settings:'FILL' 1;">{{ svc.icon }}</span>
          </div>
          <h3 class="font-extrabold text-[22px] mb-3 text-[#161B30]" style="font-family: 'Montserrat', sans-serif;">{{ svc.title }}</h3>
          <p class="text-gray-500 text-[15px] leading-relaxed grow mb-6">{{ svc.body }}</p>
          <ul class="space-y-1.5 mb-7">
            <li v-for="pt in svc.points" :key="pt" class="flex items-center gap-2 text-sm text-gray-700">
              <span class="material-symbols-outlined text-[#161B30] text-[15px]">chevron_right</span>
              <span class="font-semibold">{{ pt }}</span>
            </li>
          </ul>
          <RouterLink :to="svc.to" class="mt-auto flex items-center justify-between border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold text-[#161B30] hover:bg-[#161B30] hover:text-white transition-all group-hover:border-[#161B30]">
            VIEW MORE
            <span class="w-8 h-8 rounded-full bg-[#161B30] text-white flex items-center justify-center group-hover:bg-[#FAC030] group-hover:text-[#161B30] transition-all">
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Partner Logos -->
  <section class="bg-white py-14 overflow-hidden">
    <div class="max-w-[1100px] mx-auto px-8 mb-10">
      <div class="flex items-center gap-4">
        <span class="flex-1 h-px bg-gray-200"></span>
        <p class="text-[14px] md:text-[17px] font-semibold text-[#161B30] whitespace-nowrap px-2">
          We have collaborated with <span class="text-[#FAC030] font-extrabold">20</span> amazing companies
        </p>
        <span class="flex-1 h-px bg-gray-200"></span>
      </div>
    </div>
    <div class="overflow-hidden">
      <div class="marquee-track flex items-center gap-20">
        <template v-for="n in 3" :key="n">
          <span class="text-gray-400 font-black text-[20px] tracking-tight uppercase opacity-50 shrink-0">Zinox</span>
          <span class="text-gray-400 font-light text-[20px] tracking-widest uppercase opacity-50 shrink-0">Vezlor</span>
          <span class="text-gray-400 font-bold text-[18px] italic opacity-50 shrink-0">PowerGen</span>
          <span class="text-gray-400 font-black text-[20px] opacity-50 shrink-0">FlashCo</span>
          <span class="text-gray-400 font-light text-[20px] tracking-widest uppercase opacity-50 shrink-0">Avasan</span>
          <span class="text-gray-400 font-bold text-[18px] opacity-50 shrink-0">SolarVac</span>
          <span class="text-gray-400 font-black text-[20px] tracking-tight uppercase opacity-50 shrink-0">GridIQ</span>
          <span class="text-gray-400 font-bold text-[18px] uppercase opacity-50 shrink-0">TechGrid</span>
          <span class="text-gray-400 font-black text-[20px] opacity-50 shrink-0">ElecNest</span>
        </template>
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <section class="bg-[#edf5ec] py-0 overflow-visible">
    <!-- Top band: image + text -->
    <div class="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-0">
      <!-- Image col: overlaps top/bottom with gold bars -->
      <div class="relative">
        <div class="absolute top-0 left-0 right-0 h-[5px] bg-[#FAC030] z-10"></div>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq9LCpDwfPlcT6MX0ogahmxaHtcvjkwurNjVUILumsDp-tiEYDIkwPkW2_CncahMk2O3uYoIiC3I5ZMLRbnBLmN2zRJ87AxxM-s1QiKNNPavrKu7KKmlrlnjqQaukop6TNqZKTRyA86dSvw6MyTtuNrrdwxEV1tu084abTQSRak_1_lSMXXD-j6zkKUzX1REY0OFjomSVT0g9Gsbhsbs3jnH0GHxphxrhR_a6RgGJQgQDURpwZB1UDtpt_Jw5zfICaiA8PNEmwQuM"
          alt="Commercial solar array installation"
          class="w-full h-[420px] object-cover"
        />
        <div class="absolute bottom-0 left-0 right-0 h-[5px] bg-[#FAC030]"></div>
      </div>
      <!-- Text col -->
      <div class="flex flex-col justify-center px-6 lg:px-14 py-12 lg:py-16">
        <div class="flex items-center gap-3 mb-4">
          <span class="block w-8 h-[3px] bg-[#FAC030]"></span>
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#161B30]">Why Choose Us</p>
        </div>
        <h2 class="text-[38px] font-extrabold text-[#161B30] leading-tight mb-4" style="font-family: 'Montserrat', sans-serif;">Reasons to Choose IKEBEST</h2>
        <p class="text-gray-600 text-[15px] leading-relaxed">We bring energy, security and smart living solutions to your doorstep across Nigeria. Local presence means faster response and better service.</p>
      </div>
    </div>
    <!-- Bottom band: 4 icon items -->
    <div class="max-w-[1280px] mx-auto px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div v-for="reason in reasons" :key="reason.title" class="space-y-3">
        <span class="material-symbols-outlined text-[#161B30] text-[44px]" style="font-variation-settings:'FILL' 0;">{{ reason.icon }}</span>
        <h4 class="font-extrabold text-[17px] text-[#161B30]" style="font-family: 'Montserrat', sans-serif;">{{ reason.title }}</h4>
        <p class="text-gray-600 text-[14px] leading-relaxed">{{ reason.body }}</p>
      </div>
    </div>
  </section>



  <!-- Recent Projects -->
  <section class="py-0 overflow-hidden">
    <div class="grid grid-cols-1 sm:grid-cols-3">
      <div
        v-for="(project, i) in projects"
        :key="project.title"
        v-animate="'up'"
        :data-delay="i * 120"
        class="relative group overflow-hidden h-[340px] sm:h-[440px]"
      >
        <img
          :src="project.img"
          :alt="project.alt"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 p-6 sm:p-8">
          <p class="text-[#FAC030] text-[11px] uppercase tracking-widest font-bold mb-1.5">{{ project.tag }}</p>
          <h3 class="text-white font-extrabold text-[18px] sm:text-[20px] leading-snug">{{ project.title }}</h3>
          <p class="text-white/65 text-xs mt-1">{{ project.location }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="bg-[#f0f7f0] py-24 overflow-hidden">
    <div class="max-w-[900px] mx-auto px-8 mb-14 text-center">
      <div class="inline-flex items-center gap-2 border border-[#161B30]/15 text-[#161B30] text-xs font-bold uppercase tracking-[0.18em] px-5 py-2 rounded-full mb-6">
        What Our Clients Say
      </div>
      <h2 class="text-[32px] md:text-[46px] font-extrabold text-[#161B30] leading-tight" style="font-family: 'Montserrat', sans-serif;" v-animate>
        Real Power. Real Results.
      </h2>
    </div>
    <!-- Row 1 — scrolls left -->
    <div class="overflow-hidden mb-4">
      <div class="marquee-track flex gap-5">
        <div
          v-for="(t, i) in [...testimonials, ...testimonials]"
          :key="`r1-${i}`"
          class="bg-white rounded-2xl p-7 shadow-sm w-[300px] md:w-[340px] shrink-0 flex flex-col border border-gray-100"
        >
          <p class="text-gray-600 text-[14px] leading-relaxed grow mb-6">&ldquo;{{ t.review }}&rdquo;</p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#161B30] flex items-center justify-center text-[#FAC030] font-bold text-sm shrink-0">{{ t.name.charAt(0) }}</div>
            <div class="min-w-0">
              <div class="font-bold text-[#161B30] text-sm truncate">{{ t.name }}</div>
              <div class="text-gray-400 text-xs truncate">{{ t.role }}</div>
            </div>
            <div class="ml-auto flex shrink-0">
              <span v-for="n in 5" :key="n" class="material-symbols-outlined text-[#FAC030] text-[13px]" style="font-variation-settings:'FILL' 1;">star</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Row 2 — scrolls right -->
    <div class="overflow-hidden">
      <div class="marquee-track-reverse flex gap-5">
        <div
          v-for="(t, i) in [...testimonials].reverse().concat([...testimonials].reverse())"
          :key="`r2-${i}`"
          class="bg-white rounded-2xl p-7 shadow-sm w-[300px] md:w-[340px] shrink-0 flex flex-col border border-gray-100"
        >
          <p class="text-gray-600 text-[14px] leading-relaxed grow mb-6">&ldquo;{{ t.review }}&rdquo;</p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#FAC030] flex items-center justify-center text-[#161B30] font-bold text-sm shrink-0">{{ t.name.charAt(0) }}</div>
            <div class="min-w-0">
              <div class="font-bold text-[#161B30] text-sm truncate">{{ t.name }}</div>
              <div class="text-gray-400 text-xs truncate">{{ t.role }}</div>
            </div>
            <div class="ml-auto flex shrink-0">
              <span v-for="n in 5" :key="n" class="material-symbols-outlined text-[#FAC030] text-[13px]" style="font-variation-settings:'FILL' 1;">star</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Smart Home Pricing -->
  <section class="py-20 bg-white">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Pricing</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Montserrat', sans-serif;">Smart Home Packages</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="pkg in homePricing"
          :key="pkg.title"
          class="p-8 rounded-2xl border-2 flex flex-col relative"
          :class="pkg.featured ? 'border-primary shadow-xl shadow-[#FAC030]/15 bg-white' : 'border-gray-200 bg-white'"
        >
          <div v-if="pkg.featured" class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
            Most Popular
          </div>
          <h3 class="font-bold text-xl text-gray-900 mb-1" style="font-family: 'Montserrat', sans-serif;">{{ pkg.title }}</h3>
          <p class="text-gray-400 text-sm mb-1">{{ pkg.subtitle }}</p>
          <div v-if="pkg.price" class="mb-5">
            <span class="text-2xl font-extrabold text-primary" style="font-family: 'Montserrat', sans-serif;">{{ pkg.price }}</span>
            <span class="text-gray-400 text-sm ml-1">{{ pkg.priceNote }}</span>
          </div>
          <div v-else class="mb-5"></div>
          <ul class="space-y-3 flex-grow mb-8">
            <li v-for="f in pkg.features" :key="f" class="flex gap-2 items-start text-sm text-gray-700">
              <span class="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5" style="font-variation-settings:'FILL' 1;">check_circle</span>
              {{ f }}
            </li>
          </ul>
          <a href="tel:+2348139522490" class="block text-center py-3 rounded-xl font-semibold text-sm transition-all"
            :class="pkg.featured ? 'bg-primary text-white hover:bg-[#1E2545]' : 'border-2 border-primary text-primary hover:bg-[#FAC030]/10'">
            Get a Quote →
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="max-w-[1200px] mx-auto px-6 mt-20 mb-20">
    <div class="bg-primary rounded-3xl p-16 text-center text-white">
      <h2 class="text-4xl font-extrabold mb-4" style="font-family: 'Montserrat', sans-serif;">Ready to Get Started?</h2>
      <p class="text-white/85 max-w-xl mx-auto mb-8 text-[15px] leading-relaxed">
        Contact us today for a free consultation and let us bring your vision to life with power, security, and smart technology.
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="tel:+2348139522490" class="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
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
import { ref, computed, onMounted } from 'vue'

// Counter animation
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
          start = Math.min(start + increment, target)
          const val = target >= 1000 ? Math.round(start / 1000) + 'k' : Math.round(start)
          el.textContent = val + suffix
          if (start < target) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.unobserve(el)
      }
    })
  }, { threshold: 0.4 })
  document.querySelectorAll('.counter-num').forEach(el => observer.observe(el))
})
const stats = [
  { display: '20+', raw: 20, suffix: '+', label: 'Employees', sub: 'Expert technicians for repair & installation' },
  { display: '100%', raw: 100, suffix: '%', label: 'Client Satisfaction', sub: 'We achieved 100% client satisfaction' },
  { display: '5k+', raw: 5000, suffix: '+', label: 'Installation', sub: '5k+ systems installed for our clients' },
]

const aboutServices = [
  { icon: 'solar_power', title: 'Solar Power', sub: 'Reliable energy solutions' },
  { icon: 'videocam', title: 'CCTV Security', sub: 'Advanced surveillance' },
  { icon: 'real_estate_agent', title: 'Real Estate', sub: 'Premium property sales' },
  { icon: 'home_iot_device', title: 'Smart Home', sub: 'Seamless automation' },
]

const services = [
  { icon: 'solar_power', title: 'Solar Energy Systems', body: 'Clean, uninterrupted power for your home or office. Hybrid and off-grid systems designed for Nigerian conditions.', points: ['Solar Backup Systems', 'Hybrid & Off-grid', 'Energy Saving Solutions'], to: '/solar-energy' },
  { icon: 'security', title: 'CCTV & Security', body: 'High-definition monitoring and integrated security systems to keep your loved ones and assets safe 24/7.', points: ['HD Camera Installation', 'Remote Monitoring', 'Access Control'], to: '/cctv-security' },
  { icon: 'home_iot_device', title: 'Smart Home & Real Estate', body: 'Automate your home and invest in premium Delta State properties through one trusted team.', points: ['Smart Lighting & Cooling', 'Property Sales', 'Home Automation'], to: '/smart-home' },
]

const serviceIndex = ref(0)
const visibleServices = computed(() => {
  const all = services
  const start = serviceIndex.value % all.length
  return all.slice(start).concat(all.slice(0, start)).slice(0, 3)
})
function prevService() { serviceIndex.value = (serviceIndex.value - 1 + services.length) % services.length }
function nextService() { serviceIndex.value = (serviceIndex.value + 1) % services.length }

const reasons = [
  { icon: 'engineering', title: 'Expert Installation', body: 'Professional installation by certified technicians who ensure it is done correctly.' },
  { icon: 'payments', title: 'Low Cost Operation', body: 'Affordable solutions that reduce your monthly energy and operating costs.' },
  { icon: 'support_agent', title: 'Expert Support Team', body: 'Dedicated support workers available to assist you at any time.' },
  { icon: 'devices', title: 'Modern Technology', body: 'We use only the latest, top-rated equipment with full warranties.' },
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

const homePricing = [
  {
    title: 'Starter',
    subtitle: 'For 2–3 bedroom homes',
    featured: false,
    price: '₦240,000',
    priceNote: 'with installation',
    features: ['Smart lighting (5 rooms)', 'Smart locks (main door)', 'Mobile app control', 'Basic CCTV integration', 'Local tech support'],
  },
  {
    title: 'Premium',
    subtitle: 'For full smart home experience',
    featured: true,
    price: null,
    priceNote: null,
    features: ['Smart lighting (full home)', 'Smart locks & automated gate', 'Climate control integration', 'Multi-room audio', '8-camera CCTV integration', 'Intercom & video doorbell', '1-year maintenance plan'],
  },
  {
    title: 'Custom Build',
    subtitle: 'Fully bespoke for any property',
    featured: false,
    price: null,
    priceNote: null,
    features: ['Unlimited automation points', 'Solar power integration', 'Full AI scene management', 'Dedicated site engineer', 'Priority remote support', 'Warranty & SLA plan'],
  },
]

const testimonials = [
  { name: 'Chief Benson O.', role: 'Business Owner, Abuja', review: 'IKEBEST installed my solar system two years ago. I haven\'t had a single day of blackout since then. Their service is truly exceptional.' },
  { name: 'Mrs. Amaka E.', role: 'Retail Manager', review: 'Their security systems gave me peace of mind. I can monitor my warehouse from anywhere in the world. Highly recommended!' },
  { name: 'Dr. Jude Williams', role: 'Property Investor', review: 'Finding a trustworthy real estate partner in Delta is hard, but IKEBEST made buying my land so smooth and transparent.' },
  { name: 'Engr. Chidi N.', role: 'Factory Owner, Onitsha', review: 'We installed a 30kW solar system through IKEBEST. Our electricity cost dropped by 80% within the first month of use.' },
  { name: 'Mrs. Blessing O.', role: 'Homeowner, Lagos', review: 'The smart home setup they did for us is amazing. Everything works seamlessly — lights, AC, security cameras, all automated.' },
  { name: 'Mr. Victor E.', role: 'Hotel Manager, Kano', review: 'IKEBEST\'s CCTV solution across all 3 floors of our hotel has been flawless for over a year. Great team, great support.' },
]
</script>
