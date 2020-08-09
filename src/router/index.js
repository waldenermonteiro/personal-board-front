import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/InitialLayout.vue'),
    children: [{ name: 'Initial View', path: '', component: () => import('../pages/user/Index.vue') }]
  },
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [{ name: 'Frames', path: '', component: () => import('../pages/frames/List.vue') }]
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

export default router
