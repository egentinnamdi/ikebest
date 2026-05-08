<template>
  <!-- Hero -->
  <section class="relative h-[580px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuTNxFOg36KsxQ8EFLufIphqn0Rn6bhbVlYlxRhNkB8BxyPtPlLZwX6z5Nshpt1cm7P0-fdyeTvKB4UWYrqpv50Ur266IiGn3rrMDTzJxC1CoQtnOTBVHk_Vk229hAAC2MQbKIL_5NtHl7pz1aLcA5z7rFkBf6sGFnA-4uGvAXCWYyrGZVpI8ZB7tej2t7vWorM5mPvY3jEBlnqzVFzKj-HporzApPRgWi7vHxJfe0-bD6f2QrWvv2OnlzlpM_qx3ak6LfXsMGFec"
        alt="CCTV camera on Nigerian office building"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
    </div>
    <div class="relative z-10 max-w-[1200px] mx-auto w-full px-6">
      <div class="max-w-2xl">
        <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
          Advanced Surveillance
        </span>
        <h1 class="text-[56px] font-extrabold leading-[1.1] text-white mb-6" style="font-family: 'Plus Jakarta Sans', sans-serif;">
          Protect Your Home and<br />Business With CCTV
        </h1>
        <p class="text-white/80 text-lg mb-8 leading-relaxed">
          High-definition security solutions tailored for the Nigerian landscape. Peace of mind powered by innovation and reliability.
        </p>
        <div class="flex gap-4 flex-wrap">
          <a href="#assessment" class="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all">
            Book Free Assessment
          </a>
          <a href="#products" class="border-2 border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all">
            Explore Systems
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Products Grid -->
  <section id="products" class="py-20 bg-[#f4f6f8]">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What We Supply & Install</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Cutting-Edge Security Systems</h2>
        <p class="text-gray-500 max-w-xl mx-auto mt-3 text-[15px]">We provide the latest in surveillance technology to ensure your property remains secure 24/7.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.title" class="bg-white p-6 rounded-xl service-card hover:scale-[1.02] transition-all">
          <div class="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-5">
            <span class="material-symbols-outlined text-primary text-[28px]">{{ product.icon }}</span>
          </div>
          <h3 class="font-bold text-[17px] text-gray-900 mb-2" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ product.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ product.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Why CCTV Matters -->
  <section class="py-20 max-w-[1200px] mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Why It Matters</p>
        <h2 class="text-4xl font-bold text-gray-900 mb-5" style="font-family: 'Plus Jakarta Sans', sans-serif;">Why Invest in CCTV Security?</h2>
        <p class="text-gray-500 leading-relaxed mb-8">
          A visible security system is one of the most powerful deterrents against theft, vandalism, and unauthorised access.
        </p>
        <ul class="space-y-5">
          <li v-for="point in whyPoints" :key="point.title" class="flex gap-4 items-start">
            <div class="bg-green-50 p-2.5 rounded-lg text-primary flex-shrink-0">
              <span class="material-symbols-outlined text-[20px]">{{ point.icon }}</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-0.5">{{ point.title }}</h4>
              <p class="text-gray-500 text-sm leading-relaxed">{{ point.body }}</p>
            </div>
          </li>
        </ul>
      </div>
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_QWIi73l7IDotwrCsDpOeFro5ZgJLv1h2fBTiw-OiZfCCn6dl23KlqPJTVU-EFmfcKW6AJwrLc429HDGaUsXw80AOCA7T04i95HPezjlKJHOgZmJ374v-Xeb7p-dmuHnfBqcyfJtvV_OEwSdwO1z2UadVcBkbLa-4qO-zoB9yG0S7gOkWWWEVi01ZFXwIYoBjGC9eqgps18W5vRvrJfUJ8eR_pqxtoptQvonYxqbxOjUkDMR5spt5F6gwOQHER3QmKP6VD4iFJBs"
        alt="CCTV installation"
        class="rounded-xl shadow-lg w-full aspect-square object-cover"
      />
    </div>
  </section>

  <!-- Packages -->
  <section class="bg-[#f4f6f8] py-20">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Pricing</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Security Packages</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="pkg in packages"
          :key="pkg.title"
          class="bg-white p-8 rounded-2xl border-2 flex flex-col"
          :class="pkg.featured ? 'border-primary shadow-lg shadow-green-100 relative' : 'border-gray-200'"
        >
          <div v-if="pkg.featured" class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
            Most Popular
          </div>
          <h3 class="font-bold text-xl text-gray-900 mb-2" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ pkg.title }}</h3>
          <p class="text-gray-500 text-sm mb-6">{{ pkg.subtitle }}</p>
          <ul class="space-y-3 flex-grow mb-8">
            <li v-for="feature in pkg.features" :key="feature" class="flex items-center gap-2 text-sm text-gray-700">
              <span class="material-symbols-outlined text-primary text-[18px]" style="font-variation-settings:'FILL' 1;">check_circle</span>
              {{ feature }}
            </li>
          </ul>
          <a href="#assessment" class="block text-center py-3 rounded-xl font-semibold transition-all text-sm"
            :class="pkg.featured ? 'bg-primary text-white hover:bg-green-800' : 'border-2 border-primary text-primary hover:bg-green-50'">
            Get a Quote →
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Installation Steps -->
  <section class="py-20 max-w-[1200px] mx-auto px-6">
    <p class="text-xs font-semibold uppercase tracking-widest text-primary text-center mb-2">How We Work</p>
    <h2 class="text-4xl font-bold text-center text-gray-900 mb-16" style="font-family: 'Plus Jakarta Sans', sans-serif;">From Assessment to Full Protection</h2>
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

  <!-- CTA Form -->
  <section id="assessment" class="py-20 bg-[#f4f6f8]">
    <div class="max-w-[800px] mx-auto px-6 text-center">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Get Protected</p>
      <h2 class="text-4xl font-bold text-gray-900 mb-4" style="font-family: 'Plus Jakarta Sans', sans-serif;">Book a Free Security Assessment</h2>
      <p class="text-gray-500 mb-10">Our experts will visit your property and recommend the right system for your needs and budget.</p>
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
          <label class="block font-semibold text-sm text-gray-900 mb-1.5">Property Address</label>
          <input class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" placeholder="Street, Asaba" type="text" />
        </div>
        <div>
          <label class="block font-semibold text-sm text-gray-900 mb-1.5">Property Type</label>
          <select class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm bg-white">
            <option>Home</option>
            <option>Office</option>
            <option>School</option>
            <option>Shop / Warehouse</option>
          </select>
        </div>
        <button class="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all">
          Request Free Assessment
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
const products = [
  { icon: 'videocam', title: 'HD IP Cameras', body: 'Crystal clear 4K resolution with remote mobile viewing anytime, anywhere.' },
  { icon: 'nightlight', title: 'Night Vision', body: 'Advanced infrared and full-colour night sensors for low-light clarity.' },
  { icon: 'fingerprint', title: 'Biometric Access', body: 'Secure access control using fingerprint and facial recognition technology.' },
  { icon: 'storage', title: 'DVR / NVR Systems', body: 'High-capacity recording systems with encrypted local and cloud backup.' },
  { icon: 'notification_important', title: 'Smart Alerts', body: 'AI-driven motion detection that sends instant alerts to your phone.' },
  { icon: 'lock', title: 'Smart Locks', body: 'Keypad, card, and remote-access door locking systems.' },
  { icon: 'doorbell', title: 'Video Intercoms', body: 'See and speak to visitors at your gate from anywhere in the world.' },
  { icon: 'electric_bolt', title: 'Electric Fencing', body: 'High-voltage perimeter security for estates and commercial compounds.' },
]

const whyPoints = [
  { icon: 'shield', title: 'Deter Theft & Break-Ins', body: 'Visible cameras significantly reduce the likelihood of criminal activity on your property.' },
  { icon: 'phone_iphone', title: 'Monitor Remotely', body: 'Watch live footage from your property on your phone from anywhere in Nigeria.' },
  { icon: 'gavel', title: 'Evidence When You Need It', body: 'Recorded footage provides evidence in case of incidents or disputes.' },
  { icon: 'savings', title: 'Reduce Insurance Costs', body: 'Many insurers offer lower premiums for properties with CCTV installed.' },
]

const packages = [
  {
    title: 'Home Package',
    subtitle: 'Perfect for residential properties',
    featured: false,
    features: ['4 HD cameras (indoor + outdoor)', 'DVR recorder with 1TB storage', 'Mobile app viewing', 'Motion detection alerts', 'Professional installation'],
  },
  {
    title: 'Office Package',
    subtitle: 'For businesses and commercial spaces',
    featured: true,
    features: ['8 cameras (mixed indoor/outdoor)', 'NVR recorder with 2TB storage', 'Biometric access control', 'Remote monitoring setup', 'Alarm system integration', 'Staff training included'],
  },
  {
    title: 'Custom Enterprise',
    subtitle: 'For large sites, schools & estates',
    featured: false,
    features: ['Unlimited cameras', 'AI-powered analytics', 'Centralised control room', '24/7 remote monitoring', 'Dedicated support engineer', 'Custom design & planning'],
  },
]

const steps = [
  { icon: 'manage_search', title: 'Security Audit', body: 'We visit and assess vulnerabilities on your property.' },
  { icon: 'design_services', title: 'System Design', body: 'We design the ideal camera layout and system for your needs.' },
  { icon: 'construction', title: 'Installation', body: 'Our certified team installs everything cleanly and professionally.' },
  { icon: 'school', title: 'Training & Support', body: 'We train you on the system and provide ongoing local support.' },
]
</script>
