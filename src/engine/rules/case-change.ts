import type { CaseChangeRule } from '../../types/rule'

export function applyCaseChange(name: string, rule: CaseChangeRule): string {
  switch (rule.mode) {
    case 'upper':
      return name.toUpperCase()
    case 'lower':
      return name.toLowerCase()
    case 'title':
      return name.replace(/\b\w/g, c => c.toUpperCase()).replace(/\s+/g, ' ').trim()
    case 'sentence':
      if (name.length === 0) return name
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    default:
      return name
  }
}
