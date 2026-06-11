<script setup lang="ts">
import { useI18n } from '../../i18n'
import weixinQr from '../../assets/images/weixin.png'

const { t } = useI18n()
</script>

<template>
  <div class="sponsor-section">
    <div class="sponsor-divider"></div>
    <h4 class="sponsor-title">{{ t.sponsor.title }}</h4>
    <div class="sponsor-qr-wrapper">
      <img :src="weixinQr" alt="WeChat Pay QR Code" class="sponsor-qr" />
    </div>
    <p class="sponsor-message">{{ t.sponsor.message }}</p>
    <p class="sponsor-thanks">{{ t.sponsor.thankYou }}</p>
  </div>
</template>

<style scoped>
.sponsor-section {
  padding: var(--spacing-lg) var(--spacing-md) var(--spacing-xl);
  text-align: center;
  flex-shrink: 0;
}

.sponsor-divider {
  height: 1px;
  background: var(--color-border-light);
  margin-bottom: var(--spacing-lg);
}

.sponsor-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.sponsor-qr-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.sponsor-qr {
  width: 160px;
  height: 160px;
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-border-light);
  object-fit: contain;
  background: #fff;
  padding: 4px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.sponsor-qr:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.sponsor-message {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  line-height: 1.6;
  margin-bottom: var(--spacing-xs);
}

.sponsor-thanks {
  font-size: var(--font-size-xs);
  color: var(--color-accent);
  font-weight: 500;
}
</style>
