<script setup lang="ts">
import { Upload } from "@element-plus/icons-vue";
import { fileChunkMerge, fileChunkUpload, fileChunkUploadCheck } from "@/api/common.ts";
import { computed, reactive, ref } from "vue";
import { CHUNK_SIZE } from "@/utils/base.ts";
import SparkMd5 from 'spark-md5'
import { typeOf } from "@/utils/object-util.ts";

const emit = defineEmits(['refresh']);
const state = reactive({
  currentStage: 'a',
  dictStage: {
    a: '等待选择文件',
    b: '文件扫描中',
    c: '文件上传中',
    d: '文件上传完成',
  },
  chunkNum: 0,
  chunkTotal: 0,
  fileMd5: '',
  fileSize: 0
})
const inp = ref(null)

const isDisabled = computed(() => {
  return ['a', 'd'].indexOf(state.currentStage) === -1
})

const befUpload = () => {
  inp.value.click()
}
const upload = async (e: HTMLInputElement) => {
  state.currentStage = 'b'
  const file: File = e.target.files[0]
  state.chunkTotal = Math.ceil(file.size / CHUNK_SIZE)
  const chunks = createChunks(file);
  state.fileMd5 = await hash(chunks);
  inp.value.value = ''

  // 上传前检查
  const res1 = await fileChunkUploadCheck({
    fileName: file.name,
    fileMd5: state.fileMd5,
    fileSize: state.fileSize,
    chunkNum: state.chunkTotal
  })
  if (typeOf(res1.data) === 'string') {
    uploadSuccess()
    return
  }

  // 开始分片上传
  state.currentStage = 'c'
  const res2 = await startUpload(res1.data.currentChunkNum, chunks)

  // 分片上传完成，合并分片
  state.currentStage = 'd'
  const res3 = await fileChunkMerge({
    fileMd5: state.fileMd5
  });

  // 分片合并完成
  uploadSuccess()
}
/**
 * 创建分片
 * @param file
 */
const createChunks = (file: File): Blob[] => {
  let res = []
  for (let i = 0; i < file.size; i += CHUNK_SIZE) {
    res.push(file.slice(i, i + CHUNK_SIZE))
  }
  return res
}
/**
 * 获取文件md5
 * 使用增量算法
 * @param chunks
 */
const hash = (chunks: Blob[]): Promise<string> => {
  return new Promise((resolve) => {
    state.fileSize = 0
    const spark = new SparkMd5();
    const _read = (i: number) => {
      if (i >= chunks.length) {
        state.chunkNum = 0
        resolve(spark.end())
        return
      }
      const blob = chunks[i];
      state.chunkNum = i + 1
      state.fileSize += blob.size
      const reader = new FileReader();
      reader.onload = e => {
        const bytes = e.target.result;
        spark.append(bytes)
        _read(i + 1)
      }
      reader.readAsArrayBuffer(blob)
    }
    _read(0)
  })
}
/**
 * 开始分片上传
 * @param index
 * @param chunks
 */
const startUpload = (index: number, chunks: Blob[]): Promise<null> => {
  return new Promise((resolve) => {
    const _upload = (i) => {
      // 如果上传完成
      if (i > chunks.length) {
        resolve(null)
        return
      }
      state.chunkNum = i
      const blob = chunks[i - 1];
      const fd = new FormData()
      fd.append('file', blob)
      // 上传当前分片
      const obj = {
        fileMd5: state.fileMd5,
        orderNum: i,
        file: fd
      }
      fileChunkUpload(obj).then(res2 => {
        _upload(i + 1)
      })
    }
    _upload(index)
  })
}
/**
 * 上传完成
 */
const uploadSuccess = () => {
  state.currentStage = 'd'
  state.chunkNum = 0
  emit('refresh')
}
</script>

<template>
  <div class="el">
    <el-button :disabled="isDisabled" type="primary" :icon="Upload" @click="befUpload">上传文件</el-button>
    <span v-if="isDisabled">{{ `${state.dictStage[state.currentStage]}` }}</span>
    <el-progress
        style="width: 300px;"
        v-if="isDisabled" :percentage="Number(((state.chunkNum/state.chunkTotal)*100).toFixed(2))"
        :stroke-width="15"
        striped
        striped-flow
    />
    <input ref="inp" type="file" v-show="false" @change="upload"/>
  </div>
</template>

<style scoped lang="scss">
.el {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>