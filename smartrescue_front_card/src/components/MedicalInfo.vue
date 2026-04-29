<template>
  <q-card
    class="container q-px-md q-py-md q-mt-md column"
    style="
      max-width: 400px;
      background-color: #ffffff;
      border-radius: 20px;
      box-shadow: 0 10px 30px -5px rgba(220, 38, 38, 0.1);
    "
  >
    <q-card-section>
      <div class="title text-weight-medium" style="color: #1e293b">{{ t('medical.title') }}</div>
    </q-card-section>

    <q-card-section class="q-pt-xs">
      <div style="color: #64748b; font-size: 16px">{{ t('medical.diseases') }}</div>
      <div class="q-mt-sm" v-if="deaseses && deaseses.length > 0">
        <q-chip
          v-for="deases of deaseses"
          :key="deases"
          :style="{
            'background-color': '#fee2e2',
            color: '#991b1b',
            'font-size': '16px',
            'border-radius': '10px',
          }"
          class="q-mr-sm q-mb-sm"
        >
          {{ tr(deases) }}
        </q-chip>
      </div>
      <div v-else class="q-mt-xs text-italic" style="color: #94a3b8">{{ t('common.no_data') }}</div>
    </q-card-section>

    <q-card-section class="q-pt-xs">
      <div style="color: #64748b; font-size: 16px">{{ t('medical.allergies') }}</div>
      <div class="q-mt-sm" v-if="allergies && allergies.length > 0">
        <q-chip
          v-for="allergy of allergies"
          :key="allergy"
          :style="{
            'background-color': '#ffedd5',
            color: '#c2410c',
            'font-size': '16px',
            'border-radius': '10px',
          }"
          class="q-mr-sm q-mb-sm"
        >
          {{ tr(allergy) }}
        </q-chip>
      </div>
      <div v-else class="q-mt-xs text-italic" style="color: #94a3b8">{{ t('common.no_data') }}</div>
    </q-card-section>

    <q-card-section class="q-pt-xs" style="max-width: 400px">
      <div style="color: #64748b; font-size: 16px">{{ t('medical.medications') }}</div>

      <div class="q-mt-sm" v-if="medications && medications.length > 0">
        <q-chip
          v-for="medication of medications"
          :key="medication"
          style="
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2);
          "
          class="q-mb-sm"
        >
          {{ tr(medication.name) }} | {{ tr(medication.frequency) }}
        </q-chip>
      </div>
      <div v-else class="q-mt-xs text-italic" style="color: #94a3b8">{{ t('common.no_data') }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useI18n } from '../i18n'
import { useTranslator } from '../i18n/translator'
const { t } = useI18n()
const { tr } = useTranslator()
defineProps({
  deaseses: Array,
  allergies: Array,
  medications: Array,
})
</script>

<style lang="scss" scoped>
.container {
  width: calc(100% - 32px);
  border-radius: 15px;
}
.title {
  font-size: 18px;
}
</style>
