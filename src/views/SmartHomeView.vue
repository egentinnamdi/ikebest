<template>
  <!-- Hero -->
  <section class="relative min-h-[580px] flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ4JZJ9gwROaDrTAYUMJ1cS-hXZsyyfRvXS4B6rXi3-h-E385kBB2I4au7vQAzvk758eE_2TVqsVXIFH3LezachPTtzA4KgMS0cbwDPdJBft1WdoyTUuXu3lOiiSlox1AQ4YbkFKPVjlint6ejpcOyxInSOYbZaoBtOY7juH4cEBkHPgLhQicGxSw4TvaalNfjHt-dFS78SMW3BNDb8C_9eWeMugeCFUmIpxFqZgcTRrsx0h2jov2CAy1mEIGOyaP11X8gh5wQFLU"
        alt="Modern Nigerian smart home living room"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/75 to-transparent"></div>
    </div>
    <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
      <div class="max-w-2xl">
        <span class="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-white text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
          Next-Gen Automation
        </span>
        <h1 class="text-[56px] font-extrabold leading-[1.1] text-white mb-6" style="font-family: 'Plus Jakarta Sans', sans-serif;">
          Control Your Home<br />From Your Phone
        </h1>
        <p class="text-white/80 text-lg mb-8 leading-relaxed">
          World-class smart home technology brought right to your home in Asaba, Delta State. Convenience, security, and comfort — all in one system.
        </p>
        <div class="flex gap-4 flex-wrap">
          <a href="#solutions" class="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all">
            See Solutions
          </a>
          <a href="#consult" class="border-2 border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all">
            Book a Consultation
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- What We Automate -->
  <section id="solutions" class="py-20 bg-white">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Features</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">What We Automate</h2>
        <p class="text-gray-500 mt-3 max-w-xl mx-auto text-[15px]">Every corner of your living space seamlessly connected through one intelligent ecosystem.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="feature in features" :key="feature.title" class="service-card bg-white p-7 rounded-xl hover:shadow-md transition-all">
          <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-5">
            <span class="material-symbols-outlined text-primary text-[26px]">{{ feature.icon }}</span>
          </div>
          <h3 class="font-bold text-[17px] text-gray-900 mb-2" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ feature.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ feature.body }}</p>
          <RouterLink :to="feature.link || '/smart-home'" class="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
            Learn more <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="py-20 bg-[#f4f6f8]">
    <div class="max-w-[1200px] mx-auto px-6">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary text-center mb-2">Simple Process</p>
      <h2 class="text-4xl font-bold text-center text-gray-900 mb-3" style="font-family: 'Plus Jakarta Sans', sans-serif;">How It Works</h2>
      <p class="text-center text-gray-500 mb-16">Three simple steps to a smarter home.</p>
      <div class="relative grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-gray-200 -z-10"></div>
        <div v-for="(step, i) in steps" :key="step.title" class="flex flex-col items-center text-center">
          <div class="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-extrabold mb-6 shadow-lg shadow-green-100">
            {{ i + 1 }}
          </div>
          <h4 class="font-bold text-gray-900 mb-2" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ step.title }}</h4>
          <p class="text-gray-500 text-sm leading-relaxed max-w-xs">{{ step.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Packages -->
  <section class="py-20 bg-white">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Pricing</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Smart Home Packages</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="pkg in packages"
          :key="pkg.title"
          class="p-8 rounded-2xl border-2 flex flex-col relative"
          :class="pkg.featured ? 'border-primary shadow-xl shadow-green-100 bg-white' : 'border-gray-200 bg-white'"
        >
          <div v-if="pkg.featured" class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
            Most Popular
          </div>
          <h3 class="font-bold text-xl text-gray-900 mb-1" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ pkg.title }}</h3>
          <p class="text-gray-400 text-sm mb-6">{{ pkg.subtitle }}</p>
          <ul class="space-y-3 flex-grow mb-8">
            <li v-for="f in pkg.features" :key="f" class="flex gap-2 items-start text-sm text-gray-700">
              <span class="material-symbols-outlined text-primary text-[18px] flex-shrink-0 mt-0.5" style="font-variation-settings:'FILL' 1;">check_circle</span>
              {{ f }}
            </li>
          </ul>
          <a href="#consult" class="block text-center py-3 rounded-xl font-semibold text-sm transition-all"
            :class="pkg.featured ? 'bg-primary text-white hover:bg-green-800' : 'border-2 border-primary text-primary hover:bg-green-50'">
            Get a Quote →
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Consultation Form -->
  <section id="consult" class="py-20 bg-[#f4f6f8]">
    <div class="max-w-[700px] mx-auto px-6 text-center">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Get Started</p>
      <h2 class="text-4xl font-bold text-gray-900 mb-4" style="font-family: 'Plus Jakarta Sans', sans-serif;">Request a Free Consultation</h2>
      <p class="text-gray-500 mb-10">Our smart home engineers will assess your home and design the ideal automation system for your budget.</p>
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
          <label class="block font-semibold text-sm text-gray-900 mb-1.5">Address / Location</label>
          <input class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" placeholder="Your home address in Asaba" type="text" />
        </div>
        <div>
          <label class="block font-semibold text-sm text-gray-900 mb-1.5">Interested In</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <label v-for="opt in interestOptions" :key="opt" class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer p-2 rounded-lg border border-gray-200 hover:border-primary hover:bg-green-50 transition-all">
              <input type="checkbox" class="accent-primary w-4 h-4" />
              {{ opt }}
            </label>
          </div>
        </div>
        <button class="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all">
          Book Free Consultation
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
const features = [
  { icon: 'lightbulb', title: 'Smart Lighting', body: 'Schedule routines, dim lights, and choose from millions of colours for every room.' },
  { icon: 'lock', title: 'Smart Locks', body: 'Keyless entry, temporary access codes, and remote unlock from your phone.' },
  { icon: 'gate', title: 'Automated Gates', body: 'License plate recognition and remote-controlled gate access for your compound.' },
  { icon: 'thermostat', title: 'Climate Control', body: 'Automatically adjust your AC to your preferred temperature before you arrive home.' },
  { icon: 'security', title: 'Integrated CCTV', body: 'AI-powered cameras that send motion alerts directly to your phone.' },
  { icon: 'speaker', title: 'Multi-Room Audio', body: 'Premium sound synced across every room in your home.' },
]

const steps = [
  { title: 'Free Consultation', body: 'Our engineers visit your home and discuss your specific automation needs and budget.' },
  { title: 'Custom Installation', body: 'We install everything neatly with minimal disruption to your walls and existing decor.' },
  { title: 'Training & Support', body: 'We show you how to use the app and provide ongoing support from our Asaba-based team.' },
]

const packages = [
  {
    title: 'Starter',
    subtitle: 'For 2–3 bedroom homes',
    featured: false,
    features: ['Smart lighting (5 rooms)', 'Smart locks (main door)', 'Mobile app control', 'Basic CCTV integration', 'Local tech support'],
  },
  {
    title: 'Premium',
    subtitle: 'For full smart home experience',
    featured: true,
    features: ['Smart lighting (full home)', 'Smart locks & automated gate', 'Climate control integration', 'Multi-room audio', '8-camera CCTV integration', 'Intercom & video doorbell', '1-year maintenance plan'],
  },
  {
    title: 'Custom Build',
    subtitle: 'Fully bespoke for any property',
    featured: false,
    features: ['Unlimited automation points', 'Solar power integration', 'Full AI scene management', 'Dedicated site engineer', 'Priority remote support', 'Warranty & SLA plan'],
  },
]

const interestOptions = ['Lighting', 'Smart Locks', 'Gate Control', 'CCTV', 'Climate', 'Audio']
</script>
