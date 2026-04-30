<template>
  <div>
    <div
      class="justify-center text-center text-h6 q-mb-md"
      style="color: #5a6c7d; font-weight: 500"
    >
      Persönliche Daten
    </div>

    <q-form ref="formRef">
      <div class="flex justify-center q-mb-xl">
        <div class="avatar-container">
          <q-avatar
            :size="$q.screen.xs ? '80px' : '120px'"
            class="cursor-pointer"
            @click="$refs.fileInput.click()"
            style="border: 2px solid #e5e7eb"
            role="button"
            aria-label="Profilbild für das neue Profil hochladen"
          >
            <img v-if="personal.avatar_url" :src="personal.avatar_url" alt="Vorschau des Profilbildes" />
            <q-icon
              v-else
              name="upload"
              :size="$q.screen.xs ? '40px' : '60px'"
              class="text-grey-7"
              aria-hidden="true"
            />
          </q-avatar>
          <div class="text-body2 text-grey-7 q-mb-xs input-header q-mt-sm">
            Profilbild hochladen
          </div>
        </div>
        <input ref="fileInput" type="file" hidden accept="image/*" @change="onFileChange" aria-hidden="true" />
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-6">
          <label for="personal-firstname" class="field-label">VORNAME</label>
          <q-input
            id="personal-firstname"
            outlined
            v-model="personal.first_name"
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
          />
        </div>
        <div class="col-6">
          <label for="personal-lastname" class="field-label">NACHNAME</label>
          <q-input
            id="personal-lastname"
            outlined
            v-model="personal.last_name"
            class="inputs"
            placeholder="Mustermann"
            lazy-rules
            :rules="[
              (val) => !!val || 'Nachname ist erforderlich',
              (val) => val.trim().length >= 2 || 'Mindestens 2 Zeichen erforderlich',
              (val) => val.length <= 50 || 'Maximal 50 Zeichen erlaubt',
              (val) =>
                /^[a-zA-ZäöüÄÖÜß\s-]+$/.test(val) ||
                'Nur Buchstaben, Leerzeichen und Bindestriche erlaubt',
            ]"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-6">
          <label for="personal-birthdate" class="field-label">GEBURTSDATUM</label>
          <q-input
            id="personal-birthdate"
            outlined
            v-model="personal.birthdate"
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
              <q-icon name="event" class="cursor-pointer" aria-label="Kalender öffnen" role="button">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="personal.birthdate" mask="DD.MM.YYYY" default-view="Years">
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
          <span class="field-label" id="gender-label">GESCHLECHT</span>
          <div class="gender-selector" role="radiogroup" aria-labelledby="gender-label">
            <div
              class="gender-option"
              :class="{ active: personal.gender === 'Männlich' }"
              @click="personal.gender = 'Männlich'"
              role="radio"
              :aria-checked="personal.gender === 'Männlich'"
              tabindex="0"
              @keydown.space.prevent="personal.gender = 'Männlich'"
              aria-label="Männlich"
            >
              <q-icon name="male" size="24px" aria-hidden="true" />
              <span>Männlich</span>
            </div>
            <div
              class="gender-option"
              :class="{ active: personal.gender === 'Weiblich' }"
              @click="personal.gender = 'Weiblich'"
              role="radio"
              :aria-checked="personal.gender === 'Weiblich'"
              tabindex="0"
              @keydown.space.prevent="personal.gender = 'Weiblich'"
              aria-label="Weiblich"
            >
              <q-icon name="female" size="24px" aria-hidden="true" />
              <span>Weiblich</span>
            </div>
            <div
              class="gender-option"
              :class="{ active: personal.gender === 'Divers' }"
              @click="personal.gender = 'Divers'"
              role="radio"
              :aria-checked="personal.gender === 'Divers'"
              tabindex="0"
              @keydown.space.prevent="personal.gender = 'Divers'"
              aria-label="Divers"
            >
              <q-icon name="transgender" size="24px" aria-hidden="true" />
              <span>Divers</span>
            </div>
            <div class="gender-slider" :style="getSliderPosition()" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-6">
          <label for="personal-street" class="field-label">STRASSE</label>
          <q-input
            id="personal-street"
            outlined
            v-model="personal.street"
            class="inputs"
            placeholder="Mariahilfer Straße"
            lazy-rules
            :rules="[
              (val) => !!val || 'Straße ist erforderlich',
              (val) => val.trim().length >= 2 || 'Mindestens 2 Zeichen erforderlich',
              (val) => val.length <= 100 || 'Maximal 100 Zeichen erlaubt',
            ]"
          />
        </div>
        <div class="col-6">
          <label for="personal-housenumber" class="field-label">HAUSNUMMER</label>
          <q-input
            id="personal-housenumber"
            outlined
            v-model="personal.housenumber"
            class="inputs"
            placeholder="12A"
            lazy-rules
            :rules="[
              (val) => !!val || 'Hausnummer ist erforderlich',
              (val) => val.trim().length >= 1 || 'Hausnummer erforderlich',
              (val) => val.length <= 10 || 'Maximal 10 Zeichen erlaubt',
            ]"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-6">
          <label for="personal-postalcode" class="field-label">POSTLEITZAHL</label>
          <q-input
            id="personal-postalcode"
            outlined
            v-model="personal.postalcode"
            class="inputs"
            placeholder="1010"
            lazy-rules
            maxlength="4"
            :rules="[
              (val) => !!val || 'Postleitzahl ist erforderlich',
              (val) => /^\d{4}$/.test(val) || 'Muss genau 4 Ziffern sein',
            ]"
          />
        </div>
        <div class="col-6">
          <label for="personal-city" class="field-label">STADT</label>
          <q-input
            id="personal-city"
            outlined
            v-model="personal.city"
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
          />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-6">
          <label for="personal-weight" class="field-label">GEWICHT (kg)</label>
          <q-input
            id="personal-weight"
            outlined
            v-model="personal.weight"
            class="inputs"
            placeholder="67.5"
            type="text"
            inputmode="decimal"
            lazy-rules
            :rules="[
              (val) => !!val || 'Gewicht ist erforderlich',
              (val) => Number(val) >= 0.5 || 'Mindestens 0.5 kg',
              (val) => Number(val) <= 500 || 'Maximal 500 kg',
            ]"
          />
        </div>
        <div class="col-6">
          <label for="personal-height" class="field-label">HÖHE (cm)</label>
          <q-input
            id="personal-height"
            outlined
            v-model="personal.height"
            class="inputs"
            placeholder="180"
            type="text"
            inputmode="numeric"
            lazy-rules
            :rules="[
              (val) => !!val || 'Höhe ist erforderlich',
              (val) => Number(val) >= 40 || 'Mindestens 40 cm',
              (val) => Number(val) <= 250 || 'Maximal 250 cm',
            ]"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-12">
          <span class="field-label" id="bloodtype-label">BLUTGRUPPE</span>
          <div class="bloodtype-grid" role="radiogroup" aria-labelledby="bloodtype-label">
            <div
              v-for="type in bloodTypes"
              :key="type"
              class="bloodtype-option"
              :class="{
                active: personal.bloodtype === type,
                'full-width': type === 'Nicht bekannt',
              }"
              @click="personal.bloodtype = type"
              role="radio"
              :aria-checked="personal.bloodtype === type"
              tabindex="0"
              @keydown.space.prevent="personal.bloodtype = type"
              :aria-label="type"
            >
              <span class="bloodtype-text">{{ type }}</span>
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const formRef = ref(null)

const bloodTypes = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  '0+',
  '0-',
  'Nicht bekannt',
]
const props = defineProps({
  personal: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:personal'])

const personal = computed({
  get: () => props.personal,
  set: (value) => emit('update:personal', value),
})
function validate() {
  return formRef.value.validate()
}
const getSliderPosition = () => {
  const positions = {
    Männlich: 'left: 4px',
    Weiblich: 'left: calc(33.333% + 1px)',
    Divers: 'left: calc(66.666% - 2px)',
  }
  return positions[personal.value.gender] || 'left: 4px'
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    personal.value.avatar_url = reader.result
  }
  reader.readAsDataURL(file)
}
defineExpose({
  validate,
})
</script>

<style lang="scss" scoped>
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
  background: var(--q-primary);
  border-radius: 8px;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
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
  background: rgba(229, 57, 53, 0.05); /* Slight red tint on hover */
}

.bloodtype-option.active {
  background: var(--q-primary);
  border-color: var(--q-primary);
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

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.bloodtype-option.full-width {
  grid-column: 1 / -1;
  margin-top: 4px;
}
</style>
