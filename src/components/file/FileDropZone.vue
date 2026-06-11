<script setup lang="ts">
import { useFilesStore } from '../../stores/files'
import { useI18n } from '../../i18n'
import { ref } from 'vue'

const filesStore = useFilesStore()
const { t } = useI18n()
const dragOver = ref(false)

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  dragOver.value = true
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy'
  }
}

function handleDragLeave() {
  dragOver.value = false
}

async function handleDrop(e: DragEvent) {
  e.preventDefault()
  dragOver.value = false

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

async function handleSelectFiles() {
  if (!window.electronAPI) return
  const files = await window.electronAPI.selectFiles()
  filesStore.addFiles(files)
}

async function handleSelectFolder() {
  if (!window.electronAPI) return
  const files = await window.electronAPI.selectDirectory()
  filesStore.addFiles(files)
}
</script>

<template>
  <div
    class="drop-zone"
    :class="{ 'drag-over': dragOver }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div class="drop-content">
      <div class="drop-icon">📂</div>
      <h3 class="drop-title">{{ t.dropZone.title }}</h3>
      <p class="drop-desc">{{ t.dropZone.desc }}</p>
      <div class="drop-actions">
        <button class="drop-btn" @click="handleSelectFiles">{{ t.dropZone.selectFiles }}</button>
        <button class="drop-btn secondary" @click="handleSelectFolder">{{ t.dropZone.selectFolder }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drop-zone {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacing-xl);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-xl);
  transition: all var(--transition-normal);
  background: var(--color-bg-secondary);
}

.drop-zone.drag-over {
  border-color: var(--color-accent);
  background: var(--color-accent-light);
}

.drop-content {
  text-align: center;
  padding: var(--spacing-2xl);
}

.drop-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-lg);
}

.drop-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.drop-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-xl);
}

.drop-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
}

.drop-btn {
  padding: var(--spacing-sm) var(--spacing-xl);
  background: var(--color-accent);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: var(--font-size-md);
  transition: background var(--transition-fast);
}

.drop-btn:hover {
  background: var(--color-accent-hover);
}

.drop-btn.secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.drop-btn.secondary:hover {
  background: var(--color-bg-hover);
}
</style>
