<script setup lang="ts">
import type { InsertTextRule } from '../../types/rule'
import { useI18n } from '../../i18n'

const props = defineProps<{ rule: InsertTextRule }>()
const emit = defineEmits<{ (e: 'update', updates: Partial<InsertTextRule>): void }>()
const { t } = useI18n()
</script>

<template>
  <div class="rule-form">
    <div class="form-row">
      <label class="form-label">{{ t.rules.text }}</label>
      <input
        class="form-input"
        type="text"
        :value="rule.text"
        :placeholder="t.rules.insertPlaceholder"
        @input="emit('update', { text: ($event.target as HTMLInputElement).value })"
      />
    </div>
    <div class="form-row">
      <label class="form-label">{{ t.rules.position }}</label>
      <input
        class="form-input number"
        type="number"
        :value="rule.position"
        min="0"
        @input="emit('update', { position: parseInt(($event.target as HTMLInputElement).value) || 0 })"
      />
    </div>
    <div class="form-row">
      <label class="form-check">
        <input
          type="checkbox"
          :checked="rule.fromEnd"
          @change="emit('update', { fromEnd: ($event.target as HTMLInputElement).checked })"
        />
        {{ t.rules.countFromEnd }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.rule-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.form-label {
  width: 56px;
  flex-shrink: 0;
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.form-input {
  flex: 1;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  outline: none;
  background: var(--color-bg-primary);
}

.form-input.number {
  width: 80px;
  flex: 0;
}

.form-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-light);
}

.form-check {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  cursor: pointer;
}

.form-check input {
  accent-color: var(--color-accent);
}
</style>
