<script setup lang="ts">
import { useFilesStore } from '../../stores/files'
import { useRulesStore } from '../../stores/rules'
import { useRenameStore } from '../../stores/rename'
import { useSettingsStore } from '../../stores/settings'
import { useI18n } from '../../i18n'
import { ref } from 'vue'

const filesStore = useFilesStore()
const rulesStore = useRulesStore()
const renameStore = useRenameStore()
const settingsStore = useSettingsStore()
const { t } = useI18n()

const emit = defineEmits<{
  (e: 'confirmRename'): void
}>()

const filterText = ref('')

async function handleAddFiles() {
  if (!window.electronAPI) return
  const files = await window.electronAPI.selectFiles()
  filesStore.addFiles(files)
}

async function handleAddFolder() {
  if (!window.electronAPI) return
  const files = await window.electronAPI.selectDirectory()
  filesStore.addFiles(files)
}

function handleClear() {
  filesStore.clearFiles()
  rulesStore.clearRules()
}

async function handleUndo() {
  await renameStore.undoRename()
}

function handleExport() {
  const config = rulesStore.exportRules()
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'rename-profile.json'
  a.click()
  URL.revokeObjectURL(url)
}

function handleImport() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    const text = await file.text()
    try {
      const config = JSON.parse(text)
      if (Array.isArray(config)) {
        rulesStore.importRules(config)
      }
    } catch {
      alert(t.value.header.invalidConfig)
    }
  }
  input.click()
}

function applyFilter() {
  filesStore.filter = filterText.value
}
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <span class="app-title">🔄 {{ t.app.title }}</span>
    </div>

    <div class="header-center">
      <button class="header-btn" @click="handleAddFiles" :title="t.header.addFiles">
        📂 {{ t.header.selectFiles }}
      </button>
      <button class="header-btn" @click="handleAddFolder" :title="t.header.addFolder">
        📁 {{ t.header.selectFolder }}
      </button>
      <button
        class="header-btn"
        @click="handleClear"
        :disabled="filesStore.files.length === 0"
        :title="t.header.clearAll"
      >
        🗑️ {{ t.header.clear }}
      </button>

      <div class="header-divider"></div>

      <button
        class="header-btn"
        @click="handleUndo"
        :title="t.header.undoLastRename"
      >
        ↩️ {{ t.header.undo }}
      </button>

      <div class="header-divider"></div>

      <button class="header-btn" @click="handleImport" :title="t.header.importRules">
        📥 {{ t.header.import }}
      </button>
      <button
        class="header-btn"
        @click="handleExport"
        :disabled="!rulesStore.hasRules"
        :title="t.header.exportRules"
      >
        📤 {{ t.header.export }}
      </button>
    </div>

    <div class="header-right">
      <input
        v-model="filterText"
        type="text"
        class="filter-input"
        :placeholder="t.header.filterPlaceholder"
        @input="applyFilter"
      />
      <button class="header-btn" @click="settingsStore.toggleLanguage()" :title="t.header.switchLang">
        🌐 {{ settingsStore.language === 'zh' ? 'EN' : '中' }}
      </button>
      <button class="header-btn" @click="settingsStore.toggleTheme()" :title="t.header.toggleTheme">
        {{ settingsStore.theme === 'light' ? '🌙' : '☀️' }}
      </button>
      <button
        class="header-btn primary"
        :disabled="!renameStore.canApply"
        @click="emit('confirmRename')"
        :title="t.header.applyRename"
      >
        ✅ {{ t.header.rename }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
  gap: var(--spacing-md);
}

.header-left, .header-center, .header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.header-center {
  flex: 1;
  justify-content: center;
}

.app-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-accent);
  white-space: nowrap;
}

.header-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.header-btn:hover:not(:disabled) {
  background: var(--color-bg-hover);
  color: var(--color-text-primary);
}

.header-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.header-btn.primary {
  background: var(--color-accent);
  color: white;
  padding: var(--spacing-xs) var(--spacing-md);
  font-weight: 600;
}

.header-btn.primary:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

.header-divider {
  width: 1px;
  height: 20px;
  background: var(--color-border);
  margin: 0 var(--spacing-xs);
}

.filter-input {
  width: 160px;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-primary);
  font-size: var(--font-size-sm);
  outline: none;
  transition: border-color var(--transition-fast);
}

.filter-input:focus {
  border-color: var(--color-accent);
}
</style>
