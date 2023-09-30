import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home/index.vue'),
    children: [
      {
        path: 'file-full',
        component: () => import('@/views/FileFull/index.vue')
      },
      {
        path: 'file-frag',
        component: () => import('@/views/FileFrag/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
