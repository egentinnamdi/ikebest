import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Global scroll-reveal animation directive
app.directive('animate', {
  mounted(el, binding) {
    const dir = binding.value || 'up'
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0
    const xmap = { left: '-40px', right: '40px', up: '0', down: '0' }
    const ymap = { up: '35px', down: '-35px', left: '0', right: '0' }
    el.style.opacity = '0'
    el.style.transform = `translate(${xmap[dir]}, ${ymap[dir]})`
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translate(0, 0)'
        obs.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    obs.observe(el)
  }
})

app.use(router).mount('#app')
