<script setup lang="ts">
import type { RenamePreview } from '../../types/ipc'
import { useI18n } from '../../i18n'

defineProps<{
  previews: RenamePreview[]
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const { t } = useI18n()
</script>

<template>
  <div class="dialog-overlay" @click.self="emit('cancel')">
    <div class="dialog">
      <div class="dialog-header">
        <h3>{{ t.confirmDialog.title }}</h3>
        <button class="dialog-close" @click="emit('cancel')">✕</button>
      </div>

      <div class="dialog-body">
        <p class="dialog-desc">
          {{ t.confirmDialog.desc }}
        </p>

        <div class="dialog-list">
          <div
            v-for="p in previews.filter(p => p.hasChanged)"
            :key="p.file.id"
            class="dialog-item"
          >
            <span class="dialog-item-old text-ellipsis">{{ p.originalName }}</span>
            <span class="dialog-item-arrow">→</span>
            <span class="dialog-item-new text-ellipsis">{{ p.newName }}</span>
          </div>
        </div>
      </div>

      <div class="dialog-footer">
        <button class="dialog-btn cancel" @click="emit('cancel')">{{ t.confirmDialog.cancel }}</button>
        <button class="dialog-btn confirm" @click="emit('confirm')">{{ t.confirmDialog.confirm }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg) var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-light);
}

.dialog-header h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.dialog-close {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: var(--color-text-tertiary);
}

.dialog-close:hover {
  background: var(--color-bg-hover);
}

.dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg) var(--spacing-xl);
}

.dialog-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.dialog-list {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.dialog-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  border-bottom: 1px solid var(--color-border-light);
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
}

.dialog-item:last-child {
  border-bottom: none;
}

.dialog-item-old {
  flex: 1;
  min-width: 0;
  color: var(--color-text-secondary);
}

.dialog-item-arrow {
  flex-shrink: 0;
  color: var(--color-text-tertiary);
}

.dialog-item-new {
  flex: 1;
  min-width: 0;
  color: var(--color-accent);
  font-weight: 600;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--color-border-light);
}

.dialog-btn {
  padding: var(--spacing-sm) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.dialog-btn.cancel {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.dialog-btn.cancel:hover {
  background: var(--color-bg-hover);
}

.dialog-btn.confirm {
  background: var(--color-accent);
  color: white;
}

.dialog-btn.confirm:hover {
  background: var(--color-accent-hover);
}
</style>
