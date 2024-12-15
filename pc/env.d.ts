/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
}

declare global {
  interface Window {
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