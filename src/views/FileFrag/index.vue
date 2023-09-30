<script setup lang="ts">
import FileFragUpload from '@/components/FileFragUpload/index.vue'
import { publicDict } from "@/utils/base.ts";
import { onMounted, reactive, ref } from "vue";
import { selFileChunkUploadList } from "@/api/common.ts";
import { downloadFullFile } from "@/utils/file.ts";
import { getFileBaseUrl } from "@/utils/env.ts";
import { getSize } from "../../utils/file-util.ts";
import { FormInstance } from "element-plus";

const state = reactive({
  list: [],
  total: 0,
  loaded: false,
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fileName: '',
    fileMd5: '',
    ignoreSame: false,
    orderByDto: [
      {num: 0, field: 'createTime', isAsc: false},
    ]
  },
  dict1: {
    ...publicDict,
    fileName: '原文件名',
    fileNewName: '现文件名',
    fileMd5: '文件md5',
    fileSize: '文件大小',
    chunkNum: '分片总数',
    uploadedNum: '已上传分片数',
    whetherFirst: '是否第一上传人',
    whetherMerge: '是否已合并',
    ignoreSame: '忽略重复文件'
  },
  downloadProgress: 0,
  dialogVisible: false
})
const formRef = ref<FormInstance>()

onMounted(() => {
  getInfo()
})

const getInfo = () => {
  state.loaded = false
  selFileChunkUploadList(state.queryParams).then(res => {
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
  state.dialogVisible = true
  downloadFullFile(getFileBaseUrl() + row.fileNewName, row.fileName, evt => {
    state.downloadProgress = Number((evt.progress * 100).toFixed(2))
    if (evt.progress === 1) {
      state.dialogVisible = false
      state.downloadProgress = 0
    }
  })
}
const open = row => {
  window.open(`${getFileBaseUrl()}${row.fileNewName}`)
}
const onFilter = () => {
  getInfo()
}
const onReset = () => {
  if (!formRef) return
  formRef.value.resetFields()
  getInfo()
}
</script>

<template>
  <FileFragUpload @refresh="getInfo"/>
  <br/>

  <el-dialog v-model="state.dialogVisible" draggable :close-on-click-modal="false" :close-on-press-escape="false"
             :show-close="false">
    <el-progress
        :percentage="state.downloadProgress"
        :stroke-width="15"
        striped
        striped-flow
        :duration="10"
    />
  </el-dialog>

  <el-form
      ref="formRef"
      :inline="true"
      :model="state.queryParams"
  >
    <el-form-item :label="state.dict1['fileName']" prop="fileName">
      <el-input v-model="state.queryParams.fileName" :placeholder="`请输入${state.dict1['fileName']}`" clearable/>
    </el-form-item>
    <el-form-item :label="state.dict1['fileMd5']" prop="fileMd5">
      <el-input v-model="state.queryParams.fileMd5" :placeholder="`请输入${state.dict1['fileMd5']}`" clearable/>
    </el-form-item>
    <el-form-item :label="state.dict1['ignoreSame']" prop="ignoreSame">
      <el-switch v-model="state.queryParams.ignoreSame"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onFilter">筛选</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>

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
    <el-table-column prop="fileSize" :label="state.dict1['fileSize']" width="100">
      <template #default="{row}">
        {{ getSize(row.fileSize) }}
      </template>
    </el-table-column>
    <el-table-column prop="chunkNum" :label="state.dict1['chunkNum']" width="80"/>
    <el-table-column prop="uploadedNum" :label="state.dict1['uploadedNum']" width="80"/>
    <el-table-column prop="remark" :label="state.dict1['remark']" width="150"/>
    <el-table-column prop="whetherFirst" sortable="custom" :label="state.dict1['whetherFirst']" width="100"/>
    <el-table-column prop="whetherMerge" sortable="custom" :label="state.dict1['whetherMerge']" width="100"/>
    <el-table-column prop="createBy" :label="state.dict1['createBy']" width="100"/>
    <el-table-column prop="createTime" sortable="custom" :label="state.dict1['createTime']" width="200"/>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{row}">
        <el-button v-if="row.chunkNum===row.uploadedNum" v-no-more-click link type="primary" size="small"
                   @click="open(row)">在线观看
        </el-button>
        <el-button v-if="row.chunkNum===row.uploadedNum" v-no-more-click link type="primary" size="small"
                   @click="downloadFile(row)">下载
        </el-button>
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