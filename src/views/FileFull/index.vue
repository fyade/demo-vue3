<script setup lang="ts">
import FileFullUpload from '@/components/FileFullUpload/index.vue'
import { onMounted, reactive } from "vue";
import { selFileFullUploadList } from "@/api/common.ts";
import { publicDict } from "@/utils/base.ts";
import { getFileBaseUrl } from "@/utils/env.ts";
import { downloadFullFile } from "@/utils/file.ts";

const state = reactive({
  list: [],
  total: 0,
  loaded: false,
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderByDto: [
      {num: 0, field: 'createTime', isAsc: false},
    ]
  },
  dict1: {
    ...publicDict,
    fileName: '原文件名',
    fileNewName: '现文件名',
    fileMd5: '文件md5',
    whetherFirst: '是否第一上传人'
  }
})

onMounted(() => {
  getInfo()
})

const getInfo = () => {
  state.loaded = false
  selFileFullUploadList(state.queryParams).then(res => {
    state.list = res.rows
    state.total = res.total
    state.loaded = true
  })
}
const onSortChange = ({column, prop, order}) => {
  if (order) {
    // 排序
    state.queryParams.orderByDto = [{
      num: 0,
      field: prop,
      isAsc: order === 'ascending'
    }]
    // const item = state.queryParams.orderByDto.find(item => item.field === prop);
    // if (item) {
    //   item.isAsc = order === 'ascending'
    // } else {
    //   state.queryParams.orderByDto.push({
    //     num: state.queryParams.orderByDto.sort((a, b) => b.num - a.num)[0]?.num + 1 || 0,
    //     field: prop,
    //     isAsc: order === 'ascending'
    //   })
    // }
  } else {
    // 取消排序
    state.queryParams.orderByDto.splice(state.queryParams.orderByDto.findIndex(item => item.field === prop), 1)
  }
  getInfo()
}
const downloadFile = row => {
  downloadFullFile(getFileBaseUrl() + row.fileNewName, row.fileName)
}
</script>

<template>
  <FileFullUpload :size="1024*1024*10" @upload-success="getInfo"/>

  <el-table
      style="width: 100%"
      v-loading="!state.loaded"
      :data="state.list"
      stripe
      @sortChange="onSortChange"
  >
    <el-table-column prop="id" :label="state.dict1['id']" width="180"/>
    <el-table-column prop="fileName" :label="state.dict1['fileName']" width="180"/>
    <el-table-column prop="fileNewName" :label="state.dict1['fileNewName']" width="180"/>
    <el-table-column prop="fileMd5" :label="state.dict1['fileMd5']" width="180"/>
    <el-table-column prop="remark" :label="state.dict1['remark']" width="150"/>
    <el-table-column prop="whetherFirst" sortable="custom" :label="state.dict1['whetherFirst']" width="100"/>
    <el-table-column prop="createBy" :label="state.dict1['createBy']" width="100"/>
    <el-table-column prop="createTime" sortable="custom" :label="state.dict1['createTime']" width="200"/>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{row}">
        <el-button v-no-more-click link type="primary" size="small" @click="downloadFile(row)">下载</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
      v-model:current-page="state.queryParams.pageNum"
      v-model:page-size="state.queryParams.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="state.total"
      @size-change="getInfo"
      @current-change="getInfo"
  />
</template>

<style scoped lang="scss">

</style>