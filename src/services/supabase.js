import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dpmlprdxxphlwcvqqxjs.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_SVMb4uFNsdUe0LVlnHkhTg_6d3fVzcD'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

const ADMIN_SESSION_KEY = 'ikebest_admin_authenticated'

// Check if admin is currently authenticated
export function isAdminAuthenticated() {
  try {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem(ADMIN_SESSION_KEY)
    if (!session) return false
    const parsed = JSON.parse(session)
    return Boolean(parsed && parsed.authenticated)
  } catch {
    return false
  }
}

// Single-credential admin login
export async function adminLogin(email, password) {
  const masterEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@ikebest.com').toLowerCase().trim()
  const masterPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'ikebest2026admin').trim()

  const cleanEmail = (email || '').toLowerCase().trim()
  const cleanPassword = (password || '').trim()

  // 1. Try Supabase Auth first
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword
    })

    if (!error && data?.session) {
      const sessionData = {
        authenticated: true,
        email: data.user.email,
        timestamp: Date.now()
      }
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
      return { success: true, user: data.user }
    }
  } catch (err) {
    console.warn('Supabase auth attempt returned:', err)
  }

  // 2. Fallback / Single Master Credential verification
  if (cleanEmail === masterEmail && cleanPassword === masterPassword) {
    const sessionData = {
      authenticated: true,
      email: masterEmail,
      timestamp: Date.now()
    }
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
    return { success: true, user: { email: masterEmail, role: 'admin' } }
  }

  return {
    success: false,
    error: 'Invalid admin credentials. Access is restricted to authorized personnel only.'
  }
}

// Admin logout
export async function adminLogout() {
  try {
    await supabase.auth.signOut()
  } catch (err) {
    console.warn('Supabase signOut error:', err)
  }
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
  localStorage.removeItem(ADMIN_SESSION_KEY)
}
