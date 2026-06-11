import { ipcMain, dialog, BrowserWindow } from 'electron'
import { readdir, stat, rename as fsRename } from 'fs/promises'
import { join, parse } from 'path'
import { v4 as uuidv4 } from 'crypto'

interface FileInfo {
  id: string
  name: string
  path: string
  size: number
  ext: string
  isDirectory: boolean
  modifiedAt: number
}

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

async function getFileInfo(filePath: string): Promise<FileInfo> {
  const stats = await stat(filePath)
  const parsed = parse(filePath)
  return {
    id: uuidv4(),
    name: parsed.base,
    path: filePath,
    size: stats.size,
    ext: parsed.ext,
    isDirectory: stats.isDirectory(),
    modifiedAt: stats.mtimeMs
  }
}

export function registerFileHandlers() {
  ipcMain.handle('file:select', async () => {
    const window = BrowserWindow.getFocusedWindow()
    if (!window) return []

    const result = await dialog.showOpenDialog(window, {
      properties: ['openFile', 'multiSelections'],
      title: 'Select Files to Rename'
    })

    if (result.canceled || !result.filePaths.length) return []

    const files: FileInfo[] = []
    for (const fp of result.filePaths) {
      files.push(await getFileInfo(fp))
    }
    return files
  })

  ipcMain.handle('file:selectDirectory', async () => {
    const window = BrowserWindow.getFocusedWindow()
    if (!window) return []

    const result = await dialog.showOpenDialog(window, {
      properties: ['openDirectory'],
      title: 'Select Directory'
    })

    if (result.canceled || !result.filePaths.length) return []

    const dirPath = result.filePaths[0]
    const entries = await readdir(dirPath, { withFileTypes: true })
    const files: FileInfo[] = []

    for (const entry of entries) {
      if (entry.isFile()) {
        files.push(await getFileInfo(join(dirPath, entry.name)))
      }
    }

    return files
  })

  ipcMain.handle('file:addFromPaths', async (_event, paths: string[]) => {
    const files: FileInfo[] = []
    for (const fp of paths) {
      try {
        files.push(await getFileInfo(fp))
      } catch {
        // Skip inaccessible files
      }
    }
    return files
  })

  ipcMain.handle('file:getFromPaths', async (_event, paths: string[]) => {
    const files: FileInfo[] = []
    for (const fp of paths) {
      try {
        const info = await getFileInfo(fp)
        if (!info.isDirectory) {
          files.push(info)
        }
      } catch {
        // Skip inaccessible files
      }
    }
    return files
  })
}
