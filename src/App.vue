<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import StatusBar from './components/layout/StatusBar.vue'
import FileList from './components/file/FileList.vue'
import FileDropZone from './components/file/FileDropZone.vue'
import PreviewTable from './components/preview/PreviewTable.vue'
import ConfirmDialog from './components/common/ConfirmDialog.vue'
import { useFilesStore } from './stores/files'
import { useRenameStore } from './stores/rename'
import { useI18n } from './i18n'
import { ref } from 'vue'

const filesStore = useFilesStore()
const renameStore = useRenameStore()
const { t } = useI18n()
const showConfirm = ref(false)
const previewExpanded = ref(true)

function handleConfirmRename() {
  showConfirm.value = true
}

async function handleApplyRename() {
  showConfirm.value = false
  await renameStore.applyRename()
}

function togglePreview() {
  previewExpanded.value = !previewExpanded.value
}
</script>

<template>
  <div class="app-container">
    <AppHeader
      @confirm-rename="handleConfirmRename"
    />

    <div class="app-body">
      <div class="main-area">
        <FileDropZone v-if="filesStore.files.length === 0" />
        <FileList v-else />

        <div class="preview-section" :class="{ collapsed: !previewExpanded }">
          <div class="preview-header" @click="togglePreview">
            <span class="preview-title">
              📋 {{ t.app.preview }}
              <span v-if="renameStore.previewCount > 0" class="preview-count">
                {{ t.app.filesWillRename(renameStore.previewCount) }}
              </span>
            </span>
            <button class="toggle-btn">{{ previewExpanded ? '▼' : '▲' }}</button>
          </div>
          <PreviewTable v-if="previewExpanded" />
        </div>
      </div>

      <AppSidebar />
    </div>

    <StatusBar />

    <ConfirmDialog
      v-if="showConfirm"
      :previews="renameStore.previews"
      @confirm="handleApplyRename"
      @cancel="showConfirm = false"
    />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.preview-section {
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
}

.preview-section.collapsed {
  flex-shrink: 0;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-lg);
  cursor: pointer;
  user-select: none;
  background: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border-light);
}

.preview-header:hover {
  background: var(--color-bg-hover);
}

.preview-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.preview-count {
  margin-left: var(--spacing-sm);
  color: var(--color-accent);
  font-weight: 500;
}

.toggle-btn {
  font-size: 10px;
  color: var(--color-text-tertiary);
  padding: 2px 8px;
}
</style>
