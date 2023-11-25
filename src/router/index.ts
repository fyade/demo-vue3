import { createRouter, createWebHistory } from 'vue-router'
import { rubbishParams } from "@/utils/base.ts";

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: '首页',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: 'file-full',
        name: '文件完整上传',
        component: () => import('@/views/FileFullUpload/index.vue')
      },
      {
        path: 'file-frag',
        name: '文件分片上传',
        component: () => import('@/views/FileFragUpload/index.vue')
      },
      {
        path: 'image-crop',
        name: '图片裁切上传',
        component: () => import('@/views/ImageCrop/index.vue')
      },
      {
        path: 'waterfall-flow',
        name: '瀑布流布局',
        component: () => import('@/views/WaterfallFlow/index.vue')
      },
      {
        path: 'right-click-menu',
        name: '自定义右键菜单',
        component: () => import('@/views/RightClickMenu/index.vue')
      },
      {
        path: 'three-js',
        name: 'three.js',
        component: () => import('@/views/ThreeJs/index.vue'),
        children: [
          {
            path: 'start',
            name: '梦开始的地方',
            component: () => import('@/views/ThreeJs/001/001.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/index.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/:W+',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  rubbishParams(to, from)
  next()
})

export default router
