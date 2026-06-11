import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RenameRule, RenameContext } from '../types/rule'

export const useRulesStore = defineStore('rules', () => {
  const rules = ref<RenameRule[]>([])
  const expandedRuleId = ref<string | null>(null)

  const enabledRules = computed(() =>
    rules.value.filter(r => r.enabled)
  )

  const hasRules = computed(() => rules.value.length > 0)

  function addRule(rule: RenameRule) {
    rules.value.push(rule)
    expandedRuleId.value = rule.id
  }

  function removeRule(id: string) {
    const idx = rules.value.findIndex(r => r.id === id)
    if (idx !== -1) {
      rules.value.splice(idx, 1)
    }
    if (expandedRuleId.value === id) {
      expandedRuleId.value = null
    }
  }

  function updateRule(id: string, updates: Partial<RenameRule>) {
    const idx = rules.value.findIndex(r => r.id === id)
    if (idx !== -1) {
      rules.value[idx] = { ...rules.value[idx], ...updates } as RenameRule
    }
  }

  function toggleRule(id: string) {
    const rule = rules.value.find(r => r.id === id)
    if (rule) {
      rule.enabled = !rule.enabled
    }
  }

  function toggleExpanded(id: string) {
    expandedRuleId.value = expandedRuleId.value === id ? null : id
  }

  function moveRule(fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= rules.value.length) return
    const [item] = rules.value.splice(fromIndex, 1)
    rules.value.splice(toIndex, 0, item)
  }

  function clearRules() {
    rules.value = []
    expandedRuleId.value = null
  }

  function exportRules(): RenameRule[] {
    return JSON.parse(JSON.stringify(rules.value))
  }

  function importRules(imported: RenameRule[]) {
    rules.value = imported.map(r => ({ ...r, id: generateId() }))
  }

  return {
    rules,
    expandedRuleId,
    enabledRules,
    hasRules,
    addRule,
    removeRule,
    updateRule,
    toggleRule,
    toggleExpanded,
    moveRule,
    clearRules,
    exportRules,
    importRules
  }
})

let idCounter = 0
export function generateId(): string {
  return `rule_${Date.now()}_${++idCounter}`
}
