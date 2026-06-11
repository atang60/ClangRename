<script setup lang="ts">
import type { PrefixSuffixRule } from '../../types/rule'
import { useI18n } from '../../i18n'

const props = defineProps<{ rule: PrefixSuffixRule }>()
const emit = defineEmits<{ (e: 'update', updates: Partial<PrefixSuffixRule>): void }>()
const { t } = useI18n()
</script>

<template>
  <div class="rule-form">
    <div class="form-row">
      <label class="form-label">{{ t.rules.mode }}</label>
      <select
        class="form-select"
        :value="rule.mode"
        @change="emit('update', { mode: ($event.target as HTMLSelectElement).value as 'prefix' | 'suffix' })"
      >
        <option value="prefix">{{ t.rules.prefix }}</option>
        <option value="suffix">{{ t.rules.suffix }}</option>
      </select>
    </div>
    <div class="form-row">
      <label class="form-label">{{ t.rules.text }}</label>
      <input
        class="form-input"
        type="text"
        :value="rule.text"
        :placeholder="t.rules.textPlaceholder"
        @input="emit('update', { text: ($event.target as HTMLInputElement).value })"
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

.form-input:focus, .form-select:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-light);
}
</style>
