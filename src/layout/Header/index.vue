<script setup lang="ts">
import { useGlobalStore } from "@/store/module/global.ts";

const size = 20

const changeShowMenu = () => {
  useGlobalStore().changeShowMenu()
}
</script>

<template>
  <div class="el">
    <div class="cur-pointer" @click="changeShowMenu">
      <el-icon v-if="useGlobalStore().getShowMenu" :size="size">
        <Fold/>
      </el-icon>
      <el-icon v-else :size="size">
        <Expand/>
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el {
  padding: 0 20px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ddd;
}
</style>