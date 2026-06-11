import { ipcMain } from 'electron'

// Simple in-memory store for app settings and undo history
const store = new Map<string, any>()

export function registerStoreHandlers() {
  ipcMain.handle('store:get', (_event, key: string) => {
    return store.get(key)
  })

  ipcMain.handle('store:set', (_event, key: string, value: any) => {
    store.set(key, value)
  })
}
