import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('../views/userLogin.vue'),
  },
  {
    path: '/home',
    name: '/home',
    component: () => import('../views/HomeView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
