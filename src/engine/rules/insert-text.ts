import type { InsertTextRule } from '../../types/rule'

export function applyInsertText(name: string, rule: InsertTextRule): string {
  if (!rule.text) return name

  let position = rule.position
  if (rule.fromEnd) {
    position = name.length - position
  }

  // Clamp position
  if (position < 0) position = 0
  if (position > name.length) position = name.length

  return name.substring(0, position) + rule.text + name.substring(position)
}
