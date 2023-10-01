import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useGlobalStore = defineStore('global', () => {
  const showMenu = ref(true)
  const getShowMenu = computed(() => showMenu.value)
  const changeShowMenu = () => {
    showMenu.value = !showMenu.value
  }

  return {
    getShowMenu,
    changeShowMenu
  }
})