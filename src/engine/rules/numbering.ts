import type { NumberingRule, RenameContext } from '../../types/rule'

export function applyNumbering(name: string, rule: NumberingRule, context: RenameContext): string {
  const counterKey = rule.id
  let counter = context.counters.get(counterKey) ?? rule.start

  const num = counter.toString().padStart(rule.padding, '0')
  counter += rule.step
  context.counters.set(counterKey, counter)

  const formatted = rule.separator ? `${rule.separator}${num}` : num

  switch (rule.mode) {
    case 'prepend':
      return `${num}${rule.separator ? rule.separator : ''}${name}`
    case 'append':
      return `${name}${formatted}`
    case 'replace':
      return num
    default:
      return name
  }
}
