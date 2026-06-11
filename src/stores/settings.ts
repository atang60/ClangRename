import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<'light' | 'dark'>('light')
  const language = ref<'en' | 'zh'>('zh')

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyTheme()
  }

  function toggleLanguage() {
    language.value = language.value === 'zh' ? 'en' : 'zh'
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function initTheme() {
    applyTheme()
  }

  return {
    theme,
    language,
    toggleTheme,
    toggleLanguage,
    initTheme
  }
})
