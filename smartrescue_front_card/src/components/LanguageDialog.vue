<template>
  <q-dialog :model-value="modelValue" persistent @update:model-value="emit('update:modelValue', $event)">
    <q-card class="lang-card">
      <q-card-section class="text-center q-pb-none">
        <q-icon name="translate" size="48px" color="negative" />
        <div class="text-h6 q-mt-sm text-weight-bold">{{ t('language_dialog.title') }}</div>
        <div class="text-body2 text-grey-7 q-mt-xs">
          {{ subtitleKey ? t(subtitleKey) : t('language_dialog.subtitle') }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-sm">
        <div class="lang-grid">
          <q-btn
            v-for="code in SUPPORTED_LOCALES"
            :key="code"
            unelevated
            no-caps
            class="lang-btn"
            :class="{ 'lang-btn-active': locale === code }"
            @click="onSelect(code)"
          >
            <span class="lang-code">{{ code.toUpperCase() }}</span>
            <span class="lang-name">{{ t('languages.' + code) }}</span>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useI18n } from '../i18n'
import { SUPPORTED_LOCALES } from '../i18n'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  subtitleKey: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue', 'selected'])

const { t, locale, setLocale } = useI18n()

const onSelect = (code) => {
  setLocale(code)
  emit('selected', code)
  emit('update:modelValue', false)
}

void props
</script>

<style scoped>
.lang-card {
  width: 90vw;
  max-width: 380px;
  border-radius: 20px;
}
.lang-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.lang-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 10px 14px;
  background: #ffffff;
  border: 1px solid #fee2e2;
  border-radius: 12px;
  color: #1e293b;
  min-height: 64px;
}
.lang-btn-active {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #ffffff;
  border-color: transparent;
}
.lang-code {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0.7;
}
.lang-name {
  font-size: 15px;
  font-weight: 600;
}
</style>
