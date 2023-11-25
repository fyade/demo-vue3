<script setup lang="ts">
import { useGlobalStore } from "@/store/module/global.ts";
import { RouteLocationMatched, useRouter } from "vue-router";
import { reactive, watch } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";

const state = reactive({
  menuList: [] as RouteLocationMatched[]
})
const router = useRouter()
const size = 20

watch(
    () => router.currentRoute.value,
    (newVal) => {
      state.menuList = newVal.matched
    },
    {
      immediate: true
    }
)

const changeShowMenu = () => {
  useGlobalStore().changeShowMenu()
}
</script>

<template>
  <div class="el">
    <div class="fa cur-pointer" @click="changeShowMenu">
      <el-icon v-if="useGlobalStore().getShowMenu" :size="size">
        <Fold/>
      </el-icon>
      <el-icon v-else :size="size">
        <Expand/>
      </el-icon>
    </div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
          v-for="(item, index) in state.menuList"
          :key="index"
          :to="{path:item.path}"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.el {
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ddd;

  .fa {
    display: flex;

    > * {
      margin: auto;
    }
  }
}
</style>