<script setup lang="ts">
import { ref } from "vue";

const dataList = [
  {
    id: '1',
    data: []
  },
  {
    id: '2',
    data: []
  },
  {
    id: '3',
    data: []
  }
]
const activeBtn = ref('')

function func() {
  // 获取数据
  activeBtn.value = dataList[0].id
}

func()
</script>

<template>
  <div>
    <div
        v-for="item in dataList"
        :key="item.id"
        :class="activeBtn === item.id ? 'actived' : 'notActived'"
    >
      按钮{{ item.id }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.actived {
  background-color: red;
}

.notActived {
  background-color: #000;
}
</style>