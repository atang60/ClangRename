<script setup lang="ts">
import { useFilesStore } from '../../stores/files'
import { useRenameStore } from '../../stores/rename'
import { useI18n } from '../../i18n'
import { computed } from 'vue'

const filesStore = useFilesStore()
const renameStore = useRenameStore()
const { t } = useI18n()

const totalSize = computed(() => {
  const bytes = filesStore.files.reduce((sum, f) => sum + f.size, 0)
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
})

const changedCount = computed(() => renameStore.previewCount)
const conflictCount = computed(() =>
  renameStore.previews.filter(p => p.conflict).length
)
</script>

<template>
  <footer class="status-bar">
    <div class="status-left">
      <span class="status-item">{{ t.statusBar.files(filesStore.files.length) }}</span>
      <span class="status-divider">|</span>
      <span class="status-item">{{ totalSize }}</span>
    </div>

    <div class="status-right">
      <span v-if="changedCount > 0" class="status-item status-changed">
        {{ t.statusBar.toRename(changedCount) }}
      </span>
      <span v-if="conflictCount > 0" class="status-item status-warning">
        ⚠️ {{ t.statusBar.conflicts(conflictCount) }}
      </span>
      <span class="status-divider">|</span>
      <span class="status-item">{{ renameStore.isProcessing ? t.statusBar.processing : t.statusBar.ready }}</span>
    </div>
  </footer>
</template>

<style scoped>
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--statusbar-height);
  padding: 0 var(--spacing-lg);
  background: var(--color-bg-tertiary);
  border-top: 1px solid var(--color-border-light);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  flex-shrink: 0;
  user-select: none;
}

.status-left, .status-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.status-divider {
  color: var(--color-border);
}

.status-changed {
  color: var(--color-accent);
  font-weight: 600;
}

.status-warning {
  color: var(--color-warning);
  font-weight: 600;
}
</style>
