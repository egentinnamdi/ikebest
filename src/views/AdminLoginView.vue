<template>
  <div class="min-h-screen bg-[#0d1120] flex items-center justify-center p-4 relative overflow-hidden">
    
    <!-- Background Accents -->
    <div class="absolute inset-0 z-0 opacity-15">
      <img
        src="https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1600&q=80&auto=format&fit=crop"
        alt="IKEBEST Background"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="absolute -top-32 -right-32 w-96 h-96 bg-[#FAC030]/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md bg-[#161B30] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
      
      <!-- Brand Logo & Header -->
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-block mb-4">
          <img
            src="https://res.cloudinary.com/dtetfimeq/image/upload/v1778246625/ikebest-logo_cgx4cg.png"
            alt="IKEBEST Group"
            class="h-14 w-auto mx-auto bg-white/10 p-2 rounded-2xl"
          />
        </RouterLink>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAC030]/15 text-[#FAC030] text-xs font-bold uppercase tracking-wider mb-2">
          <span class="material-symbols-outlined text-[15px]">lock</span>
          <span>Restricted Portal</span>
        </div>
        <h1 class="text-2xl font-extrabold text-white" style="font-family: 'Montserrat', sans-serif;">
          Admin Sign In
        </h1>
        <p class="text-xs sm:text-sm text-gray-400 mt-1">
          Authorized executive and operations personnel only.
        </p>
      </div>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
        <span class="material-symbols-outlined text-base mt-0.5 shrink-0 text-red-400">error</span>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        
        <!-- Admin Email / Username -->
        <div>
          <label class="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
            Admin Email / Username
          </label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3.5 top-3 text-gray-400 text-lg">admin_panel_settings</span>
            <input
              v-model="email"
              type="text"
              required
              placeholder="admin@ikebest.com"
              class="w-full bg-[#0d1120] text-white placeholder-gray-500 pl-11 pr-4 py-3 rounded-xl border border-white/15 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm transition-all"
            />
          </div>
        </div>

        <!-- Admin Password -->
        <div>
          <label class="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
            Master Password
          </label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3.5 top-3 text-gray-400 text-lg">key</span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••••••"
              class="w-full bg-[#0d1120] text-white placeholder-gray-500 pl-11 pr-11 py-3 rounded-xl border border-white/15 focus:border-[#FAC030] focus:ring-1 focus:ring-[#FAC030] outline-none text-sm transition-all"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3.5 top-3 text-gray-400 hover:text-white transition-colors"
              tabindex="-1"
            >
              <span class="material-symbols-outlined text-lg">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3.5 px-4 rounded-xl bg-[#FAC030] hover:bg-yellow-300 text-[#161B30] font-bold text-sm transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-6"
        >
          <span v-if="loading" class="material-symbols-outlined animate-spin text-lg">progress_activity</span>
          <span v-else class="material-symbols-outlined text-lg">login</span>
          <span>{{ loading ? 'Verifying Credentials...' : 'Sign In to Operations Portal' }}</span>
        </button>

      </form>

      <!-- Return to Home -->
      <div class="mt-8 pt-6 border-t border-white/10 text-center">
        <RouterLink to="/" class="text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Return to Public Website</span>
        </RouterLink>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminLogin } from '../services/supabase.js'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    const result = await adminLogin(email.value, password.value)
    if (result.success) {
      router.push('/admin')
    } else {
      errorMessage.value = result.error || 'Invalid admin credentials.'
    }
  } catch (err) {
    errorMessage.value = 'An error occurred during authentication. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
