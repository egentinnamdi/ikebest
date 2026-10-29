import { reactive } from 'vue'

const STORAGE_KEY = 'ikebest_crm_data_v1'

// Initial seed data if nothing is saved in localStorage
const defaultInitialData = {
  feedbacks: [
    {
      id: 'FB-001',
      category: 'solar',
      customerName: 'Chief Emmanuel Okon',
      rating: 5,
      package: '10kVA Lithium Hybrid Solar System',
      location: 'GRA, Asaba, Delta State',
      title: 'Zero blackouts since installation!',
      review: 'IKEBEST installed our 10kVA system 6 months ago. Our home and office run smoothly 24/7 without turning on our diesel generator once. Top notch engineering and after-sales support!',
      isPublished: true,
      createdAt: '2026-09-15T10:30:00Z',
    },
    {
      id: 'FB-002',
      category: 'solar',
      customerName: 'Dr. (Mrs) Ngozi Umeh',
      rating: 5,
      package: '5kVA Smart Inverter Package',
      location: 'Okpanam Road, Asaba',
      title: 'Prompt delivery and clean wiring',
      review: 'The engineers were very professional. The cabling and battery rack setup in my utility room looks neat and tidy. The mobile monitoring app is also very convenient.',
      isPublished: true,
      createdAt: '2026-10-02T14:15:00Z',
    },
    {
      id: 'FB-003',
      category: 'estate',
      customerName: 'Barrister Kenneth Obi',
      rating: 5,
      package: '4-Bedroom Fully Detached Duplex',
      location: 'IKEBEST Prime Court, Asaba',
      title: 'Solid building structure and genuine title documents',
      review: 'Purchasing property in Delta State can be risky with title issues, but IKEBEST proved to be completely genuine. Survey, C of O, and handover were fast and seamless.',
      isPublished: true,
      createdAt: '2026-08-20T09:00:00Z',
    },
    {
      id: 'FB-004',
      category: 'estate',
      customerName: 'Mr. & Mrs. Adebayo Davies',
      rating: 4,
      package: '2 Commercial Plots of Land',
      location: 'Ibusa Express Corridor',
      title: 'Great investment location',
      review: 'Document verification was smooth and perimeter fencing was completed promptly by their team. Very happy with the appreciation rate so far.',
      isPublished: false, // Pending admin review
      createdAt: '2026-10-21T11:45:00Z',
    },
    {
      id: 'FB-005',
      category: 'solar',
      customerName: 'Engr. Victor Alabi',
      rating: 5,
      package: '3.5kVA Solar Power Bundle',
      location: 'Warri, Delta State',
      title: 'Reliable power for my home office',
      review: 'The system has been powering my desktop workstations and refrigerators effortlessly. The staff were very courteous and guided me on energy management.',
      isPublished: false,
      createdAt: '2026-10-25T16:20:00Z',
    }
  ],
  customers: [
    {
      id: 'IKB-2026-001',
      fullName: 'Chief Emmanuel Okon',
      phone: '08033221144',
      email: 'emmanuel.okon@example.com',
      address: 'Plot 14, Commissioners Quarters, GRA, Asaba',
      state: 'Delta State',
      dob: '1978-10-28', // Set to today's date for live celebration testing!
      weddingAnniversary: '2008-11-14',
      package: '10kVA Lithium Hybrid Solar System (16 Panels, 15kWh Battery)',
      packageCategory: 'solar',
      totalCost: 8500000,
      amountPaid: 8500000,
      balanceOwing: 0,
      paymentStatus: 'paid',
      installationStatus: 'Tested & Verified',
      installedAt: '2026-09-14T17:00:00Z',
      engineerName: 'Engr. Chukwudi (Lead Solar Engineer)',
      reports: [
        {
          id: 'REP-001',
          author: 'Engr. Chukwudi',
          authorRole: 'Engineer',
          title: 'Roof Survey & Shadow Analysis',
          content: 'South-facing galvanized roof inspected. Optimal 15-degree panel tilt confirmed with 0% shading from trees.',
          date: '2026-09-10T11:00:00Z'
        },
        {
          id: 'REP-002',
          author: 'Engr. Chukwudi',
          authorRole: 'Engineer',
          title: 'Installation Complete & Load Testing',
          content: 'Mounted 16x 550W Tier-1 mono solar panels. Inverter synchronized with PHCN grid and generator bypass. Ran 2 AC units and borehole pump under full load without voltage drop.',
          date: '2026-09-14T16:30:00Z'
        }
      ],
      photos: {
        customerPhotos: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop'
        ],
        housePhotos: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDKuaXg5bWiPM2y4pJ9RyGdgdujOustxP_T_TX-MoH-lqybr0hubXM3mZ8yDuZM46kShmc1jOqYGzaFaALLm6fG1eEptXEpoRjRXywGiAkRMR47pLhbjdebRZ99RZQXA5R_Zo2vLIv3TiXmICEGM2T8ADr-26Xk6ia4kaUAF92j2lZttQagxy6j6yM6WdKsl6gCWm2k-teO8rELHjRPpF99M-Z2YvMKsCKRpX0BjXPsYIpMTc4d6_m3TrC4w0u-wfN2g-k4UEkgpdk'
        ],
        setupPhotos: [
          'https://images.unsplash.com/photo-1719848576338-9516ba7ccd8b?w=800&q=80&auto=format&fit=crop'
        ]
      },
      createdAt: '2026-09-08T10:00:00Z'
    },
    {
      id: 'IKB-2026-002',
      fullName: 'Hon. Festus Ijewere',
      phone: '08123456789',
      email: 'festus.ijewere@gmail.com',
      address: '22 Summit Road, Asaba',
      state: 'Delta State',
      dob: '1982-05-12',
      weddingAnniversary: '2012-10-28', // Set to today's date for live celebration testing!
      package: '5kVA Solar Inverter + 10kWh Tubular Battery Package',
      packageCategory: 'solar',
      totalCost: 4800000,
      amountPaid: 3200000,
      balanceOwing: 1600000,
      paymentStatus: 'partial',
      installationStatus: 'Installation in Progress',
      installedAt: null,
      engineerName: 'Engr. David O.',
      reports: [
        {
          id: 'REP-003',
          author: 'Engr. David O.',
          authorRole: 'Engineer',
          title: 'Roof Rail Mounting Completed',
          content: 'Installed heavy-duty aluminum mounting rails on client rooftop. Running 6mm DC cable down to inverter station.',
          date: '2026-10-26T15:00:00Z'
        },
        {
          id: 'REP-004',
          author: 'Admin Office',
          authorRole: 'Staff',
          title: 'Payment Reminder & Milestone',
          content: 'Deposit of ₦3.2m confirmed. Balance of ₦1.6m is due upon final commissioning and handover next week.',
          date: '2026-10-27T09:30:00Z'
        }
      ],
      photos: {
        customerPhotos: [
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop'
        ],
        housePhotos: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDw-C775UX2Hc1-x0GSyuPOIprYgdPNpu15AKM28v-Wl6UIXDYFMaaOvj9iP0aO4-dwsi2df6SP2l6YZvhrOZnyHeFXvW7SCXwLCiUDNZMKC_CoqI6ZExsW7e6zvyH4PkJavv6pvVNHCqXpcR5gyB_2LpuXUlqNBnwEeuZnkFCHIi35Nfz7Ja76gLcyWn5RIqxhtgwzKRy6y5SIegGbf-jHHW9RGLfToFCNxBrdGIVE-2pJRw4ZeYlRzzurdrp-828MEMJJamJMlN8'
        ],
        setupPhotos: []
      },
      createdAt: '2026-10-20T12:00:00Z'
    },
    {
      id: 'IKB-2026-003',
      fullName: 'Madam Beatrice Nwaeze',
      phone: '08099887766',
      email: 'beatrice.nwaeze@yahoo.com',
      address: 'Plot 7, IKEBEST Palm Gardens Estate, Okpanam',
      state: 'Delta State',
      dob: '1970-12-04',
      weddingAnniversary: '1995-04-18',
      package: 'Executive 3-Bedroom Detached Bungalow (Off-Plan)',
      packageCategory: 'estate',
      totalCost: 35000000,
      amountPaid: 20000000,
      balanceOwing: 15000000,
      paymentStatus: 'partial',
      installationStatus: 'Installation in Progress',
      installedAt: null,
      engineerName: 'Arc. Sunday (Site Supervisor)',
      reports: [
        {
          id: 'REP-005',
          author: 'Arc. Sunday',
          authorRole: 'Engineer',
          title: 'Roofing & Plastering Stage Reached',
          content: 'Carcass completed. German floor and block work fully cured. Stone-coated roofing sheets delivered and currently being installed.',
          date: '2026-10-22T14:00:00Z'
        }
      ],
      photos: {
        customerPhotos: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop'
        ],
        housePhotos: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDw-C775UX2Hc1-x0GSyuPOIprYgdPNpu15AKM28v-Wl6UIXDYFMaaOvj9iP0aO4-dwsi2df6SP2l6YZvhrOZnyHeFXvW7SCXwLCiUDNZMKC_CoqI6ZExsW7e6zvyH4PkJavv6pvVNHCqXpcR5gyB_2LpuXUlqNBnwEeuZnkFCHIi35Nfz7Ja76gLcyWn5RIqxhtgwzKRy6y5SIegGbf-jHHW9RGLfToFCNxBrdGIVE-2pJRw4ZeYlRzzurdrp-828MEMJJamJMlN8'
        ],
        setupPhotos: []
      },
      createdAt: '2026-07-15T09:00:00Z'
    },
    {
      id: 'IKB-2026-004',
      fullName: 'Alhaji Musa Danjuma',
      phone: '08187766554',
      email: 'musa.danjuma@gmail.com',
      address: 'Km 5, Asaba-Benin Expressway, Delta State',
      state: 'Delta State',
      dob: '1985-03-20',
      weddingAnniversary: null,
      package: 'Commercial 16-Channel 4K CCTV + Perimeter Alarm System',
      packageCategory: 'cctv',
      totalCost: 3200000,
      amountPaid: 3200000,
      balanceOwing: 0,
      paymentStatus: 'paid',
      installationStatus: 'Tested & Verified',
      installedAt: '2026-10-18T18:00:00Z',
      engineerName: 'Engr. Emeka (Security Systems)',
      reports: [
        {
          id: 'REP-006',
          author: 'Engr. Emeka',
          authorRole: 'Engineer',
          title: 'CCTV Online Handover',
          content: 'All 16 cameras operational. NVR linked to mobile viewing on 4 executive smartphones. Night color vision tested.',
          date: '2026-10-18T17:45:00Z'
        }
      ],
      photos: {
        customerPhotos: [],
        housePhotos: [],
        setupPhotos: []
      },
      createdAt: '2026-10-10T11:00:00Z'
    }
  ],
  celebrationLogs: [
    {
      id: 'LOG-001',
      customerId: 'IKB-2026-001',
      customerName: 'Chief Emmanuel Okon',
      type: 'birthday',
      channel: 'WhatsApp',
      timestamp: '2026-10-28T08:00:00Z',
      status: 'Sent Automatically'
    }
  ],
  auth: {
    currentUser: {
      name: 'Onyeze ICT Admin',
      role: 'admin', // 'admin' | 'staff' | 'engineer'
      email: 'ikebest316@gmail.com'
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

// Generate Next Customer ID (e.g., IKB-2026-005)
export function generateNextCustomerId() {
  const year = new Date().getFullYear()
  const currentCount = store.customers.length + 1
  const sequence = String(currentCount).padStart(3, '0')
  return `IKB-${year}-${sequence}`
}

// --- Customer Management Actions ---

export function getCustomerById(id) {
  if (!id) return null
  const cleaned = id.trim().toLowerCase()
  return store.customers.find(c => c.id.toLowerCase() === cleaned) || null
}

export function searchCustomers(query) {
  if (!query) return store.customers
  const q = query.trim().toLowerCase()
  return store.customers.filter(c =>
    c.id.toLowerCase().includes(q) ||
    c.fullName.toLowerCase().includes(q) ||
    c.phone.includes(q) ||
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
  return newFeedback
}

export function toggleFeedbackPublish(feedbackId) {
  const fb = store.feedbacks.find(f => f.id === feedbackId)
  if (!fb) return null
  fb.isPublished = !fb.isPublished
  persistStore()
  return fb
}

export function deleteFeedback(feedbackId) {
  const index = store.feedbacks.findIndex(f => f.id === feedbackId)
  if (index !== -1) {
    store.feedbacks.splice(index, 1)
    persistStore()
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
