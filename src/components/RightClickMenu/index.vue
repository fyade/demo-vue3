<script setup lang="ts">
import { reactive } from "vue";
import eventBus from "@/utils/event-bus.ts";

interface menusT {
  name: string
  operate: Function
}

class stateReaC {
  show: boolean = false
  left: number = 0
  top: number = 0
}

const stateRea = reactive(new stateReaC())
defineProps({
  menus: {
    type: Array as () => menusT[][],
    default: () => []
  }
})

const rightClick = (e: PointerEvent) => {
  eventBus.emit('right-click-close')
  stateRea.left = e.clientX
  stateRea.top = e.clientY
  stateRea.show = true
}
const handlerRightClick = (func: Function) => {
  stateRea.show = false
  func()
}
const hiddenRightClick = () => {
  stateRea.show = false
}
const leftClick = () => {
  eventBus.emit('right-click-close')
}

eventBus.on('right-click-close', hiddenRightClick)
</script>

<template>
  <div class="right-click-container" @contextmenu.prevent.stop="rightClick" @click="leftClick">
    <slot></slot>
    <div
        class="right-container"
        :style="{
          left: `${stateRea.left}px`,
          top: `${stateRea.top}px`
        }"
        v-if="stateRea.show"
    >
      <div v-for="(item, index) in menus" :key="index">
        <div class="line" v-if="item.length > 1 && index !== 0"></div>
        <div class="menu" v-for="(itm, i) in item" :key="itm" @click="handlerRightClick(itm.operate)">
          {{ itm.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.right-click-container {
  > .right-container {
    position: fixed;
    box-shadow: 0 2px 10px 3px #ddd;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;

    > div {
      > .line {
        margin: 4px 0;
        height: 2px;
        background-color: #ddd;
      }

      > .menu {
        padding: 0 10px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;

        &:hover {
          background-color: #eee;
        }
      }
    }
  }
}
</style>