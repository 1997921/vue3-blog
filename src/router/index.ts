import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/home',
    name: '/home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/floorView',
    name: '/floorView',
    component: () => import('../views/floorView.vue'),
  },
  {
    path: '/tableView',
    name: '/tableView',
    component: () => import('../views/tableView.vue'),
  },
  {
    path: '/about',
    name: '/about',
    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
