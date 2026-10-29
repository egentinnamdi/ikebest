<template>
  <div>
    <!-- Hero Header -->
    <section class="relative min-h-[340px] flex items-center overflow-hidden bg-[#161B30]">
      <div class="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=80&auto=format&fit=crop"
          alt="Engineering and customer registration"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full py-14 text-center">
        <!-- Staff Copy-Link Pill -->
        <div class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#FAC030] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#FAC030]/30 transition-all cursor-pointer backdrop-blur-sm"
          @click="copyPageLink"
        >
          <span class="material-symbols-outlined text-[16px]">share</span>
          <span>{{ copied ? 'Link Copied to Clipboard!' : 'Shareable Customer Onboarding Link (Click to Copy)' }}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3" style="font-family: 'Montserrat', sans-serif;">
          Customer Registration &amp; Onboarding
        </h1>
        <p class="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
          Please provide your contact, installation site, and celebration dates to generate your official IKEBEST Customer ID number.
        </p>
      </div>
    </section>

    <!-- Form Section -->
    <section class="py-14 bg-[#f8f9fb]">
      <div class="max-w-[840px] mx-auto px-6">
        
        <!-- Registration Completed Card -->
        <div v-if="registeredCustomer" class="bg-white rounded-3xl shadow-xl border border-emerald-200 overflow-hidden">
          <div class="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white text-center">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <span class="material-symbols-outlined text-4xl text-white">verified</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold" style="font-family: 'Montserrat', sans-serif;">
              Registration Successful!
            </h2>
            <p class="text-white/90 text-sm mt-1">Your official customer profile has been generated in the IKEBEST system.</p>
          </div>

          <div class="p-8 sm:p-10 space-y-6">
            
            <!-- Customer ID Highlight Box -->
            <div class="bg-amber-50 border-2 border-dashed border-[#FAC030] rounded-2xl p-6 text-center">
              <span class="text-xs uppercase font-extrabold tracking-widest text-[#161B30]/70 block mb-1">
                Your Assigned Customer ID
              </span>
              <div class="text-3xl sm:text-4xl font-extrabold text-[#161B30] tracking-wide" style="font-family: 'Montserrat', sans-serif;">
                {{ registeredCustomer.id }}
              </div>
              <p class="text-xs text-gray-500 mt-2">
                Keep this ID safe! Quote this number for all payments, installations, and warranty claims.
              </p>
              <button
                @click="copyCustomerId"
                class="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] font-bold text-xs rounded-lg transition-all"
              >
                <span class="material-symbols-outlined text-sm">content_copy</span>
                <span>{{ copiedId ? 'Copied to Clipboard!' : 'Copy Customer ID' }}</span>
              </button>
            </div>

            <!-- Customer Summary Table -->
            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-3 text-sm">
              <div class="flex justify-between py-1.5 border-b border-gray-200">
                <span class="text-gray-500 font-medium">Customer Name:</span>
                <span class="font-bold text-gray-800">{{ registeredCustomer.fullName }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-gray-200">
                <span class="text-gray-500 font-medium">Phone Number:</span>
                <span class="font-bold text-gray-800">{{ registeredCustomer.phone }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-gray-200">
                <span class="text-gray-500 font-medium">Package / Service:</span>
                <span class="font-bold text-gray-800">{{ registeredCustomer.package }}</span>
              </div>
              <div class="flex justify-between py-1.5 border-b border-gray-200">
                <span class="text-gray-500 font-medium">Installation Address:</span>
                <span class="font-bold text-gray-800 text-right">{{ registeredCustomer.address }}, {{ registeredCustomer.state }}</span>
              </div>
              <div v-if="registeredCustomer.dob" class="flex justify-between py-1.5 border-b border-gray-200">
                <span class="text-gray-500 font-medium">Birthday:</span>
                <span class="font-bold text-gray-800">{{ formatDate(registeredCustomer.dob) }}</span>
              </div>
              <div v-if="registeredCustomer.weddingAnniversary" class="flex justify-between py-1.5">
                <span class="text-gray-500 font-medium">Wedding Anniversary:</span>
                <span class="font-bold text-gray-800">{{ formatDate(registeredCustomer.weddingAnniversary) }}</span>
              </div>
            </div>

            <div class="text-center pt-2">
              <p class="text-xs text-gray-500 mb-4">
                Our engineering and technical operations team will review your file and reach out on WhatsApp/Phone shortly.
              </p>
              <div class="flex justify-center gap-4 flex-wrap">
                <button
                  @click="registeredCustomer = null"
                  class="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-all"
                >
                  Register Another Customer
                </button>
                <RouterLink
                  to="/"
                  class="px-6 py-3 rounded-xl bg-[#161B30] hover:bg-[#1E2545] text-white font-semibold text-sm transition-all"
                >
                  Return to Homepage
                </RouterLink>
              </div>
            </div>

          </div>
        </div>

        <!-- Registration Form -->
        <div v-else class="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-10">
          
          <div class="flex items-center justify-between border-b border-gray-100 pb-5 mb-8">
            <div>
              <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Montserrat', sans-serif;">
                New Customer Information
              </h2>
              <p class="text-gray-500 text-sm mt-1">
                Please complete this form accurately so our technical team can process your project.
              </p>
            </div>
            <button
              type="button"
              @click="copyPageLink"
              class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all"
              title="Copy shareable link for WhatsApp"
            >
              <span class="material-symbols-outlined text-[16px]">link</span>
              <span>{{ copied ? 'Link Copied!' : 'Copy Link' }}</span>
            </button>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-6">

            <!-- Section 1: Personal Contact Information -->
            <div>
              <h3 class="text-sm font-extrabold uppercase tracking-wider text-[#161B30] mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#FAC030]"></span>
                <span>1. Personal &amp; Contact Details</span>
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    v-model="form.fullName"
                    type="text"
                    required
                    placeholder="e.g. Chief Kingsley Obi"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="e.g. 08139522490"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="e.g. client@gmail.com"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    State / Location *
                  </label>
                  <input
                    v-model="form.state"
                    type="text"
                    required
                    placeholder="e.g. Delta State, Asaba"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Residential / Site Installation Address *
                </label>
                <input
                  v-model="form.address"
                  type="text"
                  required
                  placeholder="e.g. Plot 15, Commissioners Quarters, Okpanam Road, Asaba"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                />
              </div>
            </div>

            <!-- Section 2: Celebration Dates for Automated Messages -->
            <div class="pt-4 border-t border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-extrabold uppercase tracking-wider text-[#161B30] flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#FAC030]"></span>
                  <span>2. Special Dates (Birthday &amp; Wedding Anniversary)</span>
                </h3>
                <span class="text-[11px] text-[#161B30] bg-[#FAC030]/20 px-2.5 py-0.5 rounded-full font-bold">
                  For Goodwill &amp; Gifts
                </span>
              </div>
              
              <p class="text-xs text-gray-500 mb-4">
                We celebrate our esteemed clients! Provide your dates to receive official goodwill messages and exclusive anniversary discounts from IKEBEST Group.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Date of Birth (Birthday) *
                  </label>
                  <input
                    v-model="form.dob"
                    type="date"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Wedding Anniversary (If Married)
                  </label>
                  <input
                    v-model="form.weddingAnniversary"
                    type="date"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Section 3: Service Package & Financials -->
            <div class="pt-4 border-t border-gray-100">
              <h3 class="text-sm font-extrabold uppercase tracking-wider text-[#161B30] mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#FAC030]"></span>
                <span>3. Service Package &amp; Requirements</span>
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Service Sector *
                  </label>
                  <select
                    v-model="form.packageCategory"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm bg-white"
                  >
                    <option value="solar">Solar Energy Systems</option>
                    <option value="estate">Real Estate &amp; Properties</option>
                    <option value="cctv">CCTV &amp; Surveillance</option>
                    <option value="smarthome">Smart Home Automation</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Package Name or Property Description *
                  </label>
                  <input
                    v-model="form.package"
                    type="text"
                    required
                    placeholder="e.g. 5kVA Hybrid Inverter or 4-Bed Duplex"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Total Quoted Package Price (₦)
                  </label>
                  <input
                    v-model.number="form.totalCost"
                    type="number"
                    min="0"
                    placeholder="e.g. 4500000"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Initial Deposit / Amount Paid (₦)
                  </label>
                  <input
                    v-model.number="form.amountPaid"
                    type="number"
                    min="0"
                    placeholder="e.g. 3000000"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-2 focus:ring-[#FAC030]/20 outline-none text-gray-800 text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Section 4: Picture Uploads (Customer & House) -->
            <div class="pt-4 border-t border-gray-100">
              <h3 class="text-sm font-extrabold uppercase tracking-wider text-[#161B30] mb-3 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#FAC030]"></span>
                <span>4. Customer &amp; Site Pictures (Optional)</span>
              </h3>
              <p class="text-xs text-gray-500 mb-4">
                You can upload a passport photo and picture of your house/installation site to assist our engineers.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Customer Photo Upload -->
                <div class="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-[#FAC030] transition-colors">
                  <div v-if="customerPhotoPreview" class="relative">
                    <img :src="customerPhotoPreview" alt="Customer Preview" class="w-24 h-24 object-cover rounded-xl mx-auto mb-2 border border-gray-200" />
                    <button type="button" @click="customerPhotoPreview = ''" class="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <div v-else>
                    <span class="material-symbols-outlined text-3xl text-gray-400 mb-1">account_box</span>
                    <p class="text-xs font-semibold text-gray-700">Customer Photo</p>
                    <label class="mt-2 inline-block px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg cursor-pointer">
                      Browse Photo
                      <input type="file" accept="image/*" class="hidden" @change="handleCustomerPhotoUpload" />
                    </label>
                  </div>
                </div>

                <!-- House / Site Photo Upload -->
                <div class="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-[#FAC030] transition-colors">
                  <div v-if="housePhotoPreview" class="relative">
                    <img :src="housePhotoPreview" alt="House Preview" class="w-24 h-24 object-cover rounded-xl mx-auto mb-2 border border-gray-200" />
                    <button type="button" @click="housePhotoPreview = ''" class="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  <div v-else>
                    <span class="material-symbols-outlined text-3xl text-gray-400 mb-1">home</span>
                    <p class="text-xs font-semibold text-gray-700">House / Building Photo</p>
                    <label class="mt-2 inline-block px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg cursor-pointer">
                      Browse Photo
                      <input type="file" accept="image/*" class="hidden" @change="handleHousePhotoUpload" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Action -->
            <div class="pt-4">
              <button
                type="submit"
                :disabled="loading"
                class="w-full py-4 rounded-xl bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] font-bold text-base transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span v-if="loading" class="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                <span v-else class="material-symbols-outlined text-xl">assignment_turned_in</span>
                <span>{{ loading ? 'Generating Customer Profile...' : 'Submit & Generate Customer ID' }}</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { createCustomer, formatDate } from '../services/dataStore.js'

const form = reactive({
  fullName: '',
  phone: '',
  email: '',
  state: 'Delta State',
  address: '',
  dob: '',
  weddingAnniversary: '',
  packageCategory: 'solar',
  package: '',
  totalCost: '',
  amountPaid: ''
})

const customerPhotoPreview = ref('')
const housePhotoPreview = ref('')
const loading = ref(false)
const registeredCustomer = ref(null)
const copied = ref(false)
const copiedId = ref(false)

function copyPageLink() {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 3000)
  })
}

function copyCustomerId() {
  if (!registeredCustomer.value) return
  navigator.clipboard.writeText(registeredCustomer.value.id).then(() => {
    copiedId.value = true
    setTimeout(() => { copiedId.value = false }, 3000)
  })
}

function handleCustomerPhotoUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    customerPhotoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function handleHousePhotoUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    housePhotoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function handleRegister() {
  loading.value = true
  setTimeout(() => {
    const photos = {
      customerPhotos: customerPhotoPreview.value ? [customerPhotoPreview.value] : [],
      housePhotos: housePhotoPreview.value ? [housePhotoPreview.value] : [],
      setupPhotos: []
    }

    const newCustomer = createCustomer({
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      state: form.state,
      address: form.address,
      dob: form.dob,
      weddingAnniversary: form.weddingAnniversary || null,
      packageCategory: form.packageCategory,
      package: form.package,
      totalCost: form.totalCost || 0,
      amountPaid: form.amountPaid || 0,
      photos
    })

    registeredCustomer.value = newCustomer
    loading.value = false
  }, 400)
}
</script>
