import { createRouter, createWebHistory } from 'vue-router'
import TranslateView from '../views/TranslateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'translate',
      component: TranslateView
    },
  ]
})

export default router
