<script setup lang="ts">
import { useRenameStore } from '../../stores/rename'
import { useI18n } from '../../i18n'
import PreviewDiff from './PreviewDiff.vue'

const renameStore = useRenameStore()
const { t } = useI18n()
</script>

<template>
  <div class="preview-table-wrapper">
    <div class="preview-table">
      <div class="preview-row header-row">
        <span class="preview-col col-status"></span>
        <span class="preview-col col-original">{{ t.previewTable.originalName }}</span>
        <span class="preview-col col-arrow"></span>
        <span class="preview-col col-new">{{ t.previewTable.newName }}</span>
      </div>

      <div class="preview-body">
        <PreviewDiff
          v-for="preview in renameStore.previews"
          :key="preview.file.id"
          :preview="preview"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-table-wrapper {
  max-height: 160px;
  overflow-y: auto;
}

.preview-table {
  width: 100%;
}

.preview-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 3px var(--spacing-lg);
  font-size: var(--font-size-sm);
}

.header-row {
  position: sticky;
  top: 0;
  background: var(--color-bg-tertiary);
  font-weight: 600;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border-light);
  z-index: 1;
}

.col-status {
  width: 20px;
  flex-shrink: 0;
  text-align: center;
}

.col-original {
  flex: 1;
  min-width: 0;
}

.col-arrow {
  width: 24px;
  flex-shrink: 0;
  text-align: center;
}

.col-new {
  flex: 1;
  min-width: 0;
}
</style>
