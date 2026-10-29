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

// Check if admin or engineer is currently authenticated
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

// Get active session details
export function getAuthSession() {
  try {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem(ADMIN_SESSION_KEY)
    if (!session) return null
    return JSON.parse(session)
  } catch {
    return null
  }
}

// Unified portal login with automatic role detection (Master Admin vs Field Engineer)
export async function adminLogin(identifier, password) {
  const masterEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@ikebest.com').toLowerCase().trim()
  const masterPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'ikebest2026admin').trim()

  const cleanId = (identifier || '').toLowerCase().trim()
  const cleanPassword = (password || '').trim()

  // 1. Try Supabase Auth first (for master admin)
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanId,
      password: cleanPassword
    })

    if (!error && data?.session) {
      const sessionData = {
        authenticated: true,
        role: 'admin',
        name: 'Onyeze ICT Master Admin',
        email: data.user.email,
        timestamp: Date.now()
      }
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
      return { success: true, user: sessionData }
    }
  } catch (err) {
    console.warn('Supabase auth attempt notice:', err)
  }

  // 2. Master Admin verification
  if (cleanId === masterEmail && cleanPassword === masterPassword) {
    const sessionData = {
      authenticated: true,
      role: 'admin',
      name: 'Onyeze ICT Master Admin',
      email: masterEmail,
      timestamp: Date.now()
    }
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
    return { success: true, user: sessionData }
  }

  // 3. Field Engineer Verification (by Engineer ID e.g. ENG-2026-001 or personal email)
  try {
    let eng = null

    // Query Supabase engineers table
    const { data: engList, error: engErr } = await supabase
      .from('engineers')
      .select('*')
      .or(`id.ilike.${cleanId},email.ilike.${cleanId}`)
      .limit(1)

    if (!engErr && engList && engList.length > 0) {
      eng = engList[0]
    }

    // LocalStorage fallback if offline or table just created
    if (!eng && typeof window !== 'undefined') {
      const raw = localStorage.getItem('ikebest_crm_data_v3')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed.engineers)) {
          eng = parsed.engineers.find(e => 
            (e.id && e.id.toLowerCase() === cleanId) || 
            (e.email && e.email.toLowerCase() === cleanId)
          )
        }
      }
    }

    if (eng) {
      const validPass = (eng.temp_password || eng.tempPassword || '').trim()
      if (validPass && cleanPassword === validPass) {
        if (eng.status === 'pending') {
          return {
            success: false,
            error: 'Your KYC profiling application is currently under security review (2 to 3 business days). You will receive an official approval email with your active portal access once verified.'
          }
        }

        if (eng.status === 'suspended' || eng.status === 'flagged_rogue' || eng.status === 'rejected') {
          return {
            success: false,
            error: 'Your security clearance has been suspended or rejected. Please contact IKEBEST Head Office immediately.'
          }
        }

        const sessionData = {
          authenticated: true,
          role: 'engineer',
          engineerId: eng.id,
          name: eng.full_name || eng.fullName,
          email: eng.email,
          phone: eng.phone,
          passportPhotoUrl: eng.passport_photo_url || eng.passportPhotoUrl || '',
          timestamp: Date.now()
        }
        sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData))
        return { success: true, user: sessionData }
      }
    }
  } catch (err) {
    console.warn('Engineer authentication notice:', err)
  }

  return {
    success: false,
    error: 'Invalid credentials. Access is restricted to authorized IKEBEST personnel only.'
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
