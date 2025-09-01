import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes } from './static'

const { VITE_TITLE } = import.meta.env

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ${VITE_TITLE}`
  next()
})

router.afterEach(() => {})

export default router
