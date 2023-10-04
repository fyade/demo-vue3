<script setup lang="ts">
import { Upload } from "@element-plus/icons-vue";
import { fileFullUpload } from "@/api/common.ts";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { getSize } from "@/utils/file-util.ts";

const emit = defineEmits(['uploadSuccess']);
const props = defineProps({
  type: {
    type: Array,
    default: null
  },
  size: {
    type: Number,
    default: 1024 * 1024 * 2
  }
});
const isDisabled = ref(false)
const inp = ref(null)

const befUpload = () => {
  inp.value.click()
}
const upload = (e: HTMLInputElement) => {
  isDisabled.value = true
  const file: File = e.target.files[0]
  if (!!props.type) {
    if (props.type.indexOf(file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()) === -1) {
      isDisabled.value = false
      return ElMessage.warning(`仅支持上传${props.type.join('/')}类型的文件`)
    }
  }
  if (file.size > props.size) {
    isDisabled.value = false
    return ElMessage.warning(`仅允许上传大小不超过${getSize(props.size)}的文件`)
  }
  let fd = new FormData();
  fd.append('file', file)
  fileFullUpload(fd).then(res => {
    uploadSuccess(res.data)
  }).finally(() => {
    fd.delete('file')
    isDisabled.value = false
  })
}
/**
 * 上传完成
 */
const uploadSuccess = param => {
  emit('uploadSuccess', param)
}
</script>

<template>
  <el-button :disabled="isDisabled" type="primary" :icon="Upload" @click="befUpload">上传文件</el-button>
  <input ref="inp" type="file" v-show="false" @change="upload"/>
</template>

<style scoped lang="scss">
</style>