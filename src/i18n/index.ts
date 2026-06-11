import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import zh from './zh'
import en from './en'
import type { Translations } from './zh'

export function useI18n() {
  const settings = useSettingsStore()
  const t = computed<Translations>(() => settings.language === 'zh' ? zh : en)
  const locale = computed(() => settings.language)
  return { t, locale }
}

export type { Translations }
