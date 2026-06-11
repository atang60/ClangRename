<script setup lang="ts">
import type { RenameRule } from '../../types/rule'
import { useI18n } from '../../i18n'
import { computed, markRaw } from 'vue'
import FindReplaceRule from './FindReplaceRule.vue'
import PrefixSuffixRule from './PrefixSuffixRule.vue'
import NumberingRule from './NumberingRule.vue'
import CaseChangeRule from './CaseChangeRule.vue'
import RegexReplaceRule from './RegexReplaceRule.vue'
import RemoveCharsRule from './RemoveCharsRule.vue'
import InsertTextRule from './InsertTextRule.vue'

const props = defineProps<{
  rule: RenameRule
  expanded: boolean
}>()

const emit = defineEmits<{
  (e: 'update', updates: Partial<RenameRule>): void
  (e: 'toggle'): void
  (e: 'toggleExpand'): void
  (e: 'remove'): void
}>()

const { t } = useI18n()

const componentMap: Record<string, any> = {
  findReplace: markRaw(FindReplaceRule),
  prefixSuffix: markRaw(PrefixSuffixRule),
  numbering: markRaw(NumberingRule),
  caseChange: markRaw(CaseChangeRule),
  regexReplace: markRaw(RegexReplaceRule),
  removeChars: markRaw(RemoveCharsRule),
  insertText: markRaw(InsertTextRule),
}

const ruleComponent = computed(() => componentMap[props.rule.type])

const typeLabel = computed(() => {
  const keyMap: Record<string, keyof typeof t.value.ruleTypes> = {
    findReplace: 'findReplace',
    prefixSuffix: 'prefixSuffix',
    numbering: 'numbering',
    caseChange: 'caseChange',
    regexReplace: 'regexReplace',
    removeChars: 'removeChars',
    insertText: 'insertText',
  }
  return t.value.ruleTypes[keyMap[props.rule.type]] || props.rule.type
})
</script>

<template>
  <div class="rule-card" :class="{ expanded, disabled: !rule.enabled }">
    <div class="rule-card-header" @click="emit('toggleExpand')">
      <label class="rule-enable" @click.stop>
        <input type="checkbox" :checked="rule.enabled" @change="emit('toggle')" />
      </label>
      <span class="rule-type-label">{{ typeLabel }}</span>
      <span v-if="!rule.enabled" class="rule-disabled-badge">{{ t.ruleCard.disabled }}</span>
      <div class="rule-actions">
        <button class="rule-action-btn" @click.stop="emit('toggleExpand')" :title="expanded ? t.ruleCard.collapse : t.ruleCard.expand">
          {{ expanded ? '▲' : '▼' }}
        </button>
        <button class="rule-action-btn remove" @click.stop="emit('remove')" :title="t.ruleCard.removeRule">
          ✕
        </button>
      </div>
    </div>

    <div v-if="expanded" class="rule-card-body">
      <component
        :is="ruleComponent"
        :rule="rule"
        @update="(u: Partial<RenameRule>) => emit('update', u)"
      />
    </div>
  </div>
</template>

<style scoped>
.rule-card {
  flex: 1;
  min-width: 0;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.rule-card:hover {
  border-color: var(--color-border);
}

.rule-card.disabled {
  opacity: 0.6;
}

.rule-card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  user-select: none;
}

.rule-enable input {
  accent-color: var(--color-accent);
  cursor: pointer;
}

.rule-type-label {
  flex: 1;
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.rule-disabled-badge {
  font-size: 10px;
  padding: 1px 6px;
  background: var(--color-bg-tertiary);
  border-radius: 10px;
  color: var(--color-text-tertiary);
}

.rule-actions {
  display: flex;
  gap: 2px;
}

.rule-action-btn {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-size: 10px;
  color: var(--color-text-tertiary);
}

.rule-action-btn:hover {
  background: var(--color-bg-hover);
}

.rule-action-btn.remove:hover {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

.rule-card-body {
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
}
</style>
