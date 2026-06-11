<script setup lang="ts">
import type { RegexReplaceRule } from '../../types/rule'
import { useI18n } from '../../i18n'

const props = defineProps<{ rule: RegexReplaceRule }>()
const emit = defineEmits<{ (e: 'update', updates: Partial<RegexReplaceRule>): void }>()
const { t } = useI18n()
</script>

<template>
  <div class="rule-form">
    <div class="form-row">
      <label class="form-label">{{ t.rules.pattern }}</label>
      <input
        class="form-input mono"
        type="text"
        :value="rule.pattern"
        :placeholder="t.rules.patternPlaceholder"
        @input="emit('update', { pattern: ($event.target as HTMLInputElement).value })"
      />
    </div>
    <div class="form-row">
      <label class="form-label">{{ t.rules.replace }}</label>
      <input
        class="form-input mono"
        type="text"
        :value="rule.replacement"
        :placeholder="t.rules.replacementPlaceholder"
        @input="emit('update', { replacement: ($event.target as HTMLInputElement).value })"
      />
    </div>
    <div class="form-row">
      <label class="form-label">{{ t.rules.flags }}</label>
      <input
        class="form-input flags"
        type="text"
        :value="rule.flags"
        :placeholder="t.rules.flagsPlaceholder"
        @input="emit('update', { flags: ($event.target as HTMLInputElement).value })"
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

.form-input {
  flex: 1;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  outline: none;
  background: var(--color-bg-primary);
}

.form-input.mono {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
}

.form-input.flags {
  width: 120px;
  flex: 0;
}

.form-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-light);
}
</style>
