import type { FindReplaceRule } from '../../types/rule'

export function applyFindReplace(name: string, rule: FindReplaceRule): string {
  if (!rule.find) return name

  const flags = rule.caseSensitive ? 'g' : 'gi'
  const escaped = escapeRegExp(rule.find)

  if (rule.replaceAll) {
    return name.replace(new RegExp(escaped, flags), rule.replace)
  } else {
    const regex = rule.caseSensitive
      ? new RegExp(escaped)
      : new RegExp(escaped, 'i')
    return name.replace(regex, rule.replace)
  }
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
