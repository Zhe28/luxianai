/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global{
  interface Window {
    ipcMain: any
  }
  interface globalThis{ 
    ipcMain: any
  }
}


interface ImportMetaEnv {
  readonly RENDERER_VITE_TARGET: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}