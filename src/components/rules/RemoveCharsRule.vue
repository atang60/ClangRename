<script setup lang="ts">
import type { RemoveCharsRule } from '../../types/rule'
import { useI18n } from '../../i18n'

const props = defineProps<{ rule: RemoveCharsRule }>()
const emit = defineEmits<{ (e: 'update', updates: Partial<RemoveCharsRule>): void }>()
const { t } = useI18n()
</script>

<template>
  <div class="rule-form">
    <div class="form-row">
      <label class="form-label">{{ t.rules.mode }}</label>
      <select
        class="form-select"
        :value="rule.mode"
        @change="emit('update', { mode: ($event.target as HTMLSelectElement).value as 'text' | 'range' })"
      >
        <option value="text">{{ t.rules.removeText }}</option>
        <option value="range">{{ t.rules.removeRange }}</option>
      </select>
    </div>

    <template v-if="rule.mode === 'text'">
      <div class="form-row">
        <label class="form-label">{{ t.rules.text }}</label>
        <input
          class="form-input"
          type="text"
          :value="rule.text"
          :placeholder="t.rules.removePlaceholder"
          @input="emit('update', { text: ($event.target as HTMLInputElement).value })"
        />
      </div>
    </template>

    <template v-else>
      <div class="form-row">
        <label class="form-check">
          <input
            type="checkbox"
            :checked="rule.fromStart"
            @change="emit('update', { fromStart: ($event.target as HTMLInputElement).checked })"
          />
          {{ t.rules.fromStart }}
        </label>
      </div>
      <div v-if="rule.fromStart" class="form-row">
        <label class="form-label">{{ t.rules.count }}</label>
        <input
          class="form-input number"
          type="number"
          :value="rule.end"
          min="1"
          @input="emit('update', { end: parseInt(($event.target as HTMLInputElement).value) || 0 })"
        />
        <span class="form-hint">{{ t.rules.charsFromBeginning }}</span>
      </div>
      <template v-else>
        <div class="form-row">
          <label class="form-label">{{ t.rules.startPos }}</label>
          <input
            class="form-input number"
            type="number"
            :value="rule.start"
            min="0"
            @input="emit('update', { start: parseInt(($event.target as HTMLInputElement).value) || 0 })"
          />
        </div>
        <div class="form-row">
          <label class="form-label">{{ t.rules.endPos }}</label>
          <input
            class="form-input number"
            type="number"
            :value="rule.end"
            min="0"
            @input="emit('update', { end: parseInt(($event.target as HTMLInputElement).value) || 0 })"
          />
          <span class="form-hint">{{ t.rules.zeroIndexed }}</span>
        </div>
      </template>
    </template>
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
  width: 70px;
  flex: 0;
}

.form-input:focus, .form-select:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-light);
}

.form-hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  white-space: nowrap;
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
