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
  profileId: String,
})

const emit = defineEmits(['update:modelValue', 'profile-saved'])
const userStore = useUserStore()
const isOpen = ref(props.modelValue)
const step = ref(1)
const stepPersonalRef = ref(null)
const stepDoctorRef = ref(null)
const stepMedicalRef = ref(null)
const isEditMode = ref(false)

// IDs for updates
const loadedIds = reactive({
  profile_id: null,
  doctor_id: null,
  med_id: null,
})

watch(
  () => props.modelValue,
  async (v) => {
    isOpen.value = v
    if (v) {
      step.value = 1
      if (props.profileId) {
        isEditMode.value = true
        await loadProfileData(props.profileId)
      } else {
        isEditMode.value = false
        resetForm()
      }
    }
  },
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

function resetForm() {
  // Reset personal
  Object.keys(formData.personal).forEach(key => formData.personal[key] = '')
  // Reset doctor
  Object.keys(formData.doctor).forEach(key => formData.doctor[key] = '')
  // Reset arrays
  formData.emergencyContacts = []
  formData.medical.key_info = ''
  formData.medical.medications = []
  formData.medical.conditions = []
  formData.medical.allergies = []
  formData.medical.documents = []
  
  loadedIds.profile_id = null
  loadedIds.doctor_id = null
  loadedIds.med_id = null
}

async function loadProfileData(id) {
  try {
    const data = await userStore.getProfileDetails(id)
    if (!data) return

    // Populate Personal
    Object.assign(formData.personal, data.personal)
    // Map backend snake_case to frontend camelCase/simple
    if (data.personal.house_number) formData.personal.housenumber = data.personal.house_number
    if (data.personal.postal_code) formData.personal.postalcode = data.personal.postal_code
    if (data.personal.blood_type) formData.personal.bloodtype = data.personal.blood_type
    // Ensure avatar_url is mapped if present (though Object.assign should handle it, explicit is safer if backend uses snake_case and frontend usage varies)
    if (data.personal.avatar_url) formData.personal.avatar_url = data.personal.avatar_url

    // Fix Date format if needed (Postgres returns full ISO string)
    if (formData.personal.birthdate) {
      formData.personal.birthdate = formData.personal.birthdate.split('T')[0]
    }

    // Populate Doctor
    Object.assign(formData.doctor, data.doctor)
    // Map backend snake_case to frontend camelCase/simple
    if (data.doctor.house_number) formData.doctor.housenumber = data.doctor.house_number
    if (data.doctor.postal_code) formData.doctor.postalcode = data.doctor.postal_code
    
    // Populate Emergency Contacts
    formData.emergencyContacts = data.emergencyContacts || []

    // Populate Medical
    formData.medical.key_info = data.medical.key_info
    formData.medical.medications = data.medical.medications || []
    formData.medical.conditions = data.medical.conditions || []
    formData.medical.allergies = data.medical.allergies || []
    formData.medical.documents = data.medical.documents || []

    // Store IDs for updates
    loadedIds.profile_id = data.personal.profile_id
    loadedIds.doctor_id = data.doctor.doctor_id
    // Use med_id from the top level medical object if available (added in userModel.js)
    loadedIds.med_id = data.medical.med_id || data.medical.medications?.[0]?.med_id || null
    
  } catch (e) {
    console.error('Error loading profile', e)
  }
}

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
    
    console.log('START: saveProfile called. Edit Mode:', isEditMode.value);

    if (isEditMode.value && loadedIds.profile_id) {
        // --- UPDATE MODE ---
        
        // 1. Update Personal
        // Map frontend fields to backend expected fields (snake_case)
        const personalUpdatePayload = { ...personalData }
        personalUpdatePayload.house_number = personalData.housenumber
        personalUpdatePayload.postal_code = personalData.postalcode
        personalUpdatePayload.blood_type = personalData.bloodtype // Map bloodtype -> blood_type
        
        await userStore.updatePersonal(loadedIds.profile_id, personalUpdatePayload)
        
        // 2. Update Doctor
        const doctorUpdatePayload = { ...doctorData }
        doctorUpdatePayload.house_number = doctorData.housenumber
        doctorUpdatePayload.postal_code = doctorData.postalcode

        if (loadedIds.doctor_id) {
            await userStore.updateDoctor(loadedIds.doctor_id, doctorUpdatePayload)
        } else {
            // New doctor for existing profile - use original data (insert expects non-snake?)
            // insertDoctor controller expects: housenumber, postalcode. So doctorData is fine.
            await userStore.saveDoctor(loadedIds.profile_id, doctorData)
        }
        
        // 3. Update Emergency Contacts
        for (const contact of emergencyContactsData) {
            if (contact.contact_id) {
                await userStore.updateEmergencyContact(contact.contact_id, contact)
            } else {
                await userStore.saveEmergencyContacts(loadedIds.profile_id, [contact])
            }
        }
        
        // 4. Update Medical Data (Key Info)
        if (loadedIds.med_id) {
             await userStore.updateMeddata(loadedIds.med_id, { key_info: medicalData.key_info })
             
             // 5. Update Medications
             for (const med of medicationsData) {
                 if (med.medication_id) {
                     await userStore.updateMedication(med.medication_id, med)
                 } else {
                     await userStore.saveMedication(loadedIds.med_id, [med])
                 }
             }
             
             // 6. Update Conditions
             for (const cond of conditionsData) {
                 if (cond.condition_id) {
                     await userStore.updateCondition(cond.condition_id, cond)
                 } else {
                     await userStore.saveConditions(loadedIds.med_id, [cond])
                 }
             }

             // 7. Update Allergies
             for (const allergy of allergiesData) {
                 if (allergy.allergy_id) {
                     await userStore.updateAllergy(allergy.allergy_id, allergy)
                 } else {
                     await userStore.saveAllergies(loadedIds.med_id, [allergy])
                 }
             }
             
        } else {
            // If no med_id exists yet, create it all
             const saveMedical = await userStore.saveMeddata(loadedIds.profile_id, medicalData); 
             if (saveMedical && saveMedical.med_id) {
                 await userStore.saveMedication(saveMedical.med_id, medicationsData); 
                 await userStore.saveConditions(saveMedical.med_id, conditionsData); 
                 await userStore.saveAllergies(saveMedical.med_id, allergiesData); 
             }
        }

    } else {
        // --- CREATE MODE ---
        
        // Save Personal Data
        const savePersonal = await userStore.savePersonal(props.userId, personalData)
        console.log('savePersonal', savePersonal); 
        
        if (savePersonal && savePersonal.profile_id) {
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
            
            if (saveMedical && saveMedical.med_id) {
                //Save Medication
                const saveMedication = await userStore.saveMedication(saveMedical.med_id, medicationsData); 
                console.log('saveMedication', saveMedication); 
        
                //Save Condittaions 
                const saveConditions = await userStore.saveConditions(saveMedical.med_id, conditionsData); 
                console.log('saveConditions', saveConditions); 
        
                //Save Allergies
                const saveAllergies = await userStore.saveAllergies(saveMedical.med_id, allergiesData); 
                console.log('saveAllergies', saveAllergies); 
            }
        }
    }

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
  resetForm()
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
