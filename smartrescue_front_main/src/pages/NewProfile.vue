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
        <StepPersonal
          v-if="step === 1"
          v-model:personal="formData.personal"
          ref="stepPersonalRef"
        />

        <!-- Step 2: Doktor und Notfallkontakte -->
        <StepDoctor
          v-if="step === 2"
          v-model:doctor="formData.doctor"
          v-model:emergencyContacts="formData.emergencyContacts"
          ref="stepDoctorRef"
        />

        <!-- Step 3: Medizinische Daten -->
        <!-- Step 3: Medizinische Daten -->
        <StepMedical v-if="step === 3" v-model:medical="formData.medical" ref="stepMedicalRef" />

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
import { ref, watch, reactive, toRaw } from 'vue'
import { useUserStore } from 'src/stores/userStore'
import StepPersonal from '../components/StepPersonal.vue'
import StepMedical from '../components/StepMedical.vue'
import StepDoctor from '../components/StepDoctor.vue'
import StepConfirm from 'src/components/StepConfirm.vue'

const props = defineProps({
  modelValue: Boolean,
  userId: String,
})

const emit = defineEmits(['update:modelValue', 'profile-saved'])
const userStore = useUserStore()
const isOpen = ref(props.modelValue)
const step = ref(1)
const stepPersonalRef = ref(null)
const stepDoctorRef = ref(null)
const stepMedicalRef = ref(null)

watch(
  () => props.modelValue,
  (v) => (isOpen.value = v),
)
watch(isOpen, (v) => emit('update:modelValue', v))

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
    avatar_url: '',
  },

  doctor: {
    first_name: '',
    last_name: '',
    street: '',
    city: '',
    housenumber: '',
    postalcode: '',
    specialty: '',
    phone_number: '',
    title: '',
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

async function saveProfile() {
  try {
    // Fallback for empty avatar_url
    if (!formData.personal.avatar_url || formData.personal.avatar_url.trim() === '') {
      formData.personal.avatar_url = 'https://img.freepik.com/vektoren-premium/vektorflat-illustration-in-grauen-farben-avatar-benutzerprofil-person-ikonen-geschlechtsneutrale-silhouette-profilbild-geeignet-fuer-social-media-profilen-ikonen-bildschirmschutz-und-als-vorlagex9_719432-848.jpg';
    }
    const personalData = toRaw(formData.personal);
    const doctorData = toRaw(formData.doctor);
    const emergencyContactsData = toRaw(formData.emergencyContacts);
    const medicalData = toRaw(formData.medical);
    const medicationsData = toRaw(formData.medical?.medications || []);
    const conditionsData = toRaw(formData.medical?.conditions || []);
    const allergiesData = toRaw(formData.medical?.allergies || []);
    //const documentsData = toRaw(formData.medical?.documents || []);
    
    // Logging check  
    console.log('START: saveProfile called');

    // Save Personal Data
    const savePersonal = await userStore.savePersonal(props.userId, personalData)
    console.log('savePersonal', savePersonal); 

    // Save Doctor Data
    // Save Doctor Data
    const saveDoctor = await userStore.saveDoctor(savePersonal.profile_id, doctorData);
    console.log('saveDoctor', saveDoctor); 

    // Save Emergency Contacts if needed
    if (formData.emergencyContacts && formData.emergencyContacts.length > 0) {
        const saveEmergency = await userStore.saveEmergencyContacts(savePersonal.profile_id, emergencyContactsData);
        console.log('saveEmergency', saveEmergency); 
    }

    // Save Medical Data
    const saveMedical = await userStore.saveMeddata(savePersonal.profile_id, medicalData); 
    console.log('saveMedical', saveMedical); 

    //Save Medication
    const saveMedication = await userStore.saveMedication(saveMedical.med_id, medicationsData); 
    console.log('saveMedication', saveMedication); 

    //Save Condittaions 
    const saveConditions = await userStore.saveConditions(saveMedical.med_id, conditionsData); 
    console.log('saveConditions', saveConditions); 

    //Save Allergies
    const saveAllergies = await userStore.saveAllergies(saveMedical.med_id, allergiesData); 
    console.log('saveAllergies', saveAllergies); 

    //Save Documents
    //console.log('documentsData', documentsData); 
    //const saveDocuments = await userStore.saveDocuments(saveMedical.med_id, documentsData); 
    //console.log('saveDocuments', saveDocuments); 

    emit('profile-saved')
  } catch (error) {
    console.error('ERROR in saveProfile:', error);
  }
}
async function nextStep() {
  if (step.value === 1) {
    const isValid = await stepPersonalRef.value.validate()
    if (!isValid) return
  }
  if (step.value === 2) {
    const isValid = await stepDoctorRef.value.validate()
    if (!isValid) return
  }
  if (step.value === 3) {
    const isValid = await stepMedicalRef.value.validate()
    if (!isValid) return
  }
  step.value < 4 && step.value++
}

function previousStep() {
  step.value > 1 && step.value--
}
const onClose = () => {
  emit('update:modelValue', false)
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
