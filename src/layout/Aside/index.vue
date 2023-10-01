<script setup lang="ts">
import router from "@/router/index.ts";
import { rubbishParams } from "@/utils/base.ts";

const handleSelect = (key: string, keyPath: string[]) => {
  rubbishParams(key)
  router.push(keyPath.join(''))
}
</script>

<template>
  <el-menu
      router
      :unique-opened="true"
      @select="handleSelect"
  >
    <el-menu-item index="/">主页</el-menu-item>
    <el-menu-item index="/file-full">文件整体上传</el-menu-item>
    <el-menu-item index="/file-frag">文件分片上传</el-menu-item>
    <el-menu-item index="/image-crop">图片裁切上传</el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
</style>