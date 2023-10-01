/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'spark-md5' {
  const content: any
  export = content
}
