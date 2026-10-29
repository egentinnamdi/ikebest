import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/solar-energy', name: 'solar', component: () => import('../views/SolarView.vue') },
  { path: '/cctv-security', name: 'cctv', component: () => import('../views/CCTVView.vue') },
  { path: '/real-estate', name: 'estate', component: () => import('../views/EstateView.vue') },
  { path: '/smart-home', name: 'smart-home', component: () => import('../views/SmartHomeView.vue') },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  { path: '/feedback', name: 'feedback', component: () => import('../views/FeedbackView.vue') },
  { path: '/customer-onboarding', name: 'customer-onboarding', component: () => import('../views/CustomerOnboardView.vue') },
  { path: '/engineer-onboarding', name: 'engineer-onboarding', component: () => import('../views/EngineerOnboardView.vue') },
  { path: '/admin/login', name: 'admin-login', component: () => import('../views/AdminLoginView.vue') },
  { path: '/admin', name: 'admin', component: () => import('../views/AdminPortalView.vue') },
  { path: '/portal', name: 'portal', component: () => import('../views/AdminPortalView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Route Guard: Require authentication for admin portal
import { isAdminAuthenticated } from '../services/supabase.js'

router.beforeEach((to, from, next) => {
  const isAdminRoute = to.path.startsWith('/admin') || to.path.startsWith('/portal')
  const isLoginPage = to.path === '/admin/login'

  if (isAdminRoute && !isLoginPage) {
    if (!isAdminAuthenticated()) {
      return next('/admin/login')
    }
  }

  // If already logged in and trying to visit login page, forward to /admin
  if (isLoginPage && isAdminAuthenticated()) {
    return next('/admin')
  }

  next()
})

export default router
