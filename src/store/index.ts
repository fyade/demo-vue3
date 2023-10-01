import { createPinia } from "pinia";
import { useGlobalStore } from "@/store/module/global.ts";

export function useStore() {
  return {
    global: useGlobalStore()
  }
}

const pinia = createPinia()
export default pinia
