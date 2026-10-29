<template>
  <div>
    <!-- Hero Banner -->
    <section class="relative min-h-[380px] flex items-center overflow-hidden bg-[#161B30]">
      <div class="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1600&q=80&auto=format&fit=crop"
          alt="Solar panels and modern real estate"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full py-16 text-center">
        <div class="inline-flex items-center gap-2 border border-[#FAC030]/40 text-[#FAC030] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 bg-[#FAC030]/10">
          <span class="material-symbols-outlined text-[16px]">rate_review</span>
          <span>Your Voice Matters</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4" style="font-family: 'Montserrat', sans-serif;">
          Client Feedback &amp; Reviews
        </h1>
        <p class="text-white/75 text-base sm:text-lg max-w-2xl mx-auto">
          Share your experience with IKEBEST solar installations and real estate developments. Your honest feedback helps us serve you even better.
        </p>
      </div>
    </section>

    <!-- Feedback Submission Section -->
    <section class="py-16 bg-[#f8f9fb]">
      <div class="max-w-[860px] mx-auto px-6">
        
        <!-- Category Selector Tabs -->
        <div class="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex gap-2 mb-8">
          <button
            type="button"
            @click="form.category = 'solar'"
            class="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
            :class="form.category === 'solar' ? 'bg-[#FAC030] text-[#161B30] shadow-sm' : 'text-gray-600 hover:bg-gray-100'"
          >
            <span class="material-symbols-outlined">wb_sunny</span>
            <span>Solar Energy Feedback</span>
          </button>
          <button
            type="button"
            @click="form.category = 'estate'"
            class="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
            :class="form.category === 'estate' ? 'bg-[#FAC030] text-[#161B30] shadow-sm' : 'text-gray-600 hover:bg-gray-100'"
          >
            <span class="material-symbols-outlined">domain</span>
            <span>Real Estate Feedback</span>
          </button>
        </div>

        <!-- Success Alert -->
        <div v-if="submitted" class="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-8 text-center mb-8 shadow-sm">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <h3 class="text-2xl font-bold mb-2" style="font-family: 'Montserrat', sans-serif;">Feedback Submitted Successfully!</h3>
          <p class="text-emerald-700 max-w-md mx-auto mb-6 text-sm sm:text-base leading-relaxed">
            Thank you, <strong>{{ submittedName }}</strong>! Your review for our {{ form.category === 'solar' ? 'Solar Energy' : 'Real Estate' }} team has been securely recorded and sent to IKEBEST management.
          </p>
          <div class="flex justify-center gap-4 flex-wrap">
            <button
              @click="resetForm"
              class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all"
            >
              Submit Another Feedback
            </button>
            <RouterLink
              :to="form.category === 'solar' ? '/solar-energy' : '/real-estate'"
              class="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold rounded-xl text-sm transition-all"
            >
              Back to Services
            </RouterLink>
          </div>
        </div>

        <!-- Feedback Form Card -->
        <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10">
          <div class="border-b border-gray-100 pb-5 mb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900" style="font-family: 'Montserrat', sans-serif;">
              {{ form.category === 'solar' ? 'Solar Energy Experience' : 'Real Estate Experience' }}
            </h2>
            <p class="text-gray-500 text-sm mt-1">
              Please take a moment to evaluate the quality of our equipment, engineering, and customer service.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            
            <!-- Rating Star Selector -->
            <div>
              <label class="block text-sm font-semibold text-gray-800 mb-2">Overall Rating *</label>
              <div class="flex items-center gap-2">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  @click="form.rating = star"
                  class="p-1 text-3xl sm:text-4xl transition-transform hover:scale-110 focus:outline-none"
                  :class="star <= form.rating ? 'text-amber-400' : 'text-gray-300'"
                >
                  ★
                </button>
                <span class="ml-3 font-semibold text-gray-700 text-sm">
                  {{ ratingLabel(form.rating) }}
                </span>
              </div>
            </div>

            <!-- Customer Full Name -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-800 mb-2">Your Full Name *</label>
                <input
                  v-model="form.customerName"
                  type="text"
                  required
                  placeholder="e.g. Chief Kingsley Obi"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm transition-all"
                />
              </div>

              <!-- Location / City -->
              <div>
                <label class="block text-sm font-semibold text-gray-800 mb-2">City / Location *</label>
                <input
                  v-model="form.location"
                  type="text"
                  required
                  placeholder="e.g. GRA Asaba, Delta State"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm transition-all"
                />
              </div>
            </div>

            <!-- Service Package / Project -->
            <div>
              <label class="block text-sm font-semibold text-gray-800 mb-2">
                {{ form.category === 'solar' ? 'Solar Package Installed' : 'Real Estate Service / Property' }}
              </label>
              <input
                v-model="form.package"
                type="text"
                :placeholder="form.category === 'solar' ? 'e.g. 5kVA Inverter System or Commercial Solar' : 'e.g. 4-Bedroom Duplex or Land Purchase'"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm transition-all"
              />
            </div>

            <!-- Review Title -->
            <div>
              <label class="block text-sm font-semibold text-gray-800 mb-2">Review Headline / Summary</label>
              <input
                v-model="form.title"
                type="text"
                placeholder="e.g. Outstanding power reliability and fast installation!"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm transition-all"
              />
            </div>

            <!-- Review Text -->
            <div>
              <label class="block text-sm font-semibold text-gray-800 mb-2">Your Detailed Feedback *</label>
              <textarea
                v-model="form.review"
                required
                rows="5"
                placeholder="Tell us what you liked about our work, how the system is performing, or how our team handled your property acquisition..."
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm transition-all"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-4 rounded-xl bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] font-bold text-base transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span v-if="loading" class="material-symbols-outlined animate-spin text-xl">progress_activity</span>
              <span v-else class="material-symbols-outlined text-xl">send</span>
              <span>{{ loading ? 'Submitting Review...' : 'Submit Feedback to Management' }}</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { submitFeedback } from '../services/dataStore.js'

const form = reactive({
  category: 'solar',
  customerName: '',
  location: '',
  package: '',
  title: '',
  review: '',
  rating: 5
})

const loading = ref(false)
const submitted = ref(false)
const submittedName = ref('')

function ratingLabel(rating) {
  switch (rating) {
    case 5: return '5/5 — Excellent & Highly Recommended'
    case 4: return '4/5 — Very Good'
    case 3: return '3/5 — Satisfactory'
    case 2: return '2/5 — Needs Improvement'
    case 1: return '1/5 — Poor'
    default: return ''
  }
}

function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    submitFeedback({ ...form })
    submittedName.value = form.customerName
    submitted.value = true
    loading.value = false
  }, 400)
}

function resetForm() {
  form.customerName = ''
  form.location = ''
  form.package = ''
  form.title = ''
  form.review = ''
  form.rating = 5
  submitted.value = false
}
</script>
