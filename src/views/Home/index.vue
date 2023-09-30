<script setup lang="ts">
import router from "@/router";

const handleSelect = (key: string, keyPath: string[]) => {
  router.push(keyPath.reduce((a, b) => a + b))
}
</script>

<template>
  <!--<div class="nav">-->
  <!--  <router-link to="/file-full">文件整体上传</router-link>-->
  <!--  <router-link to="/file-frag">文件分片上传</router-link>-->
  <!--</div>-->
  <el-menu
      mode="horizontal"
      @select="handleSelect"
  >
    <el-menu-item index="/file-full">文件整体上传</el-menu-item>
    <el-menu-item index="/file-frag">文件分片上传</el-menu-item>
  </el-menu>
  <br/>

  <router-view/>
</template>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 80px;
}
</style>