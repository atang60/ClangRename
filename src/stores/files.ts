import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FileInfo } from '../types/file'

export const useFilesStore = defineStore('files', () => {
  const files = ref<FileInfo[]>([])
  const selectedIds = ref<Set<string>>(new Set())
  const filter = ref('')
  const sortField = ref<keyof FileInfo>('name')
  const sortDirection = ref<'asc' | 'desc'>('asc')

  const filteredFiles = computed(() => {
    let result = [...files.value]

    // Apply extension filter
    if (filter.value) {
      const filters = filter.value.split(',').map(f => f.trim().toLowerCase())
      result = result.filter(f =>
        filters.some(ft => f.name.toLowerCase().endsWith(ft))
      )
    }

    // Apply sort
    result.sort((a, b) => {
      const aVal = a[sortField.value]
      const bVal = b[sortField.value]
      const dir = sortDirection.value === 'asc' ? 1 : -1

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * dir
      }
      return ((aVal as number) - (bVal as number)) * dir
    })

    return result
  })

  const selectedFiles = computed(() =>
    filteredFiles.value.filter(f => selectedIds.value.has(f.id))
  )

  const allSelected = computed(() =>
    filteredFiles.value.length > 0 &&
    filteredFiles.value.every(f => selectedIds.value.has(f.id))
  )

  function addFiles(newFiles: FileInfo[]) {
    const existingPaths = new Set(files.value.map(f => f.path))
    const unique = newFiles.filter(f => !existingPaths.has(f.path))
    files.value.push(...unique)
  }

  function removeFiles(ids: string[]) {
    files.value = files.value.filter(f => !ids.includes(f.id))
    ids.forEach(id => selectedIds.value.delete(id))
  }

  function clearFiles() {
    files.value = []
    selectedIds.value.clear()
  }

  function toggleSelect(id: string) {
    const s = new Set(selectedIds.value)
    if (s.has(id)) {
      s.delete(id)
    } else {
      s.add(id)
    }
    selectedIds.value = s
  }

  function toggleSelectAll() {
    if (allSelected.value) {
      selectedIds.value = new Set()
    } else {
      selectedIds.value = new Set(filteredFiles.value.map(f => f.id))
    }
  }

  function setSort(field: keyof FileInfo) {
    if (sortField.value === field) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortField.value = field
      sortDirection.value = 'asc'
    }
  }

  return {
    files,
    selectedIds,
    filter,
    sortField,
    sortDirection,
    filteredFiles,
    selectedFiles,
    allSelected,
    addFiles,
    removeFiles,
    clearFiles,
    toggleSelect,
    toggleSelectAll,
    setSort
  }
})
