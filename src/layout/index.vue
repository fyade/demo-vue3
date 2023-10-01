<script setup lang="ts">
import Aside from './Aside/index.vue'
import Header from './Header/index.vue'
import { useGlobalStore } from "@/store/module/global.ts";

const globalStore = useGlobalStore();
</script>

<template>
  <div class="layout">
    <el-container class="container">
      <el-aside class="aside" :style="{
        width: globalStore.getShowMenu ? '200px' : '0'
      }">
        <Aside/>
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;

  .container {
    width: 100%;
    height: 100%;

    .aside {
      height: 100%;
      transition: all .2s ease;

      > * {
        height: 100%;
        overflow: auto;
      }
    }

    .header {
      padding: initial;
    }
  }
}
</style>