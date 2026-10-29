<template>
  <div class="min-h-screen bg-[#f1f3f7] text-gray-800 pb-20">
    <!-- Portal Header -->
    <header
      class="bg-[#161B30] text-white border-b border-gray-800 shadow-md sticky top-0 z-40"
    >
      <div
        class="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap justify-between items-center gap-4"
      >
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
              <h1
                class="text-lg sm:text-xl font-extrabold tracking-tight"
                style="font-family: &quot;Montserrat&quot;, sans-serif"
              >
                {{ isEngineer ? 'Field Operations Portal' : 'Operations & Admin Portal' }}
              </h1>
              <span
                v-if="isMasterAdmin"
                class="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FAC030] text-[#161B30]"
              >
                Master Admin
              </span>
              <span
                v-else
                class="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-400 text-[#161B30]"
              >
                Field Engineer
              </span>
            </div>
            <p class="text-xs text-white/60">
              {{ isEngineer ? `Verified Badge: ${currentEngineerId} • ${currentEngineerName}` : 'IKEBEST Technologies CRM & Operations Management' }}
            </p>
          </div>
        </div>

        <!-- Global Search Customer ID Bar (Master Admin only) -->
        <div v-if="isMasterAdmin" class="flex-1 max-w-md mx-2">
          <div class="relative">
            <span
              class="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg"
              >search</span
            >
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

        <!-- Action Links & Log Out Button -->
        <div class="flex items-center gap-2.5">
          <!-- Copy Shareable Customer Onboarding Link (Admin only) -->
          <button
            v-if="isMasterAdmin"
            @click="copyOnboardingLink"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAC030] text-xs font-bold transition-all border border-white/10 cursor-pointer"
            title="Copy unlisted link to give to paying customers"
          >
            <span class="material-symbols-outlined text-[16px]">link</span>
            <span>{{
              copiedOnboarding ? "Customer Link Copied!" : "Customer Form"
            }}</span>
          </button>

          <!-- Copy Engineer KYC Link (Admin only) -->
          <button
            v-if="isMasterAdmin"
            @click="copyEngineerOnboardingLink"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAC030]/20 hover:bg-[#FAC030]/30 text-[#FAC030] text-xs font-bold transition-all border border-[#FAC030]/30 cursor-pointer"
            title="Copy unlisted link for engineer KYC registration"
          >
            <span class="material-symbols-outlined text-[16px]">engineering</span>
            <span>{{
              copiedEngineerLink ? "KYC Link Copied!" : "Engineer KYC Link"
            }}</span>
          </button>

          <!-- Log Out Button -->
          <button
            @click="handleLogout"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-all border border-red-500/30 cursor-pointer"
            title="Log out of session"
          >
            <span class="material-symbols-outlined text-[16px]">logout</span>
            <span class="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs (Master Admin Only) -->
      <div
        v-if="isMasterAdmin"
        class="max-w-[1440px] mx-auto px-4 sm:px-8 flex gap-2 border-t border-white/10 overflow-x-auto"
      >
        <button
          @click="activeTab = 'customers'"
          class="py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap"
          :class="
            activeTab === 'customers'
              ? 'border-[#FAC030] text-[#FAC030]'
              : 'border-transparent text-gray-300 hover:text-white'
          "
        >
          <span class="material-symbols-outlined text-lg">group</span>
          <span>Customers CRM ({{ store.customers.length }})</span>
        </button>

        <button
          @click="activeTab = 'feedbacks'"
          class="py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap"
          :class="
            activeTab === 'feedbacks'
              ? 'border-[#FAC030] text-[#FAC030]'
              : 'border-transparent text-gray-300 hover:text-white'
          "
        >
          <span class="material-symbols-outlined text-lg">rate_review</span>
          <span>Feedbacks &amp; Reviews ({{ store.feedbacks.length }})</span>
          <span
            v-if="pendingFeedbacksCount > 0"
            class="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-extrabold"
          >
            {{ pendingFeedbacksCount }}
          </span>
        </button>

        <button
          @click="activeTab = 'celebrations'"
          class="py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap"
          :class="
            activeTab === 'celebrations'
              ? 'border-[#FAC030] text-[#FAC030]'
              : 'border-transparent text-gray-300 hover:text-white'
          "
        >
          <span class="material-symbols-outlined text-lg">cake</span>
          <span>Celebrations Hub</span>
          <span
            v-if="todayCelebrationsCount > 0"
            class="px-1.5 py-0.2 rounded-full bg-[#FAC030] text-[#161B30] text-[10px] font-extrabold"
          >
            {{ todayCelebrationsCount }} Today
          </span>
        </button>

        <!-- Tab 4: Engineers Hub -->
        <button
          @click="activeTab = 'engineers'"
          class="py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap"
          :class="
            activeTab === 'engineers'
              ? 'border-[#FAC030] text-[#FAC030]'
              : 'border-transparent text-gray-300 hover:text-white'
          "
        >
          <span class="material-symbols-outlined text-lg">engineering</span>
          <span>Engineers Hub ({{ store.engineers.length }})</span>
          <span
            v-if="pendingEngineersCount > 0"
            class="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-extrabold"
          >
            {{ pendingEngineersCount }} Pending
          </span>
        </button>
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8">
      <!-- ========================================================================= -->
      <!-- FIELD ENGINEER SCOPED WORKSPACE (Visible only when authenticated as engineer) -->
      <!-- ========================================================================= -->
      <div v-if="isEngineer" class="space-y-6">
        <!-- Security Notice Banner -->
        <div class="bg-gradient-to-r from-[#161B30] to-[#1e2545] text-white p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-md">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="max-w-3xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAC030]/20 text-[#FAC030] text-xs font-bold mb-3 border border-[#FAC030]/30">
                <span class="material-symbols-outlined text-[15px]">shield</span>
                <span>Verified Field Clearance • ID: {{ currentEngineerId }}</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-extrabold" style="font-family: 'Montserrat', sans-serif">
                Field Installations Workspace
              </h2>
              <p class="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
                Welcome, {{ currentEngineerName }}. You have role-scoped access to review your dispatched customer projects, site addresses, phone numbers, update progress stages, submit technical reports, and archive setup photos.
              </p>
            </div>
            <div class="text-right">
              <div class="text-xs text-white/50">Clearance Status</div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 mt-1">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active on Field
              </span>
            </div>
          </div>
        </div>

        <!-- Engineer Metrics Bar -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned Projects</span>
            <div class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1" style="font-family: 'Montserrat', sans-serif">
              {{ engineerAssignedCustomers.length }}
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
            <span class="text-xs font-bold text-amber-700 uppercase tracking-wider">In Progress / Pending</span>
            <div class="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1" style="font-family: 'Montserrat', sans-serif">
              {{ engineerPendingCount }}
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">Completed & Handed Over</span>
            <div class="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1" style="font-family: 'Montserrat', sans-serif">
              {{ engineerCompletedCount }}
            </div>
          </div>
        </div>

        <!-- Engineer Assigned Work Orders List -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 class="font-extrabold text-base text-gray-900" style="font-family: 'Montserrat', sans-serif">
                My Assigned Field Installations
              </h3>
              <p class="text-xs text-gray-500 mt-0.5">
                Work orders assigned to your engineer badge
              </p>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold font-mono">
              {{ engineerAssignedCustomers.length }} Projects
            </span>
          </div>

          <div v-if="engineerAssignedCustomers.length > 0" class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="py-3.5 px-4">Customer ID</th>
                  <th class="py-3.5 px-4">Client Name &amp; Phone</th>
                  <th class="py-3.5 px-4">Installation Site Address</th>
                  <th class="py-3.5 px-4">System Package</th>
                  <th class="py-3.5 px-4">Stage</th>
                  <th class="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="c in engineerAssignedCustomers"
                  :key="c.id"
                  class="hover:bg-gray-50/80 transition-colors cursor-pointer"
                  @click="openCustomerDossier(c)"
                >
                  <td class="py-4 px-4 font-mono font-bold text-[#161B30] whitespace-nowrap">
                    <span class="px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200">
                      {{ c.id }}
                    </span>
                  </td>

                  <td class="py-4 px-4">
                    <div class="font-bold text-gray-900">{{ c.fullName }}</div>
                    <div class="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <a :href="'tel:' + c.phone" @click.stop class="hover:underline flex items-center gap-1 font-semibold text-gray-700">
                        <span class="material-symbols-outlined text-[13px]">call</span>
                        {{ c.phone }}
                      </a>
                      <a
                        :href="createWhatsAppMessageLink(c, 'reminder')"
                        target="_blank"
                        @click.stop
                        class="text-emerald-600 hover:text-emerald-700 ml-1"
                        title="Chat on WhatsApp"
                      >
                        <i class="fa-brands fa-whatsapp"></i>
                      </a>
                    </div>
                  </td>

                  <td class="py-4 px-4 max-w-[220px]">
                    <div class="font-medium text-gray-800">{{ c.address }}</div>
                    <div class="text-[11px] text-gray-500 font-semibold mt-0.5">{{ c.state || 'Delta State' }}</div>
                  </td>

                  <td class="py-4 px-4 max-w-[200px]">
                    <div class="font-bold text-gray-900">{{ c.package }}</div>
                    <span class="text-[10px] uppercase font-bold text-gray-500">{{ c.packageCategory }}</span>
                  </td>

                  <td class="py-4 px-4">
                    <span
                      class="px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"
                      :class="statusBadgeClass(c.installationStatus)"
                    >
                      {{ c.installationStatus }}
                    </span>
                  </td>

                  <td class="py-4 px-4 text-right whitespace-nowrap">
                    <button
                      @click.stop="openCustomerDossier(c)"
                      class="px-3.5 py-1.5 bg-[#161B30] hover:bg-[#1e2545] text-[#FAC030] text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1 shadow-sm"
                    >
                      <span>Open Work Order</span>
                      <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="p-12 text-center text-gray-500">
            <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">assignment_late</span>
            <h4 class="font-bold text-base text-gray-800">No Installations Assigned Yet</h4>
            <p class="text-xs text-gray-400 mt-1 max-w-md mx-auto">
              Head Office has not yet dispatched any customer installations to your badge ID ({{ currentEngineerId }}). Once an installation is assigned to you, it will appear here immediately with full site specs.
            </p>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- MASTER ADMIN WORKSPACE (Full CRM, Debt, Feedbacks, Celebrations, Engineers Hub) -->
      <!-- ========================================================================= -->
      <div v-else-if="isMasterAdmin" class="space-y-8">
        <!-- Today's Celebration Alert Banner (if any) -->
      <div
        v-if="todayCelebrationsCount > 0"
        class="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-300 shadow-sm flex flex-wrap items-center justify-between gap-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-[#FAC030] flex items-center justify-center text-[#161B30] shrink-0 font-bold"
          >
            🎉
          </div>
          <div>
            <h4 class="font-extrabold text-[#161B30] text-sm sm:text-base">
              {{ todayCelebrationsCount }} Customer{{
                todayCelebrationsCount > 1 ? "s" : ""
              }}
              Celebrating Today!
            </h4>
            <p class="text-xs text-gray-600">
              Send automatic or direct WhatsApp goodwill greetings on behalf of
              IKEBEST Group.
            </p>
          </div>
        </div>
        <button
          @click="activeTab = 'celebrations'"
          class="px-4 py-2 bg-[#161B30] hover:bg-[#1e2545] text-[#FAC030] text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
        >
          <span>View Celebrants &amp; Send Greetings</span>
          <span class="material-symbols-outlined text-[16px]"
            >arrow_forward</span
          >
        </button>
      </div>

      <!-- Quick Metrics Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-wider"
            >Total Customers</span
          >
          <div
            class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1"
            style="font-family: &quot;Montserrat&quot;, sans-serif"
          >
            {{ store.customers.length }}
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-red-100 shadow-sm">
          <span class="text-xs font-bold text-red-600 uppercase tracking-wider"
            >Total Balance Owing</span
          >
          <div
            class="text-2xl sm:text-3xl font-extrabold text-red-600 mt-1"
            style="font-family: &quot;Montserrat&quot;, sans-serif"
          >
            {{ formatNaira(totalBalanceOwing) }}
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
          <span
            class="text-xs font-bold text-amber-700 uppercase tracking-wider"
            >Pending Installations</span
          >
          <div
            class="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1"
            style="font-family: &quot;Montserrat&quot;, sans-serif"
          >
            {{ pendingInstallationsCount }}
          </div>
        </div>

        <div
          class="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm"
        >
          <span
            class="text-xs font-bold text-emerald-700 uppercase tracking-wider"
            >Public Reviews Live</span
          >
          <div
            class="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1"
            style="font-family: &quot;Montserrat&quot;, sans-serif"
          >
            {{ liveReviewsCount }} / {{ store.feedbacks.length }}
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAB 1: CUSTOMERS CRM & ENGINEER TRACKING -->
      <!-- ========================================================================= -->
      <div v-if="activeTab === 'customers'" class="space-y-6">
        <!-- Controls Bar -->
        <div
          class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap justify-between items-center gap-4"
        >
          <div class="flex flex-wrap items-center gap-3 flex-1">
            <div class="relative min-w-[240px] flex-1 max-w-md">
              <span
                class="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg"
                >search</span
              >
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
              <span class="material-symbols-outlined text-[18px]"
                >person_add</span
              >
              <span>New Customer Record</span>
            </button>
          </div>
        </div>

        <!-- Customer Table -->
        <div
          class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead
                class="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]"
              >
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
                  <td
                    class="py-4 px-4 font-extrabold text-[#161B30] whitespace-nowrap"
                  >
                    <span
                      class="px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 text-[#161B30] font-mono text-xs"
                    >
                      {{ c.id }}
                    </span>
                  </td>

                  <!-- Name & Phone -->
                  <td class="py-4 px-4">
                    <div class="font-bold text-gray-900">{{ c.fullName }}</div>
                    <div
                      class="text-xs text-gray-500 flex items-center gap-1 mt-0.5"
                    >
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
                    <div
                      class="font-medium text-gray-800 truncate"
                      :title="c.package"
                    >
                      {{ c.package }}
                    </div>
                    <span
                      class="inline-block mt-0.5 text-[10px] uppercase font-bold text-gray-500"
                    >
                      {{ c.packageCategory }}
                    </span>
                  </td>

                  <!-- Total Cost -->
                  <td
                    class="py-4 px-4 font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {{ formatNaira(c.totalCost) }}
                  </td>

                  <!-- Amount Paid -->
                  <td
                    class="py-4 px-4 font-semibold text-emerald-700 whitespace-nowrap"
                  >
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
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-emerald-600"
                      ></span>
                      Fully Paid
                    </span>
                  </td>

                  <!-- Engineer Installation Status & Lead Assignment -->
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-1.5 mb-1">
                      <span
                        class="px-2 py-0.5 rounded text-[11px] font-bold"
                        :class="statusBadgeClass(c.installationStatus)"
                      >
                        {{ c.installationStatus }}
                      </span>
                    </div>
                    <!-- Quick Lead Engineer Assignment Dropdown -->
                    <div class="flex items-center gap-1.5 mt-1" @click.stop>
                      <span class="material-symbols-outlined text-gray-400 text-[14px]">engineering</span>
                      <select
                        :value="c.assignedEngineerId || ''"
                        @change="handleQuickReassignCustomer(c.id, $event.target.value)"
                        class="text-[11px] py-0.5 px-1.5 bg-gray-50 border border-gray-200 rounded text-gray-700 font-medium outline-none cursor-pointer hover:border-[#FAC030] max-w-[130px] truncate"
                        title="Assign Field Lead Engineer"
                      >
                        <option value="">Unassigned</option>
                        <option
                          v-for="eng in store.engineers"
                          :key="eng.id"
                          :value="eng.id"
                        >
                          {{ eng.fullName }} ({{ eng.id }})
                        </option>
                      </select>
                    </div>
                  </td>

                  <!-- Actions -->
                  <td class="py-4 px-4 text-right whitespace-nowrap">
                    <button
                      @click.stop="openCustomerDossier(c)"
                      class="px-3 py-1.5 bg-[#161B30] hover:bg-[#1E2545] text-[#FAC030] rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1"
                    >
                      <span>Open Dossier</span>
                      <span class="material-symbols-outlined text-[14px]"
                        >visibility</span
                      >
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-if="filteredCustomers.length === 0"
            class="p-12 text-center text-gray-500"
          >
            <span class="material-symbols-outlined text-4xl text-gray-300 mb-2"
              >person_off</span
            >
            <p v-if="customerFilterQuery" class="font-medium">
              No customer records matching "{{ customerFilterQuery }}".
            </p>
            <div v-else>
              <p class="font-medium text-base text-gray-800">
                No customer records in the database yet.
              </p>
              <p class="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                Customer files will appear here when clients submit their onboarding form via your shareable link, or when added manually below.
              </p>
              <button
                @click="showAddCustomerModal = true"
                class="mt-4 px-4 py-2 bg-[#161B30] text-[#FAC030] text-xs font-bold rounded-xl hover:bg-[#1e2545] inline-flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span class="material-symbols-outlined text-[16px]">person_add</span>
                <span>Add First Customer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAB 2: FEEDBACKS MANAGEMENT & PRINT / PUBLISH -->
      <!-- ========================================================================= -->
      <div v-if="activeTab === 'feedbacks'" class="space-y-6">
        <!-- Controls Bar -->
        <div
          class="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap justify-between items-center gap-4"
        >
          <div class="flex flex-wrap items-center gap-3">
            <button
              @click="feedbackCategoryFilter = 'all'"
              class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
              :class="
                feedbackCategoryFilter === 'all'
                  ? 'bg-[#161B30] text-[#FAC030]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              "
            >
              All Reviews ({{ store.feedbacks.length }})
            </button>
            <button
              @click="feedbackCategoryFilter = 'solar'"
              class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              :class="
                feedbackCategoryFilter === 'solar'
                  ? 'bg-[#161B30] text-[#FAC030]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              "
            >
              <span class="material-symbols-outlined text-[16px]"
                >wb_sunny</span
              >
              <span>Solar Feedback</span>
            </button>
            <button
              @click="feedbackCategoryFilter = 'estate'"
              class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              :class="
                feedbackCategoryFilter === 'estate'
                  ? 'bg-[#161B30] text-[#FAC030]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              "
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
            Click <strong>"Publish"</strong> on any review to show it to all
            website visitors.
          </div>
        </div>

        <!-- Feedbacks Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="fb in filteredFeedbacks"
            :key="fb.id"
            class="bg-white rounded-2xl border p-6 shadow-sm transition-all flex flex-col justify-between"
            :class="
              fb.isPublished
                ? 'border-emerald-300 ring-1 ring-emerald-200'
                : 'border-gray-200'
            "
          >
            <div>
              <!-- Header info -->
              <div class="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span
                    class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1.5"
                    :class="
                      fb.category === 'solar'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-900'
                    "
                  >
                    {{
                      fb.category === "solar" ? "Solar Energy" : "Real Estate"
                    }}
                  </span>
                  <h3 class="text-base font-bold text-gray-900">
                    {{ fb.customerName }}
                  </h3>
                  <p class="text-xs text-gray-500">
                    {{ fb.location }} • {{ formatDate(fb.createdAt) }}
                  </p>
                </div>

                <!-- Star Rating -->
                <div class="flex items-center text-amber-400 text-sm">
                  <span v-for="s in 5" :key="s">
                    {{ s <= fb.rating ? "★" : "☆" }}
                  </span>
                </div>
              </div>

              <!-- Package info -->
              <div
                v-if="fb.package"
                class="bg-gray-50 px-3 py-1.5 rounded-lg text-xs text-gray-600 mb-3 font-medium"
              >
                <strong>Project:</strong> {{ fb.package }}
              </div>

              <!-- Review Title & Body -->
              <div class="mb-4">
                <h4
                  v-if="fb.title"
                  class="font-bold text-gray-800 text-sm mb-1"
                >
                  "{{ fb.title }}"
                </h4>
                <p
                  class="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line"
                >
                  {{ fb.review }}
                </p>
              </div>
            </div>

            <!-- Footer Action Buttons (Publish, Print, Delete) -->
            <div
              class="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 mt-2"
            >
              <!-- Publish Toggle Button -->
              <button
                @click="handleTogglePublish(fb.id)"
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                :class="
                  fb.isPublished
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                "
              >
                <span class="material-symbols-outlined text-[16px]">
                  {{ fb.isPublished ? "check_circle" : "visibility" }}
                </span>
                <span>{{
                  fb.isPublished
                    ? "Live on Website (Click to Unpublish)"
                    : "Publish to Website"
                }}</span>
              </button>

              <div class="flex items-center gap-2">
                <!-- Print Review Sheet Button -->
                <button
                  @click="printSingleFeedback(fb)"
                  class="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center gap-1"
                  title="Print official review document"
                >
                  <span class="material-symbols-outlined text-[16px]"
                    >print</span
                  >
                  <span>Print</span>
                </button>

                <!-- Delete Feedback (Admin only) -->
                <button
                  v-if="store.auth.currentUser.role === 'admin'"
                  @click="handleDeleteFeedback(fb.id)"
                  class="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete feedback"
                >
                  <span class="material-symbols-outlined text-[18px]"
                    >delete</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty Feedbacks State -->
        <div
          v-if="filteredFeedbacks.length === 0"
          class="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 shadow-sm"
        >
          <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">rate_review</span>
          <p class="font-medium text-base text-gray-800">No customer reviews in the database yet.</p>
          <p class="text-xs text-gray-400 mt-1 max-w-md mx-auto">
            Reviews submitted through the feedback page will appear here for admin review, printable formatting, and approval to publish on the public website.
          </p>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAB 3: CELEBRATIONS HUB & AUTOMATED MESSAGING -->
      <!-- ========================================================================= -->
      <div v-if="activeTab === 'celebrations'" class="space-y-8">
        <!-- Today's Celebrations Section -->
        <div
          class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm"
        >
          <div
            class="flex items-center justify-between border-b border-gray-100 pb-5 mb-6"
          >
            <div class="flex items-center gap-3">
              <span class="text-3xl">🎂</span>
              <div>
                <h3
                  class="text-xl font-extrabold text-gray-900"
                  style="font-family: &quot;Montserrat&quot;, sans-serif"
                >
                  Today's Birthday &amp; Wedding Anniversaries
                </h3>
                <p class="text-xs text-gray-500">
                  Customers celebrating today: {{ todayFormatted }}
                </p>
              </div>
            </div>

            <div
              class="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900"
            >
              Automated Check: Active (08:00 WAT)
            </div>
          </div>

          <div
            v-if="todayCelebrants.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div
              v-for="item in todayCelebrants"
              :key="item.customer.id + item.type"
              class="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                    :class="
                      item.type === 'birthday'
                        ? 'bg-pink-100 text-pink-700'
                        : 'bg-purple-100 text-purple-700'
                    "
                  >
                    {{
                      item.type === "birthday"
                        ? "🎉 Birthday Today"
                        : "🥂 Wedding Anniversary Today"
                    }}
                  </span>
                  <span class="text-xs font-mono font-bold text-gray-600">{{
                    item.customer.id
                  }}</span>
                </div>

                <h4 class="font-extrabold text-gray-900 text-base">
                  {{ item.customer.fullName }}
                </h4>
                <p class="text-xs text-gray-600 mt-0.5">
                  Phone: {{ item.customer.phone }} • {{ item.customer.package }}
                </p>
              </div>

              <div
                class="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between gap-3"
              >
                <span
                  class="text-xs text-emerald-700 font-semibold flex items-center gap-1"
                >
                  <span class="material-symbols-outlined text-[16px]"
                    >check_circle</span
                  >
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

          <div
            v-else
            class="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl"
          >
            <span class="material-symbols-outlined text-4xl text-gray-300 mb-2"
              >cake</span
            >
            <p class="font-medium text-sm">
              No customers have a birthday or wedding anniversary scheduled for
              today.
            </p>
            <p class="text-xs text-gray-400 mt-1">
              Our daily monitor will automatically scan tomorrow morning at 8:00
              AM.
            </p>
          </div>
        </div>

        <!-- Upcoming Celebrations (Next 30 Days) -->
        <div
          class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm"
        >
          <h3
            class="text-lg font-bold text-gray-900 mb-4"
            style="font-family: &quot;Montserrat&quot;, sans-serif"
          >
            Upcoming Celebrations (This Month)
          </h3>
          <div v-if="upcomingCelebrants.length > 0" class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead
                class="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]"
              >
                <tr>
                  <th class="py-3 px-4">Customer ID</th>
                  <th class="py-3 px-4">Customer Name</th>
                  <th class="py-3 px-4">Event</th>
                  <th class="py-3 px-4">Date</th>
                  <th class="py-3 px-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="c in upcomingCelebrants"
                  :key="c.customer.id + c.type"
                  class="hover:bg-gray-50"
                >
                  <td class="py-3 px-4 font-mono font-bold">
                    {{ c.customer.id }}
                  </td>
                  <td class="py-3 px-4 font-bold text-gray-900">
                    {{ c.customer.fullName }}
                  </td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                      :class="
                        c.type === 'birthday'
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-purple-100 text-purple-700'
                      "
                    >
                      {{ c.type }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-gray-600">
                    {{ formatDate(c.date) }}
                  </td>
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

          <div
            v-else
            class="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl"
          >
            <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">event_available</span>
            <p class="font-medium text-sm">No upcoming celebrations in the next 30 days.</p>
            <p class="text-xs text-gray-400 mt-1">Upcoming birthdays and wedding anniversaries will automatically appear here.</p>
          </div>
        </div>

        <!-- Dispatched Log -->
        <div
          class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm"
        >
          <h3
            class="text-lg font-bold text-gray-900 mb-4"
            style="font-family: &quot;Montserrat&quot;, sans-serif"
          >
            Celebration Message Delivery Log
          </h3>
          <div v-if="store.celebrationLogs.length > 0" class="space-y-3">
            <div
              v-for="log in store.celebrationLogs"
              :key="log.id"
              class="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl text-xs border border-gray-100"
            >
              <div class="flex items-center gap-3">
                <span
                  class="material-symbols-outlined text-emerald-600 text-[18px]"
                  >mark_email_read</span
                >
                <div>
                  <span class="font-bold text-gray-800">{{
                    log.customerName
                  }}</span>
                  <span class="text-gray-500 ml-2 font-mono"
                    >({{ log.customerId }})</span
                  >
                  <div class="text-[11px] text-gray-500">
                    {{
                      log.type === "birthday"
                        ? "Birthday Greeting"
                        : "Wedding Anniversary Greeting"
                    }}
                    via {{ log.channel }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <span
                  class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]"
                >
                  {{ log.status }}
                </span>
                <div class="text-[10px] text-gray-400 mt-0.5">
                  {{ formatDate(log.timestamp) }}
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl"
          >
            <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">inbox</span>
            <p class="font-medium text-sm">No celebration messages logged yet.</p>
            <p class="text-xs text-gray-400 mt-1">
              Dispatches sent automatically or directly via WhatsApp will appear here with confirmation timestamps.
            </p>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAB 4: ENGINEERS HUB & ANTI-THEFT KYC TRACKING -->
      <!-- ========================================================================= -->
      <div v-if="activeTab === 'engineers'" class="space-y-6">
        <!-- Top Banner with Shareable Link -->
        <div
          class="bg-gradient-to-r from-[#161B30] to-[#1e2545] text-white p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-md"
        >
          <div class="flex flex-wrap items-center justify-between gap-6">
            <div class="max-w-2xl">
              <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAC030]/20 text-[#FAC030] text-xs font-bold mb-3 border border-[#FAC030]/30"
              >
                <span class="material-symbols-outlined text-[15px]"
                  >verified_user</span
                >
                <span>Anti-Theft KYC &amp; Police Tracking System</span>
              </div>
              <h2
                class="text-xl sm:text-2xl font-extrabold"
                style="font-family: &quot;Montserrat&quot;, sans-serif"
              >
                Field Installation Engineers Directory
              </h2>
              <p class="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
                All technical installers undergo exhaustive 3-page profiling (NIN, BVN, Landlord contact, Ancestral compound address, and 2 legally liable guarantors) before handling high-value company solar/CCTV equipment. Generate official Police/EFCC tracking dossiers in one click if any personnel absconds.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                @click="copyEngineerOnboardingLink"
                class="px-5 py-3 rounded-2xl bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] text-xs sm:text-sm font-extrabold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span class="material-symbols-outlined text-[18px]">share</span>
                <span>{{ copiedEngineerLink ? "KYC Link Copied!" : "Copy Engineer KYC Link" }}</span>
              </button>
              <RouterLink
                to="/engineer-onboarding"
                target="_blank"
                class="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                <span>Preview Form</span>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Engineer Metrics Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            @click="engineerStatusFilter = 'all'"
            class="bg-white p-5 rounded-2xl border shadow-sm cursor-pointer hover:border-[#FAC030] transition-all"
            :class="engineerStatusFilter === 'all' ? 'border-[#FAC030] ring-2 ring-[#FAC030]/20' : 'border-gray-200'"
          >
            <span class="text-xs font-bold text-gray-500 uppercase tracking-wider"
              >Total Profiled</span
            >
            <div
              class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1"
              style="font-family: &quot;Montserrat&quot;, sans-serif"
            >
              {{ store.engineers.length }}
            </div>
          </div>

          <div
            @click="engineerStatusFilter = 'pending'"
            class="bg-white p-5 rounded-2xl border shadow-sm cursor-pointer hover:border-amber-400 transition-all bg-amber-50/30"
            :class="engineerStatusFilter === 'pending' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-amber-200'"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-700 uppercase tracking-wider"
                >Pending Review</span
              >
              <span
                v-if="pendingEngineersCount > 0"
                class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"
              ></span>
            </div>
            <div
              class="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1"
              style="font-family: &quot;Montserrat&quot;, sans-serif"
            >
              {{ pendingEngineersCount }}
            </div>
          </div>

          <div
            @click="engineerStatusFilter = 'active'"
            class="bg-white p-5 rounded-2xl border shadow-sm cursor-pointer hover:border-emerald-400 transition-all"
            :class="engineerStatusFilter === 'active' ? 'border-emerald-400 ring-2 ring-emerald-400/20' : 'border-emerald-100'"
          >
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider"
              >Active Clearance</span
            >
            <div
              class="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1"
              style="font-family: &quot;Montserrat&quot;, sans-serif"
            >
              {{ activeEngineersCount }}
            </div>
          </div>

          <div
            @click="engineerStatusFilter = 'suspended'"
            class="bg-white p-5 rounded-2xl border shadow-sm cursor-pointer hover:border-red-400 transition-all"
            :class="engineerStatusFilter === 'suspended' ? 'border-red-400 ring-2 ring-red-400/20' : 'border-red-100'"
          >
            <span class="text-xs font-bold text-red-600 uppercase tracking-wider"
              >Suspended / Flagged</span
            >
            <div
              class="text-2xl sm:text-3xl font-extrabold text-red-600 mt-1"
              style="font-family: &quot;Montserrat&quot;, sans-serif"
            >
              {{ suspendedEngineersCount }}
            </div>
          </div>
        </div>

        <!-- Search & Engineers Table -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-4 sm:p-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-3 flex-1">
              <div class="relative min-w-[240px] flex-1 max-w-md">
                <span class="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg"
                  >search</span
                >
                <input
                  v-model="engineerSearchQuery"
                  type="text"
                  placeholder="Filter by Name, ID (ENG-...), Phone, NIN, Town..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:border-[#FAC030] outline-none"
                />
              </div>

              <!-- Status filter dropdown -->
              <select
                v-model="engineerStatusFilter"
                class="px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm bg-white text-gray-700 outline-none font-semibold cursor-pointer"
              >
                <option value="all">All Clearance Statuses</option>
                <option value="pending">Pending Review Only ({{ pendingEngineersCount }})</option>
                <option value="active">Active Clearance Only ({{ activeEngineersCount }})</option>
                <option value="suspended">Suspended Only ({{ suspendedEngineersCount }})</option>
              </select>
            </div>

            <div class="text-xs text-gray-500 font-semibold">
              Showing {{ filteredEngineers.length }} of {{ store.engineers.length }} Engineers
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead
                class="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]"
              >
                <tr>
                  <th class="py-3.5 px-4">Engineer / ID</th>
                  <th class="py-3.5 px-4">Contact</th>
                  <th class="py-3.5 px-4">Origin &amp; Residence</th>
                  <th class="py-3.5 px-4">Identity (NIN/BVN)</th>
                  <th class="py-3.5 px-4">Landlord &amp; Guarantors</th>
                  <th class="py-3.5 px-4 text-center">Assigned Jobs</th>
                  <th class="py-3.5 px-4 text-center">Status</th>
                  <th class="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="eng in filteredEngineers"
                  :key="eng.id"
                  class="hover:bg-gray-50/80 transition-colors"
                >
                  <!-- Engineer ID & Photo & Name -->
                  <td class="py-4 px-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <img
                        v-if="eng.passportPhotoUrl"
                        :src="eng.passportPhotoUrl"
                        alt="Engineer"
                        class="w-10 h-10 rounded-xl object-cover border border-gray-300 shrink-0 shadow-sm"
                      />
                      <div
                        v-else
                        class="w-10 h-10 rounded-xl bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs shrink-0"
                      >
                        {{ eng.fullName ? eng.fullName.charAt(0) : "E" }}
                      </div>
                      <div>
                        <div class="font-bold text-gray-900 flex items-center gap-1.5">
                          <span>{{ eng.fullName }}</span>
                          <span v-if="eng.nickname" class="text-gray-400 font-normal text-xs"
                            >({{ eng.nickname }})</span
                          >
                        </div>
                        <div
                          class="font-mono text-[11px] font-extrabold text-[#161B30] bg-[#FAC030]/20 px-2 py-0.5 rounded w-fit mt-0.5 border border-[#FAC030]/40"
                        >
                          {{ eng.id }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Contact -->
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-1 text-gray-800 font-medium">
                      <span>{{ eng.phone }}</span>
                      <a
                        :href="'https://wa.me/234' + (eng.phone || '').replace(/^0/, '')"
                        target="_blank"
                        class="text-emerald-600 hover:text-emerald-700 ml-1"
                        title="WhatsApp Engineer"
                      >
                        <i class="fa-brands fa-whatsapp"></i>
                      </a>
                    </div>
                    <div class="text-[11px] text-gray-500 truncate max-w-[150px]">
                      {{ eng.email || "No email" }}
                    </div>
                  </td>

                  <!-- Origin & Residence -->
                  <td class="py-4 px-4 max-w-[180px]">
                    <div class="text-gray-900 font-semibold truncate">
                      {{ eng.stateOfOrigin }} • {{ eng.homeTown || eng.lgaOfOrigin || "N/A" }}
                    </div>
                    <div
                      class="text-[11px] text-gray-500 truncate"
                      :title="eng.residentialAddress"
                    >
                      {{ eng.residentialAddress || "Address not logged" }}
                    </div>
                  </td>

                  <!-- Identity (NIN/BVN) -->
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-1.5">
                      <span class="text-gray-500 font-mono text-[11px]">NIN:</span>
                      <span class="font-mono font-bold text-xs">
                        {{
                          showDossierNIN[eng.id]
                            ? eng.nin
                            : eng.nin
                            ? "••••••••" + eng.nin.slice(-3)
                            : "Missing"
                        }}
                      </span>
                      <button
                        @click="showDossierNIN[eng.id] = !showDossierNIN[eng.id]"
                        class="text-gray-400 hover:text-gray-700 text-[13px] ml-1"
                        :title="showDossierNIN[eng.id] ? 'Hide' : 'Reveal'"
                      >
                        <span class="material-symbols-outlined text-[14px]">
                          {{ showDossierNIN[eng.id] ? "visibility_off" : "visibility" }}
                        </span>
                      </button>
                    </div>
                    <div class="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                      <span class="font-mono">BVN:</span>
                      <span class="font-mono">
                        {{
                          showDossierNIN[eng.id]
                            ? eng.bvn
                            : eng.bvn
                            ? "••••••••" + eng.bvn.slice(-3)
                            : "Missing"
                        }}
                      </span>
                    </div>
                  </td>

                  <!-- Landlord & Guarantors -->
                  <td class="py-4 px-4 max-w-[200px]">
                    <div class="text-[11px]">
                      <span class="font-bold text-gray-700">Landlord:</span>
                      {{ eng.landlordName || "N/A" }}
                      <a
                        v-if="eng.landlordPhone"
                        :href="'tel:' + eng.landlordPhone"
                        class="text-red-600 font-mono font-semibold ml-1 hover:underline"
                      >
                        {{ eng.landlordPhone }}
                      </a>
                    </div>
                    <div class="text-[11px] text-gray-500 truncate mt-0.5">
                      <span class="font-bold">G1:</span>
                      {{ eng.guarantor1?.fullName || "N/A" }} ({{
                        eng.guarantor1?.phone || "N/A"
                      }})
                    </div>
                  </td>

                  <!-- Assigned Jobs -->
                  <td class="py-4 px-4 text-center font-bold">
                    <span
                      class="px-2.5 py-1 rounded-full text-xs"
                      :class="
                        getAssignedJobsCount(eng.id) > 0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-500'
                      "
                    >
                      {{ getAssignedJobsCount(eng.id) }} Active
                    </span>
                  </td>

                  <!-- Status -->
                  <td class="py-4 px-4 text-center">
                    <span
                      class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1"
                      :class="
                        eng.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : eng.status === 'pending'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      "
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full"
                        :class="
                          eng.status === 'active'
                            ? 'bg-emerald-600'
                            : eng.status === 'pending'
                            ? 'bg-amber-600 animate-ping'
                            : 'bg-red-600'
                        "
                      ></span>
                      {{
                        eng.status === 'active'
                          ? 'Cleared'
                          : eng.status === 'pending'
                          ? 'Pending Review'
                          : 'Suspended'
                      }}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="py-4 px-4 text-right whitespace-nowrap">
                    <div class="inline-flex items-center gap-1.5">
                      <!-- Pending: 1-Click Approve & Dispatch Credentials -->
                      <button
                        v-if="eng.status === 'pending'"
                        @click="handleApproveEngineer(eng)"
                        class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-sm"
                        title="Approve clearance and open credentials email dispatch"
                      >
                        <span class="material-symbols-outlined text-[14px]">check_circle</span>
                        <span>Approve &amp; Send Credentials</span>
                      </button>

                      <!-- Active: Re-send Credentials Email -->
                      <button
                        v-if="eng.status === 'active'"
                        @click="openApprovalModal(eng)"
                        class="px-2.5 py-1.5 bg-[#161B30] hover:bg-[#1e2545] text-[#FAC030] text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-sm"
                        title="Email portal login credentials to engineer"
                      >
                        <span class="material-symbols-outlined text-[14px]">send</span>
                        <span>Send Login Info</span>
                      </button>

                      <!-- Query / Email Issue to Engineer -->
                      <button
                        @click="openInquiryModal(eng)"
                        class="px-2 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-sm"
                        title="Send an email to engineer detailing issues with their KYC submission"
                      >
                        <span class="material-symbols-outlined text-[14px]">mail</span>
                        <span>Query Details</span>
                      </button>

                      <!-- Assign Project (Active only) -->
                      <button
                        v-if="eng.status === 'active'"
                        @click="openAssignModal(eng)"
                        class="px-2.5 py-1.5 bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-sm"
                        title="Assign Customer Project"
                      >
                        <span class="material-symbols-outlined text-[14px]">assignment_add</span>
                        <span>Assign</span>
                      </button>

                      <!-- Police Dossier (Always available) -->
                      <button
                        @click="printPoliceDossier(eng)"
                        class="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 shadow-sm"
                        title="Generate Police/EFCC Criminal Tracking Dossier"
                      >
                        <span class="material-symbols-outlined text-[14px]">shield</span>
                        <span>Police Dossier</span>
                      </button>

                      <!-- Suspend / Reactivate Status -->
                      <button
                        v-if="eng.status !== 'pending'"
                        @click="handleToggleEngineerStatus(eng)"
                        class="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg transition-colors"
                        :title="
                          eng.status === 'active' ? 'Suspend Clearance' : 'Reactivate Clearance'
                        "
                      >
                        <span class="material-symbols-outlined text-[16px]">
                          {{ eng.status === 'active' ? 'block' : 'check_circle' }}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-if="filteredEngineers.length === 0" class="p-12 text-center text-gray-500">
            <span class="material-symbols-outlined text-4xl text-gray-300 mb-2"
              >engineering</span
            >
            <p v-if="engineerSearchQuery" class="font-medium text-sm">
              No engineers found matching "{{ engineerSearchQuery }}".
            </p>
            <div v-else>
              <p class="font-medium text-base text-gray-800">
                No field engineers registered yet.
              </p>
              <p class="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                Share your unlisted onboarding link with technicians to complete their 3-page KYC clearance and obtain their access credentials.
              </p>
              <button
                @click="copyEngineerOnboardingLink"
                class="mt-4 px-4 py-2 bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] font-bold text-xs rounded-xl transition-all shadow-sm inline-flex items-center gap-1.5"
              >
                <span class="material-symbols-outlined text-[16px]">content_copy</span>
                <span>Copy Engineer Onboarding Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> <!-- End of Master Admin Workspace -->
  </main>

    <!-- ========================================================================= -->
    <!-- CUSTOMER DOSSIER MODAL (Full Financials, Engineer Sign-off, Reports, Photos) -->
    <!-- ========================================================================= -->
    <div
      v-if="selectedCustomer"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      @click.self="selectedCustomer = null"
    >
      <div
        class="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200"
      >
        <!-- Modal Header -->
        <div
          class="bg-[#161B30] text-white p-6 sticky top-0 z-20 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <span
              class="px-3 py-1 rounded-lg bg-[#FAC030] text-[#161B30] font-mono font-extrabold text-sm"
            >
              {{ selectedCustomer.id }}
            </span>
            <div>
              <h2
                class="text-xl font-extrabold"
                style="font-family: &quot;Montserrat&quot;, sans-serif"
              >
                {{ selectedCustomer.fullName }}
              </h2>
              <p class="text-xs text-white/70">
                {{ selectedCustomer.phone }} • {{ selectedCustomer.address }},
                {{ selectedCustomer.state }}
              </p>
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
          <!-- 1. Financial & Package Section (OWING BALANCE HIGHLIGHT) - Admin Only -->
          <div v-if="isMasterAdmin" class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span
                  class="text-xs uppercase font-extrabold text-gray-500 tracking-wider"
                  >Service Package</span
                >
                <h3 class="text-lg font-extrabold text-gray-900">
                  {{ selectedCustomer.package }}
                </h3>
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

            <div
              class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200"
            >
              <div class="bg-white p-4 rounded-xl border border-gray-200">
                <span class="text-xs text-gray-500 font-semibold"
                  >Total Package Cost</span
                >
                <div class="text-xl font-extrabold text-gray-900 mt-0.5">
                  {{ formatNaira(selectedCustomer.totalCost) }}
                </div>
              </div>

              <div class="bg-white p-4 rounded-xl border border-gray-200">
                <span class="text-xs text-gray-500 font-semibold"
                  >Amount Paid</span
                >
                <div class="text-xl font-extrabold text-emerald-700 mt-0.5">
                  {{ formatNaira(selectedCustomer.amountPaid) }}
                </div>
              </div>

              <div
                class="bg-white p-4 rounded-xl border"
                :class="
                  selectedCustomer.balanceOwing > 0
                    ? 'border-red-300 bg-red-50/50'
                    : 'border-gray-200'
                "
              >
                <span
                  class="text-xs font-bold"
                  :class="
                    selectedCustomer.balanceOwing > 0
                      ? 'text-red-700'
                      : 'text-gray-500'
                  "
                >
                  Amount Owing / Balance Due
                </span>
                <div
                  class="text-xl font-extrabold mt-0.5"
                  :class="
                    selectedCustomer.balanceOwing > 0
                      ? 'text-red-600'
                      : 'text-emerald-700'
                  "
                >
                  {{ formatNaira(selectedCustomer.balanceOwing) }}
                </div>
              </div>
            </div>
          </div>

          <!-- 1. Technical Installation Scope (Field Engineer View - Financials Hidden) -->
          <div v-if="isEngineer" class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <span class="text-xs uppercase font-extrabold text-gray-500 tracking-wider">Installation Scope</span>
            <h3 class="text-lg font-extrabold text-gray-900 mt-0.5">{{ selectedCustomer.package }}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 text-xs">
              <div>
                <span class="text-gray-500 font-semibold block">Site Installation Address</span>
                <span class="font-bold text-gray-900">{{ selectedCustomer.address }}, {{ selectedCustomer.state }}</span>
              </div>
              <div>
                <span class="text-gray-500 font-semibold block">Client Phone</span>
                <a :href="'tel:' + selectedCustomer.phone" class="font-bold text-[#161B30] hover:underline">{{ selectedCustomer.phone }}</a>
              </div>
            </div>
          </div>

          <!-- 2. Engineer Installation Status & Update -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3
                class="text-base font-extrabold text-gray-900 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-[#FAC030]"
                  >build</span
                >
                <span>Engineer Installation Status &amp; Sign-off</span>
              </h3>
              <span class="text-xs text-gray-500">
                Assigned Lead:
                <strong>{{ selectedCustomer.engineerName }}</strong>
              </span>
            </div>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-gray-50 p-4 rounded-xl"
            >
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1"
                  >Current Installation Stage</label
                >
                <select
                  v-model="selectedCustomer.installationStatus"
                  @change="handleStatusChange"
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold outline-none"
                >
                  <option value="Survey & Planning">
                    Survey &amp; Planning
                  </option>
                  <option value="Installation in Progress">
                    Installation in Progress
                  </option>
                  <option value="Installation Completed">
                    Installation Completed
                  </option>
                  <option value="Tested & Verified">
                    Tested &amp; Verified
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1"
                  >Installation Completion Timestamp</label
                >
                <div class="text-xs text-gray-600 font-medium">
                  {{
                    selectedCustomer.installedAt
                      ? formatDate(selectedCustomer.installedAt)
                      : "Pending final engineer sign-off"
                  }}
                </div>
                <button
                  v-if="!selectedCustomer.installedAt"
                  @click="markInstallationCompleted"
                  class="mt-1 px-3 py-1 bg-[#161B30] hover:bg-[#1e2545] text-[#FAC030] text-xs font-bold rounded-lg transition-all"
                >
                  Sign Off Installation as Completed Today
                </button>
              </div>

              <!-- Reassign Lead Engineer (Master Admin Only) -->
              <div v-if="isMasterAdmin" class="sm:col-span-2 pt-3 border-t border-gray-200">
                <label class="block text-xs font-bold text-gray-700 mb-1">
                  Lead Field Engineer
                </label>
                <select
                  :value="selectedCustomer.assignedEngineerId || ''"
                  @change="handleQuickReassignCustomer(selectedCustomer.id, $event.target.value); selectedCustomer.assignedEngineerId = $event.target.value; selectedCustomer.engineerName = (store.engineers.find(e => e.id === $event.target.value)?.fullName || 'Unassigned')"
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold outline-none"
                >
                  <option value="">-- No Engineer Assigned --</option>
                  <option
                    v-for="eng in store.engineers"
                    :key="eng.id"
                    :value="eng.id"
                  >
                    {{ eng.fullName }} ({{ eng.id }}) — {{ eng.phone }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- 3. Report Column / Section -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3
                class="text-base font-extrabold text-gray-900 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-[#FAC030]"
                  >description</span
                >
                <span>Project Reports &amp; Engineering Log</span>
              </h3>
              <button
                @click="showAddReportForm = !showAddReportForm"
                class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all"
              >
                {{ showAddReportForm ? "Cancel Report" : "+ Add New Report" }}
              </button>
            </div>

            <!-- New Report Form -->
            <div
              v-if="showAddReportForm"
              class="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6"
            >
              <h4 class="text-xs font-bold uppercase text-gray-700 mb-2">
                New Engineering Report Entry
              </h4>
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
                  <span class="text-[11px] text-gray-400">{{
                    formatDate(rep.date)
                  }}</span>
                </div>
                <p class="text-gray-600 leading-relaxed mb-2">
                  {{ rep.content }}
                </p>
                <div class="text-[11px] text-gray-500 font-semibold">
                  By: {{ rep.author }} ({{ rep.authorRole }})
                </div>
              </div>

              <div
                v-if="
                  !selectedCustomer.reports ||
                  selectedCustomer.reports.length === 0
                "
                class="text-xs text-gray-400 italic"
              >
                No reports recorded yet for this project.
              </div>
            </div>
          </div>

          <!-- 4. Photo Uploads: Customer Photo, House Pictures, Setup Pictures -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <h3
              class="text-base font-extrabold text-gray-900 mb-4 flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-[#FAC030]"
                >photo_library</span
              >
              <span>Project Documentation &amp; Photo Archives</span>
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Customer Photos -->
              <div class="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold text-gray-700"
                    >Customer Picture</span
                  >
                  <label
                    class="cursor-pointer text-xs font-bold text-[#161B30] bg-[#FAC030] px-2 py-1 rounded-lg"
                  >
                    + Upload
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="(e) => handlePhotoUpload(e, 'customer')"
                    />
                  </label>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="(p, i) in selectedCustomer.photos.customerPhotos"
                    :key="i"
                    class="relative group"
                  >
                    <img
                      :src="p"
                      class="w-full h-32 object-cover rounded-xl border border-gray-200"
                    />
                  </div>
                  <div
                    v-if="selectedCustomer.photos.customerPhotos.length === 0"
                    class="text-[11px] text-gray-400 italic py-6 text-center"
                  >
                    No customer photo uploaded
                  </div>
                </div>
              </div>

              <!-- House Pictures -->
              <div class="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold text-gray-700"
                    >House / Site Pictures</span
                  >
                  <label
                    class="cursor-pointer text-xs font-bold text-[#161B30] bg-[#FAC030] px-2 py-1 rounded-lg"
                  >
                    + Upload
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="(e) => handlePhotoUpload(e, 'house')"
                    />
                  </label>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="(p, i) in selectedCustomer.photos.housePhotos"
                    :key="i"
                    class="relative group"
                  >
                    <img
                      :src="p"
                      class="w-full h-32 object-cover rounded-xl border border-gray-200"
                    />
                  </div>
                  <div
                    v-if="selectedCustomer.photos.housePhotos.length === 0"
                    class="text-[11px] text-gray-400 italic py-6 text-center"
                  >
                    No site picture uploaded
                  </div>
                </div>
              </div>

              <!-- Setup Pictures (Inverter, Batteries, Panels, Wiring) -->
              <div class="border border-gray-200 rounded-2xl p-4 bg-gray-50">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-bold text-gray-700"
                    >Customer Setup Pictures</span
                  >
                  <label
                    class="cursor-pointer text-xs font-bold text-[#161B30] bg-[#FAC030] px-2 py-1 rounded-lg"
                  >
                    + Upload
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="(e) => handlePhotoUpload(e, 'setup')"
                    />
                  </label>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="(p, i) in selectedCustomer.photos.setupPhotos"
                    :key="i"
                    class="relative group"
                  >
                    <img
                      :src="p"
                      class="w-full h-32 object-cover rounded-xl border border-gray-200"
                    />
                  </div>
                  <div
                    v-if="selectedCustomer.photos.setupPhotos.length === 0"
                    class="text-[11px] text-gray-400 italic py-6 text-center"
                  >
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
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          Record Payment for {{ selectedCustomer.fullName }}
        </h3>
        <p class="text-xs text-gray-500 mb-4">
          Current Balance Owing:
          <strong class="text-red-600">{{
            formatNaira(selectedCustomer.balanceOwing)
          }}</strong>
        </p>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1"
              >Additional Amount Paid (₦)</label
            >
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
      <div
        class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          Create New Customer Record
        </h3>
        <p class="text-xs text-gray-500 mb-6">
          Staff/Admin manual registration. An official Customer ID will be
          generated automatically.
        </p>

        <form @submit.prevent="handleCreateCustomer" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Full Name *</label
              >
              <input
                v-model="newCustomerForm.fullName"
                required
                type="text"
                class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Phone Number *</label
              >
              <input
                v-model="newCustomerForm.phone"
                required
                type="tel"
                class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Email</label
              >
              <input
                v-model="newCustomerForm.email"
                type="email"
                class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Sector *</label
              >
              <select
                v-model="newCustomerForm.packageCategory"
                class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
              >
                <option value="solar">Solar Energy</option>
                <option value="estate">Real Estate</option>
                <option value="cctv">CCTV &amp; Security</option>
                <option value="smarthome">Smart Home</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1"
              >Package / Property Description *</label
            >
            <input
              v-model="newCustomerForm.package"
              required
              type="text"
              placeholder="e.g. 5kVA Solar Inverter Setup"
              class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1"
              >Address *</label
            >
            <input
              v-model="newCustomerForm.address"
              required
              type="text"
              placeholder="Asaba, Delta State"
              class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Date of Birth (Birthday)</label
              >
              <input
                v-model="newCustomerForm.dob"
                type="date"
                class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Wedding Anniversary</label
              >
              <input
                v-model="newCustomerForm.weddingAnniversary"
                type="date"
                class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Total Cost (₦) *</label
              >
              <input
                v-model.number="newCustomerForm.totalCost"
                required
                type="number"
                min="0"
                class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1"
                >Amount Paid (₦) *</label
              >
              <input
                v-model.number="newCustomerForm.amountPaid"
                required
                type="number"
                min="0"
                class="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm"
              />
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
    <!-- ASSIGN CUSTOMER PROJECT TO ENGINEER MODAL -->
    <!-- ========================================================================= -->
    <div
      v-if="showAssignModal && selectedEngineerForAssignment"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="showAssignModal = false"
    >
      <div
        class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-200"
      >
        <div
          class="flex items-center justify-between pb-4 border-b border-gray-100 mb-5"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl bg-[#FAC030] text-[#161B30] flex items-center justify-center font-bold"
            >
              <span class="material-symbols-outlined text-xl"
                >assignment_ind</span
              >
            </div>
            <div>
              <h3 class="text-base font-extrabold text-gray-900">
                Dispatch Field Project
              </h3>
              <p class="text-xs text-gray-500">
                Assigning to:
                <strong>{{ selectedEngineerForAssignment.fullName }}</strong> ({{
                  selectedEngineerForAssignment.id
                }})
              </p>
            </div>
          </div>
          <button
            @click="showAssignModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form @submit.prevent="handleAssignCustomerSubmit" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">
              Select Customer Installation / Work Order *
            </label>
            <select
              v-model="selectedCustomerIdToAssign"
              required
              class="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold outline-none focus:border-[#FAC030]"
            >
              <option value="" disabled>-- Select a customer installation --</option>
              <option
                v-for="c in store.customers"
                :key="c.id"
                :value="c.id"
              >
                {{ c.id }} • {{ c.fullName }} ({{ c.package }}) — [Current Lead: {{ c.engineerName || 'Unassigned' }}]
              </option>
            </select>
            <p class="text-[11px] text-gray-400 mt-1">
              The selected customer will become immediately visible in {{ selectedEngineerForAssignment.fullName }}'s scoped field workspace.
            </p>
          </div>

          <div
            class="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 leading-relaxed"
          >
            <strong>Anti-Theft Liability Notice:</strong> All inverter units, solar panels, and batteries for this job will be attached to {{ selectedEngineerForAssignment.fullName }}'s biometric profile and sworn guarantors.
          </div>

          <div class="flex justify-end gap-3 pt-3">
            <button
              type="button"
              @click="showAssignModal = false"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!selectedCustomerIdToAssign"
              class="px-5 py-2 bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] font-bold text-xs rounded-xl transition-all disabled:opacity-50"
            >
              Confirm Assignment
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- APPROVAL & DISPATCH CREDENTIALS MODAL -->
    <!-- ========================================================================= -->
    <div
      v-if="showApprovalModal && selectedEngineerForApproval"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-emerald-200 animate-in fade-in zoom-in duration-200"
      >
        <div class="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <h3 class="text-base font-extrabold text-gray-900">
                Clearance Approved & Credentials Ready
              </h3>
              <p class="text-xs text-gray-500">
                Engineer: <strong>{{ selectedEngineerForApproval.fullName }}</strong> ({{ selectedEngineerForApproval.id }})
              </p>
            </div>
          </div>
          <button
            @click="showApprovalModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Success Banner -->
        <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 mb-4">
          <p class="font-bold flex items-center gap-1.5 mb-1">
            <span class="material-symbols-outlined text-base text-emerald-600">check_circle</span>
            Security Clearance Granted
          </p>
          <p class="text-emerald-700">
            This engineer is now cleared to receive project installations. Send their official login credentials below so they can access their assigned customer work orders.
          </p>
        </div>

        <!-- Credentials Card -->
        <div class="bg-gray-900 text-white p-4 rounded-xl space-y-2.5 mb-5 font-mono text-xs">
          <div class="flex justify-between items-center text-gray-400 text-[11px] pb-1 border-b border-gray-800">
            <span>OFFICIAL ACCESS CREDENTIALS</span>
            <span class="text-emerald-400 font-bold">PORTAL READY</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 font-sans">Clearance Badge ID:</span>
            <span class="font-bold text-yellow-400">{{ selectedEngineerForApproval.id }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 font-sans">Registered Email:</span>
            <span class="text-gray-200">{{ selectedEngineerForApproval.email }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 font-sans">Temporary Password:</span>
            <span class="font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              {{ selectedEngineerForApproval.tempPassword || selectedEngineerForApproval.temp_password || 'IkeBest@Field' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 font-sans">Login Portal URL:</span>
            <span class="text-gray-300 truncate max-w-[220px]">/admin/login</span>
          </div>
        </div>

        <!-- Communication Launchers -->
        <div class="space-y-2.5 mb-5">
          <label class="block text-xs font-bold text-gray-700">
            Dispatch Credentials to Engineer:
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              :href="createEngineerApprovalEmailLink(selectedEngineerForApproval)"
              class="flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <span class="material-symbols-outlined text-base">outgoing_mail</span>
              Launch Email App
            </a>
            <a
              :href="createEngineerWhatsAppApprovalLink(selectedEngineerForApproval)"
              target="_blank"
              class="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <span class="material-symbols-outlined text-base">chat</span>
              Send via WhatsApp
            </a>
          </div>
          <button
            type="button"
            @click="copyApprovalEmailText(selectedEngineerForApproval)"
            class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all"
          >
            <span class="material-symbols-outlined text-base">{{ copiedApprovalEmail ? 'done' : 'content_copy' }}</span>
            {{ copiedApprovalEmail ? 'Credentials Copied to Clipboard!' : 'Copy Full Email Text (for Webmail)' }}
          </button>
        </div>

        <div class="flex justify-end pt-2 border-t border-gray-100">
          <button
            type="button"
            @click="showApprovalModal = false"
            class="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- QUERY / ISSUE EMAIL TO ENGINEER MODAL -->
    <!-- ========================================================================= -->
    <div
      v-if="showInquiryModal && selectedEngineerForInquiry"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in duration-200"
      >
        <div class="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-2xl">report_problem</span>
            </div>
            <div>
              <h3 class="text-base font-extrabold text-gray-900">
                Query Engineer KYC Details
              </h3>
              <p class="text-xs text-gray-500">
                Applicant: <strong>{{ selectedEngineerForInquiry.fullName }}</strong> ({{ selectedEngineerForInquiry.id }})
              </p>
            </div>
          </div>
          <button
            @click="showInquiryModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <p class="text-xs text-gray-600 mb-3">
          If there is an issue with the submitted documents or unverified references, select a quick issue tag or type custom instructions below to dispatch to the engineer.
        </p>

        <!-- Quick Issue Tags -->
        <div class="mb-3">
          <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            Quick Issue Presets:
          </label>
          <div class="flex flex-wrap gap-1.5">
            <button
              type="button"
              @click="inquiryReason = 'Your landlord or caretaker phone number could not be reached for residential verification.'"
              class="px-2.5 py-1 bg-gray-100 hover:bg-amber-100 hover:text-amber-900 text-gray-700 text-[11px] rounded-lg font-medium transition-all"
            >
              📞 Landlord Unreachable
            </button>
            <button
              type="button"
              @click="inquiryReason = 'The NIN provided does not match NIMC validation records. Please provide a clear copy of your NIN slip.'"
              class="px-2.5 py-1 bg-gray-100 hover:bg-amber-100 hover:text-amber-900 text-gray-700 text-[11px] rounded-lg font-medium transition-all"
            >
              🆔 NIN Mismatch
            </button>
            <button
              type="button"
              @click="inquiryReason = 'One of your sworn guarantors could not confirm their consent or contact details. Please provide an active guarantor.'"
              class="px-2.5 py-1 bg-gray-100 hover:bg-amber-100 hover:text-amber-900 text-gray-700 text-[11px] rounded-lg font-medium transition-all"
            >
              👥 Guarantor Unconfirmed
            </button>
            <button
              type="button"
              @click="inquiryReason = 'Your uploaded passport photo or valid ID card photo is blurry. Please email a clearer high-resolution photo.'"
              class="px-2.5 py-1 bg-gray-100 hover:bg-amber-100 hover:text-amber-900 text-gray-700 text-[11px] rounded-lg font-medium transition-all"
            >
              📷 Blurry ID Photo
            </button>
          </div>
        </div>

        <!-- Custom Reason Box -->
        <div class="mb-4">
          <label class="block text-xs font-bold text-gray-700 mb-1">
            Issue Description / Required Action:
          </label>
          <textarea
            v-model="inquiryReason"
            rows="3"
            placeholder="Specify what detail is missing or needs correction..."
            class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs outline-none focus:border-amber-500 focus:bg-white resize-none"
          ></textarea>
        </div>

        <!-- Launch Notice Buttons -->
        <div class="space-y-2 mb-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              :href="createEngineerInquiryEmailLink(selectedEngineerForInquiry, inquiryReason)"
              class="flex items-center justify-center gap-2 px-3 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <span class="material-symbols-outlined text-base">mail</span>
              Launch Issue Email
            </a>
            <a
              :href="createEngineerWhatsAppInquiryLink(selectedEngineerForInquiry, inquiryReason)"
              target="_blank"
              class="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <span class="material-symbols-outlined text-base">chat</span>
              Send via WhatsApp
            </a>
          </div>
          <button
            type="button"
            @click="copyInquiryEmailText(selectedEngineerForInquiry)"
            class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all"
          >
            <span class="material-symbols-outlined text-base">{{ copiedInquiryEmail ? 'done' : 'content_copy' }}</span>
            {{ copiedInquiryEmail ? 'Notice Copied to Clipboard!' : 'Copy Notice Text (for Webmail)' }}
          </button>
        </div>

        <div class="flex justify-end pt-2 border-t border-gray-100">
          <button
            type="button"
            @click="showInquiryModal = false"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
          >
            Close
          </button>
        </div>
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
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase, adminLogout, getAuthSession } from "../services/supabase.js";
import {
  store,
  formatNaira,
  formatDate,
  isTodayMonthDay,
  isUpcomingDays,
  updateCustomer,
  createCustomer,
  addCustomerReport,
  addCustomerPhoto,
  toggleFeedbackPublish,
  deleteFeedback,
  createWhatsAppMessageLink,
  logCelebrationSent,
  assignCustomerToEngineer,
  getEngineerAssignedCustomers,
  getEngineerById,
  updateEngineerStatus,
  approveEngineer,
  createEngineerApprovalEmailLink,
  createEngineerInquiryEmailLink,
  createEngineerWhatsAppApprovalLink,
  createEngineerWhatsAppInquiryLink,
} from "../services/dataStore.js";

const router = useRouter();

// Auth & Scoped Role State
const authSession = ref(getAuthSession());
const isMasterAdmin = computed(() => !authSession.value || authSession.value.role === 'admin');
const isEngineer = computed(() => authSession.value?.role === 'engineer');
const currentEngineerId = computed(() => authSession.value?.engineerId || '');
const currentEngineerName = computed(() => authSession.value?.name || '');
const currentEngineerPhoto = computed(() => authSession.value?.passportPhotoUrl || '');

const activeTab = ref("customers");
const quickSearchQuery = ref("");
const customerFilterQuery = ref("");
const filterSector = ref("all");
const filterDebt = ref("all");

const feedbackCategoryFilter = ref("all");
const feedbackStatusFilter = ref("all");

const selectedCustomer = ref(null);
const showAddCustomerModal = ref(false);
const showPaymentModal = ref(false);
const paymentAmount = ref(0);

const showAddReportForm = ref(false);
const newReportTitle = ref("");
const newReportContent = ref("");
const copiedOnboarding = ref(false);
const copiedEngineerLink = ref(false);

// Engineer Management State
const showAssignModal = ref(false);
const selectedEngineerForAssignment = ref(null);
const selectedCustomerIdToAssign = ref("");
const engineerSearchQuery = ref("");
const engineerStatusFilter = ref("all");
const showDossierNIN = reactive({});

const showApprovalModal = ref(false);
const selectedEngineerForApproval = ref(null);
const copiedApprovalEmail = ref(false);

const showInquiryModal = ref(false);
const selectedEngineerForInquiry = ref(null);
const inquiryReason = ref("");
const copiedInquiryEmail = ref(false);

const newCustomerForm = reactive({
  fullName: "",
  phone: "",
  email: "",
  packageCategory: "solar",
  package: "",
  address: "",
  dob: "",
  weddingAnniversary: "",
  totalCost: 0,
  amountPaid: 0,
});

// Metrics
const totalBalanceOwing = computed(() => {
  return store.customers.reduce((acc, c) => acc + (c.balanceOwing || 0), 0);
});

const pendingInstallationsCount = computed(() => {
  return store.customers.filter(
    (c) =>
      c.installationStatus !== "Tested & Verified" &&
      c.installationStatus !== "Installation Completed",
  ).length;
});

const liveReviewsCount = computed(() => {
  return store.feedbacks.filter((f) => f.isPublished).length;
});

const pendingFeedbacksCount = computed(() => {
  return store.feedbacks.filter((f) => !f.isPublished).length;
});

// Scoped Engineer Computeds
const engineerAssignedCustomers = computed(() => {
  if (!isEngineer.value) return [];
  const engId = (currentEngineerId.value || "").toLowerCase().trim();
  const engName = (currentEngineerName.value || "").toLowerCase().trim();
  return store.customers.filter((c) => {
    if (c.assignedEngineerId && c.assignedEngineerId.toLowerCase().trim() === engId) return true;
    if (c.engineerName && engName && c.engineerName.toLowerCase().includes(engName)) return true;
    return false;
  });
});

const engineerPendingCount = computed(() => {
  return engineerAssignedCustomers.value.filter(
    (c) =>
      c.installationStatus !== "Tested & Verified" &&
      c.installationStatus !== "Installation Completed",
  ).length;
});

const engineerCompletedCount = computed(() => {
  return engineerAssignedCustomers.value.filter(
    (c) =>
      c.installationStatus === "Tested & Verified" ||
      c.installationStatus === "Installation Completed",
  ).length;
});

// Engineer Clearance Counts
const pendingEngineersCount = computed(() => {
  return store.engineers.filter((e) => e.status === "pending").length;
});

const activeEngineersCount = computed(() => {
  return store.engineers.filter((e) => e.status === "active").length;
});

const suspendedEngineersCount = computed(() => {
  return store.engineers.filter((e) => e.status === "suspended" || e.status === "rejected").length;
});

// Filtered Engineers for Directory
const filteredEngineers = computed(() => {
  return store.engineers.filter((e) => {
    // status filter
    if (engineerStatusFilter.value !== "all" && e.status !== engineerStatusFilter.value) {
      return false;
    }
    // text search query
    if (engineerSearchQuery.value) {
      const q = engineerSearchQuery.value.toLowerCase().trim();
      const match =
        (e.id && e.id.toLowerCase().includes(q)) ||
        (e.fullName && e.fullName.toLowerCase().includes(q)) ||
        (e.phone && e.phone.includes(q)) ||
        (e.nin && e.nin.includes(q)) ||
        (e.stateOfOrigin && e.stateOfOrigin.toLowerCase().includes(q)) ||
        (e.homeTown && e.homeTown.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });
});

// Celebrants Computations
const todayCelebrants = computed(() => {
  const celebrants = [];
  store.customers.forEach((c) => {
    if (isTodayMonthDay(c.dob)) {
      celebrants.push({ customer: c, type: "birthday" });
    }
    if (isTodayMonthDay(c.weddingAnniversary)) {
      celebrants.push({ customer: c, type: "anniversary" });
    }
  });
  return celebrants;
});

const todayCelebrationsCount = computed(() => todayCelebrants.value.length);

const upcomingCelebrants = computed(() => {
  const list = [];
  store.customers.forEach((c) => {
    if (isUpcomingDays(c.dob, 30)) {
      list.push({ customer: c, type: "birthday", date: c.dob });
    }
    if (isUpcomingDays(c.weddingAnniversary, 30)) {
      list.push({
        customer: c,
        type: "anniversary",
        date: c.weddingAnniversary,
      });
    }
  });
  return list;
});

const todayFormatted = computed(() => {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

// Filtered Customers
const filteredCustomers = computed(() => {
  return store.customers.filter((c) => {
    // text query
    if (customerFilterQuery.value) {
      const q = customerFilterQuery.value.toLowerCase();
      const match =
        (c.id && c.id.toLowerCase().includes(q)) ||
        (c.fullName && c.fullName.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q)) ||
        (c.package && c.package.toLowerCase().includes(q));
      if (!match) return false;
    }
    // sector
    if (
      filterSector.value !== "all" &&
      c.packageCategory !== filterSector.value
    ) {
      return false;
    }
    // debt
    if (filterDebt.value === "owing" && c.balanceOwing <= 0) return false;
    if (filterDebt.value === "paid" && c.balanceOwing > 0) return false;

    return true;
  });
});

// Filtered Feedbacks
const filteredFeedbacks = computed(() => {
  return store.feedbacks.filter((f) => {
    if (
      feedbackCategoryFilter.value !== "all" &&
      f.category !== feedbackCategoryFilter.value
    ) {
      return false;
    }
    if (feedbackStatusFilter.value === "published" && !f.isPublished)
      return false;
    if (feedbackStatusFilter.value === "private" && f.isPublished) return false;
    return true;
  });
});

function statusBadgeClass(status) {
  switch (status) {
    case "Tested & Verified":
    case "Installation Completed":
      return "bg-emerald-100 text-emerald-800";
    case "Installation in Progress":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
}

async function handleQuickSearch() {
  if (!quickSearchQuery.value) return;
  const q = quickSearchQuery.value.trim().toLowerCase();
  
  // 1. Search in local memory first
  let found = store.customers.find(
    (c) =>
      (c.id && c.id.toLowerCase() === q) ||
      (c.id && c.id.toLowerCase().includes(q)) ||
      (c.fullName && c.fullName.toLowerCase().includes(q)) ||
      (c.phone && c.phone.includes(q)),
  );

  // 2. If not found in local memory, query Supabase database
  if (!found) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*, customer_reports(*), customer_photos(*)')
        .or(`id.ilike.%${q}%,phone.ilike.%${q}%,full_name.ilike.%${q}%`)
        .limit(1);

      if (!error && data && data.length > 0) {
        const raw = data[0];
        found = {
          id: raw.id,
          fullName: raw.full_name,
          phone: raw.phone,
          email: raw.email || '',
          address: raw.address || '',
          state: raw.state || 'Delta State',
          dob: raw.dob || null,
          weddingAnniversary: raw.wedding_anniversary || null,
          package: raw.package_name || '',
          packageCategory: raw.package_category || 'solar',
          totalCost: Number(raw.total_cost) || 0,
          amountPaid: Number(raw.amount_paid) || 0,
          balanceOwing: Math.max(0, (Number(raw.total_cost) || 0) - (Number(raw.amount_paid) || 0)),
          paymentStatus: raw.payment_status || 'pending',
          installationStatus: raw.installation_status || 'Survey & Planning',
          installedAt: raw.installed_at || null,
          engineerName: raw.engineer_name || 'Unassigned',
          reports: (raw.customer_reports || []).map(r => ({
            id: r.id,
            title: r.title,
            content: r.content,
            author: r.author,
            authorRole: r.author_role,
            date: r.created_at
          })),
          photos: {
            customerPhotos: (raw.customer_photos || []).filter(p => p.category === 'customer').map(p => p.photo_url),
            housePhotos: (raw.customer_photos || []).filter(p => p.category === 'house').map(p => p.photo_url),
            setupPhotos: (raw.customer_photos || []).filter(p => p.category === 'setup').map(p => p.photo_url)
          },
          createdAt: raw.created_at
        };
        store.customers.unshift(found);
      }
    } catch (err) {
      console.warn('Supabase customer quick search query notice:', err);
    }
  }

  if (found) {
    openCustomerDossier(found);
    quickSearchQuery.value = "";
  } else {
    alert(
      `No customer found matching "${quickSearchQuery.value}". Please verify the Customer ID or phone number.`,
    );
  }
}

async function handleLogout() {
  if (confirm("Are you sure you want to log out of the Operations Portal?")) {
    await adminLogout();
    router.push("/admin/login");
  }
}

function openCustomerDossier(customer) {
  selectedCustomer.value = customer;
}

function handleStatusChange() {
  if (!selectedCustomer.value) return;
  updateCustomer(selectedCustomer.value.id, {
    installationStatus: selectedCustomer.value.installationStatus,
  });
}

function markInstallationCompleted() {
  if (!selectedCustomer.value) return;
  const now = new Date().toISOString();
  updateCustomer(selectedCustomer.value.id, {
    installationStatus: "Installation Completed",
    installedAt: now,
  });
  selectedCustomer.value.installationStatus = "Installation Completed";
  selectedCustomer.value.installedAt = now;
  addCustomerReport(selectedCustomer.value.id, {
    title: "Installation Marked Completed",
    content: `Installation completed by ${store.auth.currentUser.name} on ${formatDate(now)}. Handover to customer scheduled.`,
    author: store.auth.currentUser.name,
    authorRole: store.auth.currentUser.role,
  });
}

function handleSaveReport() {
  if (!newReportTitle.value && !newReportContent.value) return;
  addCustomerReport(selectedCustomer.value.id, {
    title: newReportTitle.value || "Field Report",
    content: newReportContent.value,
  });
  newReportTitle.value = "";
  newReportContent.value = "";
  showAddReportForm.value = false;
}

function handlePhotoUpload(event, category) {
  const file = event.target.files[0];
  if (!file || !selectedCustomer.value) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    addCustomerPhoto(selectedCustomer.value.id, category, e.target.result);
  };
  reader.readAsDataURL(file);
}

function openRecordPaymentModal() {
  paymentAmount.value = 0;
  showPaymentModal.value = true;
}

function handleSavePayment() {
  if (!selectedCustomer.value || paymentAmount.value <= 0) return;
  const newAmountPaid =
    (selectedCustomer.value.amountPaid || 0) + Number(paymentAmount.value);
  updateCustomer(selectedCustomer.value.id, {
    amountPaid: newAmountPaid,
  });
  selectedCustomer.value.amountPaid = newAmountPaid;
  selectedCustomer.value.balanceOwing = Math.max(
    0,
    selectedCustomer.value.totalCost - newAmountPaid,
  );
  addCustomerReport(selectedCustomer.value.id, {
    title: `Payment Received: ${formatNaira(paymentAmount.value)}`,
    content: `Additional payment of ${formatNaira(paymentAmount.value)} confirmed. Remaining balance: ${formatNaira(selectedCustomer.value.balanceOwing)}.`,
    author: store.auth.currentUser.name,
    authorRole: store.auth.currentUser.role,
  });
  showPaymentModal.value = false;
}

function openAddCustomerModal() {
  showAddCustomerModal.value = true;
}

function handleCreateCustomer() {
  const created = createCustomer({ ...newCustomerForm });
  showAddCustomerModal.value = false;
  openCustomerDossier(created);
}

function handleTogglePublish(id) {
  toggleFeedbackPublish(id);
}

function handleDeleteFeedback(id) {
  if (confirm("Are you sure you want to delete this feedback?")) {
    deleteFeedback(id);
  }
}

function handleLogCelebration(customer, type) {
  logCelebrationSent(customer, type, "WhatsApp");
}

function copyOnboardingLink() {
  const url = window.location.origin + "/customer-onboarding";
  navigator.clipboard.writeText(url).then(() => {
    copiedOnboarding.value = true;
    setTimeout(() => {
      copiedOnboarding.value = false;
    }, 3000);
  });
}

function copyEngineerOnboardingLink() {
  const url = window.location.origin + "/engineer-onboarding";
  navigator.clipboard.writeText(url).then(() => {
    copiedEngineerLink.value = true;
    setTimeout(() => {
      copiedEngineerLink.value = false;
    }, 3000);
  });
}

function openAssignModal(engineer) {
  selectedEngineerForAssignment.value = engineer;
  selectedCustomerIdToAssign.value = "";
  showAssignModal.value = true;
}

function handleAssignCustomerSubmit() {
  if (!selectedEngineerForAssignment.value || !selectedCustomerIdToAssign.value) return;
  assignCustomerToEngineer(selectedCustomerIdToAssign.value, selectedEngineerForAssignment.value.id);
  showAssignModal.value = false;
  selectedCustomerIdToAssign.value = "";
  selectedEngineerForAssignment.value = null;
}

function handleQuickReassignCustomer(customerId, newEngineerId) {
  assignCustomerToEngineer(customerId, newEngineerId);
  const target = store.customers.find((c) => c.id === customerId);
  if (target) {
    target.assignedEngineerId = newEngineerId || null;
    const eng = store.engineers.find((e) => e.id === newEngineerId);
    target.engineerName = eng ? eng.fullName : "Unassigned";
  }
}

function handleToggleEngineerStatus(engineer) {
  const newStatus = engineer.status === "active" ? "suspended" : "active";
  const confirmMsg =
    newStatus === "suspended"
      ? `Are you sure you want to suspend security clearance for ${engineer.fullName}? They will be blocked from logging into the operations portal.`
      : `Reactivate security clearance for ${engineer.fullName}?`;
  if (confirm(confirmMsg)) {
    updateEngineerStatus(engineer.id, newStatus);
  }
}

function getAssignedJobsCount(engineerId) {
  if (!engineerId) return 0;
  return store.customers.filter((c) => c.assignedEngineerId === engineerId).length;
}

function handleApproveEngineer(eng) {
  approveEngineer(eng.id);
  selectedEngineerForApproval.value = eng;
  showApprovalModal.value = true;
}

function openApprovalModal(eng) {
  selectedEngineerForApproval.value = eng;
  showApprovalModal.value = true;
}

function openInquiryModal(eng) {
  selectedEngineerForInquiry.value = eng;
  inquiryReason.value = "";
  showInquiryModal.value = true;
}

function copyApprovalEmailText(eng) {
  const portalUrl = window.location.origin + "/admin/login";
  const pass = eng.tempPassword || eng.temp_password || "";
  const text = `Subject: IKEBEST Field Operations Clearance Approved - Login Credentials Inside (Badge: ${eng.id})

Dear ${eng.fullName},

Congratulations! We are pleased to inform you that your 3-page KYC background verification and anti-theft security vetting with IKEBEST Group have been officially APPROVED.

You are now cleared for field installation assignments (Solar Energy, CCTV Security, Smart Home).

Here are your official field operations portal login credentials:
---------------------------------------------------------
Operations Portal URL: ${portalUrl}
Clearance Badge ID: ${eng.id}
Assigned Password: ${pass}
Registered Email: ${eng.email}
---------------------------------------------------------

HOW TO ACCESS YOUR ASSIGNED WORK ORDERS:
1. Visit the portal login URL: ${portalUrl}
2. Sign in using your Clearance Badge ID (${eng.id}) or Email, along with your assigned password above.
3. Once logged in, you will strictly see installations and project work orders dispatched directly to you by the Master Admin.
4. Reminder: All solar panels, inverters, lithium batteries, and company tools assigned to you remain the legal property of IKEBEST Group under sworn criminal indemnity.

Welcome to the IKEBEST engineering team!

Warm regards,
Security & Operations Management
IKEBEST Group of Companies
Solar House, behind NTA, Okpanam Road, Asaba, Delta State
📞 08139522490 | ✉️ Ikebest316@gmail.com`;

  navigator.clipboard.writeText(text).then(() => {
    copiedApprovalEmail.value = true;
    setTimeout(() => {
      copiedApprovalEmail.value = false;
    }, 3000);
  });
}

function copyInquiryEmailText(eng) {
  const text = `Subject: Action Required: Verification Issue with your IKEBEST Engineer KYC (Badge: ${eng.id})

Dear ${eng.fullName},

During our security and background verification of your IKEBEST Field Engineer KYC submission (Clearance Badge: ${eng.id}), our compliance team identified an issue with the details you provided:

ISSUE DETAILS:
${inquiryReason.value || 'Please update your details.'}

REQUIRED ACTION:
Please reply directly to this email or call our Vetting & Compliance Desk on 08139522490 within 48 hours to update your details and complete your security clearance.

Warm regards,
Vetting & Compliance Unit
IKEBEST Group of Companies
Asaba, Delta State
📞 08139522490`;

  navigator.clipboard.writeText(text).then(() => {
    copiedInquiryEmail.value = true;
    setTimeout(() => {
      copiedInquiryEmail.value = false;
    }, 3000);
  });
}

function printPoliceDossier(eng) {
  const guarantor1 = eng.guarantor1 || {};
  const guarantor2 = eng.guarantor2 || {};
  const kin = eng.nextOfKin || {};
  const bank = eng.bankDetails || {};
  const printContent = `
    <html>
      <head>
        <title>POLICE TRACKING DOSSIER - ${eng.id} - ${eng.fullName}</title>
        <style>
          @page { size: A4; margin: 12mm; }
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111827; margin: 0; padding: 20px; line-height: 1.4; font-size: 11.5px; }
          .header { border-bottom: 3px solid #b91c1c; padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; }
          .badge-urgent { background: #b91c1c; color: white; padding: 6px 12px; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px; }
          .company { font-size: 18px; font-weight: 900; color: #161B30; letter-spacing: 0.5px; }
          .sub { font-size: 10.5px; color: #4b5563; }
          .alert-box { background: #fef2f2; border: 1.5px solid #ef4444; border-radius: 6px; padding: 10px 14px; margin-bottom: 16px; color: #991b1b; font-weight: bold; font-size: 11px; }
          .grid-2 { display: grid; grid-template-columns: 130px 1fr; gap: 16px; margin-bottom: 16px; }
          .photo-box { width: 130px; height: 155px; border: 2px solid #161B30; border-radius: 6px; overflow: hidden; background: #e5e7eb; display: flex; align-items: center; justify-content: center; }
          .photo-box img { width: 100%; height: 100%; object-fit: cover; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
          th, td { border: 1px solid #d1d5db; padding: 6px 10px; text-align: left; vertical-align: top; }
          th { background: #f3f4f6; font-size: 10px; text-transform: uppercase; color: #374151; font-weight: 800; width: 25%; }
          .section-title { font-size: 11.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; background: #161B30; color: white; padding: 5px 10px; margin-top: 12px; margin-bottom: 6px; border-radius: 3px; }
          .signature-row { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; text-align: center; font-size: 10px; color: #4b5563; }
          .sign-line { border-top: 1px solid #111; margin-bottom: 4px; padding-top: 4px; font-weight: bold; color: #111; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="company">IKEBEST GROUP OF COMPANIES</div>
            <div class="sub">Corporate Headquarters: Solar House, behind NTA, Okpanam Road, Asaba, Delta State</div>
            <div class="sub">Security & Anti-Theft Intelligence Unit • Tel: 08139522490 • legal@ikebest.com</div>
          </div>
          <div class="badge-urgent">POLICE / LAW ENFORCEMENT DOSSIER</div>
        </div>

        <div class="alert-box">
          SWORN CRIMINAL INDEMNITY RECORD: The individual profiled below is registered as a Field Installation Engineer. This dossier is certified by IKEBEST Management for submission to the Nigeria Police Force (NPF), EFCC, DSS, or Vigilante Services in case of theft, diversion of solar/security assets, or rogue disappearance.
        </div>

        <div class="grid-2">
          <div class="photo-box">
            ${eng.passportPhotoUrl ? `<img src="${eng.passportPhotoUrl}" alt="Engineer Photo"/>` : '<span style="font-size:10px;text-align:center;color:#6b7280;">NO PHOTO ON RECORD</span>'}
          </div>
          <div>
            <table>
              <tr><th>Full Legal Name</th><td><strong>${eng.fullName}</strong> ${eng.nickname ? `(Alias: "${eng.nickname}")` : ''}</td></tr>
              <tr><th>Clearance / Badge ID</th><td><strong style="color:#b91c1c; font-size:14px;">${eng.id}</strong></td></tr>
              <tr><th>National Identity No. (NIN)</th><td><strong style="font-family:monospace; font-size:13px; color:#1e40af;">${eng.nin || 'UNRECORDED'}</strong></td></tr>
              <tr><th>Bank Verification No. (BVN)</th><td><strong style="font-family:monospace; font-size:13px; color:#1e40af;">${eng.bvn || 'UNRECORDED'}</strong></td></tr>
              <tr><th>Phone & WhatsApp</th><td>${eng.phone} ${eng.altPhone ? ` / ${eng.altPhone}` : ''}</td></tr>
              <tr><th>Email Address</th><td>${eng.email || 'N/A'}</td></tr>
              <tr><th>Date of Birth & Gender</th><td>${formatDate(eng.dob)} (${eng.gender || 'Male'})</td></tr>
            </table>
          </div>
        </div>

        <div class="section-title">1. Residential Address & Landlord Verification</div>
        <table>
          <tr><th>Current Residence</th><td colspan="3">${eng.residentialAddress || 'N/A'} (Landmark: ${eng.landmark || 'N/A'})</td></tr>
          <tr><th>Landlord / Caretaker</th><td><strong>${eng.landlordName || 'N/A'}</strong></td><th>Landlord Phone</th><td><strong style="color:#b91c1c;">${eng.landlordPhone || 'N/A'}</strong></td></tr>
        </table>

        <div class="section-title">2. Ancestral Roots & Origin (Family Tracking)</div>
        <table>
          <tr><th>State of Origin</th><td>${eng.stateOfOrigin || 'N/A'}</td><th>LGA of Origin</th><td>${eng.lgaOfOrigin || 'N/A'}</td></tr>
          <tr><th>Hometown / Village</th><td>${eng.homeTown || 'N/A'}</td><th>Ancestral Compound</th><td>${eng.ancestralAddress || 'N/A'}</td></tr>
        </table>

        <div class="section-title">3. Two Sworn Legal Guarantors (Legally Liable)</div>
        <table>
          <tr><th colspan="2" style="background:#e5e7eb; color:#111;">GUARANTOR 1 (Family / Elder / Kin)</th><th colspan="2" style="background:#e5e7eb; color:#111;">GUARANTOR 2 (Professional / Clergy / Civil Servant)</th></tr>
          <tr><th>Name</th><td><strong>${guarantor1.fullName || 'N/A'}</strong> (${guarantor1.relationship || 'N/A'})</td><th>Name</th><td><strong>${guarantor2.fullName || 'N/A'}</strong> (${guarantor2.relationship || 'N/A'})</td></tr>
          <tr><th>Phone</th><td><strong style="color:#b91c1c;">${guarantor1.phone || 'N/A'}</strong></td><th>Phone</th><td><strong style="color:#b91c1c;">${guarantor2.phone || 'N/A'}</strong></td></tr>
          <tr><th>NIN</th><td>${guarantor1.nin || 'N/A'}</td><th>NIN</th><td>${guarantor2.nin || 'N/A'}</td></tr>
          <tr><th>Address</th><td>${guarantor1.address || 'N/A'}</td><th>Address</th><td>${guarantor2.address || 'N/A'}</td></tr>
          <tr><th>Occupation</th><td>${guarantor1.occupation || 'N/A'}</td><th>Occupation</th><td>${guarantor2.occupation || 'N/A'}</td></tr>
        </table>

        <div class="section-title">4. Next of Kin & Bank Disbursal Account</div>
        <table>
          <tr><th>Next of Kin</th><td>${kin.fullName || 'N/A'} (${kin.relationship || 'N/A'}) - Phone: ${kin.phone || 'N/A'}</td><th>Residential Address</th><td>${kin.address || 'N/A'}</td></tr>
          <tr><th>Settlement Bank</th><td>${bank.bankName || 'N/A'}</td><th>Account Details</th><td>${bank.accountNumber || 'N/A'} (${bank.accountName || 'N/A'})</td></tr>
        </table>

        <div class="signature-row">
          <div>
            <div class="sign-line">Managing Director / CEO</div>
            IKEBEST Group of Companies
          </div>
          <div>
            <div class="sign-line">Head of Security & Logistics</div>
            Field Equipment Verification Unit
          </div>
          <div>
            <div class="sign-line">Nigeria Police Receiving Officer</div>
            Station Stamp & Signature
          </div>
        </div>
      </body>
    </html>
  `;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 300);
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
          <div class="badge">${fb.category === "solar" ? "SOLAR ENERGY FEEDBACK" : "REAL ESTATE FEEDBACK"}</div>
        </div>
        <h2>Customer: ${fb.customerName}</h2>
        <p><strong>Location:</strong> ${fb.location} | <strong>Project:</strong> ${fb.package || "Standard"}</p>
        <p><strong>Date Submitted:</strong> ${formatDate(fb.createdAt)}</p>
        <div class="rating">Rating: ${"★".repeat(fb.rating)} (${fb.rating}/5)</div>
        <div class="text">
          <h3>${fb.title || "Client Review"}</h3>
          <p>${fb.review}</p>
        </div>
        <div class="footer">
          <p>IKEBEST Technologies • Solar House, behind NTA, Okpanam Road, Asaba • 08139522490 • Ikebest316@gmail.com</p>
        </div>
      </body>
    </html>
  `;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

function printCustomerDossier(c) {
  const reportsHtml = (c.reports || [])
    .map(
      (r) => `
    <div style="margin-bottom: 15px; border-left: 2px solid #FAC030; padding-left: 10px;">
      <strong>${r.title}</strong> (${formatDate(r.date)}) - <em>${r.author}</em><br/>
      ${r.content}
    </div>
  `,
    )
    .join("");

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
          <tr><th>Email</th><td>${c.email || "N/A"}</td><th>State / Location</th><td>${c.state}</td></tr>
          <tr><th>Address</th><td colspan="3">${c.address}</td></tr>
          <tr><th>Birthday</th><td>${formatDate(c.dob)}</td><th>Anniversary</th><td>${formatDate(c.weddingAnniversary)}</td></tr>
          <tr><th>Package</th><td colspan="3"><strong>${c.package}</strong></td></tr>
          <tr><th>Total Cost</th><td>${formatNaira(c.totalCost)}</td><th>Amount Paid</th><td class="paid">${formatNaira(c.amountPaid)}</td></tr>
          <tr><th>Amount Owing</th><td class="owing" colspan="3">${formatNaira(c.balanceOwing)}</td></tr>
          <tr><th>Engineer Status</th><td>${c.installationStatus}</td><th>Assigned Engineer</th><td>${c.engineerName}</td></tr>
        </table>
        <h3>Engineering & Installation Reports</h3>
        ${reportsHtml || "<p>No reports recorded.</p>"}
        <div style="margin-top: 50px; display: flex; justify-content: space-between;">
          <div>____________________________<br/>Customer Signature</div>
          <div>____________________________<br/>Lead Engineer / Admin Sign-off</div>
        </div>
      </body>
    </html>
  `;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
</script>
