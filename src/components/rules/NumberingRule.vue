<script setup lang="ts">
import type { NumberingRule } from '../../types/rule'
import { useI18n } from '../../i18n'

const props = defineProps<{ rule: NumberingRule }>()
const emit = defineEmits<{ (e: 'update', updates: Partial<NumberingRule>): void }>()
const { t } = useI18n()
</script>

<template>
  <div class="rule-form">
    <div class="form-row">
      <label class="form-label">{{ t.rules.mode }}</label>
      <select
        class="form-select"
        :value="rule.mode"
        @change="emit('update', { mode: ($event.target as HTMLSelectElement).value as any })"
      >
        <option value="prepend">{{ t.rules.prepend }}</option>
        <option value="append">{{ t.rules.append }}</option>
        <option value="replace">{{ t.rules.replaceName }}</option>
      </select>
    </div>
    <div class="form-row">
      <label class="form-label">{{ t.rules.start }}</label>
      <input
        class="form-input number"
        type="number"
        :value="rule.start"
        @input="emit('update', { start: parseInt(($event.target as HTMLInputElement).value) || 0 })"
      />
    </div>
    <div class="form-row">
      <label class="form-label">{{ t.rules.step }}</label>
      <input
        class="form-input number"
        type="number"
        :value="rule.step"
        min="1"
        @input="emit('update', { step: parseInt(($event.target as HTMLInputElement).value) || 1 })"
      />
    </div>
    <div class="form-row">
      <label class="form-label">{{ t.rules.padding }}</label>
      <input
        class="form-input number"
        type="number"
        :value="rule.padding"
        min="0"
        max="10"
        @input="emit('update', { padding: parseInt(($event.target as HTMLInputElement).value) || 0 })"
      />
    </div>
    <div class="form-row">
      <label class="form-label">{{ t.rules.separator }}</label>
      <input
        class="form-input"
        type="text"
        :value="rule.separator"
        maxlength="3"
        @input="emit('update', { separator: ($event.target as HTMLInputElement).value })"
      />
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

.form-input, .form-select {
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

.form-input:focus, .form-select:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-light);
}
</style>
