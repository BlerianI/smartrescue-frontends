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

        <!-- Profilbild hochladen (optional) -->

        <!-- Step 1: Persönliche Daten -->
        <div v-if="step === 1" class="q-pt-none">
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="field-label">VORNAME</label>
              <q-input
                outlined
                v-model="formData.vorname"
                class="inputs"
                placeholder="Max"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Vorname ist erforderlich',
                  (val) => val.trim().length >= 2 || 'Mindestens 2 Zeichen erforderlich',
                  (val) => val.length <= 50 || 'Maximal 50 Zeichen erlaubt',
                  (val) =>
                    /^[a-zA-ZäöüÄÖÜß\s-]+$/.test(val) ||
                    'Nur Buchstaben, Leerzeichen und Bindestriche erlaubt',
                ]"
              >
              </q-input>
            </div>
            <div class="col-6">
              <label class="field-label">NACHNAME</label>
              <q-input
                outlined
                v-model="formData.nachname"
                class="inputs"
                placeholder="Mustermann"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Vorname ist erforderlich',
                  (val) => val.trim().length >= 2 || 'Mindestens 2 Zeichen erforderlich',
                  (val) => val.length <= 50 || 'Maximal 50 Zeichen erlaubt',
                  (val) =>
                    /^[a-zA-ZäöüÄÖÜß\s-]+$/.test(val) ||
                    'Nur Buchstaben, Leerzeichen und Bindestriche erlaubt',
                ]"
              >
              </q-input>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="field-label">GEBURTSDATUM</label>
              <q-input
                outlined
                v-model="formData.geburtsdatum"
                class="inputs"
                placeholder="TT.MM.JJJJ"
                mask="##.##.####"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Geburtsdatum ist erforderlich',
                  (val) => /^\d{2}\.\d{2}\.\d{4}$/.test(val) || 'Format: TT.MM.JJJJ',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="formData.geburtsdatum"
                        mask="DD.MM.YYYY"
                        default-view="Years"
                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="OK" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-6">
              <label class="field-label">GENDER</label>
              <div class="gender-selector">
                <div
                  class="gender-option"
                  :class="{ active: formData.gender === 'Männlich' }"
                  @click="formData.gender = 'Männlich'"
                >
                  <q-icon name="male" size="24px" />
                  <span>Männlich</span>
                </div>
                <div
                  class="gender-option"
                  :class="{ active: formData.gender === 'Weiblich' }"
                  @click="formData.gender = 'Weiblich'"
                >
                  <q-icon name="female" size="24px" />
                  <span>Weiblich</span>
                </div>
                <div
                  class="gender-option"
                  :class="{ active: formData.gender === 'Divers' }"
                  @click="formData.gender = 'Divers'"
                >
                  <q-icon name="transgender" size="24px" />
                  <span>Divers</span>
                </div>
                <div class="gender-slider" :style="getSliderPosition()"></div>
              </div>
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="field-label">STRASSE</label>
              <q-input
                outlined
                v-model="formData.strasse"
                class="inputs"
                placeholder="Mariahilfer Straße"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Straße ist erforderlich',
                  (val) => val.trim().length >= 2 || 'Mindestens 2 Zeichen erforderlich',
                  (val) => val.length <= 100 || 'Maximal 100 Zeichen erlaubt',
                ]"
              >
              </q-input>
            </div>
            <div class="col-6">
              <label class="field-label">HAUSNUMMER</label>
              <q-input
                outlined
                v-model="formData.hausnummer"
                class="inputs"
                placeholder="12A"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Hausnummer ist erforderlich',
                  (val) => val.trim().length >= 1 || 'Hausnummer erforderlich',
                  (val) => val.length <= 10 || 'Maximal 10 Zeichen erlaubt',
                ]"
              >
              </q-input>
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="field-label">POSTLEITZAHL</label>
              <q-input
                outlined
                v-model="formData.postleitzahl"
                class="inputs"
                placeholder="1010"
                lazy-rules
                maxlength="4"
                :rules="[
                  (val) => !!val || 'Postleitzahl ist erforderlich',
                  (val) => /^\d{4}$/.test(val) || 'Muss genau 4 Ziffern sein',
                ]"
              >
              </q-input>
            </div>
            <div class="col-6">
              <label class="field-label">STADT</label>
              <q-input
                outlined
                v-model="formData.stadt"
                class="inputs"
                placeholder="Wien"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Stadt ist erforderlich',
                  (val) => val.trim().length >= 2 || 'Mindestens 2 Zeichen erforderlich',
                  (val) => val.length <= 50 || 'Maximal 50 Zeichen erlaubt',
                  (val) =>
                    /^[a-zA-ZäöüÄÖÜß\s-]+$/.test(val) ||
                    'Nur Buchstaben, Leerzeichen und Bindestriche erlaubt',
                ]"
              >
              </q-input>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="field-label">GEWICHT</label>
              <q-input
                outlined
                v-model="formData.gewicht"
                class="input"
                placeholder="67.5"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Gewicht ist erforderlich',
                  (val) => val >= 0.5 || 'Gewicht muss mindestens 0.5 kg sein',
                  (val) => val <= 500 || 'Gewicht muss unter 500 kg sein',
                  (val) => !isNaN(val) || 'Nur Zahlen erlaubt',
                  (val) =>
                    /^\d+(\.\d{1,2})?$/.test(val.toString()) || 'Maximal 2 Dezimalstellen erlaubt',
                ]"
              >
              </q-input>
            </div>
            <div class="col-6">
              <label class="field-label">HOEHE</label>
              <q-input
                outlined
                v-model="formData.hoehe"
                class="input"
                placeholder="180"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Höhe ist erforderlich',
                  (val) => val >= 40 || 'Höhe muss mindestens 40 cm sein',
                  (val) => val <= 250 || 'Höhe muss unter 250 cm sein',
                  (val) => !isNaN(val) || 'Nur Zahlen erlaubt',
                ]"
              >
              </q-input>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <label class="field-label">BLUTGRUPPE</label>
              <div class="bloodtype-grid">
                <div
                  class="bloodtype-option"
                  :class="{ active: formData.blutgruppe === 'A+' }"
                  @click="formData.blutgruppe = 'A+'"
                >
                  <span class="bloodtype-text">A+</span>
                </div>
                <div
                  class="bloodtype-option"
                  :class="{ active: formData.blutgruppe === 'A-' }"
                  @click="formData.blutgruppe = 'A-'"
                >
                  <span class="bloodtype-text">A-</span>
                </div>
                <div
                  class="bloodtype-option"
                  :class="{ active: formData.blutgruppe === 'B+' }"
                  @click="formData.blutgruppe = 'B+'"
                >
                  <span class="bloodtype-text">B+</span>
                </div>
                <div
                  class="bloodtype-option"
                  :class="{ active: formData.blutgruppe === 'B-' }"
                  @click="formData.blutgruppe = 'B-'"
                >
                  <span class="bloodtype-text">B-</span>
                </div>
                <div
                  class="bloodtype-option"
                  :class="{ active: formData.blutgruppe === 'AB+' }"
                  @click="formData.blutgruppe = 'AB+'"
                >
                  <span class="bloodtype-text">AB+</span>
                </div>
                <div
                  class="bloodtype-option"
                  :class="{ active: formData.blutgruppe === 'AB-' }"
                  @click="formData.blutgruppe = 'AB-'"
                >
                  <span class="bloodtype-text">AB-</span>
                </div>
                <div
                  class="bloodtype-option"
                  :class="{ active: formData.blutgruppe === '0+' }"
                  @click="formData.blutgruppe = '0+'"
                >
                  <span class="bloodtype-text">0+</span>
                </div>
                <div
                  class="bloodtype-option"
                  :class="{ active: formData.blutgruppe === '0-' }"
                  @click="formData.blutgruppe = '0-'"
                >
                  <span class="bloodtype-text">0-</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Körperdaten -->
        <div v-if="step === 2" class="q-gutter-md">
          <div class="row q-col-gutter-md"></div>
        </div>

        <!-- Step 3: Medizinische Daten -->
        <div v-if="step === 3" class="q-gutter-md"></div>

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

const getSliderPosition = () => {
  const positions = {
    Männlich: 'left: 4px',
    Weiblich: 'left: calc(33.333% + 1px)',
    Divers: 'left: calc(66.666% - 2px)',
  }
  return positions[formData.value.gender] || 'left: 4px'
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

.gender-selector {
  position: relative;
  display: flex;
  background: #f0f4f8;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
  height: 56px;
}

.gender-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 2;
  position: relative;
}

.gender-option span {
  font-size: 11px;
  font-weight: 500;
  color: #5a6c7d;
  transition: color 0.3s ease;
}

.gender-option .q-icon {
  color: #8a9bb0;
  transition: color 0.3s ease;
}

.gender-option.active span {
  color: white;
  font-weight: 600;
}

.gender-option.active .q-icon {
  color: white;
}

.gender-slider {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: calc(33.333% - 3px);
  background: linear-gradient(135deg, #9fb4cc 0%, #7a92b0 100%);
  border-radius: 8px;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.bloodtype-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  background: #f0f4f8;
  padding: 8px;
  border-radius: 12px;
}

.bloodtype-option {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.bloodtype-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.bloodtype-option.active {
  background: linear-gradient(135deg, #9fb4cc 0%, #7a92b0 100%);
  border-color: #7a92b0;
  box-shadow: 0 4px 12px rgba(159, 180, 204, 0.4);
}

.bloodtype-text {
  font-size: 16px;
  font-weight: 600;
  color: #5a6c7d;
  transition: color 0.3s ease;
}

.bloodtype-option.active .bloodtype-text {
  color: white;
}

.birthdate-input :deep(.q-field__control) {
  border: 1px solid #b8c5d6;
  border-radius: 6px;
  min-height: 56px;
  font-size: 16px;
}

.birthdate-input :deep(.q-field__control):before {
  border: none;
}

.birthdate-input :deep(.q-field__prepend) {
  padding-right: 12px;
}

.birthdate-input :deep(.q-field__append) {
  padding-left: 12px;
}

.birthdate-input :deep(input) {
  font-weight: 500;
  color: #5a6c7d;
  text-align: center;
}

.birthdate-input :deep(input::placeholder) {
  color: #a0aebb;
  font-weight: 400;
}
</style>
