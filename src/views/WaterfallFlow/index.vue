<script setup lang="ts">
import { selFileFullUploadList } from "@/api/common.ts";
import { onMounted, reactive, ref } from "vue";
import { getFileBaseUrl } from "@/utils/env.ts";
import { ElMessage } from "element-plus";

const state = reactive({
  list: null,
  heights: null,
  total: 0,
  pages: 0,
  colUnm: 4,
  queryParams: {
    remark: 'pbl',
    pageNum: 1,
    pageSize: 10
  }
})
const loading = ref(false)
const config = {
  gutter: 20,
  colWidth: 200
}

onMounted(() => {
  state.list = Array.from({length: state.colUnm}, e => [])
  state.heights = new Array(state.colUnm).fill(0)
  getInfo()
})

const getInfo = () => {
  loading.value = true
  selFileFullUploadList(state.queryParams).then(res => {
    addImg(res.rows)
    state.total = res.total
    state.pages = res.pages
  }).catch(() => {
    loading.value = false
  })
}
const addImg = arr => {
  let index = 0
  const _add = () => {
    if (index >= arr.length) {
      loading.value = false
      return
    }
    const url = getFileBaseUrl() + arr[index].fileNewName;
    const img = new Image();
    img.crossOrigin = 'anonymous'
    img.src = url
    img.onload = () => {
      const newHeight = (img.height / img.width) * config.colWidth;
      const i = state.heights.indexOf(Math.min(...state.heights));
      state.list[i].push(url)
      if (state.heights[i] === 0) {
        state.heights[i] -= config.gutter
      }
      state.heights[i] += (config.gutter + newHeight)
      index++
      _add()
    }
  }
  _add()
}
const loadMore = () => {
  if (state.queryParams.pageNum >= state.pages) {
    return ElMessage.warning('没有更多了')
  }
  state.queryParams.pageNum++
  getInfo()
}
</script>

<template>
  <div class="imgArea" v-if="state.total>0" :style="{
    gap: `${config.gutter}px`
  }">
    <div v-for="item in state.colUnm" :key="item" :style="{
      width: `${config.colWidth}px`,
      gap: `${config.gutter}px`
    }">
      <div v-for="(itm, index) in state.list[item-1]" :key="index" :style="{
      }">
        <img :src="itm"/>
      </div>
    </div>
  </div>
  <div class="loadMore">
    <el-button :disabled="loading" type="primary" plain @click="loadMore">加载更多</el-button>
  </div>
</template>

<style scoped lang="scss">
.imgArea {
  display: flex;
  justify-content: center;

  > div {
    flex: none;
    display: flex;
    flex-direction: column;

    > div {
      > img {
        width: 100%;
        box-shadow: 0 2px 10px 3px #eee;
      }
    }
  }
}

.loadMore {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>