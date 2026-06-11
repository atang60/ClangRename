import type { PrefixSuffixRule } from '../../types/rule'

export function applyPrefixSuffix(name: string, rule: PrefixSuffixRule): string {
  if (!rule.text) return name

  if (rule.mode === 'prefix') {
    return rule.text + name
  } else {
    return name + rule.text
  }
}
