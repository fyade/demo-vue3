import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: 'file-full',
        component: () => import('@/views/FileFull/index.vue')
      },
      {
        path: 'file-frag',
        component: () => import('@/views/FileFrag/index.vue')
      },
      {
        path: 'image-crop',
        component: () => import('@/views/ImageCrop/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
