<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="width: 540px; background: white; border-radius: 12px">
      <q-card-section class="q-pt-lg q-pb-md">
        <div class="text-h6" style="color: #5a6c7d; font-weight: 500">Neues Profil erstellen</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- Compact Quasar Stepper -->
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
          flat
          header-nav
          contracted
          class="compact-stepper q-mb-lg"
        >
          <q-step
            :name="1"
            title="Persönliche Daten"
            icon="eva-person-outline"
            :done="step > 1"
            active-color="primary"
            done-color="positive"
          />

          <q-step
            :name="2"
            title="Körperdaten"
            icon="fitness_center"
            :done="step > 2"
            active-color="primary"
            done-color="positive"
          />

          <q-step
            :name="3"
            title="Medizinische Daten"
            icon="medical_services"
            :done="step > 3"
            active-color="primary"
            done-color="positive"
          />

          <q-step
            :name="4"
            title="Bestätigung"
            icon="check_circle"
            active-color="primary"
            done-color="positive"
          />
        </q-stepper>

        <!-- Profilbild hochladen (optional) -->
        <div v-if="step === 1" class="text-center q-mb-xl">
          <div style="font-size: 12px; color: #8a9bb0" class="q-mb-sm">
            Profilbild hochladen (optional)
          </div>
          <div
            style="
              width: 80px;
              height: 80px;
              border-radius: 50%;
              background-color: #b8c5d6;
              margin: 0 auto;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <q-icon name="add_a_photo" color="white" size="32px" />
          </div>
        </div>

        <!-- Step 1: Persönliche Daten -->
        <div v-if="step === 1" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="field-label">VORNAME</label>
              <q-input
                v-model="formData.vorname"
                outlined
                dense
                bg-color="white"
                class="custom-input"
              />
            </div>
            <div class="col-6">
              <label class="field-label">NACHNAME</label>
              <q-input
                v-model="formData.nachname"
                outlined
                dense
                bg-color="white"
                class="custom-input"
              />
            </div>
          </div>

          <div>
            <label class="field-label">ADRESSE</label>
            <q-input
              v-model="formData.adresse"
              outlined
              dense
              bg-color="white"
              class="custom-input"
            />
          </div>
        </div>

        <!-- Step 2: Körperdaten -->
        <div v-if="step === 2" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="field-label">HÖHE (CM)</label>
              <q-input
                v-model="formData.hoehe"
                outlined
                dense
                bg-color="white"
                class="custom-input"
                type="number"
              />
            </div>
            <div class="col-6">
              <label class="field-label">GEWICHT (KG)</label>
              <q-input
                v-model="formData.gewicht"
                outlined
                dense
                bg-color="white"
                class="custom-input"
                type="number"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="field-label">GENDER</label>
              <q-select
                v-model="formData.gender"
                :options="['Männlich', 'Weiblich', 'Divers']"
                outlined
                dense
                bg-color="white"
                class="custom-input"
              />
            </div>
            <div class="col-6">
              <label class="field-label">GEBURTSDATUM</label>
              <q-input
                v-model="formData.geburtsdatum"
                outlined
                dense
                bg-color="white"
                class="custom-input"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="formData.geburtsdatum" mask="DD.MM.YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="OK" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <!-- Step 3: Medizinische Daten -->
        <div v-if="step === 3" class="q-gutter-md">
          <div class="row">
            <div class="col-6">
              <label class="field-label">BLUTGRUPPE</label>
              <q-select
                v-model="formData.blutgruppe"
                :options="['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-']"
                outlined
                dense
                bg-color="white"
                class="custom-input"
              />
            </div>
          </div>

          <div>
            <label class="field-label">ALLERGIEN (OPTIONAL)</label>
            <q-input
              v-model="formData.allergien"
              outlined
              dense
              bg-color="white"
              class="custom-input"
              type="textarea"
              rows="3"
            />
          </div>

          <div>
            <label class="field-label">MEDIKAMENTE (OPTIONAL)</label>
            <q-input
              v-model="formData.medikamente"
              outlined
              dense
              bg-color="white"
              class="custom-input"
              type="textarea"
              rows="3"
            />
          </div>
        </div>

        <!-- Step 4: Bestätigung -->
        <div v-if="step === 4" class="text-center q-py-xl">
          <q-icon name="check_circle" size="80px" color="positive" />
          <div class="text-h6 q-mt-md" style="color: #5a6c7d">Profil bereit!</div>
          <div class="text-body2 text-grey-6 q-mt-sm">
            Alle Daten wurden erfolgreich eingegeben.
          </div>

          <!-- Zusammenfassung -->
          <q-card flat bordered class="q-mt-lg text-left">
            <q-card-section>
              <div class="text-subtitle2" style="color: #5a6c7d">Zusammenfassung:</div>
              <div class="q-mt-sm text-body2">
                <div><strong>Name:</strong> {{ formData.vorname }} {{ formData.nachname }}</div>
                <div><strong>Größe:</strong> {{ formData.hoehe }} cm</div>
                <div><strong>Gewicht:</strong> {{ formData.gewicht }} kg</div>
                <div><strong>Geschlecht:</strong> {{ formData.gender }}</div>
                <div><strong>Geburtsdatum:</strong> {{ formData.geburtsdatum }}</div>
                <div><strong>Blutgruppe:</strong> {{ formData.blutgruppe }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
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
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'profile-saved'])

const isOpen = ref(props.modelValue)
const step = ref(1)
const stepper = ref(null)

watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal
    if (newVal) {
      step.value = 1 // Reset beim Öffnen
    }
  },
)

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

const formData = ref({
  vorname: '',
  nachname: '',
  hoehe: '',
  gewicht: '',
  gender: '',
  geburtsdatum: '',
  blutgruppe: '',
  adresse: '',
  allergien: '',
  medikamente: '',
})

const onClose = () => {
  emit('update:modelValue', false)
}

const nextStep = () => {
  if (step.value < 4) {
    step.value++
  }
}

const previousStep = () => {
  if (step.value > 1) {
    step.value--
  }
}

const saveProfile = () => {
  emit('profile-saved', formData.value)
  emit('update:modelValue', false)

  // Optional: Success notification
  // this.$q.notify({
  //   type: 'positive',
  //   message: 'Profil erfolgreich gespeichert!'
  // })
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

.custom-input :deep(.q-field__control) {
  border: 1px solid #b8c5d6;
  border-radius: 6px;
  min-height: 40px;
}

.custom-input :deep(.q-field__control):before {
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
  width: 36px;
  height: 36px;
  font-size: 14px;
  background: #b8c5d6 !important;
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
