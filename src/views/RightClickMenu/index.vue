<script setup lang="ts">
import RightClickMenu from '@/components/RightClickMenu/index.vue'

const menus1 = [
  [
    {
      name: '操作1',
      operate: () => {
        console.log('操作1')
      }
    },
    {
      name: '操作2',
      operate: () => {
        console.log('操作2')
      }
    }
  ]
]
const menus2 = [
  [
    {
      name: '操作3',
      operate: () => {
        console.log('操作3')
      }
    },
    {
      name: '操作4',
      operate: () => {
        console.log('操作4')
      }
    }
  ]
]
const menus3 = [
  [
    {
      name: '操作5',
      operate: () => {
        console.log('操作5')
      }
    },
    {
      name: '操作6',
      operate: () => {
        console.log('操作6')
      }
    }
  ],
  [
    {
      name: '操作7',
      operate: () => {
        console.log('操作7')
      }
    },
    {
      name: '操作8',
      operate: () => {
        console.log('操作8')
      }
    },
    {
      name: '操作9',
      operate: () => {
        console.log('操作9')
      }
    }
  ],
  [
    {
      name: '操作10',
      operate: () => {
        console.log('操作10')
      }
    },
    {
      name: '操作11',
      operate: () => {
        console.log('操作11')
      }
    }
  ]
]
</script>

<template>
  <RightClickMenu :menus="menus1">
    <div style="height: 100px;background: #ddd;">内容1</div>
  </RightClickMenu>
  <RightClickMenu :menus="menus2">
    <div style="height: 100px;background: #aaa;">内容2</div>
    <RightClickMenu :menus="menus3">
      <div style="height: 100px;background: #ddd;">内容3</div>
    </RightClickMenu>
  </RightClickMenu>
</template>

<style scoped lang="scss">

</style>