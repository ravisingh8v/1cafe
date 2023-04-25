import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Import Components
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { path: '/contact', component: HomeView },
  { path: '/order', component: HomeView },
  { path: '/login', component: () => import('../views/auth/UserAuth.vue') },
  { path: '/registration', component: () => import('../views/auth/UserAuth.vue') }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
})

export default router
