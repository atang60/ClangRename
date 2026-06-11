import { contextBridge, ipcRenderer } from 'electron'
import type { FileInfo, RenameResult } from '../src/types/ipc'

const electronAPI = {
  // File operations
  selectFiles: (): Promise<FileInfo[]> =>
    ipcRenderer.invoke('file:select'),
  selectDirectory: (): Promise<FileInfo[]> =>
    ipcRenderer.invoke('file:selectDirectory'),
  addFilesFromPaths: (paths: string[]): Promise<FileInfo[]> =>
    ipcRenderer.invoke('file:addFromPaths', paths),
  getFilesFromPaths: (paths: string[]): Promise<FileInfo[]> =>
    ipcRenderer.invoke('file:getFromPaths', paths),

  // Rename operations
  applyRename: (operations: Array<{ oldPath: string; newPath: string }>): Promise<RenameResult[]> =>
    ipcRenderer.invoke('rename:apply', operations),
  undoLastRename: (): Promise<RenameResult[]> =>
    ipcRenderer.invoke('rename:undo'),

  // Settings
  getSettings: (key: string): Promise<any> =>
    ipcRenderer.invoke('store:get', key),
  setSettings: (key: string, value: any): Promise<void> =>
    ipcRenderer.invoke('store:set', key, value),

  // Platform info
  platform: process.platform
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

export type ElectronAPI = typeof electronAPI
