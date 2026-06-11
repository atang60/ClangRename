import type { RemoveCharsRule } from '../../types/rule'

export function applyRemoveChars(name: string, rule: RemoveCharsRule): string {
  if (rule.mode === 'text' && rule.text) {
    // Remove specific text
    const escaped = escapeRegExp(rule.text)
    return name.replace(new RegExp(escaped, 'g'), '')
  }

  if (rule.mode === 'range') {
    const start = rule.start ?? 0
    const end = rule.end ?? name.length

    if (rule.fromStart) {
      // Remove from start of name
      return name.substring(end)
    } else {
      // Remove a specific position range
      if (start < 0 || end > name.length || start >= end) return name
      return name.substring(0, start) + name.substring(end)
    }
  }

  return name
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
