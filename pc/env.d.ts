/// <reference types="vite/client" />
import * as electron from 'electron'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

export interface IElectronAPI {
  loadPreferences: () => electron,
}

declare global {
  interface Window {
    WxLogin: any,
    electronAPI: IElectronAPI,
    electron: any,
    ipcRenderer: {
      invoke: (event: string, params: any) => any
    }
  }
}


interface ImportMetaEnv {
  readonly RENDERER_VITE_TARGET: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}