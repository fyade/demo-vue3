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
        component: () => import('@/views/FileFullUpload/index.vue')
      },
      {
        path: 'file-frag',
        component: () => import('@/views/FileFragUpload/index.vue')
      },
      {
        path: 'image-crop',
        component: () => import('@/views/ImageCrop/index.vue')
      },
      {
        path: 'waterfall-flow',
        component: () => import('@/views/WaterfallFlow/index.vue')
      },
      {
        path: 'right-click-menu',
        component: () => import('@/views/RightClickMenu/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
