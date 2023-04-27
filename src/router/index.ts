import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Import Components
import HomeView from '../views/HomeView.vue'
import store from '@/store'

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
  { path: '/contact', component: HomeView, meta: { requireAuth: true } },
  { path: '/order', component: HomeView, meta: { requireAuth: true } },
  { path: '/login', component: () => import('../views/auth/BaseAuthView.vue') },
  { path: '/registration', component: () => import('../views/auth/BaseAuthView.vue') }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
})
router.beforeEach((to, _, next) => {
  if (to.meta.requireAuth && !store.getters['auth/isAuthenticated']) {
    store.commit('auth/showGuardAlert', true)
    next('/login')
  } else {
    next()
  }
})

export default router
