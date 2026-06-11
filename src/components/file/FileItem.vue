<script setup lang="ts">
import type { FileInfo } from '../../types/file'
import { useI18n } from '../../i18n'
import { computed } from 'vue'

const props = defineProps<{
  file: FileInfo
  selected: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'remove'): void
}>()

const { t, locale } = useI18n()

const icon = computed(() => {
  const ext = props.file.ext.toLowerCase()
  const iconMap: Record<string, string> = {
    '.jpg': '🖼️', '.jpeg': '🖼️', '.png': '🖼️', '.gif': '🖼️', '.webp': '🖼️', '.svg': '🖼️',
    '.mp4': '🎬', '.mov': '🎬', '.avi': '🎬', '.mkv': '🎬',
    '.mp3': '🎵', '.wav': '🎵', '.flac': '🎵', '.aac': '🎵',
    '.pdf': '📄',
    '.doc': '📝', '.docx': '📝',
    '.xls': '📊', '.xlsx': '📊',
    '.zip': '📦', '.rar': '📦', '.7z': '📦', '.tar': '📦', '.gz': '📦',
    '.js': '📜', '.ts': '📜', '.py': '📜', '.vue': '📜', '.html': '📜', '.css': '📜',
    '.json': '📋', '.xml': '📋',
    '.exe': '⚙️', '.dmg': '⚙️', '.app': '⚙️',
  }
  return iconMap[ext] || '📎'
})

const sizeText = computed(() => {
  const bytes = props.file.size
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
})

const dateText = computed(() => {
  const d = new Date(props.file.modifiedAt)
  const loc = locale.value === 'zh' ? 'zh-CN' : 'en-US'
  return d.toLocaleDateString(loc, { month: 'short', day: 'numeric', year: 'numeric' })
})
</script>

<template>
  <div
    class="file-item"
    :class="{ selected }"
    @click="emit('toggle')"
  >
    <input
      type="checkbox"
      :checked="selected"
      class="file-checkbox"
      @click.stop
      @change="emit('toggle')"
    />
    <span class="file-icon">{{ icon }}</span>
    <span class="file-name text-ellipsis">{{ file.name }}</span>
    <span class="file-size">{{ sizeText }}</span>
    <span class="file-date">{{ dateText }}</span>
    <button class="file-remove" @click.stop="emit('remove')" :title="t.fileItem.remove">✕</button>
  </div>
</template>

<style scoped>
.file-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-md);
  cursor: pointer;
  transition: background var(--transition-fast);
  border-bottom: 1px solid var(--color-border-light);
}

.file-item:hover {
  background: var(--color-bg-hover);
}

.file-item.selected {
  background: var(--color-accent-light);
}

.file-checkbox {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.file-icon {
  flex-shrink: 0;
  font-size: 16px;
}

.file-name {
  flex: 1;
  min-width: 0;
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.file-size {
  flex-shrink: 0;
  width: 60px;
  text-align: right;
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.file-date {
  flex-shrink: 0;
  width: 100px;
  text-align: right;
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.file-remove {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-size: 10px;
  color: var(--color-text-tertiary);
  opacity: 0;
  transition: all var(--transition-fast);
}

.file-item:hover .file-remove {
  opacity: 1;
}

.file-remove:hover {
  background: var(--color-danger-light);
  color: var(--color-danger);
}
</style>
