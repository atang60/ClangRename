<script setup lang="ts">
import RulesPanel from '../rules/RulesPanel.vue'
import SponsorSection from '../common/SponsorSection.vue'
import { useI18n } from '../../i18n'
const { t } = useI18n()
</script>

<template>
  <aside class="app-sidebar">
    <div class="sidebar-header">
      <h3 class="sidebar-title">{{ t.sidebar.title }}</h3>
    </div>
    <div class="sidebar-content">
      <RulesPanel />
      <SponsorSection />
    </div>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: var(--sidebar-width);
  min-width: 300px;
  background: var(--color-bg-secondary);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.sidebar-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
}
</style>
