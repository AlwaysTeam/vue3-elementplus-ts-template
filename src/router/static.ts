import type { RouteRecordRaw } from 'vue-router'

const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
    },
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'About',
    },
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
    },
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
]

export { staticRoutes }
