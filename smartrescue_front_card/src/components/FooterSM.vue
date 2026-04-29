<template>
  <div>
    <q-toolbar class="footer">
      <q-toolbar-title class="title">{{ t('footer.last_updated') }}: {{ date }}</q-toolbar-title>
    </q-toolbar>
  </div>
</template>

<script setup>
import { useI18n } from '../i18n'
const { t } = useI18n()
defineProps({
  date: String,
})
</script>

<style scoped>
.footer {
  height: 50px;
  width: 100%;
  background: #dc2626;
}
.title {
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
</style>
