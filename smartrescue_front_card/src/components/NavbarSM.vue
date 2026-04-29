<template>
  <div>
    <q-toolbar class="text-white bar">
      <q-img src="LogoIconWeiss.svg" class="logo"></q-img>

      <q-toolbar-title class="text-bold text-h6 title">Smart Rescue</q-toolbar-title>

      <q-btn flat round dense class="lang-trigger" @click="dialogOpen = true">
        <q-icon name="translate" />
        <span class="lang-label">{{ locale.toUpperCase() }}</span>
      </q-btn>
    </q-toolbar>

    <LanguageDialog v-model="dialogOpen" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n'
import LanguageDialog from './LanguageDialog.vue'

const { locale } = useI18n()
const dialogOpen = ref(false)
</script>

<style scoped>
.bar {
  min-height: 70px;
  padding: 0 28px;
  width: 100%;
  background: #dc2626;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}
.logo {
  height: 36px;
  width: 36px;
  object-fit: contain;
}
.title {
  padding-left: 1.2rem;
  letter-spacing: 1px;
  font-size: 22px;
}
.lang-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
}
.lang-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-left: 4px;
}
</style>
