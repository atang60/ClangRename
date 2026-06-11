<script setup lang="ts">
import type { RenamePreview } from '../../types/ipc'
import { useI18n } from '../../i18n'
import { computed } from 'vue'

const props = defineProps<{
  preview: RenamePreview
}>()

const { t } = useI18n()

const diffChars = computed(() => {
  const original = props.preview.originalName
  const newName = props.preview.newName

  if (original === newName) return null

  let prefixLen = 0
  let suffixLen = 0

  const minLen = Math.min(original.length, newName.length)

  while (prefixLen < minLen && original[prefixLen] === newName[prefixLen]) {
    prefixLen++
  }

  while (
    suffixLen < minLen - prefixLen &&
    original[original.length - 1 - suffixLen] === newName[newName.length - 1 - suffixLen]
  ) {
    suffixLen++
  }

  return {
    originalStart: original.substring(0, prefixLen),
    originalChanged: original.substring(prefixLen, original.length - suffixLen),
    originalEnd: original.substring(original.length - suffixLen),
    newStart: newName.substring(0, prefixLen),
    newChanged: newName.substring(prefixLen, newName.length - suffixLen),
    newEnd: newName.substring(newName.length - suffixLen),
  }
})
</script>

<template>
  <div class="preview-row" :class="{ changed: preview.hasChanged, conflict: preview.conflict }">
    <span class="preview-col col-status">
      <span v-if="preview.conflict" :title="t.previewDiff.conflict">⚠️</span>
      <span v-else-if="preview.hasChanged" :title="t.previewDiff.willRename">→</span>
      <span v-else :title="t.previewDiff.noChange">·</span>
    </span>

    <span class="preview-col col-original text-ellipsis">
      <template v-if="diffChars">
        <span class="unchanged">{{ diffChars.originalStart }}</span>
        <span class="removed">{{ diffChars.originalChanged }}</span>
        <span class="unchanged">{{ diffChars.originalEnd }}</span>
      </template>
      <template v-else>{{ preview.originalName }}</template>
    </span>

    <span class="preview-col col-arrow">→</span>

    <span class="preview-col col-new text-ellipsis">
      <template v-if="diffChars">
        <span class="unchanged">{{ diffChars.newStart }}</span>
        <span class="added">{{ diffChars.newChanged }}</span>
        <span class="unchanged">{{ diffChars.newEnd }}</span>
      </template>
      <template v-else>{{ preview.newName }}</template>
    </span>
  </div>
</template>

<style scoped>
.preview-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 3px var(--spacing-lg);
  font-size: var(--font-size-sm);
  border-bottom: 1px solid var(--color-border-light);
}

.preview-row.changed {
  background: var(--color-accent-light);
}

.preview-row.conflict {
  background: #fff8e1;
}

.col-status {
  width: 20px;
  flex-shrink: 0;
  text-align: center;
  font-size: 12px;
}

.col-original, .col-new {
  flex: 1;
  min-width: 0;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: var(--font-size-xs);
}

.col-arrow {
  width: 24px;
  flex-shrink: 0;
  text-align: center;
  color: var(--color-text-tertiary);
}

.unchanged {
  color: var(--color-text-secondary);
}

.removed {
  color: var(--color-danger);
  background: #fef2f2;
  text-decoration: line-through;
  border-radius: 2px;
  padding: 0 2px;
}

.added {
  color: var(--color-success);
  background: #f0fdf4;
  font-weight: 600;
  border-radius: 2px;
  padding: 0 2px;
}
</style>
