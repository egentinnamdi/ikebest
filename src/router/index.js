import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/solar-energy', name: 'solar', component: () => import('../views/SolarView.vue') },
  { path: '/cctv-security', name: 'cctv', component: () => import('../views/CCTVView.vue') },
  { path: '/real-estate', name: 'estate', component: () => import('../views/EstateView.vue') },
  { path: '/smart-home', name: 'smart-home', component: () => import('../views/SmartHomeView.vue') },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
