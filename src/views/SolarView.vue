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
    <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
      <div class="max-w-2xl">
        <span class="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
          Solar Energy Solutions
        </span>
        <h1 class="text-[56px] font-extrabold leading-[1.1] tracking-tight text-white mb-6" style="font-family: 'Plus Jakarta Sans', sans-serif;">
          Cut Your Electricity Bills<br />With Solar Power
        </h1>
        <p class="text-white/85 text-lg mb-8 leading-relaxed">
          Reliable energy for Nigerian homes and businesses. Say goodbye to blackouts and rising fuel costs with our high-efficiency solar installations.
        </p>
        <div class="flex gap-4 flex-wrap">
          <a href="#quote" class="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all">
            Request a Free Quote
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
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtDcfV02ZblSDV53MnjWpDZpm73wuEf4zNzcg2kOUU4nNStLjiszi5yhX9KJCIx1Hxz7RQhs_rvpjoy94NYZ2CeFaI-8eMv3VKAz12O-Z6MvufLu10Nq2gDJEh7nqqSmye8eciqKCtHfkJG0ASq-6pUoI6I-30Zj67uz2XlLEEvRIQ_FIcBZvbWV2TfAnz_7b3nSeoaqhlH_OBZxhkNCPJN0VXKeD3bAZY0tNovWym3URKTdRVNCJRWYnl78TGwQ_TBqLQmbokzeY"
        alt="Nigerian family with solar power"
        class="rounded-xl shadow-lg w-full aspect-[4/5] object-cover"
      />
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Why Solar in Nigeria</p>
        <h2 class="text-4xl font-bold text-gray-900 mb-5" style="font-family: 'Plus Jakarta Sans', sans-serif;">Why Switch to Solar Today?</h2>
        <p class="text-gray-500 leading-relaxed mb-8">
          Nigeria's power grid remains unpredictable, but the sun is constant. We help you harness this natural resource to gain true energy independence.
        </p>
        <ul class="space-y-6">
          <li v-for="reason in whyReasons" :key="reason.title" class="flex gap-4 items-start">
            <div class="bg-green-50 p-2.5 rounded-lg text-primary flex-shrink-0">
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
  <section class="bg-[#f4f6f8] py-20">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold uppercase tracking-widest text-primary mb-2">What We Offer</p>
        <h2 class="text-4xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Solar Solutions for Every Need</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="sol in solutions" :key="sol.title" class="bg-white p-8 rounded-xl shadow-sm border-t-[3px] border-primary hover:shadow-md transition-all">
          <span class="material-symbols-outlined text-primary text-[40px] mb-5 block">{{ sol.icon }}</span>
          <h3 class="font-bold text-xl mb-2 text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">{{ sol.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-5">{{ sol.body }}</p>
          <a href="#" class="text-primary font-semibold text-sm inline-flex items-center gap-1">
            Learn More <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section id="how-it-works" class="py-20 max-w-[1200px] mx-auto px-6">
    <p class="text-xs font-semibold uppercase tracking-widest text-primary text-center mb-2">The Process</p>
    <h2 class="text-4xl font-bold text-center text-gray-900 mb-16" style="font-family: 'Plus Jakarta Sans', sans-serif;">Your Path to Clean Energy</h2>
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
  <section class="bg-gray-900 py-20">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-4xl font-bold text-white" style="font-family: 'Plus Jakarta Sans', sans-serif;">Recent Installations</h2>
          <p class="text-gray-400 mt-1 text-sm">Quality craftsmanship across commercial and residential projects.</p>
        </div>
        <button class="text-green-400 font-semibold border-b border-green-400 pb-0.5 text-sm">View All Projects</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <img v-for="img in gallery" :key="img.src" :src="img.src" :alt="img.alt" class="w-full aspect-square object-cover rounded-xl hover:opacity-85 transition-opacity" />
      </div>
    </div>
  </section>

  <!-- CTA Quote Form -->
  <section id="quote" class="py-20">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="bg-green-50 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row gap-16 items-center">
        <div class="md:w-1/2">
          <h2 class="text-4xl font-bold text-gray-900 mb-5" style="font-family: 'Plus Jakarta Sans', sans-serif;">Ready for 24/7 Power?</h2>
          <p class="text-gray-500 leading-relaxed mb-8">Fill out the form to schedule a free site assessment and get a customised quote for your property.</p>
          <div class="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm">
            <span class="material-symbols-outlined text-primary text-[40px]">phone_in_talk</span>
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-gray-500">Speak to an Expert</p>
              <p class="font-bold text-xl text-gray-900 mt-0.5" style="font-family: 'Plus Jakarta Sans', sans-serif;">+234 800 IKEBEST</p>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 w-full">
          <form class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block font-semibold text-sm text-gray-900 mb-1.5">Full Name</label>
                <input class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" placeholder="John Doe" type="text" />
              </div>
              <div>
                <label class="block font-semibold text-sm text-gray-900 mb-1.5">Phone Number</label>
                <input class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" placeholder="080 000 0000" type="tel" />
              </div>
            </div>
            <div>
              <label class="block font-semibold text-sm text-gray-900 mb-1.5">Service Type</label>
              <select class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm bg-white">
                <option>Residential Solar</option>
                <option>Commercial Solar</option>
                <option>Battery / Inverter Only</option>
                <option>Maintenance</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-sm text-gray-900 mb-1.5">Project Address</label>
              <input class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" placeholder="Asaba, Delta State" type="text" />
            </div>
            <button class="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all flex items-center justify-center gap-2">
              Request Free Quote
              <span class="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const whyReasons = [
  { icon: 'flash_off', title: 'End NEPA Unreliability', body: 'Stop worrying about sudden blackouts. Our systems switch over instantly, keeping your life running.' },
  { icon: 'payments', title: 'Massive Long-term Savings', body: 'Eliminate monthly electricity bills and the high cost of diesel or petrol for generators.' },
  { icon: 'eco', title: 'Clean & Silent Energy', body: 'Remove the noise and air pollution of generators from your environment with silent solar technology.' },
]

const solutions = [
  { icon: 'home', title: 'Residential Solar', body: 'Custom rooftop installations for duplexes and bungalows across Delta State and beyond.' },
  { icon: 'apartment', title: 'Commercial Systems', body: 'Power your office, hotel, or hospital with high-capacity solar grids designed for uptime.' },
  { icon: 'battery_charging_full', title: 'Battery Backup', body: 'Advanced Lithium-ion and deep cycle storage solutions to keep you powered through the night.' },
  { icon: 'lightbulb', title: 'Smart Street Lighting', body: 'Solar-powered street lights for estates, local governments, and private driveways.' },
  { icon: 'agriculture', title: 'Solar Water Pumps', body: 'Reliable irrigation and borehole pumping solutions for farms and rural communities.' },
  { icon: 'build_circle', title: 'Maintenance & Repair', body: 'Professional panel cleaning, inverter servicing, and comprehensive system upgrades.' },
]

const steps = [
  { icon: 'map', title: 'Site Visit', body: 'Our engineers assess your roof and energy needs at no charge.' },
  { icon: 'description', title: 'Quote', body: 'You receive a transparent, itemised proposal.' },
  { icon: 'engineering', title: 'Installation', body: 'Fast, professional setup by certified experts.' },
  { icon: 'support_agent', title: 'Support', body: '24/7 monitoring and dedicated local support.' },
]

const gallery = [
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq9LCpDwfPlcT6MX0ogahmxaHtcvjkwurNjVUILumsDp-tiEYDIkwPkW2_CncahMk2O3uYoIiC3I5ZMLRbnBLmN2zRJ87AxxM-s1QiKNNPavrKu7KKmlrlnjqQaukop6TNqZKTRyA86dSvw6MyTtuNrrdwxEV1tu084abTQSRak_1_lSMXXD-j6zkKUzX1REY0OFjomSVT0g9Gsbhsbs3jnH0GHxphxrhR_a6RgGJQgQDURpwZB1UDtpt_Jw5zfICaiA8PNEmwQuM', alt: 'Commercial solar array' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbGQQVa4dlh34PMS3x2DgiKuXCHwWUer6KHkklhLrDB2DySFno61oWhnjC5Xptx_8cwtPznoE0cWT3lSrVvfVO_svvSCu8NxXqX20htRZE0aoOYQX7oJ7jkhoHJ1uS9xB2rgs-a0JwWqoffes5cNSe_wUi13EPjmh5bolethxLVYyubSQMUjE3E1cNamwG1Dxb7DyxYkVtjvCqg9PrhWH4Gz9ZqeUuVfV7et1A8eVL-TAyAB5at9kRqwzSGYPkAwJMWPvw3hZsPsU', alt: 'Home solar installation' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATULrpM0mT7t-7gPstsSoknE4e729YUwuDLBz-eOGRZc5KIjL0S7qykOyWbwNofnS7XPZ_zd_6FCe-SGNOZr-b2AUKfaJzl7RnLQ3z3_xkd9vo2Z63ZckX7g3sHjvCwPkEMYJLLX9FhOp0mAMFALl750rqYTVi6887WmDJMzLjfZb-q3GryVsHqpRF7nNEuNARCnB17OCADICGIEy5Z4VxVmck5yNwtuLJvW4u2636SpOFV2YUJ1NZq-g0ZsN30MvNQ0tMpLlpE4U', alt: 'Solar inverter installation' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLmZhkfKft7BSVSGCCTkMy2i7Ggsd6jr0GN3vScWkm1FelF8ZuXDlA4aTinikK7vKzVPBeSqOkjxIJtvRIk7KI5mMBS_cTs-Wa5ft7i3xWU874DcSnmk3ln_A9pcnsac2KurUyvZuccGDoLLGO-mgwSwkCqUUDx_AGgWoMKOvMKinUBzHQPsMC5kNwD13YISHZ6D65VWU3JRC_dZ3M9bBOq8CI5OTB4mf0ft_fcQxzgRO_Yxgr5dQoXp__n3yGXUbhxYVQufiMIJs', alt: 'Solar street lights' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK7IYhPAFzepfm1gimj8fEtWB9PiL5KgW3N90ro7kiZb62AQQsv52zcs_OdLEA3fYMSvQqLfhMaUL1Xjpf72ifeucLA-u3BKZtWTySM_p-aq7_HsSTi5_Mka2egqtaWAkNmiHGYRWsPTpNksubK3WGKqIOzWYr1s1Bn15YZshP0kWUNRCnvg7cf8Dw9AC3GZYJEmJ1O9x9ZxlG95nYcJ2oTOX1UFHwr5y0TlPFEVo0GMNUnBNeYDZOwTwR7GWkT0CQg39oFIYxdVc', alt: 'Rural community solar' },
  { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGPBypZyudWj82PRkAQoImRpbg2h6do_QebH3ezDwaoaGJccf0CbHM4R_tquNxuZGnCSFdJSrC43CsznxxCdE444oojIbFRqtiGH0jklcJDkiR1uY-jL3bfisp_eMUMKFo5TFlWpWM5xJ7nb0UMt3fvJ8cnJsbrjzxHUi9BrXIvh4Urb8VH-ZFzUG0Qgb7CekGPzTzrXNJ-m_qHXrsoGjSDx8bMq0ZRb9xwTuaoGWA_GLUIoWaZXw4QXcFWFazYZkmpadVz_DkIkM', alt: 'Team installing solar panels' },
]
</script>
