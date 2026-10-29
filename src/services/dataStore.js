import { reactive } from 'vue'
import { supabase } from './supabase.js'

const STORAGE_KEY = 'ikebest_crm_data_v3'

// Clean up legacy mock caches if present
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('ikebest_crm_data_v1')
    localStorage.removeItem('ikebest_crm_data_v2')
  } catch (e) {
    // ignore
  }
}

// Clean initial state: 100% empty until records are loaded from Supabase or added by admin
const defaultInitialData = {
  feedbacks: [],
  customers: [],
  celebrationLogs: [],
  auth: {
    currentUser: {
      name: 'Onyeze ICT Admin',
      role: 'admin', // 'admin' | 'staff' | 'engineer'
      email: 'admin@ikebest.com'
    }
  }
}

// Load data from localStorage or seed
function loadStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        ...defaultInitialData,
        ...parsed,
        auth: {
          ...defaultInitialData.auth,
          ...(parsed.auth || {})
        }
      }
    }
  } catch (err) {
    console.error('Failed to load stored IKEBEST data', err)
  }
  return JSON.parse(JSON.stringify(defaultInitialData))
}

export const store = reactive(loadStoredData())

// Save state to localStorage
export function persistStore() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      feedbacks: store.feedbacks,
      customers: store.customers,
      celebrationLogs: store.celebrationLogs,
      auth: store.auth
    }))
  } catch (err) {
    console.error('Failed to persist IKEBEST data', err)
  }
}

// Background synchronization with Supabase
export async function syncWithSupabase() {
  try {
    // 1. Fetch feedbacks from Supabase
    const { data: dbFeedbacks, error: fbErr } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false })

    if (!fbErr && Array.isArray(dbFeedbacks)) {
      store.feedbacks = dbFeedbacks.map(f => ({
        id: f.id,
        category: f.category,
        customerName: f.customer_name,
        rating: f.rating,
        package: f.package || '',
        location: f.location || '',
        title: f.title || '',
        review: f.review || '',
        isPublished: Boolean(f.is_published),
        createdAt: f.created_at
      }))
      persistStore()
    }

    // 2. Fetch customers from Supabase
    const { data: dbCustomers, error: custErr } = await supabase
      .from('customers')
      .select('*, customer_reports(*), customer_photos(*)')
      .order('created_at', { ascending: false })

    if (!custErr && Array.isArray(dbCustomers)) {
      store.customers = dbCustomers.map(c => ({
        id: c.id,
        fullName: c.full_name,
        phone: c.phone,
        email: c.email || '',
        address: c.address || '',
        state: c.state || 'Delta State',
        dob: c.dob || null,
        weddingAnniversary: c.wedding_anniversary || null,
        package: c.package_name || '',
        packageCategory: c.package_category || 'solar',
        totalCost: Number(c.total_cost) || 0,
        amountPaid: Number(c.amount_paid) || 0,
        balanceOwing: Math.max(0, (Number(c.total_cost) || 0) - (Number(c.amount_paid) || 0)),
        paymentStatus: c.payment_status || 'pending',
        installationStatus: c.installation_status || 'Survey & Planning',
        installedAt: c.installed_at || null,
        engineerName: c.engineer_name || 'Unassigned',
        reports: (c.customer_reports || []).map(r => ({
          id: r.id,
          title: r.title,
          content: r.content,
          author: r.author,
          authorRole: r.author_role,
          date: r.created_at
        })),
        photos: {
          customerPhotos: (c.customer_photos || []).filter(p => p.category === 'customer').map(p => p.photo_url),
          housePhotos: (c.customer_photos || []).filter(p => p.category === 'house').map(p => p.photo_url),
          setupPhotos: (c.customer_photos || []).filter(p => p.category === 'setup').map(p => p.photo_url)
        },
        createdAt: c.created_at
      }))
      persistStore()
    }
  } catch (err) {
    console.warn('Supabase sync notice:', err)
  }

  // 3. Set up Realtime listener for feedbacks
  try {
    supabase
      .channel('feedbacks-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'feedbacks' }, async () => {
        const { data } = await supabase.from('feedbacks').select('*').order('created_at', { ascending: false })
        if (data && Array.isArray(data)) {
          store.feedbacks = data.map(f => ({
            id: f.id,
            category: f.category,
            customerName: f.customer_name,
            rating: f.rating,
            package: f.package || '',
            location: f.location || '',
            title: f.title || '',
            review: f.review || '',
            isPublished: Boolean(f.is_published),
            createdAt: f.created_at
          }))
          persistStore()
        }
      })
      .subscribe()
  } catch (err) {
    console.warn('Realtime subscription notice for feedbacks:', err)
  }

  // 4. Set up Realtime listener for customers
  try {
    supabase
      .channel('customers-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'customers' }, async () => {
        const { data: dbCustomers } = await supabase
          .from('customers')
          .select('*, customer_reports(*), customer_photos(*)')
          .order('created_at', { ascending: false })
        if (dbCustomers && Array.isArray(dbCustomers)) {
          store.customers = dbCustomers.map(c => ({
            id: c.id,
            fullName: c.full_name,
            phone: c.phone,
            email: c.email || '',
            address: c.address || '',
            state: c.state || 'Delta State',
            dob: c.dob || null,
            weddingAnniversary: c.wedding_anniversary || null,
            package: c.package_name || '',
            packageCategory: c.package_category || 'solar',
            totalCost: Number(c.total_cost) || 0,
            amountPaid: Number(c.amount_paid) || 0,
            balanceOwing: Math.max(0, (Number(c.total_cost) || 0) - (Number(c.amount_paid) || 0)),
            paymentStatus: c.payment_status || 'pending',
            installationStatus: c.installation_status || 'Survey & Planning',
            installedAt: c.installed_at || null,
            engineerName: c.engineer_name || 'Unassigned',
            reports: (c.customer_reports || []).map(r => ({
              id: r.id,
              title: r.title,
              content: r.content,
              author: r.author,
              authorRole: r.author_role,
              date: r.created_at
            })),
            photos: {
              customerPhotos: (c.customer_photos || []).filter(p => p.category === 'customer').map(p => p.photo_url),
              housePhotos: (c.customer_photos || []).filter(p => p.category === 'house').map(p => p.photo_url),
              setupPhotos: (c.customer_photos || []).filter(p => p.category === 'setup').map(p => p.photo_url)
            },
            createdAt: c.created_at
          }))
          persistStore()
        }
      })
      .subscribe()
  } catch (err) {
    console.warn('Realtime subscription notice for customers:', err)
  }
}

// Automatically initiate sync in the background
if (typeof window !== 'undefined') {
  syncWithSupabase()
}


// Helper: Format Naira currency
export function formatNaira(amount) {
  const num = Number(amount) || 0
  return '₦' + num.toLocaleString('en-NG')
}

// Helper: Format date
export function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}

// Check if a date (YYYY-MM-DD or MM-DD) matches today's month and day
export function isTodayMonthDay(dateStr) {
  if (!dateStr) return false
  const now = new Date()
  const todayMonth = now.getMonth() + 1
  const todayDay = now.getDate()

  // Handle both YYYY-MM-DD and MM-DD
  const parts = dateStr.split('-')
  if (parts.length === 3) {
    const month = parseInt(parts[1], 10)
    const day = parseInt(parts[2], 10)
    return month === todayMonth && day === todayDay
  } else if (parts.length === 2) {
    const month = parseInt(parts[0], 10)
    const day = parseInt(parts[1], 10)
    return month === todayMonth && day === todayDay
  }
  return false
}

// Check if celebration is in the next N days
export function isUpcomingDays(dateStr, days = 7) {
  if (!dateStr) return false
  const now = new Date()
  const parts = dateStr.split('-')
  let month, day
  if (parts.length === 3) {
    month = parseInt(parts[1], 10) - 1
    day = parseInt(parts[2], 10)
  } else if (parts.length === 2) {
    month = parseInt(parts[0], 10) - 1
    day = parseInt(parts[1], 10)
  } else {
    return false
  }

  const thisYearCelebration = new Date(now.getFullYear(), month, day)
  const diffTime = thisYearCelebration.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 && diffDays <= days
}

// Generate Next Customer ID (e.g., IKB-2026-001)
export function generateNextCustomerId() {
  const year = new Date().getFullYear()
  let maxNum = 0
  if (store.customers && store.customers.length > 0) {
    for (const c of store.customers) {
      if (c && c.id && c.id.startsWith(`IKB-${year}-`)) {
        const numPart = parseInt(c.id.replace(`IKB-${year}-`, ''), 10)
        if (!isNaN(numPart) && numPart > maxNum) {
          maxNum = numPart
        }
      }
    }
  }
  const sequence = String(maxNum + 1).padStart(3, '0')
  return `IKB-${year}-${sequence}`
}

// --- Customer Management Actions ---

export function getCustomerById(id) {
  if (!id) return null
  const cleaned = id.trim().toLowerCase()
  return store.customers.find(c => c && c.id && c.id.toLowerCase() === cleaned) || null
}

export function searchCustomers(query) {
  if (!query) return store.customers
  const q = query.trim().toLowerCase()
  return store.customers.filter(c =>
    (c.id && c.id.toLowerCase().includes(q)) ||
    (c.fullName && c.fullName.toLowerCase().includes(q)) ||
    (c.phone && c.phone.includes(q)) ||
    (c.package && c.package.toLowerCase().includes(q))
  )
}

export function createCustomer(data) {
  const newId = data.id || generateNextCustomerId()
  const totalCost = Number(data.totalCost) || 0
  const amountPaid = Number(data.amountPaid) || 0
  const balanceOwing = Math.max(0, totalCost - amountPaid)

  let paymentStatus = 'pending'
  if (amountPaid >= totalCost && totalCost > 0) {
    paymentStatus = 'paid'
  } else if (amountPaid > 0) {
    paymentStatus = 'partial'
  }

  const newCustomer = {
    id: newId,
    fullName: data.fullName || 'Unnamed Customer',
    phone: data.phone || '',
    email: data.email || '',
    address: data.address || '',
    state: data.state || 'Delta State',
    dob: data.dob || null,
    weddingAnniversary: data.weddingAnniversary || null,
    package: data.package || 'Standard Package',
    packageCategory: data.packageCategory || 'solar',
    totalCost,
    amountPaid,
    balanceOwing,
    paymentStatus,
    installationStatus: data.installationStatus || 'Survey & Planning',
    installedAt: data.installationStatus === 'Installation Completed' ? new Date().toISOString() : null,
    engineerName: data.engineerName || 'Unassigned',
    reports: data.reports || [],
    photos: data.photos || {
      customerPhotos: [],
      housePhotos: [],
      setupPhotos: []
    },
    createdAt: new Date().toISOString()
  }

  store.customers.unshift(newCustomer)
  persistStore()

  // Background sync to Supabase
  try {
    supabase.from('customers').insert([{
      id: newCustomer.id,
      full_name: newCustomer.fullName,
      phone: newCustomer.phone,
      email: newCustomer.email,
      address: newCustomer.address,
      state: newCustomer.state,
      dob: newCustomer.dob,
      wedding_anniversary: newCustomer.weddingAnniversary,
      package_name: newCustomer.package,
      package_category: newCustomer.packageCategory,
      total_cost: newCustomer.totalCost,
      amount_paid: newCustomer.amountPaid,
      installation_status: newCustomer.installationStatus,
      engineer_name: newCustomer.engineerName
    }]).then(({ error }) => {
      if (error) console.warn('Supabase customer insert notice:', error)
    })
  } catch (err) {
    console.warn('Customer Supabase dispatch notice:', err)
  }

  return newCustomer
}

export function updateCustomer(id, updates) {
  const index = store.customers.findIndex(c => c.id === id)
  if (index === -1) return null

  const customer = store.customers[index]
  
  if (updates.totalCost !== undefined || updates.amountPaid !== undefined) {
    const total = updates.totalCost !== undefined ? Number(updates.totalCost) : customer.totalCost
    const paid = updates.amountPaid !== undefined ? Number(updates.amountPaid) : customer.amountPaid
    updates.balanceOwing = Math.max(0, total - paid)
    if (paid >= total && total > 0) {
      updates.paymentStatus = 'paid'
    } else if (paid > 0) {
      updates.paymentStatus = 'partial'
    } else {
      updates.paymentStatus = 'pending'
    }
  }

  if (updates.installationStatus && updates.installationStatus !== customer.installationStatus) {
    if (updates.installationStatus === 'Installation Completed' || updates.installationStatus === 'Tested & Verified') {
      if (!customer.installedAt) {
        updates.installedAt = new Date().toISOString()
      }
    }
  }

  store.customers[index] = { ...customer, ...updates }
  persistStore()

  // Background sync to Supabase
  try {
    const dbUpdates = {}
    if (updates.totalCost !== undefined) dbUpdates.total_cost = updates.totalCost
    if (updates.amountPaid !== undefined) dbUpdates.amount_paid = updates.amountPaid
    if (updates.installationStatus !== undefined) dbUpdates.installation_status = updates.installationStatus
    if (updates.installedAt !== undefined) dbUpdates.installed_at = updates.installedAt
    if (updates.engineerName !== undefined) dbUpdates.engineer_name = updates.engineerName

    supabase.from('customers').update(dbUpdates).eq('id', id).then(({ error }) => {
      if (error) console.warn('Supabase customer update notice:', error)
    })
  } catch (err) {
    console.warn('Customer update Supabase dispatch notice:', err)
  }

  return store.customers[index]
}

export function addCustomerReport(customerId, reportData) {
  const customer = store.customers.find(c => c.id === customerId)
  if (!customer) return null

  if (!customer.reports) customer.reports = []

  const newReport = {
    id: `REP-${Date.now()}`,
    author: reportData.author || store.auth.currentUser.name,
    authorRole: reportData.authorRole || store.auth.currentUser.role,
    title: reportData.title || 'Report Entry',
    content: reportData.content || '',
    date: new Date().toISOString()
  }

  customer.reports.unshift(newReport)
  persistStore()

  try {
    supabase.from('customer_reports').insert([{
      customer_id: customerId,
      title: newReport.title,
      content: newReport.content,
      author: newReport.author,
      author_role: newReport.authorRole
    }]).then(({ error }) => {
      if (error) console.warn('Supabase report insert notice:', error)
    })
  } catch (err) {
    console.warn('Report Supabase dispatch notice:', err)
  }

  return newReport
}

export function addCustomerPhoto(customerId, category, photoUrl) {
  const customer = store.customers.find(c => c.id === customerId)
  if (!customer) return false

  if (!customer.photos) {
    customer.photos = { customerPhotos: [], housePhotos: [], setupPhotos: [] }
  }

  if (category === 'customer') {
    customer.photos.customerPhotos.push(photoUrl)
  } else if (category === 'house') {
    customer.photos.housePhotos.push(photoUrl)
  } else if (category === 'setup') {
    customer.photos.setupPhotos.push(photoUrl)
  }
  persistStore()

  try {
    supabase.from('customer_photos').insert([{
      customer_id: customerId,
      category,
      photo_url: photoUrl
    }]).then(({ error }) => {
      if (error) console.warn('Supabase photo insert notice:', error)
    })
  } catch (err) {
    console.warn('Photo Supabase dispatch notice:', err)
  }

  return true
}

// --- Feedback Actions ---

export function submitFeedback(feedbackData) {
  const newFeedback = {
    id: `FB-${String(store.feedbacks.length + 1).padStart(3, '0')}`,
    category: feedbackData.category || 'solar', // 'solar' | 'estate'
    customerName: feedbackData.customerName || 'Anonymous Client',
    rating: Number(feedbackData.rating) || 5,
    package: feedbackData.package || '',
    location: feedbackData.location || 'Asaba, Nigeria',
    title: feedbackData.title || '',
    review: feedbackData.review || '',
    isPublished: false, // Default is false so only admins can read and choose to publish
    createdAt: new Date().toISOString()
  }

  store.feedbacks.unshift(newFeedback)
  persistStore()

  try {
    supabase.from('feedbacks').insert([{
      category: newFeedback.category,
      customer_name: newFeedback.customerName,
      rating: newFeedback.rating,
      package: newFeedback.package,
      location: newFeedback.location,
      title: newFeedback.title,
      review: newFeedback.review,
      is_published: false
    }]).then(({ error }) => {
      if (error) console.warn('Supabase feedback insert notice:', error)
    })
  } catch (err) {
    console.warn('Feedback Supabase dispatch notice:', err)
  }

  return newFeedback
}

export function toggleFeedbackPublish(feedbackId) {
  const fb = store.feedbacks.find(f => f.id === feedbackId)
  if (!fb) return null
  fb.isPublished = !fb.isPublished
  persistStore()

  try {
    supabase.from('feedbacks')
      .update({ is_published: fb.isPublished })
      .eq('id', feedbackId)
      .then(({ error }) => {
        if (error) console.warn('Supabase toggle publish notice:', error)
      })
  } catch (err) {
    console.warn('Publish Supabase dispatch notice:', err)
  }

  return fb
}

export function deleteFeedback(feedbackId) {
  const index = store.feedbacks.findIndex(f => f.id === feedbackId)
  if (index !== -1) {
    store.feedbacks.splice(index, 1)
    persistStore()

    try {
      supabase.from('feedbacks')
        .delete()
        .eq('id', feedbackId)
        .then(({ error }) => {
          if (error) console.warn('Supabase delete feedback notice:', error)
        })
    } catch (err) {
      console.warn('Delete feedback Supabase dispatch notice:', err)
    }

    return true
  }
  return false
}

// Get only published feedbacks for public display
export function getPublishedFeedbacks(category = null) {
  return store.feedbacks.filter(f => {
    if (!f.isPublished) return false
    if (category && f.category !== category) return false
    return true
  })
}

// --- Celebration & Messaging Utilities ---

export function getTodayBirthdays() {
  return store.customers.filter(c => isTodayMonthDay(c.dob))
}

export function getTodayAnniversaries() {
  return store.customers.filter(c => isTodayMonthDay(c.weddingAnniversary))
}

export function getUpcomingBirthdays(days = 7) {
  return store.customers.filter(c => isUpcomingDays(c.dob, days))
}

export function getUpcomingAnniversaries(days = 7) {
  return store.customers.filter(c => isUpcomingDays(c.weddingAnniversary, days))
}

// Generate WhatsApp direct link with Nigerian number handling and pre-filled message
export function createWhatsAppMessageLink(customer, type = 'birthday') {
  if (!customer || !customer.phone) return '#'
  
  // Format phone to Nigerian international format (e.g., 0813... -> 234813...)
  let cleanPhone = customer.phone.replace(/[^0-9]/g, '')
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '234' + cleanPhone.slice(1)
  } else if (!cleanPhone.startsWith('234')) {
    cleanPhone = '234' + cleanPhone
  }

  let text = ''
  if (type === 'birthday') {
    text = `Dear ${customer.fullName}, \n\nHappy Birthday from all of us at IKEBEST Group! 🎂🎉\n\nWe celebrate you today and wish you sound health, unending joy, and greater accomplishments in the year ahead.\n\nThank you for being a valued part of the IKEBEST family!\n\nWarm regards,\nManagement, IKEBEST Group\nSolar • CCTV • Real Estate • Smart Home\n📞 08139522490`
  } else if (type === 'anniversary') {
    text = `Happy Wedding Anniversary to ${customer.fullName} and your spouse! 🥂💍\n\nMay your home continue to flourish with love, peace, and abundance. We are honoured to have you with us at IKEBEST Group.\n\nHappy celebration!\n\nWarm regards,\nManagement, IKEBEST Group\n📞 08139522490`
  } else if (type === 'reminder') {
    text = `Hello ${customer.fullName},\n\nThis is a friendly update from IKEBEST Group regarding your ${customer.package} (Customer ID: ${customer.id}).\n\nYour current outstanding balance is ${formatNaira(customer.balanceOwing)}.\n\nIf you have any questions or need installation updates, please reply to this message or call our support on 08139522490.\n\nThank you!`
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
}

export function logCelebrationSent(customer, type, channel = 'WhatsApp') {
  const log = {
    id: `LOG-${Date.now()}`,
    customerId: customer.id,
    customerName: customer.fullName,
    type,
    channel,
    timestamp: new Date().toISOString(),
    status: 'Sent Successfully'
  }
  store.celebrationLogs.unshift(log)
  persistStore()
  return log
}

// Role Switching Helper for Testing
export function setAuthRole(role) {
  if (store.auth && store.auth.currentUser) {
    store.auth.currentUser.role = role
    if (role === 'admin') {
      store.auth.currentUser.name = 'Onyeze ICT Admin'
    } else if (role === 'staff') {
      store.auth.currentUser.name = 'Blessing (Front Desk Staff)'
    } else if (role === 'engineer') {
      store.auth.currentUser.name = 'Engr. Chukwudi (Field Lead)'
    }
    persistStore()
  }
}
