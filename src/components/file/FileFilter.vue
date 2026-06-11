<script setup lang="ts">
import { useFilesStore } from '../../stores/files'
import { useI18n } from '../../i18n'

const filesStore = useFilesStore()
const { t } = useI18n()

const sortOptions: Array<{ field: keyof typeof filesStore.sortField; label: string }> = [
  { field: 'name' as any, label: t.value.fileFilter.name },
  { field: 'size' as any, label: t.value.fileFilter.size },
  { field: 'ext' as any, label: t.value.fileFilter.type },
  { field: 'modifiedAt' as any, label: t.value.fileFilter.date },
]
</script>

<template>
  <div class="file-filter">
    <div class="filter-left">
      <label class="select-all-label">
        <input
          type="checkbox"
          :checked="filesStore.allSelected"
          @change="filesStore.toggleSelectAll()"
        />
        <span v-if="filesStore.selectedIds.size > 0">
          {{ t.fileFilter.selected(filesStore.selectedIds.size) }}
        </span>
        <span v-else>{{ t.fileFilter.selectAll }}</span>
      </label>
    </div>
    <div class="filter-right">
      <span class="sort-label">{{ t.fileFilter.sortBy }}</span>
      <button
        v-for="opt in sortOptions"
        :key="opt.field"
        class="sort-btn"
        :class="{ active: filesStore.sortField === opt.field }"
        @click="filesStore.setSort(opt.field as any)"
      >
        {{ opt.label }}
        <span v-if="filesStore.sortField === opt.field" class="sort-arrow">
          {{ filesStore.sortDirection === 'asc' ? '↑' : '↓' }}
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.file-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border-light);
  font-size: var(--font-size-xs);
}

.filter-left, .filter-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.select-all-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  color: var(--color-text-secondary);
}

.select-all-label input {
  accent-color: var(--color-accent);
}

.sort-label {
  color: var(--color-text-tertiary);
}

.sort-btn {
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  transition: all var(--transition-fast);
}

.sort-btn:hover {
  color: var(--color-text-secondary);
  background: var(--color-bg-hover);
}

.sort-btn.active {
  color: var(--color-accent);
  font-weight: 600;
}

.sort-arrow {
  font-size: 10px;
}
</style>
