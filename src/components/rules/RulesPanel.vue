<script setup lang="ts">
import { useRulesStore, generateId } from '../../stores/rules'
import type { RenameRule, RuleType } from '../../types/rule'
import { useI18n } from '../../i18n'
import RuleCard from './RuleCard.vue'
import { ref } from 'vue'

const rulesStore = useRulesStore()
const { t } = useI18n()
const showDropdown = ref(false)

const ruleTypes: Array<{ type: RuleType; labelKey: keyof typeof t.value.ruleTypes; icon: string }> = [
  { type: 'findReplace', labelKey: 'findReplace', icon: '🔍' },
  { type: 'prefixSuffix', labelKey: 'prefixSuffix', icon: '🏷️' },
  { type: 'numbering', labelKey: 'numbering', icon: '🔢' },
  { type: 'caseChange', labelKey: 'caseChange', icon: 'Aa' },
  { type: 'regexReplace', labelKey: 'regexReplace', icon: '.*' },
  { type: 'removeChars', labelKey: 'removeChars', icon: '✂️' },
  { type: 'insertText', labelKey: 'insertText', icon: '📝' },
]

function addRule(type: RuleType) {
  const baseId = generateId()
  showDropdown.value = false

  const defaults: Record<RuleType, any> = {
    findReplace: { type, enabled: true, find: '', replace: '', caseSensitive: false, replaceAll: true },
    prefixSuffix: { type, enabled: true, mode: 'prefix', text: '' },
    numbering: { type, enabled: true, mode: 'append', start: 1, step: 1, padding: 2, separator: '_' },
    caseChange: { type, enabled: true, mode: 'lower' },
    regexReplace: { type, enabled: true, pattern: '', replacement: '', flags: 'g' },
    removeChars: { type, enabled: true, mode: 'text', text: '' },
    insertText: { type, enabled: true, text: '', position: 0, fromEnd: false },
  }

  rulesStore.addRule({ id: baseId, ...defaults[type] } as RenameRule)
}

function handleDragStart(e: DragEvent, index: number) {
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index.toString())
  }
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
}

function handleDrop(e: DragEvent, toIndex: number) {
  e.preventDefault()
  const fromIndex = parseInt(e.dataTransfer?.getData('text/plain') || '')
  if (!isNaN(fromIndex) && fromIndex !== toIndex) {
    rulesStore.moveRule(fromIndex, toIndex)
  }
}
</script>

<template>
  <div class="rules-panel">
    <div class="rules-list">
      <TransitionGroup name="rule-list">
        <div
          v-for="(rule, index) in rulesStore.rules"
          :key="rule.id"
          class="rule-wrapper"
          :draggable="true"
          @dragstart="handleDragStart($event, index)"
          @dragover="handleDragOver($event)"
          @drop="handleDrop($event, index)"
        >
          <div class="drag-handle" :title="t.rulesPanel.dragToReorder">⠿</div>
          <RuleCard
            :rule="rule"
            :expanded="rulesStore.expandedRuleId === rule.id"
            @update="(u: Partial<RenameRule>) => rulesStore.updateRule(rule.id, u)"
            @toggle="rulesStore.toggleRule(rule.id)"
            @toggle-expand="rulesStore.toggleExpanded(rule.id)"
            @remove="rulesStore.removeRule(rule.id)"
          />
        </div>
      </TransitionGroup>

      <div v-if="rulesStore.rules.length === 0" class="rules-empty">
        <p>{{ t.rulesPanel.noRules }}</p>
        <p class="empty-hint">{{ t.rulesPanel.hint }}</p>
      </div>
    </div>

    <div class="add-rule-section">
      <div class="dropdown-wrapper">
        <button class="add-rule-btn" @click="showDropdown = !showDropdown">
          {{ t.rulesPanel.addRule }}
        </button>
        <div v-if="showDropdown" class="dropdown-menu">
          <button
            v-for="rt in ruleTypes"
            :key="rt.type"
            class="dropdown-item"
            @click="addRule(rt.type)"
          >
            <span class="dropdown-icon">{{ rt.icon }}</span>
            <span>{{ t.ruleTypes[rt.labelKey] }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rules-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.rules-list {
  flex: 1;
  overflow-y: auto;
}

.rule-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin-bottom: var(--spacing-sm);
}

.drag-handle {
  flex-shrink: 0;
  padding: var(--spacing-md) 2px;
  cursor: grab;
  color: var(--color-text-tertiary);
  font-size: 16px;
  user-select: none;
}

.drag-handle:active {
  cursor: grabbing;
}

.rules-empty {
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-md);
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
}

.empty-hint {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
}

.add-rule-section {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
  margin-top: auto;
}

.dropdown-wrapper {
  position: relative;
}

.add-rule-btn {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-accent);
  color: white;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: var(--font-size-sm);
  transition: background var(--transition-fast);
}

.add-rule-btn:hover {
  background: var(--color-accent-hover);
}

.dropdown-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: 4px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  text-align: left;
  transition: background var(--transition-fast);
}

.dropdown-item:hover {
  background: var(--color-bg-hover);
}

.dropdown-icon {
  width: 24px;
  text-align: center;
}

.rule-list-enter-active,
.rule-list-leave-active {
  transition: all var(--transition-normal);
}

.rule-list-enter-from,
.rule-list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
