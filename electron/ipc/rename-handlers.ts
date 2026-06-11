import { ipcMain } from 'electron'
import { rename as fsRename } from 'fs/promises'
import { join } from 'path'

interface RenameResult {
  oldPath: string
  newPath: string
  success: boolean
  error?: string
}

interface RenameRecord {
  id: string
  timestamp: number
  operations: Array<{ oldPath: string; newPath: string }>
}

const undoStack: RenameRecord[] = []
const MAX_UNDO_HISTORY = 50

export function registerRenameHandlers() {
  ipcMain.handle('rename:apply', async (_event, operations: Array<{ oldPath: string; newPath: string }>) => {
    const results: RenameResult[] = []

    for (const op of operations) {
      try {
        await fsRename(op.oldPath, op.newPath)
        results.push({ oldPath: op.oldPath, newPath: op.newPath, success: true })
      } catch (err: any) {
        results.push({
          oldPath: op.oldPath,
          newPath: op.newPath,
          success: false,
          error: err.message || 'Unknown error'
        })
      }
    }

    // Save to undo stack
    const successfulOps = results.filter(r => r.success)
    if (successfulOps.length > 0) {
      undoStack.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        timestamp: Date.now(),
        operations: successfulOps.map(r => ({ oldPath: r.oldPath, newPath: r.newPath }))
      })

      // Limit history size
      while (undoStack.length > MAX_UNDO_HISTORY) {
        undoStack.shift()
      }
    }

    return results
  })

  ipcMain.handle('rename:undo', async () => {
    const record = undoStack.pop()
    if (!record) return []

    const results: RenameResult[] = []

    // Reverse the operations
    for (const op of record.operations) {
      try {
        await fsRename(op.newPath, op.oldPath)
        results.push({ oldPath: op.newPath, newPath: op.oldPath, success: true })
      } catch (err: any) {
        results.push({
          oldPath: op.newPath,
          newPath: op.oldPath,
          success: false,
          error: err.message || 'Unknown error'
        })
      }
    }

    return results
  })
}
