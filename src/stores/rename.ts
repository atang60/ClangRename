import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFilesStore } from './files'
import { useRulesStore } from './rules'
import { applyRules, getConflicts } from '../engine/index'
import type { RenamePreview } from '../types/ipc'

export const useRenameStore = defineStore('rename', () => {
  const isProcessing = ref(false)
  const lastResults = ref<Array<{ oldPath: string; newPath: string; success: boolean; error?: string }>>([])

  const previews = computed<RenamePreview[]>(() => {
    const filesStore = useFilesStore()
    const rulesStore = useRulesStore()
    // Only operate on checked/selected files
    const selectedFiles = filesStore.selectedFiles.length > 0
      ? filesStore.selectedFiles
      : []

    if (selectedFiles.length === 0 || rulesStore.enabledRules.length === 0) {
      return selectedFiles.map(f => ({
        file: f,
        originalName: f.name,
        newName: f.name,
        hasChanged: false,
        conflict: false
      }))
    }

    const results = applyRules(selectedFiles, rulesStore.enabledRules)
    const newNames = results.map(r => r.newName)

    return results.map((result, i) => {
      const fileName = result.newName
      const conflict = newNames.filter((n, j) => i !== j && n === fileName).length > 0

      return {
        file: selectedFiles[i],
        originalName: result.originalName,
        newName: result.newName,
        hasChanged: result.originalName !== result.newName,
        conflict
      }
    })
  })

  const previewCount = computed(() =>
    previews.value.filter(p => p.hasChanged).length
  )

  const hasConflicts = computed(() =>
    previews.value.some(p => p.conflict)
  )

  const canApply = computed(() =>
    previewCount.value > 0 && !hasConflicts.value && !isProcessing.value
  )

  async function applyRename() {
    if (!window.electronAPI) {
      // Fallback for browser dev mode
      const results = previews.value
        .filter(p => p.hasChanged)
        .map(p => ({
          oldPath: p.file.path,
          newPath: p.file.path.replace(p.originalName, p.newName),
          success: true
        }))
      lastResults.value = results
      return results
    }

    isProcessing.value = true
    try {
      const operations = previews.value
        .filter(p => p.hasChanged)
        .map(p => ({
          oldPath: p.file.path,
          newPath: p.file.path.replace(p.originalName, p.newName)
        }))

      const results = await window.electronAPI.applyRename(operations)
      lastResults.value = results

      // Refresh file list after rename
      const filesStore = useFilesStore()
      const successPaths = results.filter(r => r.success).map(r => r.newPath)
      if (successPaths.length > 0) {
        const updatedFiles = await window.electronAPI.getFilesFromPaths(successPaths)
        // Update existing file entries
        for (const updated of updatedFiles) {
          const idx = filesStore.files.findIndex(f =>
            results.some(r => r.success && r.oldPath === f.path && r.newPath === updated.path)
          )
          if (idx !== -1) {
            filesStore.files[idx] = updated
          }
        }
      }

      return results
    } finally {
      isProcessing.value = false
    }
  }

  async function undoRename() {
    if (!window.electronAPI) return []
    isProcessing.value = true
    try {
      const results = await window.electronAPI.undoLastRename()
      lastResults.value = results

      // Refresh file list after undo
      const filesStore = useFilesStore()
      const successPaths = results.filter(r => r.success).map(r => r.newPath)
      if (successPaths.length > 0) {
        const updatedFiles = await window.electronAPI.getFilesFromPaths(successPaths)
        for (const updated of updatedFiles) {
          const idx = filesStore.files.findIndex(f =>
            results.some(r => r.success && r.oldPath === f.path && r.newPath === updated.path)
          )
          if (idx !== -1) {
            filesStore.files[idx] = updated
          }
        }
      }

      return results
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing,
    lastResults,
    previews,
    previewCount,
    hasConflicts,
    canApply,
    applyRename,
    undoRename
  }
})
