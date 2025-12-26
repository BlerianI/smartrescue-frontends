<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="width: 540px; background: white; border-radius: 12px">
      <q-card-section class="q-pt-lg q-pb-md">
        <div class="text-h6" style="color: #5a6c7d; font-weight: 500">Neues Profil erstellen</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          :vertical="$q.screen.lt.sm"
          animated
          flat
          contracted
          class="compact-stepper"
        >
          <q-step
            :name="1"
            title="Persönliche Daten"
            icon="eva-person-outline"
            done-icon="eva-checkmark-outline"
            active-icon="eva-edit-outline"
            :done="step > 1"
            active-color="primary"
            done-color="positive"
          />

          <q-step
            :name="2"
            title="Körperdaten"
            icon="eva-heart-outline"
            done-icon="eva-checkmark-outline"
            active-icon="eva-edit-outline"
            :done="step > 2"
            active-color="primary"
            done-color="positive"
          />

          <q-step
            :name="3"
            title="Medizinische Daten"
            icon="monitor_heart"
            done-icon="eva-checkmark-outline"
            active-icon="eva-edit-outline"
            :done="step > 3"
            active-color="primary"
            done-color="positive"
          />

          <q-step
            :name="4"
            title="Bestätigung"
            icon="arrow_circle_up"
            done-icon="eva-checkmark-outline"
            active-icon="eva-edit-outline"
            active-color="primary"
            done-color="positive"
          />
        </q-stepper>
        <!-- Step 1: Persönliche Daten -->
        <StepPersonal v-if="step === 1" v-model="formData.personal" />

        <!-- Step 2: Doktor und Notfallkontakte -->
        <StepDoctor
          v-if="step === 2"
          v-model:doctor="formData.doctor"
          v-model:emergencyContacts="formData.emergencyContacts"
        />

        <!-- Step 3: Medizinische Daten -->
        <!-- Step 3: Medizinische Daten -->
        <StepMedical v-if="step === 3" v-model="formData.medical" />

        <!-- Step 4: Bestätigung -->
        <StepConfirm v-if="step === 4" :data="formData" />
      </q-card-section>

      <q-card-actions class="q-px-lg q-pb-lg q-pt-md">
        <q-btn
          v-if="step > 1"
          label="Zurück"
          flat
          class="col action-btn"
          style="background: #c9d4e1; color: #5a6c7d"
          @click="previousStep"
        />
        <q-btn
          v-else
          label="Abbrechen"
          flat
          class="col action-btn"
          style="background: #c9d4e1; color: #5a6c7d"
          @click="onClose"
        />
        <q-btn
          v-if="step < 4"
          label="Weiter"
          flat
          class="col action-btn"
          style="background: #9fb4cc; color: white"
          @click="nextStep"
        />
        <q-btn
          v-else
          label="Speichern"
          flat
          class="col action-btn"
          style="background: #9fb4cc; color: white"
          @click="saveProfile"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, reactive } from 'vue'
import { useUserStore } from 'src/stores/userStore'
import StepPersonal from '../components/StepPersonal.vue'
import StepMedical from '../components/StepMedical.vue'
import StepDoctor from '../components/StepDoctor.vue'
import StepConfirm from 'src/components/StepConfirm.vue'

const props = defineProps({
  modelValue: Boolean,
  userId: String,
})

const store = useUserStore()
const emit = defineEmits(['update:modelValue', 'profile-saved'])

const isOpen = ref(props.modelValue)
const step = ref(1)

watch(
  () => props.modelValue,
  (v) => (isOpen.value = v),
)
watch(isOpen, (v) => emit('update:modelValue', v))

const onClose = () => {
  emit('update:modelValue', false)
}

const formData = reactive({
  personal: {
    first_name: '',
    last_name: '',
    birthdate: '',
    gender: '',
    street: '',
    housenumber: '',
    postalcode: '',
    city: '',
    weight: '',
    height: '',
    bloodtype: '',
    avatar: null,
  },

  doctor: {
    first_name: '',
    last_name: '',
    street: '',
    housenumber: '',
    postalcode: '',
    city: '',
    phone: '',
    title: '',
    specialty: '',
  },

  emergencyContacts: [],

  medical: {
    key_info: '',
    medications: [],
    conditions: [],
    allergies: [],
    documents: [],
  },
})
const nextStep = () => step.value < 4 && step.value++
const previousStep = () => step.value > 1 && step.value--

const saveProfile = async () => {
  try {
    await store.saveProfileWithAllData(props.userId)
    emit('profile-saved')
    emit('update:modelValue', false)
  } catch (err) {
    console.error('Fehler beim Speichern:', err)
  }
}
</script>

<style scoped>
.field-label {
  display: block;
  font-size: 11px;
  color: #a0aebb;
  margin-bottom: 6px;
  text-transform: uppercase;
  font-weight: 500;
}

.inputs :deep(.q-field__control) {
  border: 1px solid #b8c5d6;
  border-radius: 6px;
  min-height: 40px;
}

.inputs :deep(.q-field__control):before {
  border: none;
}

.action-btn {
  border: 1px solid #b8c5d6;
  border-radius: 6px;
  font-weight: 500;
  padding: 12px 24px;
  text-transform: none;
}

/* Compact Stepper Styling */
.compact-stepper :deep(.q-stepper__header) {
  border-radius: 8px;
  background: #f5f7fa;
  padding: 12px;
}

.compact-stepper :deep(.q-stepper__tab) {
  padding: 8px 12px;
  min-height: auto;
}

.compact-stepper :deep(.q-stepper__dot) {
  width: 48px;
  height: 48px;
  font-size: 18px;
  background: #b8c5d6 !important;
}

.compact-stepper :deep(.q-stepper__dot .q-icon) {
  font-size: 24px;
}

.compact-stepper :deep(.q-stepper__dot--active) {
  background: #9fb4cc !important;
}

.compact-stepper :deep(.q-stepper__dot--done) {
  background: #9fb4cc !important;
}

.compact-stepper :deep(.q-stepper__title) {
  font-size: 12px;
  color: #5a6c7d;
  font-weight: 500;
}

.compact-stepper :deep(.q-stepper__line) {
  background: #b8c5d6 !important;
}

.compact-stepper :deep(.q-stepper__line--active) {
  background: #9fb4cc !important;
}
</style>
