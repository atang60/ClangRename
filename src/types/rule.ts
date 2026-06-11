export interface BaseRule {
  id: string
  type: RuleType
  enabled: boolean
}

export type RuleType =
  | 'findReplace'
  | 'prefixSuffix'
  | 'numbering'
  | 'caseChange'
  | 'regexReplace'
  | 'removeChars'
  | 'insertText'

export interface FindReplaceRule extends BaseRule {
  type: 'findReplace'
  find: string
  replace: string
  caseSensitive: boolean
  replaceAll: boolean
}

export interface PrefixSuffixRule extends BaseRule {
  type: 'prefixSuffix'
  mode: 'prefix' | 'suffix'
  text: string
}

export interface NumberingRule extends BaseRule {
  type: 'numbering'
  mode: 'prepend' | 'append' | 'replace'
  start: number
  step: number
  padding: number
  separator: string
}

export interface CaseChangeRule extends BaseRule {
  type: 'caseChange'
  mode: 'upper' | 'lower' | 'title' | 'sentence'
}

export interface RegexReplaceRule extends BaseRule {
  type: 'regexReplace'
  pattern: string
  replacement: string
  flags: string
}

export interface RemoveCharsRule extends BaseRule {
  type: 'removeChars'
  mode: 'range' | 'text'
  text?: string
  start?: number
  end?: number
  fromStart?: boolean
}

export interface InsertTextRule extends BaseRule {
  type: 'insertText'
  text: string
  position: number
  fromEnd: boolean
}

export type RenameRule =
  | FindReplaceRule
  | PrefixSuffixRule
  | NumberingRule
  | CaseChangeRule
  | RegexReplaceRule
  | RemoveCharsRule
  | InsertTextRule

export interface RenameContext {
  index: number
  total: number
  counters: Map<string, number>
}
