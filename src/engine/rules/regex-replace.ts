import type { RegexReplaceRule } from '../../types/rule'

export function applyRegexReplace(name: string, rule: RegexReplaceRule): string {
  if (!rule.pattern) return name

  try {
    const regex = new RegExp(rule.pattern, rule.flags || 'g')
    return name.replace(regex, rule.replacement || '')
  } catch {
    // Invalid regex — return unchanged
    return name
  }
}
