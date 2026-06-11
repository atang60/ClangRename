<script setup lang="ts">
import { useFilesStore } from '../../stores/files'
import { useI18n } from '../../i18n'
import FileItem from './FileItem.vue'
import FileFilter from './FileFilter.vue'

const filesStore = useFilesStore()
const { t } = useI18n()

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy'
  }
}

async function handleDrop(e: DragEvent) {
  e.preventDefault()
  if (!e.dataTransfer) return

  const items = e.dataTransfer.items
  if (!items) return

  const paths: string[] = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.kind === 'file') {
      const file = item.getAsFile()
      if (file && (file as any).path) {
        paths.push((file as any).path)
      }
    }
  }

  if (paths.length > 0 && window.electronAPI) {
    const fileInfos = await window.electronAPI.getFilesFromPaths(paths)
    filesStore.addFiles(fileInfos)
  }
}
</script>

<template>
  <div class="file-list-container">
    <FileFilter />

    <div
      class="file-list"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <TransitionGroup name="file-list">
        <FileItem
          v-for="file in filesStore.filteredFiles"
          :key="file.id"
          :file="file"
          :selected="filesStore.selectedIds.has(file.id)"
          @toggle="filesStore.toggleSelect(file.id)"
          @remove="filesStore.removeFiles([file.id])"
        />
      </TransitionGroup>

      <div v-if="filesStore.filteredFiles.length === 0 && filesStore.files.length > 0" class="empty-state">
        {{ t.fileList.noMatch }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-list-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.file-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-sm) 0;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-lg);
}

.file-list-enter-active,
.file-list-leave-active {
  transition: all var(--transition-normal);
}

.file-list-enter-from,
.file-list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
