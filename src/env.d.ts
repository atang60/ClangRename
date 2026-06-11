/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface FileInfo {
  id: string
  name: string
  path: string
  size: number
  ext: string
  isDirectory: boolean
  modifiedAt: number
}

interface RenameResult {
  oldPath: string
  newPath: string
  success: boolean
  error?: string
}

interface ElectronAPI {
  selectFiles: () => Promise<FileInfo[]>
  selectDirectory: () => Promise<FileInfo[]>
  addFilesFromPaths: (paths: string[]) => Promise<FileInfo[]>
  getFilesFromPaths: (paths: string[]) => Promise<FileInfo[]>
  applyRename: (operations: Array<{ oldPath: string; newPath: string }>) => Promise<RenameResult[]>
  undoLastRename: () => Promise<RenameResult[]>
  getSettings: (key: string) => Promise<any>
  setSettings: (key: string, value: any) => Promise<void>
  platform: string
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {}
