<template>
  <div class="min-h-screen bg-[#f3f4f8] text-[#161B30]">
    
    <!-- Top Security Header -->
    <header class="bg-[#161B30] text-white py-5 px-6 border-b border-white/10 shadow-lg sticky top-0 z-30">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/dtetfimeq/image/upload/v1778246625/ikebest-logo_cgx4cg.png"
            alt="IKEBEST Group"
            class="h-10 w-auto bg-white/10 p-1.5 rounded-xl"
          />
          <div>
            <div class="text-sm font-black tracking-wider uppercase text-white" style="font-family: 'Montserrat', sans-serif;">
              IKEBEST GROUP
            </div>
            <div class="text-[10px] text-[#FAC030] font-bold tracking-widest uppercase">
              Field Engineer Security Clearance Portal
            </div>
          </div>
        </RouterLink>

        <div class="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold">
          <span class="material-symbols-outlined text-[16px] text-red-400">shield</span>
          <span>100% Mandatory Anti-Theft KYC</span>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      <!-- SUBMISSION SUCCESS STATE: Application Under Security Review (No credentials shown) -->
      <div v-if="registeredEngineer" class="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl text-center">
        <div class="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-sm">
          <span class="material-symbols-outlined text-4xl">pending_actions</span>
        </div>

        <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 uppercase tracking-wider border border-amber-200">
          <span class="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
          Application Submitted &amp; Under Security Review
        </span>

        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#161B30] mt-3" style="font-family: 'Montserrat', sans-serif;">
          Clearance Reference ID: {{ registeredEngineer.id }}
        </h2>
        
        <p class="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto mt-2 leading-relaxed">
          Thank you, <strong>{{ registeredEngineer.fullName }}</strong>. Your sworn anti-theft profiling documents, biometrics, residential coordinates, and guarantor commitments have been successfully logged in the IKEBEST Security Registry.
        </p>

        <!-- Information & Verification Timeline Card -->
        <div class="my-6 p-6 rounded-2xl bg-gradient-to-br from-[#161B30] to-[#1e2545] text-white max-w-lg mx-auto text-left shadow-lg border border-white/10">
          <div class="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
            <span class="text-xs font-extrabold uppercase text-[#FAC030] tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">schedule</span>
              <span>Verification Timeline &amp; Next Steps</span>
            </span>
            <span class="text-[10px] bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold border border-amber-400/30">
              Status: Pending Review
            </span>
          </div>

          <div class="space-y-4 text-xs sm:text-sm">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-[#FAC030] text-lg shrink-0 mt-0.5">mark_email_read</span>
              <div>
                <div class="font-bold text-white">Result Notification via Email (2 - 3 Business Days)</div>
                <div class="text-gray-300 text-xs mt-0.5 leading-relaxed">
                  Your identity (NIN), physical residence, landlord contact, and both legal guarantors are currently undergoing mandatory security background checks. You will be informed of the vetting result within <strong>2 to 3 business days</strong> via your registered email (<span class="font-mono text-[#FAC030]">{{ registeredEngineer.email }}</span>).
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-[#FAC030] text-lg shrink-0 mt-0.5">key</span>
              <div>
                <div class="font-bold text-white">Official Login Credentials Dispatch</div>
                <div class="text-gray-300 text-xs mt-0.5 leading-relaxed">
                  Once your clearance is approved by Head Office, an official clearance notification containing your unique portal login credentials and field access code will be dispatched directly to your email address.
                </div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-[#FAC030] text-lg shrink-0 mt-0.5">support_agent</span>
              <div>
                <div class="font-bold text-white">Vetting Support &amp; Enquiries</div>
                <div class="text-gray-300 text-xs mt-0.5 leading-relaxed">
                  Always quote your Reference ID <strong class="font-mono text-white">{{ registeredEngineer.id }}</strong> when contacting our Compliance Desk at <strong>08139522490</strong> or <strong>Ikebest316@gmail.com</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-3">
          <RouterLink
            to="/"
            class="py-2.5 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 shadow-sm"
          >
            <span class="material-symbols-outlined text-[16px]">home</span>
            <span>Return to Homepage</span>
          </RouterLink>
        </div>
      </div>

      <!-- ONBOARDING FORM WIZARD (Max 3 Pages) -->
      <div v-else class="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl">
        
        <!-- Header Info -->
        <div class="border-b border-gray-100 pb-6 mb-6">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-100 text-red-700">
              Mandatory Legal Requirement
            </span>
            <span class="text-xs text-gray-400">Strict Anti-Theft Protocol</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[#161B30]" style="font-family: 'Montserrat', sans-serif;">
            Field Engineer Security Clearance
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">
            Complete all fields across the 3 steps below. Every piece of information will be verified against national identity databases (NIN) before equipment allocation.
          </p>
        </div>

        <!-- 3-Step Progress Indicator -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <div class="text-xs font-extrabold uppercase tracking-wider text-[#161B30]">
              Step {{ currentStep }} of 3: <span class="text-[#FAC030]">{{ stepTitles[currentStep - 1] }}</span>
            </div>
            <div class="text-xs font-bold text-gray-500 font-mono">
              {{ Math.round((currentStep / 3) * 100) }}% Completed
            </div>
          </div>
          
          <div class="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div
              class="bg-gradient-to-r from-[#161B30] to-[#FAC030] h-full transition-all duration-300 rounded-full"
              :style="{ width: `${(currentStep / 3) * 100}%` }"
            ></div>
          </div>

          <div class="grid grid-cols-3 gap-2 mt-3 text-center text-[11px] font-bold">
            <span :class="currentStep >= 1 ? 'text-[#161B30]' : 'text-gray-400'">1. Legal Identity</span>
            <span :class="currentStep >= 2 ? 'text-[#161B30]' : 'text-gray-400'">2. Residence &amp; Roots</span>
            <span :class="currentStep >= 3 ? 'text-[#161B30]' : 'text-gray-400'">3. Guarantors &amp; Oath</span>
          </div>
        </div>

        <!-- Validation Error Banner -->
        <div v-if="validationError" class="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
          <span class="material-symbols-outlined text-base mt-0.5 shrink-0 text-red-500">warning</span>
          <div class="font-semibold">{{ validationError }}</div>
        </div>

        <!-- ===================================================================== -->
        <!-- STEP 1: LEGAL IDENTITY, GOVERNMENT IDS & BIOMETRICS -->
        <!-- ===================================================================== -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div class="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <h3 class="text-sm font-extrabold text-[#161B30] flex items-center gap-2 mb-1">
              <span class="material-symbols-outlined text-[#FAC030] text-lg">badge</span>
              <span>Personal Legal Information (Must Match NIMC / NIN Records)</span>
            </h3>
            <p class="text-xs text-gray-500">
              Provide exact legal details as registered with the National Identity Management Commission (NIMC).
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Legal Name *
              </label>
              <input
                v-model="form.fullName"
                type="text"
                placeholder="First Name, Middle Name, Surname"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Known Nicknames / Aliases *
              </label>
              <input
                v-model="form.nickname"
                type="text"
                placeholder="e.g. Chukwu Solar, Sparky (or 'None')"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                National Identification Number (NIN) * (11 Digits)
              </label>
              <input
                v-model="form.nin"
                type="text"
                maxlength="11"
                placeholder="e.g. 12345678901"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm font-mono text-gray-800"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Date of Birth *
              </label>
              <input
                v-model="form.dob"
                type="date"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Gender *
              </label>
              <select
                v-model="form.gender"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Primary WhatsApp Phone *
              </label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="e.g. 08123456789"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Alternative Phone Number *
              </label>
              <input
                v-model="form.altPhone"
                type="tel"
                placeholder="e.g. 08033221144"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Personal Email Address (Will be your login identifier) *
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="e.g. engineer.name@gmail.com"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
            />
          </div>

          <!-- Biometric & Document Uploads -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <!-- Passport Photo -->
            <div class="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-[#FAC030] transition-colors">
              <div v-if="form.passportPhotoUrl" class="relative">
                <img :src="form.passportPhotoUrl" alt="Passport Preview" class="w-24 h-24 object-cover rounded-xl mx-auto mb-2 border border-gray-300 shadow-sm" />
                <button type="button" @click="form.passportPhotoUrl = ''" class="text-xs text-red-500 font-bold hover:underline">Remove &amp; Retake</button>
              </div>
              <div v-else>
                <span class="material-symbols-outlined text-3xl text-gray-400 mb-1">account_box</span>
                <p class="text-xs font-bold text-gray-700">Live Passport Photo *</p>
                <p class="text-[11px] text-gray-400">Clear front-facing photo</p>
                <label class="mt-2.5 inline-block px-3 py-1.5 bg-[#161B30] text-[#FAC030] text-xs font-bold rounded-lg cursor-pointer hover:bg-black transition-all">
                  Upload Photo
                  <input type="file" accept="image/*" class="hidden" @change="e => handleFileUpload(e, 'passportPhotoUrl')" />
                </label>
              </div>
            </div>

            <!-- Valid Gov ID -->
            <div class="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-[#FAC030] transition-colors">
              <div v-if="form.idCardUrl" class="relative">
                <img :src="form.idCardUrl" alt="ID Preview" class="w-28 h-20 object-cover rounded-xl mx-auto mb-2 border border-gray-300 shadow-sm" />
                <button type="button" @click="form.idCardUrl = ''" class="text-xs text-red-500 font-bold hover:underline">Remove &amp; Change</button>
              </div>
              <div v-else>
                <span class="material-symbols-outlined text-3xl text-gray-400 mb-1">id_card</span>
                <p class="text-xs font-bold text-gray-700">Valid Government ID *</p>
                <p class="text-[11px] text-gray-400">NIN Slip, Voter's Card, or Driver's License</p>
                <label class="mt-2.5 inline-block px-3 py-1.5 bg-[#161B30] text-[#FAC030] text-xs font-bold rounded-lg cursor-pointer hover:bg-black transition-all">
                  Upload ID Card
                  <input type="file" accept="image/*" class="hidden" @change="e => handleFileUpload(e, 'idCardUrl')" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- ===================================================================== -->
        <!-- STEP 2: PHYSICAL RESIDENCE, LANDLORD & ANCESTRAL VILLAGE -->
        <!-- ===================================================================== -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div class="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <h3 class="text-sm font-extrabold text-[#161B30] flex items-center gap-2 mb-1">
              <span class="material-symbols-outlined text-[#FAC030] text-lg">home_pin</span>
              <span>Physical Residence &amp; Landlord Verification</span>
            </h3>
            <p class="text-xs text-gray-500">
              Provide exact physical directions and your residential landlord/caretaker's details. These are checked physically before site dispatch.
            </p>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Current Residential Address (Where you sleep nightly) *
            </label>
            <input
              v-model="form.residentialAddress"
              type="text"
              placeholder="e.g. No 14, Ogochukwu Street, Okpanam Road, Asaba"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Nearest Popular Landmark / Bus Stop *
              </label>
              <input
                v-model="form.landmark"
                type="text"
                placeholder="e.g. Beside Zenith Bank, Summit Junction"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Landlord / Caretaker Full Name *
              </label>
              <input
                v-model="form.landlordName"
                type="text"
                placeholder="e.g. Chief O. Nnamdi (Landlord)"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Landlord / Caretaker Active Phone Number *
              </label>
              <input
                v-model="form.landlordPhone"
                type="tel"
                placeholder="e.g. 08055667788"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
              />
            </div>

            <!-- Proof of Residence upload -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Proof of Residence * (PHCN Bill / Rent Receipt)
              </label>
              <div v-if="form.proofOfAddressUrl" class="flex items-center gap-2">
                <span class="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                  <span>Document Attached</span>
                </span>
                <button type="button" @click="form.proofOfAddressUrl = ''" class="text-xs text-red-500 underline ml-2">Change</button>
              </div>
              <label v-else class="block px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer text-center border border-gray-300">
                Browse Bill / Receipt
                <input type="file" accept="image/*,application/pdf" class="hidden" @change="e => handleFileUpload(e, 'proofOfAddressUrl')" />
              </label>
            </div>
          </div>

          <!-- Ancestral Roots (Village Compound Tracing) -->
          <div class="pt-4 border-t border-gray-100">
            <h4 class="text-xs font-extrabold uppercase text-[#161B30] tracking-wider mb-3 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-[#FAC030]">account_tree</span>
              <span>Ancestral Community &amp; Family Compound (Traditional Tracing)</span>
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  State of Origin *
                </label>
                <input
                  v-model="form.stateOfOrigin"
                  type="text"
                  placeholder="e.g. Delta State"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  LGA of Origin *
                </label>
                <input
                  v-model="form.lgaOfOrigin"
                  type="text"
                  placeholder="e.g. Oshimili North"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Ancestral Town / Village *
                </label>
                <input
                  v-model="form.homeTown"
                  type="text"
                  placeholder="e.g. Ibusa / Okpanam"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Ancestral Family Compound Address / Quarters *
              </label>
              <input
                v-model="form.ancestralAddress"
                type="text"
                placeholder="e.g. Diokpa Obi Compound, Umuekea Village, Delta State"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm text-gray-800"
              />
            </div>
          </div>
        </div>

        <!-- ===================================================================== -->
        <!-- STEP 3: TWO GUARANTORS, BANK ACCOUNT & CRIMINAL AFFIDAVIT -->
        <!-- ===================================================================== -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div class="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <h3 class="text-sm font-extrabold text-[#161B30] flex items-center gap-2 mb-1">
              <span class="material-symbols-outlined text-[#FAC030] text-lg">verified_user</span>
              <span>Two Legal Guarantors &amp; Payout Account</span>
            </h3>
            <p class="text-xs text-gray-500">
              Guarantors must be persons of unquestionable character who will be held legally liable if company assets or client products are diverted.
            </p>
          </div>

          <!-- Guarantor 1: Primary (Family / Senior Figure) -->
          <div class="p-4 rounded-2xl border border-amber-200 bg-amber-50/40">
            <h4 class="text-xs font-extrabold uppercase text-[#161B30] tracking-wider mb-3 flex items-center justify-between">
              <span>Guarantor 1: Primary Family Figure *</span>
              <span class="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">Mandatory</span>
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                <input v-model="form.guarantor1.fullName" type="text" placeholder="e.g. Elder Samuel Chukwudi" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Relationship *</label>
                <input v-model="form.guarantor1.relationship" type="text" placeholder="e.g. Father / Uncle" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number *</label>
                <input v-model="form.guarantor1.phone" type="tel" placeholder="e.g. 08022334455" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Guarantor NIN (11 Digits) *</label>
                <input v-model="form.guarantor1.nin" type="text" maxlength="11" placeholder="e.g. 98765432101" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white font-mono" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Workplace / Business *</label>
                <input v-model="form.guarantor1.workplace" type="text" placeholder="e.g. Delta State Civil Service Commission" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Residential Address *</label>
                <input v-model="form.guarantor1.residentialAddress" type="text" placeholder="e.g. Plot 8, GRA, Asaba" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
            </div>
          </div>

          <!-- Guarantor 2: Professional / Community Figure -->
          <div class="p-4 rounded-2xl border border-blue-200 bg-blue-50/40">
            <h4 class="text-xs font-extrabold uppercase text-[#161B30] tracking-wider mb-3 flex items-center justify-between">
              <span>Guarantor 2: Professional / Clergy / Community Figure *</span>
              <span class="text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-bold">Mandatory</span>
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                <input v-model="form.guarantor2.fullName" type="text" placeholder="e.g. Pastor David Okon / Arc. Benson" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Standing / Occupation *</label>
                <input v-model="form.guarantor2.occupation" type="text" placeholder="e.g. Clergy / Senior Architect" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number *</label>
                <input v-model="form.guarantor2.phone" type="tel" placeholder="e.g. 08066778899" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Residential Address *</label>
                <input v-model="form.guarantor2.residentialAddress" type="text" placeholder="e.g. 24 Nnebisi Road, Asaba" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
            </div>
          </div>

          <!-- Bank Account for Salary / Installation Payouts -->
          <div class="p-4 rounded-2xl border border-gray-200 bg-gray-50">
            <h4 class="text-xs font-extrabold uppercase text-[#161B30] tracking-wider mb-3">
              Bank Account for Payouts (Must match legal name) *
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Bank Name *</label>
                <input v-model="form.bankDetails.bankName" type="text" placeholder="e.g. Zenith Bank" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Account Number * (10 Digits)</label>
                <input v-model="form.bankDetails.accountNumber" type="text" maxlength="10" placeholder="e.g. 1012345678" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white font-mono" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Account Name *</label>
                <input v-model="form.bankDetails.accountName" type="text" placeholder="As on Bank Statement" class="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white" />
              </div>
            </div>
          </div>

          <!-- Sworn Legal Declaration & Criminal Indemnity -->
          <div class="p-5 rounded-2xl border-2 border-red-200 bg-red-50/50">
            <div class="flex items-start gap-3">
              <input
                id="affidavitCheck"
                v-model="form.agreedToAffidavit"
                type="checkbox"
                class="mt-1 w-5 h-5 rounded border-gray-300 text-[#161B30] focus:ring-[#FAC030] cursor-pointer"
              />
              <label for="affidavitCheck" class="text-xs text-gray-800 leading-relaxed cursor-pointer select-none">
                <strong>SWORN LEGAL DECLARATION &amp; CRIMINAL INDEMNITY:</strong>
                I solemnly swear that all personal, residential, biometric, and guarantor details provided are 100% genuine and verified. I explicitly authorize IKEBEST Group to verify my NIN and background with state security agencies. In the event of theft, diversion, or unauthorized removal of any company equipment (inverters, batteries, solar panels, CCTV cameras, or cables) entrusted to me, I consent to immediate criminal prosecution and the transmission of my biometric dossier to the Nigeria Police Force and law enforcement authorities.
              </label>
            </div>
          </div>
        </div>

        <!-- WIZARD NAVIGATION CONTROLS (Next / Prev / Submit) -->
        <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
          <button
            v-if="currentStep > 1"
            type="button"
            @click="currentStep--"
            class="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Previous Step</span>
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < 3"
            type="button"
            @click="handleNextStep"
            class="px-6 py-3 rounded-xl bg-[#161B30] hover:bg-[#1E2545] text-[#FAC030] text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Proceed to Step {{ currentStep + 1 }}</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>

          <button
            v-else
            type="button"
            :disabled="loading"
            @click="handleSubmit"
            class="px-8 py-3.5 rounded-xl bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
          >
            <span v-if="loading" class="material-symbols-outlined animate-spin text-lg">progress_activity</span>
            <span v-else class="material-symbols-outlined text-lg">verified_user</span>
            <span>{{ loading ? 'Verifying & Registering Profile...' : 'Submit Profile & Generate Clearance ID' }}</span>
          </button>
        </div>

      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { registerEngineer } from '../services/dataStore.js'

const currentStep = ref(1)
const loading = ref(false)
const validationError = ref('')
const registeredEngineer = ref(null)
const copied = ref(false)

const stepTitles = [
  'Personal Legal Identity & Biometrics',
  'Physical Residence & Ancestral Roots',
  'Guarantors & Sworn Affidavit'
]

const form = reactive({
  fullName: '',
  nickname: '',
  nin: '',
  dob: '',
  gender: 'Male',
  phone: '',
  altPhone: '',
  email: '',
  passportPhotoUrl: '',
  idCardUrl: '',
  residentialAddress: '',
  landmark: '',
  landlordName: '',
  landlordPhone: '',
  proofOfAddressUrl: '',
  stateOfOrigin: 'Delta State',
  lgaOfOrigin: '',
  homeTown: '',
  ancestralAddress: '',
  guarantor1: {
    fullName: '',
    relationship: '',
    phone: '',
    nin: '',
    workplace: '',
    residentialAddress: ''
  },
  guarantor2: {
    fullName: '',
    occupation: '',
    phone: '',
    residentialAddress: ''
  },
  bankDetails: {
    bankName: '',
    accountNumber: '',
    accountName: ''
  },
  agreedToAffidavit: false
})

function handleFileUpload(event, field) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    form[field] = e.target.result
  }
  reader.readAsDataURL(file)
}

function validateStep1() {
  if (!form.fullName.trim()) return 'Full Legal Name is mandatory.'
  if (!form.nickname.trim()) return 'Known Nickname/Alias is mandatory (or enter "None").'
  if (!form.nin.trim() || form.nin.trim().length !== 11 || !/^\d{11}$/.test(form.nin.trim())) {
    return 'A valid 11-digit National Identity Number (NIN) is mandatory.'
  }
  if (!form.dob) return 'Date of Birth is mandatory.'
  if (!form.phone.trim()) return 'Primary WhatsApp phone number is mandatory.'
  if (!form.altPhone.trim()) return 'Alternative phone number is mandatory.'
  if (!form.email.trim() || !form.email.includes('@')) return 'A valid personal email address is mandatory.'
  if (!form.passportPhotoUrl) return 'Live Passport Photograph must be uploaded.'
  if (!form.idCardUrl) return 'Valid Government ID Card must be uploaded.'
  return null
}

function validateStep2() {
  if (!form.residentialAddress.trim()) return 'Current Residential Address is mandatory.'
  if (!form.landmark.trim()) return 'Nearest Popular Landmark / Bus Stop is mandatory.'
  if (!form.landlordName.trim()) return 'Landlord / Caretaker Full Name is mandatory.'
  if (!form.landlordPhone.trim()) return 'Landlord / Caretaker Phone Number is mandatory.'
  if (!form.proofOfAddressUrl) return 'Proof of Residence (PHCN bill or rent receipt) must be uploaded.'
  if (!form.stateOfOrigin.trim()) return 'State of Origin is mandatory.'
  if (!form.lgaOfOrigin.trim()) return 'LGA of Origin is mandatory.'
  if (!form.homeTown.trim()) return 'Ancestral Town / Village is mandatory.'
  if (!form.ancestralAddress.trim()) return 'Ancestral Family Compound Address is mandatory.'
  return null
}

function validateStep3() {
  const g1 = form.guarantor1
  if (!g1.fullName.trim() || !g1.relationship.trim() || !g1.phone.trim() || !g1.workplace.trim() || !g1.residentialAddress.trim()) {
    return 'All fields for Guarantor 1 (Primary Family Figure) are mandatory.'
  }
  if (!g1.nin.trim() || g1.nin.trim().length !== 11) {
    return 'Guarantor 1 NIN must be a valid 11-digit number.'
  }

  const g2 = form.guarantor2
  if (!g2.fullName.trim() || !g2.occupation.trim() || !g2.phone.trim() || !g2.residentialAddress.trim()) {
    return 'All fields for Guarantor 2 (Professional/Community Figure) are mandatory.'
  }

  const b = form.bankDetails
  if (!b.bankName.trim() || !b.accountNumber.trim() || b.accountNumber.trim().length !== 10 || !b.accountName.trim()) {
    return 'Bank Name, 10-digit Account Number, and Account Name are mandatory.'
  }

  if (!form.agreedToAffidavit) {
    return 'You must review and check the Sworn Legal Declaration & Criminal Indemnity affidavit.'
  }

  return null
}

function handleNextStep() {
  validationError.value = ''
  if (currentStep.value === 1) {
    const err = validateStep1()
    if (err) {
      validationError.value = err
      return
    }
    currentStep.value = 2
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else if (currentStep.value === 2) {
    const err = validateStep2()
    if (err) {
      validationError.value = err
      return
    }
    currentStep.value = 3
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handleSubmit() {
  validationError.value = ''
  const err = validateStep3()
  if (err) {
    validationError.value = err
    return
  }

  loading.value = true
  setTimeout(() => {
    try {
      const created = registerEngineer({ ...form })
      registeredEngineer.value = created
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      validationError.value = 'Failed to register profile. Please try again.'
    } finally {
      loading.value = false
    }
  }, 600)
}

function copyCredentials() {
  if (!registeredEngineer.value) return
  const text = `IKEBEST GROUP - ENGINEER SECURITY CLEARANCE\nClearance ID: ${registeredEngineer.value.id}\nName: ${registeredEngineer.value.fullName}\nLogin Email: ${registeredEngineer.value.email}\nPortal Password: ${registeredEngineer.value.tempPassword}\nPortal Link: ${window.location.origin}/admin/login`
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 3000)
  })
}
</script>
