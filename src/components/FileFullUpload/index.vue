<script setup lang="ts">
import { Upload } from "@element-plus/icons-vue";
import { fileFullUpload } from "@/api/common.ts";
import { ref } from "vue";

const emit = defineEmits(['refresh']);
const isDisabled = ref(false)
const inp = ref(null)

const befUpload = () => {
  inp.value.click()
}
const upload = (e: HTMLInputElement) => {
  isDisabled.value = true
  const file = e.target.files[0]
  let fd = new FormData();
  fd.append('file', file)
  fileFullUpload(fd).then(res => {
    uploadSuccess()
  }).finally(() => {
    fd.delete('file')
    isDisabled.value = false
  })
}
/**
 * 上传完成
 */
const uploadSuccess = () => {
  emit('refresh')
}
</script>

<template>
  <el-button :disabled="isDisabled" type="primary" :icon="Upload" @click="befUpload">上传文件</el-button>
  <input ref="inp" type="file" v-show="false" @change="upload"/>
</template>

<style scoped lang="scss">
</style>