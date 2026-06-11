<script setup lang="ts">
import type { FindReplaceRule } from '../../types/rule'
import { useI18n } from '../../i18n'

const props = defineProps<{ rule: FindReplaceRule }>()
const emit = defineEmits<{ (e: 'update', updates: Partial<FindReplaceRule>): void }>()
const { t } = useI18n()
</script>

<template>
  <div class="rule-form">
    <div class="form-row">
      <label class="form-label">{{ t.rules.find }}</label>
      <input
        class="form-input"
        type="text"
        :value="rule.find"
        :placeholder="t.rules.findPlaceholder"
        @input="emit('update', { find: ($event.target as HTMLInputElement).value })"
      />
    </div>
    <div class="form-row">
      <label class="form-label">{{ t.rules.replace }}</label>
      <input
        class="form-input"
        type="text"
        :value="rule.replace"
        :placeholder="t.rules.replacePlaceholder"
        @input="emit('update', { replace: ($event.target as HTMLInputElement).value })"
      />
    </div>
    <div class="form-row options-row">
      <label class="form-check">
        <input
          type="checkbox"
          :checked="rule.caseSensitive"
          @change="emit('update', { caseSensitive: ($event.target as HTMLInputElement).checked })"
        />
        {{ t.rules.caseSensitive }}
      </label>
      <label class="form-check">
        <input
          type="checkbox"
          :checked="rule.replaceAll"
          @change="emit('update', { replaceAll: ($event.target as HTMLInputElement).checked })"
        />
        {{ t.rules.replaceAll }}
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

.options-row {
  gap: var(--spacing-lg);
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
