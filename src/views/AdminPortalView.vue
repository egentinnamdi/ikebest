<template>
  <div class="min-h-screen bg-[#f1f3f7] text-gray-800 pb-20">
    
    <!-- Portal Header -->
    <header class="bg-[#161B30] text-white border-b border-gray-800 shadow-md sticky top-0 z-40">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap justify-between items-center gap-4">
        
        <!-- Brand & Title -->
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dtetfimeq/image/upload/v1778246625/ikebest-logo_cgx4cg.png"
              alt="IKEBEST Group"
              class="h-10 sm:h-12 w-auto bg-white/10 p-1.5 rounded-xl"
            />
          </RouterLink>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-lg sm:text-xl font-extrabold tracking-tight" style="font-family: 'Montserrat', sans-serif;">
                Operations &amp; Admin Portal
              </h1>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FAC030] text-[#161B30]">
                {{ store.auth.currentUser.role }}
              </span>
            </div>
            <p class="text-xs text-white/60">IKEBEST Technologies CRM &amp; Engineering Management</p>
          </div>
        </div>

        <!-- Global Search Customer ID Bar -->
        <div class="flex-1 max-w-md mx-2">
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">search</span>
            <input
              v-model="quickSearchQuery"
              @keyup.enter="handleQuickSearch"
              type="text"
              placeholder="Search Customer ID (e.g. IKB-2026-001) or Name..."
              class="w-full bg-[#1e2545] text-white placeholder-gray-400 pl-10 pr-24 py-2 rounded-xl text-xs sm:text-sm border border-white/10 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none"
            />
            <button
              @click="handleQuickSearch"
              class="absolute right-1.5 top-1.5 px-3 py-1 bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] text-xs font-bold rounded-lg transition-all"
            >
              Lookup
            </button>
          </div>
        </div>

        <!-- Role Switcher & Onboarding Link -->
        <div class="flex items-center gap-3">
          <!-- Copy Shareable Onboarding Link -->
          <button
            @click="copyOnboardingLink"
            class="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAC030] text-xs font-bold transition-all border border-white/10"
            title="Copy link to give to customers"
          >
            <span class="material-symbols-outlined text-[16px]">link</span>
            <span>{{ copiedOnboarding ? 'Link Copied!' : 'Copy Onboarding Link' }}</span>
          </button>

          <!-- Role Simulation Switch -->
          <div class="flex items-center bg-[#1e2545] p-1 rounded-xl border border-white/10 text-xs">
            <span class="text-gray-400 px-2 hidden lg:inline">Role:</span>
            <button
              v-for="r in ['admin', 'staff', 'engineer']"
              :key="r"
              @click="setAuthRole(r)"
              class="px-2.5 py-1 rounded-lg font-bold capitalize transition-all"
              :class="store.auth.currentUser.role === r ? 'bg-[#FAC030] text-[#161B30]' : 'text-gray-300 hover:text-white'"
            >
              {{ r }}
            </button>
          </div>
        </div>

      </div>

      <!-- Navigation Tabs -->
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 flex gap-2 border-t border-white/10 overflow-x-auto">
        <button
          @click="activeTab = 'customers'"
          class="py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap"
          :class="activeTab === 'customers' ? 'border-[#FAC030] text-[#FAC030]' : 'border-transparent text-gray-300 hover:text-white'"
        >
          <span class="material-symbols-outlined text-lg">group</span>
          <span>Customers CRM ({{ store.customers.length }})</span>
        </button>

        <button
          @click="activeTab = 'feedbacks'"
          class="py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap"
          :class="activeTab === 'feedbacks' ? 'border-[#FAC030] text-[#FAC030]' : 'border-transparent text-gray-300 hover:text-white'"
        >
          <span class="material-symbols-outlined text-lg">rate_review</span>
          <span>Feedbacks &amp; Reviews ({{ store.feedbacks.length }})</span>
          <span v-if="pendingFeedbacksCount > 0" class="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-extrabold">
            {{ pendingFeedbacksCount }}
          </span>
        </button>

        <button
          @click="activeTab = 'celebrations'"
          class="py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap"
          :class="activeTab === 'celebrations' ? 'border-[#FAC030] text-[#FAC030]' : 'border-transparent text-gray-300 hover:text-white'"
        >
          <span class="material-symbols-outlined text-lg">cake</span>
          <span>Celebrations Hub</span>
          <span v-if="todayCelebrationsCount > 0" class="px-1.5 py-0.2 rounded-full bg-[#FAC030] text-[#161B30] text-[10px] font-extrabold">
            {{ todayCelebrationsCount }} Today
          </span>
        </button>
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8">

      <!-- Today's Celebration Alert Banner (if any) -->
      <div v-if="todayCelebrationsCount > 0" class="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-300 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#FAC030] flex items-center justify-center text-[#161B30] shrink-0 font-bold">
            🎉
          </div>
          <div>
            <h4 class="font-extrabold text-[#161B30] text-sm sm:text-base">
              {{ todayCelebrationsCount }} Customer{{ todayCelebrationsCount > 1 ? 's' : '' }} Celebrating Today!
            </h4>
            <p class="text-xs text-gray-600">
              Send automatic or direct WhatsApp goodwill greetings on behalf of IKEBEST Group.
            </p>
          </div>
        </div>
        <button
          @click="activeTab = 'celebrations'"
          class="px-4 py-2 bg-[#161B30] hover:bg-[#1e2545] text-[#FAC030] text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
        >
          <span>View Celebrants &amp; Send Greetings</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      <!-- Quick Metrics Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Customers</span>
          <div class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1" style="font-family: 'Montserrat', sans-serif;">
            {{ store.customers.length }}
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-red-100 shadow-sm">
          <span class="text-xs font-bold text-red-600 uppercase tracking-wider">Total Balance Owing</span>
          <div class="text-2xl sm:text-3xl font-extrabold text-red-600 mt-1" style="font-family: 'Montserrat', sans-serif;">
            {{ formatNaira(totalBalanceOwing) }}
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
          <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">Pending Installations</span>
          <div class="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1" style="font-family: 'Montserrat', sans-serif;">
            {{ pendingInstallationsCount }}
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">Public Reviews Live</span>
          <div class="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1" style="font-family: 'Montserrat', sans-serif;">
            {{ liveReviewsCount }} / {{ store.feedbacks.length }}
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAB 1: CUSTOMERS CRM & ENGINEER TRACKING -->
      <!-- ========================================================================= -->
      <div v-if="activeTab === 'customers'" class="space-y-6">
        
        <!-- Controls Bar -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-wrap items-center gap-3 flex-1">
            <div class="relative min-w-[240px] flex-1 max-w-md">
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">search</span>
              <input
                v-model="customerFilterQuery"
                type="text"
                placeholder="Filter by name, ID, phone, or package..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:border-[#FAC030] outline-none"
              />
            </div>

            <!-- Filter by sector -->
            <select
              v-model="filterSector"
              class="px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm bg-white text-gray-700 outline-none"
            >
              <option value="all">All Sectors</option>
              <option value="solar">Solar Energy</option>
              <option value="estate">Real Estate</option>
              <option value="cctv">CCTV &amp; Security</option>
              <option value="smarthome">Smart Home</option>
            </select>

            <!-- Filter by debt status -->
            <select
              v-model="filterDebt"
              class="px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm bg-white text-gray-700 outline-none"
            >
              <option value="all">All Payment Statuses</option>
              <option value="owing">Customers Owing Balance</option>
              <option value="paid">Fully Paid</option>
            </select>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="openAddCustomerModal"
              class="px-4 py-2.5 bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-[18px]">person_add</span>
              <span>New Customer Record</span>
            </button>
          </div>
        </div>

        <!-- Customer Table -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="py-3.5 px-4">Customer ID</th>
                  <th class="py-3.5 px-4">Name &amp; Contact</th>
                  <th class="py-3.5 px-4">Package Paid For</th>
                  <th class="py-3.5 px-4">Total Cost</th>
                  <th class="py-3.5 px-4">Amount Paid</th>
                  <th class="py-3.5 px-4">Owing Balance</th>
                  <th class="py-3.5 px-4">Engineer Status</th>
                  <th class="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="c in filteredCustomers"
                  :key="c.id"
                  class="hover:bg-gray-50/80 transition-colors cursor-pointer"
                  @click="openCustomerDossier(c)"
                >
                  <!-- Customer ID -->
                  <td class="py-4 px-4 font-extrabold text-[#161B30] whitespace-nowrap">
                    <span class="px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 text-[#161B30] font-mono text-xs">
                      {{ c.id }}
                    </span>
                  </td>

                  <!-- Name & Phone -->
                  <td class="py-4 px-4">
                    <div class="font-bold text-gray-900">{{ c.fullName }}</div>
                    <div class="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <span>{{ c.phone }}</span>
                      <a
                        :href="createWhatsAppMessageLink(c, 'reminder')"
                        target="_blank"
                        @click.stop
                        class="text-emerald-600 hover:text-emerald-700 ml-1 font-semibold"
                        title="Chat on WhatsApp"
                      >
                        <i class="fa-brands fa-whatsapp"></i>
                      </a>
                    </div>
                  </td>

                  <!-- Package -->
                  <td class="py-4 px-4 max-w-[200px]">
                    <div class="font-medium text-gray-800 truncate" :title="c.package">
                      {{ c.package }}
                    </div>
                    <span class="inline-block mt-0.5 text-[10px] uppercase font-bold text-gray-500">
                      {{ c.packageCategory }}
                    </span>
                  </td>

                  <!-- Total Cost -->
                  <td class="py-4 px-4 font-semibold text-gray-700 whitespace-nowrap">
                    {{ formatNaira(c.totalCost) }}
                  </td>

                  <!-- Amount Paid -->
                  <td class="py-4 px-4 font-semibold text-emerald-700 whitespace-nowrap">
                    {{ formatNaira(c.amountPaid) }}
                  </td>

                  <!-- Owing Balance -->
                  <td class="py-4 px-4 whitespace-nowrap">
                    <span
                      v-if="c.balanceOwing > 0"
                      class="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 inline-flex items-center gap-1"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      Owing {{ formatNaira(c.balanceOwing) }}
                    </span>
                    <span
                      v-else
                      class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      Fully Paid
                    </span>
                  </td>

                  <!-- Engineer Installation Status -->
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-1.5">
                      <span
                        class="px-2 py-0.5 rounded text-[11px] font-bold"
                        :class="statusBadgeClass(c.installationStatus)"
                      >
                        {{ c.installationStatus }}
                      </span>
                    </div>
                    <div class="text-[11px] text-gray-500 mt-0.5">
                      {{ c.engineerName }}
                    </div>
                  </td>

                  <!-- Actions -->
                  <td class="py-4 px-4 text-right whitespace-nowrap">
                    <button
                      @click.stop="openCustomerDossier(c)"
                      class="px-3 py-1.5 bg-[#161B30] hover:bg-[#1E2545] text-[#FAC030] rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1"
                    >
                      <span>Open Dossier</span>
                      <span class="material-symbols-outlined text-[14px]">visibility</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="filteredCustomers.length === 0" class="p-12 text-center text-gray-500">
            <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">person_off</span>
            <p class="font-medium">No customer records matching this search query.</p>
          </div>
        </div>

      </div>

      <!-- ========================================================================= -->
      <!-- TAB 2: FEEDBACKS MANAGEMENT & PRINT / PUBLISH -->
      <!-- ========================================================================= -->
      <div v-if="activeTab === 'feedbacks'" class="space-y-6">
        
        <!-- Controls Bar -->
        <div class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <button
              @click="feedbackCategoryFilter = 'all'"
              class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
              :class="feedbackCategoryFilter === 'all' ? 'bg-[#161B30] text-[#FAC030]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              All Reviews ({{ store.feedbacks.length }})
            </button>
            <button
              @click="feedbackCategoryFilter = 'solar'"
              class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              :class="feedbackCategoryFilter === 'solar' ? 'bg-[#161B30] text-[#FAC030]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              <span class="material-symbols-outlined text-[16px]">wb_sunny</span>
              <span>Solar Feedback</span>
            </button>
            <button
              @click="feedbackCategoryFilter = 'estate'"
              class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              :class="feedbackCategoryFilter === 'estate' ? 'bg-[#161B30] text-[#FAC030]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              <span class="material-symbols-outlined text-[16px]">domain</span>
              <span>Real Estate Feedback</span>
            </button>

            <!-- Status filter -->
            <select
              v-model="feedbackStatusFilter"
              class="px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white text-gray-700 outline-none"
            >
              <option value="all">All Publication Statuses</option>
              <option value="published">Published to Public Website</option>
              <option value="private">Private / Pending Admin Approval</option>
            </select>
          </div>

          <div class="text-xs text-gray-500">
            Click <strong>"Publish"</strong> on any review to show it to all website visitors.
          </div>
        </div>

        <!-- Feedbacks Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="fb in filteredFeedbacks"
            :key="fb.id"
            class="bg-white rounded-2xl border p-6 shadow-sm transition-all flex flex-col justify-between"
            :class="fb.isPublished ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-gray-200'"
          >
            <div>
              <!-- Header info -->
              <div class="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span
                    class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1.5"
                    :class="fb.category === 'solar' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'"
                  >
                    {{ fb.category === 'solar' ? 'Solar Energy' : 'Real Estate' }}
                  </span>
                  <h3 class="text-base font-bold text-gray-900">{{ fb.customerName }}</h3>
                  <p class="text-xs text-gray-500">{{ fb.location }} • {{ formatDate(fb.createdAt) }}</p>
                </div>

                <!-- Star Rating -->
                <div class="flex items-center text-amber-400 text-sm">
                  <span v-for="s in 5" :key="s">
                    {{ s <= fb.rating ? '★' : '☆' }}
                  </span>
                </div>
              </div>

              <!-- Package info -->
              <div v-if="fb.package" class="bg-gray-50 px-3 py-1.5 rounded-lg text-xs text-gray-600 mb-3 font-medium">
                <strong>Project:</strong> {{ fb.package }}
              </div>

              <!-- Review Title & Body -->
              <div class="mb-4">
                <h4 v-if="fb.title" class="font-bold text-gray-800 text-sm mb-1">
                  "{{ fb.title }}"
                </h4>
                <p class="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {{ fb.review }}
                </p>
              </div>
            </div>

            <!-- Footer Action Buttons (Publish, Print, Delete) -->
            <div class="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 mt-2">
              
              <!-- Publish Toggle Button -->
              <button
                @click="handleTogglePublish(fb.id)"
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                :class="fb.isPublished 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'"
              >
                <span class="material-symbols-outlined text-[16px]">
                  {{ fb.isPublished ? 'check_circle' : 'visibility' }}
                </span>
                <span>{{ fb.isPublished ? 'Live on Website (Click to Unpublish)' : 'Publish to Website' }}</span>
              </button>

              <div class="flex items-center gap-2">
                <!-- Print Review Sheet Button -->
                <button
                  @click="printSingleFeedback(fb)"
                  class="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center gap-1"
                  title="Print official review document"
                >
                  <span class="material-symbols-outlined text-[16px]">print</span>
                  <span>Print</span>
                </button>

                <!-- Delete Feedback (Admin only) -->
                <button
                  v-if="store.auth.currentUser.role === 'admin'"
                  @click="handleDeleteFeedback(fb.id)"
                  class="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete feedback"
                >
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      <!-- ========================================================================= -->
      <!-- TAB 3: CELEBRATIONS HUB & AUTOMATED MESSAGING -->
      <!-- ========================================================================= -->
      <div v-if="activeTab === 'celebrations'" class="space-y-8">
        
        <!-- Today's Celebrations Section -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
            <div class="flex items-center gap-3">
              <span class="text-3xl">🎂</span>
              <div>
                <h3 class="text-xl font-extrabold text-gray-900" style="font-family: 'Montserrat', sans-serif;">
                  Today's Birthday &amp; Wedding Anniversaries
                </h3>
                <p class="text-xs text-gray-500">
                  Customers celebrating today: {{ todayFormatted }}
                </p>
              </div>
            </div>

            <div class="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
              Automated Check: Active (08:00 WAT)
            </div>
          </div>

          <div v-if="todayCelebrants.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="item in todayCelebrants"
              :key="item.customer.id + item.type"
              class="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                    :class="item.type === 'birthday' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'"
                  >
                    {{ item.type === 'birthday' ? '🎉 Birthday Today' : '🥂 Wedding Anniversary Today' }}
                  </span>
                  <span class="text-xs font-mono font-bold text-gray-600">{{ item.customer.id }}</span>
                </div>

                <h4 class="font-extrabold text-gray-900 text-base">{{ item.customer.fullName }}</h4>
                <p class="text-xs text-gray-600 mt-0.5">Phone: {{ item.customer.phone }} • {{ item.customer.package }}</p>
              </div>

              <div class="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between gap-3">
                <span class="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Automated Greeting Ready</span>
                </span>

                <!-- 1-Click WhatsApp Direct Dispatch -->
                <a
                  :href="createWhatsAppMessageLink(item.customer, item.type)"
                  target="_blank"
                  @click="handleLogCelebration(item.customer, item.type)"
                  class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <i class="fa-brands fa-whatsapp text-sm"></i>
                  <span>Send WhatsApp Message</span>
                </a>
              </div>
            </div>
          </div>

          <div v-else class="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl">
            <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">cake</span>
            <p class="font-medium text-sm">No customers have a birthday or wedding anniversary scheduled for today.</p>
            <p class="text-xs text-gray-400 mt-1">Our daily monitor will automatically scan tomorrow morning at 8:00 AM.</p>
          </div>
        </div>

        <!-- Upcoming Celebrations (Next 30 Days) -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-4" style="font-family: 'Montserrat', sans-serif;">
            Upcoming Celebrations (This Month)
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="py-3 px-4">Customer ID</th>
                  <th class="py-3 px-4">Customer Name</th>
                  <th class="py-3 px-4">Event</th>
                  <th class="py-3 px-4">Date</th>
                  <th class="py-3 px-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="c in upcomingCelebrants" :key="c.customer.id + c.type" class="hover:bg-gray-50">
                  <td class="py-3 px-4 font-mono font-bold">{{ c.customer.id }}</td>
                  <td class="py-3 px-4 font-bold text-gray-900">{{ c.customer.fullName }}</td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                      :class="c.type === 'birthday' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'"
                    >
                      {{ c.type }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-gray-600">{{ formatDate(c.date) }}</td>
                  <td class="py-3 px-4 text-right">
                    <a
                      :href="createWhatsAppMessageLink(c.customer, c.type)"
                      target="_blank"
                      class="text-xs text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1"
                    >
                      <i class="fa-brands fa-whatsapp"></i>
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Dispatched Log -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-4" style="font-family: 'Montserrat', sans-serif;">
            Celebration Message Delivery Log
          </h3>
          <div class="space-y-3">
            <div
              v-for="log in store.celebrationLogs"
              :key="log.id"
              class="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl text-xs border border-gray-100"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-emerald-600 text-[18px]">mark_email_read</span>
                <div>
                  <span class="font-bold text-gray-800">{{ log.customerName }}</span>
                  <span class="text-gray-500 ml-2 font-mono">({{ log.customerId }})</span>
                  <div class="text-[11px] text-gray-500">
                    {{ log.type === 'birthday' ? 'Birthday Greeting' : 'Wedding Anniversary Greeting' }} via {{ log.channel }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {{ log.status }}
                </span>
                <div class="text-[10px] text-gray-400 mt-0.5">{{ formatDate(log.timestamp) }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>

    <!-- ========================================================================= -->
    <!-- CUSTOMER DOSSIER MODAL (Full Financials, Engineer Sign-off, Reports, Photos) -->
    <!-- ========================================================================= -->
    <div
      v-if="selectedCustomer"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      @click.self="selectedCustomer = null"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        
        <!-- Modal Header -->
        <div class="bg-[#161B30] text-white p-6 sticky top-0 z-20 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 rounded-lg bg-[#FAC030] text-[#161B30] font-mono font-extrabold text-sm">
              {{ selectedCustomer.id }}
            </span>
            <div>
              <h2 class="text-xl font-extrabold" style="font-family: 'Montserrat', sans-serif;">
                {{ selectedCustomer.fullName }}
              </h2>
              <p class="text-xs text-white/70">{{ selectedCustomer.phone }} • {{ selectedCustomer.address }}, {{ selectedCustomer.state }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="printCustomerDossier(selectedCustomer)"
              class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#FAC030] rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-[16px]">print</span>
              <span>Print Dossier</span>
            </button>
            <button
              @click="selectedCustomer = null"
              class="p-1.5 text-white/60 hover:text-white rounded-lg transition-colors"
            >
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        <div class="p-6 sm:p-8 space-y-8">

          <!-- 1. Financial & Package Section (OWING BALANCE HIGHLIGHT) -->
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span class="text-xs uppercase font-extrabold text-gray-500 tracking-wider">Service Package</span>
                <h3 class="text-lg font-extrabold text-gray-900">{{ selectedCustomer.package }}</h3>
              </div>
              <div>
                <button
                  @click="openRecordPaymentModal"
                  class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  + Record Payment
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div class="bg-white p-4 rounded-xl border border-gray-200">
                <span class="text-xs text-gray-500 font-semibold">Total Package Cost</span>
                <div class="text-xl font-extrabold text-gray-900 mt-0.5">
                  {{ formatNaira(selectedCustomer.totalCost) }}
                </div>
              </div>

              <div class="bg-white p-4 rounded-xl border border-gray-200">
                <span class="text-xs text-gray-500 font-semibold">Amount Paid</span>
                <div class="text-xl font-extrabold text-emerald-700 mt-0.5">
                  {{ formatNaira(selectedCustomer.amountPaid) }}
                </div>
              </div>

              <div class="bg-white p-4 rounded-xl border" :class="selectedCustomer.balanceOwing > 0 ? 'border-red-300 bg-red-50/50' : 'border-gray-200'">
                <span class="text-xs font-bold" :class="selectedCustomer.balanceOwing > 0 ? 'text-red-700' : 'text-gray-500'">
                  Amount Owing / Balance Due
                </span>
                <div class="text-xl font-extrabold mt-0.5" :class="selectedCustomer.balanceOwing > 0 ? 'text-red-600' : 'text-emerald-700'">
                  {{ formatNaira(selectedCustomer.balanceOwing) }}
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Engineer Installation Status & Update -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#FAC030]">build</span>
                <span>Engineer Installation Status &amp; Sign-off</span>
              </h3>
              <span class="text-xs text-gray-500">
                Assigned Lead: <strong>{{ selectedCustomer.engineerName }}</strong>
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-gray-50 p-4 rounded-xl">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Current Installation Stage</label>
                <select
                  v-model="selectedCustomer.installationStatus"
                  @change="handleStatusChange"
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold outline-none"
                >
                  <option value="Survey & Planning">Survey &amp; Planning</option>
                  <option value="Installation in Progress">Installation in Progress</option>
                  <option value="Installation Completed">Installation Completed</option>
                  <option value="Tested & Verified">Tested &amp; Verified</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Installation Completion Timestamp</label>
                <div class="text-xs text-gray-600 font-medium">
                  {{ selectedCustomer.installedAt ? formatDate(selectedCustomer.installedAt) : 'Pending final engineer sign-off' }}
                </div>
                <button
                  v-if="!selectedCustomer.installedAt"
                  @click="markInstallationCompleted"
                  class="mt-1 px-3 py-1 bg-[#161B30] hover:bg-[#1e2545] text-[#FAC030] text-xs font-bold rounded-lg transition-all"
                >
                  Sign Off Installation as Completed Today
                </button>
              </div>
            </div>
          </div>

          <!-- 3. Report Column / Section -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#FAC030]">description</span>
                <span>Project Reports &amp; Engineering Log</span>
              </h3>
              <button
                @click="showAddReportForm = !showAddReportForm"
                class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all"
              >
                {{ showAddReportForm ? 'Cancel Report' : '+ Add New Report' }}
              </button>
            </div>

            <!-- New Report Form -->
            <div v-if="showAddReportForm" class="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
              <h4 class="text-xs font-bold uppercase text-gray-700 mb-2">New Engineering Report Entry</h4>
              <div class="space-y-3">
                <input
                  v-model="newReportTitle"
                  type="text"
                  placeholder="Report Title (e.g. Battery Inverter Sync & Load Testing)"
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm outline-none"
                />
                <textarea
                  v-model="newReportContent"
                  rows="3"
                  placeholder="Enter detailed technical report, observations, equipment serial numbers, or customer handover notes..."
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm outline-none"
                ></textarea>
                <button
                  @click="handleSaveReport"
                  class="px-4 py-2 bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] font-bold text-xs rounded-xl transition-all"
                >
                  Save Report Entry
                </button>
              </div>
            </div>

            <!-- Report List -->
            <div class="space-y-3">
              <div
                v-for="rep in selectedCustomer.reports"
                :key="rep.id"
                class="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm"
              >
                <div class="flex items-center justify-between mb-1">
                  <h5 class="font-extrabold text-gray-900">{{ rep.title }}</h5>
                  <span class="text-[11px] text-gray-400">{{ formatDate(rep.date) }}</span>
                </div>
                <p class="text-gray-600 leading-relaxed mb-2">{{ rep.content }}</p>
                <div class="text-[11px] text-gray-500 font-semibold">
                  By: {{ rep.author }} ({{ rep.authorRole }})
                </div>
              </div>

              <div v-if="!selectedCustomer.reports || selectedCustomer.reports.length === 0" class="text-xs text-gray-400 italic">
                No reports recorded yet for this project.
              </div>
            </div>
          </div>

          <!-- 4. Photo Uploads: Customer Photo, House Pictures, Setup Pictures -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 class="text-base font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#FAC030]">photo_library</span>
              <span>Project Documentation &amp; Photo Archives</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <!-- Customer Photos -->
              <div class="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold text-gray-700">Customer Picture</span>
                  <label class="cursor-pointer text-xs font-bold text-[#161B30] bg-[#FAC030] px-2 py-1 rounded-lg">
                    + Upload
                    <input type="file" accept="image/*" class="hidden" @change="e => handlePhotoUpload(e, 'customer')" />
                  </label>
                </div>
                <div class="space-y-2">
                  <div v-for="(p, i) in selectedCustomer.photos.customerPhotos" :key="i" class="relative group">
                    <img :src="p" class="w-full h-32 object-cover rounded-xl border border-gray-200" />
                  </div>
                  <div v-if="selectedCustomer.photos.customerPhotos.length === 0" class="text-[11px] text-gray-400 italic py-6 text-center">
                    No customer photo uploaded
                  </div>
                </div>
              </div>

              <!-- House Pictures -->
              <div class="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold text-gray-700">House / Site Pictures</span>
                  <label class="cursor-pointer text-xs font-bold text-[#161B30] bg-[#FAC030] px-2 py-1 rounded-lg">
                    + Upload
                    <input type="file" accept="image/*" class="hidden" @change="e => handlePhotoUpload(e, 'house')" />
                  </label>
                </div>
                <div class="space-y-2">
                  <div v-for="(p, i) in selectedCustomer.photos.housePhotos" :key="i" class="relative group">
                    <img :src="p" class="w-full h-32 object-cover rounded-xl border border-gray-200" />
                  </div>
                  <div v-if="selectedCustomer.photos.housePhotos.length === 0" class="text-[11px] text-gray-400 italic py-6 text-center">
                    No site picture uploaded
                  </div>
                </div>
              </div>

              <!-- Setup Pictures (Inverter, Batteries, Panels, Wiring) -->
              <div class="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold text-gray-700">Customer Setup Pictures</span>
                  <label class="cursor-pointer text-xs font-bold text-[#161B30] bg-[#FAC030] px-2 py-1 rounded-lg">
                    + Upload
                    <input type="file" accept="image/*" class="hidden" @change="e => handlePhotoUpload(e, 'setup')" />
                  </label>
                </div>
                <div class="space-y-2">
                  <div v-for="(p, i) in selectedCustomer.photos.setupPhotos" :key="i" class="relative group">
                    <img :src="p" class="w-full h-32 object-cover rounded-xl border border-gray-200" />
                  </div>
                  <div v-if="selectedCustomer.photos.setupPhotos.length === 0" class="text-[11px] text-gray-400 italic py-6 text-center">
                    No setup picture uploaded
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- RECORD PAYMENT MODAL -->
    <!-- ========================================================================= -->
    <div
      v-if="showPaymentModal && selectedCustomer"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Record Payment for {{ selectedCustomer.fullName }}</h3>
        <p class="text-xs text-gray-500 mb-4">
          Current Balance Owing: <strong class="text-red-600">{{ formatNaira(selectedCustomer.balanceOwing) }}</strong>
        </p>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Additional Amount Paid (₦)</label>
            <input
              v-model.number="paymentAmount"
              type="number"
              min="1"
              placeholder="e.g. 500000"
              class="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm outline-none"
            />
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button
              @click="showPaymentModal = false"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              @click="handleSavePayment"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- ADD NEW CUSTOMER MODAL -->
    <!-- ========================================================================= -->
    <div
      v-if="showAddCustomerModal"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      @click.self="showAddCustomerModal = false"
    >
      <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h3 class="text-xl font-bold text-gray-900 mb-2">Create New Customer Record</h3>
        <p class="text-xs text-gray-500 mb-6">Staff/Admin manual registration. An official Customer ID will be generated automatically.</p>

        <form @submit.prevent="handleCreateCustomer" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
              <input v-model="newCustomerForm.fullName" required type="text" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
              <input v-model="newCustomerForm.phone" required type="tel" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Email</label>
              <input v-model="newCustomerForm.email" type="email" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Sector *</label>
              <select v-model="newCustomerForm.packageCategory" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white">
                <option value="solar">Solar Energy</option>
                <option value="estate">Real Estate</option>
                <option value="cctv">CCTV &amp; Security</option>
                <option value="smarthome">Smart Home</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Package / Property Description *</label>
            <input v-model="newCustomerForm.package" required type="text" placeholder="e.g. 5kVA Solar Inverter Setup" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm" />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Address *</label>
            <input v-model="newCustomerForm.address" required type="text" placeholder="Asaba, Delta State" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Date of Birth (Birthday)</label>
              <input v-model="newCustomerForm.dob" type="date" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Wedding Anniversary</label>
              <input v-model="newCustomerForm.weddingAnniversary" type="date" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Total Cost (₦) *</label>
              <input v-model.number="newCustomerForm.totalCost" required type="number" min="0" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Amount Paid (₦) *</label>
              <input v-model.number="newCustomerForm.amountPaid" required type="number" min="0" class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm" />
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              @click="showAddCustomerModal = false"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] font-bold text-xs rounded-xl"
            >
              Create Customer
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- HIDDEN PRINT TEMPLATE (Activated when window.print() is called) -->
    <!-- ========================================================================= -->
    <div id="print-section" class="hidden">
      <!-- Injected dynamically for printing -->
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import {
  store,
  formatNaira,
  formatDate,
  isTodayMonthDay,
  isUpcomingDays,
  setAuthRole,
  updateCustomer,
  createCustomer,
  addCustomerReport,
  addCustomerPhoto,
  toggleFeedbackPublish,
  deleteFeedback,
  createWhatsAppMessageLink,
  logCelebrationSent
} from '../services/dataStore.js'

const activeTab = ref('customers')
const quickSearchQuery = ref('')
const customerFilterQuery = ref('')
const filterSector = ref('all')
const filterDebt = ref('all')

const feedbackCategoryFilter = ref('all')
const feedbackStatusFilter = ref('all')

const selectedCustomer = ref(null)
const showAddCustomerModal = ref(false)
const showPaymentModal = ref(false)
const paymentAmount = ref(0)

const showAddReportForm = ref(false)
const newReportTitle = ref('')
const newReportContent = ref('')
const copiedOnboarding = ref(false)

const newCustomerForm = reactive({
  fullName: '',
  phone: '',
  email: '',
  packageCategory: 'solar',
  package: '',
  address: '',
  dob: '',
  weddingAnniversary: '',
  totalCost: 0,
  amountPaid: 0
})

// Metrics
const totalBalanceOwing = computed(() => {
  return store.customers.reduce((acc, c) => acc + (c.balanceOwing || 0), 0)
})

const pendingInstallationsCount = computed(() => {
  return store.customers.filter(c => c.installationStatus !== 'Tested & Verified' && c.installationStatus !== 'Installation Completed').length
})

const liveReviewsCount = computed(() => {
  return store.feedbacks.filter(f => f.isPublished).length
})

const pendingFeedbacksCount = computed(() => {
  return store.feedbacks.filter(f => !f.isPublished).length
})

// Celebrants Computations
const todayCelebrants = computed(() => {
  const celebrants = []
  store.customers.forEach(c => {
    if (isTodayMonthDay(c.dob)) {
      celebrants.push({ customer: c, type: 'birthday' })
    }
    if (isTodayMonthDay(c.weddingAnniversary)) {
      celebrants.push({ customer: c, type: 'anniversary' })
    }
  })
  return celebrants
})

const todayCelebrationsCount = computed(() => todayCelebrants.value.length)

const upcomingCelebrants = computed(() => {
  const list = []
  store.customers.forEach(c => {
    if (isUpcomingDays(c.dob, 30)) {
      list.push({ customer: c, type: 'birthday', date: c.dob })
    }
    if (isUpcomingDays(c.weddingAnniversary, 30)) {
      list.push({ customer: c, type: 'anniversary', date: c.weddingAnniversary })
    }
  })
  return list
})

const todayFormatted = computed(() => {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

// Filtered Customers
const filteredCustomers = computed(() => {
  return store.customers.filter(c => {
    // text query
    if (customerFilterQuery.value) {
      const q = customerFilterQuery.value.toLowerCase()
      const match = c.id.toLowerCase().includes(q) ||
        c.fullName.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.package && c.package.toLowerCase().includes(q))
      if (!match) return false
    }
    // sector
    if (filterSector.value !== 'all' && c.packageCategory !== filterSector.value) {
      return false
    }
    // debt
    if (filterDebt.value === 'owing' && c.balanceOwing <= 0) return false
    if (filterDebt.value === 'paid' && c.balanceOwing > 0) return false

    return true
  })
})

// Filtered Feedbacks
const filteredFeedbacks = computed(() => {
  return store.feedbacks.filter(f => {
    if (feedbackCategoryFilter.value !== 'all' && f.category !== feedbackCategoryFilter.value) {
      return false
    }
    if (feedbackStatusFilter.value === 'published' && !f.isPublished) return false
    if (feedbackStatusFilter.value === 'private' && f.isPublished) return false
    return true
  })
})

function statusBadgeClass(status) {
  switch (status) {
    case 'Tested & Verified':
    case 'Installation Completed':
      return 'bg-emerald-100 text-emerald-800'
    case 'Installation in Progress':
      return 'bg-amber-100 text-amber-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}

function handleQuickSearch() {
  if (!quickSearchQuery.value) return
  const q = quickSearchQuery.value.trim().toLowerCase()
  const found = store.customers.find(c =>
    c.id.toLowerCase() === q ||
    c.id.toLowerCase().includes(q) ||
    c.fullName.toLowerCase().includes(q) ||
    c.phone.includes(q)
  )
  if (found) {
    openCustomerDossier(found)
    quickSearchQuery.value = ''
  } else {
    alert(`No customer found matching "${quickSearchQuery.value}". Please check the Customer ID.`)
  }
}

function openCustomerDossier(customer) {
  selectedCustomer.value = customer
}

function handleStatusChange() {
  if (!selectedCustomer.value) return
  updateCustomer(selectedCustomer.value.id, {
    installationStatus: selectedCustomer.value.installationStatus
  })
}

function markInstallationCompleted() {
  if (!selectedCustomer.value) return
  const now = new Date().toISOString()
  updateCustomer(selectedCustomer.value.id, {
    installationStatus: 'Installation Completed',
    installedAt: now
  })
  selectedCustomer.value.installationStatus = 'Installation Completed'
  selectedCustomer.value.installedAt = now
  addCustomerReport(selectedCustomer.value.id, {
    title: 'Installation Marked Completed',
    content: `Installation completed by ${store.auth.currentUser.name} on ${formatDate(now)}. Handover to customer scheduled.`,
    author: store.auth.currentUser.name,
    authorRole: store.auth.currentUser.role
  })
}

function handleSaveReport() {
  if (!newReportTitle.value && !newReportContent.value) return
  addCustomerReport(selectedCustomer.value.id, {
    title: newReportTitle.value || 'Field Report',
    content: newReportContent.value
  })
  newReportTitle.value = ''
  newReportContent.value = ''
  showAddReportForm.value = false
}

function handlePhotoUpload(event, category) {
  const file = event.target.files[0]
  if (!file || !selectedCustomer.value) return
  const reader = new FileReader()
  reader.onload = (e) => {
    addCustomerPhoto(selectedCustomer.value.id, category, e.target.result)
  }
  reader.readAsDataURL(file)
}

function openRecordPaymentModal() {
  paymentAmount.value = 0
  showPaymentModal.value = true
}

function handleSavePayment() {
  if (!selectedCustomer.value || paymentAmount.value <= 0) return
  const newAmountPaid = (selectedCustomer.value.amountPaid || 0) + Number(paymentAmount.value)
  updateCustomer(selectedCustomer.value.id, {
    amountPaid: newAmountPaid
  })
  selectedCustomer.value.amountPaid = newAmountPaid
  selectedCustomer.value.balanceOwing = Math.max(0, selectedCustomer.value.totalCost - newAmountPaid)
  addCustomerReport(selectedCustomer.value.id, {
    title: `Payment Received: ${formatNaira(paymentAmount.value)}`,
    content: `Additional payment of ${formatNaira(paymentAmount.value)} confirmed. Remaining balance: ${formatNaira(selectedCustomer.value.balanceOwing)}.`,
    author: store.auth.currentUser.name,
    authorRole: store.auth.currentUser.role
  })
  showPaymentModal.value = false
}

function openAddCustomerModal() {
  showAddCustomerModal.value = true
}

function handleCreateCustomer() {
  const created = createCustomer({ ...newCustomerForm })
  showAddCustomerModal.value = false
  openCustomerDossier(created)
}

function handleTogglePublish(id) {
  toggleFeedbackPublish(id)
}

function handleDeleteFeedback(id) {
  if (confirm('Are you sure you want to delete this feedback?')) {
    deleteFeedback(id)
  }
}

function handleLogCelebration(customer, type) {
  logCelebrationSent(customer, type, 'WhatsApp')
}

function copyOnboardingLink() {
  const url = window.location.origin + '/customer-onboarding'
  navigator.clipboard.writeText(url).then(() => {
    copiedOnboarding.value = true
    setTimeout(() => { copiedOnboarding.value = false }, 3000)
  })
}

// Print functionality
function printSingleFeedback(fb) {
  const printContent = `
    <html>
      <head>
        <title>IKEBEST Review - ${fb.customerName}</title>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #161B30; }
          .header { border-bottom: 2px solid #FAC030; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 24px; font-weight: bold; color: #161B30; }
          .badge { background: #FAC030; color: #161B30; padding: 4px 10px; font-weight: bold; border-radius: 4px; font-size: 12px; }
          .rating { font-size: 20px; color: #d97706; margin: 15px 0; }
          .text { font-size: 16px; line-height: 1.6; background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #FAC030; }
          .footer { margin-top: 40px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">IKEBEST GROUP</div>
          <div class="badge">${fb.category === 'solar' ? 'SOLAR ENERGY FEEDBACK' : 'REAL ESTATE FEEDBACK'}</div>
        </div>
        <h2>Customer: ${fb.customerName}</h2>
        <p><strong>Location:</strong> ${fb.location} | <strong>Project:</strong> ${fb.package || 'Standard'}</p>
        <p><strong>Date Submitted:</strong> ${formatDate(fb.createdAt)}</p>
        <div class="rating">Rating: ${'★'.repeat(fb.rating)} (${fb.rating}/5)</div>
        <div class="text">
          <h3>${fb.title || 'Client Review'}</h3>
          <p>${fb.review}</p>
        </div>
        <div class="footer">
          <p>IKEBEST Technologies • Solar House, behind NTA, Okpanam Road, Asaba • 08139522490 • Ikebest316@gmail.com</p>
        </div>
      </body>
    </html>
  `
  const printWindow = window.open('', '_blank')
  printWindow.document.write(printContent)
  printWindow.document.close()
  printWindow.focus()
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 250)
}

function printCustomerDossier(c) {
  const reportsHtml = (c.reports || []).map(r => `
    <div style="margin-bottom: 15px; border-left: 2px solid #FAC030; padding-left: 10px;">
      <strong>${r.title}</strong> (${formatDate(r.date)}) - <em>${r.author}</em><br/>
      ${r.content}
    </div>
  `).join('')

  const printContent = `
    <html>
      <head>
        <title>Customer File - ${c.id}</title>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #161B30; }
          .header { border-bottom: 2px solid #FAC030; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 24px; font-weight: bold; }
          .id-box { font-size: 18px; font-weight: bold; background: #FAC030; padding: 6px 14px; border-radius: 6px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px; }
          th, td { border: 1px solid #e5e7eb; padding: 10px; text-align: left; }
          th { background: #f9fafb; font-size: 12px; }
          .owing { color: #dc2626; font-weight: bold; }
          .paid { color: #059669; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">IKEBEST GROUP — CUSTOMER PROFILE</div>
          <div class="id-box">CUSTOMER ID: ${c.id}</div>
        </div>
        <table>
          <tr><th>Full Name</th><td>${c.fullName}</td><th>Phone Number</th><td>${c.phone}</td></tr>
          <tr><th>Email</th><td>${c.email || 'N/A'}</td><th>State / Location</th><td>${c.state}</td></tr>
          <tr><th>Address</th><td colspan="3">${c.address}</td></tr>
          <tr><th>Birthday</th><td>${formatDate(c.dob)}</td><th>Anniversary</th><td>${formatDate(c.weddingAnniversary)}</td></tr>
          <tr><th>Package</th><td colspan="3"><strong>${c.package}</strong></td></tr>
          <tr><th>Total Cost</th><td>${formatNaira(c.totalCost)}</td><th>Amount Paid</th><td class="paid">${formatNaira(c.amountPaid)}</td></tr>
          <tr><th>Amount Owing</th><td class="owing" colspan="3">${formatNaira(c.balanceOwing)}</td></tr>
          <tr><th>Engineer Status</th><td>${c.installationStatus}</td><th>Assigned Engineer</th><td>${c.engineerName}</td></tr>
        </table>
        <h3>Engineering & Installation Reports</h3>
        ${reportsHtml || '<p>No reports recorded.</p>'}
        <div style="margin-top: 50px; display: flex; justify-content: space-between;">
          <div>____________________________<br/>Customer Signature</div>
          <div>____________________________<br/>Lead Engineer / Admin Sign-off</div>
        </div>
      </body>
    </html>
  `
  const printWindow = window.open('', '_blank')
  printWindow.document.write(printContent)
  printWindow.document.close()
  printWindow.focus()
  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 250)
}
</script>
