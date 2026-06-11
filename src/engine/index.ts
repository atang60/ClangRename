import type { FileInfo } from '../types/file'
import type { RenameRule, RenameContext } from '../types/rule'
import { applyFindReplace } from './rules/find-replace'
import { applyPrefixSuffix } from './rules/prefix-suffix'
import { applyNumbering } from './rules/numbering'
import { applyCaseChange } from './rules/case-change'
import { applyRegexReplace } from './rules/regex-replace'
import { applyRemoveChars } from './rules/remove-chars'
import { applyInsertText } from './rules/insert-text'

export interface RenameResult {
  originalName: string
  newName: string
}

export function applyRules(files: FileInfo[], rules: RenameRule[]): RenameResult[] {
  const context: RenameContext = {
    index: 0,
    total: files.length,
    counters: new Map()
  }

  return files.map((file, i) => {
    context.index = i
    // Apply rules to full filename including extension
    let newName = file.name

    for (const rule of rules) {
      if (!rule.enabled) continue

      switch (rule.type) {
        case 'findReplace':
          newName = applyFindReplace(newName, rule)
          break
        case 'prefixSuffix':
          newName = applyPrefixSuffix(newName, rule)
          break
        case 'numbering':
          newName = applyNumbering(newName, rule, context)
          break
        case 'caseChange':
          newName = applyCaseChange(newName, rule)
          break
        case 'regexReplace':
          newName = applyRegexReplace(newName, rule)
          break
        case 'removeChars':
          newName = applyRemoveChars(newName, rule)
          break
        case 'insertText':
          newName = applyInsertText(newName, rule)
          break
      }
    }

    return {
      originalName: file.name,
      newName
    }
  })
}

export function getConflicts(results: RenameResult[]): string[] {
  const nameCounts = new Map<string, number>()
  for (const r of results) {
    nameCounts.set(r.newName, (nameCounts.get(r.newName) || 0) + 1)
  }
  return [...nameCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([name]) => name)
}
