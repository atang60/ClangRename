<script setup lang="ts">
import type { CaseChangeRule } from '../../types/rule'
import { useI18n } from '../../i18n'

const props = defineProps<{ rule: CaseChangeRule }>()
const emit = defineEmits<{ (e: 'update', updates: Partial<CaseChangeRule>): void }>()
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
        <option value="upper">{{ t.rules.upper }}</option>
        <option value="lower">{{ t.rules.lower }}</option>
        <option value="title">{{ t.rules.title }}</option>
        <option value="sentence">{{ t.rules.sentence }}</option>
      </select>
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

.form-select {
  flex: 1;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  outline: none;
  background: var(--color-bg-primary);
}

.form-select:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-light);
}
</style>
