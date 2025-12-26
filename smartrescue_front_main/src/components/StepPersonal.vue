<template>
  <div class="justify-center text-center text-h6 q-mb-md" style="color: #5a6c7d; font-weight: 500">
    Persönliche Daten
  </div>
  <div class="flex justify-center q-mb-xl">
    <div class="avatar-container">
      <q-avatar
        src="@/assets/Profil.png"
        :size="$q.screen.xs ? '80px' : '120px'"
        class="cursor-pointer"
        @click="$refs.fileInput.click()"
        style="border: 2px solid #e5e7eb"
      >
        <img v-if="avatar" :src="avatar" />
        <q-icon
          v-if="!avatar"
          name="upload"
          :size="$q.screen.xs ? '40px' : '60px'"
          class="text-grey-7"
        />
      </q-avatar>

      <div class="text-body2 text-grey-7 q-mb-xs input-header q-mt-sm">Profilbild hochladen</div>
    </div>
    <input ref="fileInput" type="file" hidden accept="image/*" @change="onFileChange" />
  </div>
  <div class="row q-col-gutter-md">
    <div class="col-6">
      <label class="field-label">VORNAME</label>
      <q-input
        outlined
        v-model="form.first_name"
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
        v-model="form.last_name"
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
        v-model="form.birthdate"
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
              <q-date v-model="form.birthdate" mask="DD.MM.YYYY" default-view="Years">
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
          :class="{ active: form.gender === 'Männlich' }"
          @click="form.gender = 'Männlich'"
        >
          <q-icon name="male" size="24px" />
          <span>Männlich</span>
        </div>
        <div
          class="gender-option"
          :class="{ active: form.gender === 'Weiblich' }"
          @click="form.gender = 'Weiblich'"
        >
          <q-icon name="female" size="24px" />
          <span>Weiblich</span>
        </div>
        <div
          class="gender-option"
          :class="{ active: form.gender === 'Divers' }"
          @click="form.gender = 'Divers'"
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
        v-model="form.street"
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
        v-model="form.housenumber"
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
        v-model="form.postalcode"
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
        v-model="form.city"
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
        v-model="form.weight"
        class="inputs"
        placeholder="67.5"
        lazy-rules
        :rules="[
          (val) => !!val || 'Gewicht ist erforderlich',
          (val) => val >= 0.5 || 'Gewicht muss mindestens 0.5 kg sein',
          (val) => val <= 500 || 'Gewicht muss unter 500 kg sein',
          (val) => !isNaN(val) || 'Nur Zahlen erlaubt',
          (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()) || 'Maximal 2 Dezimalstellen erlaubt',
        ]"
      >
      </q-input>
    </div>
    <div class="col-6">
      <label class="field-label">HOEHE</label>
      <q-input
        outlined
        v-model="form.height"
        class="inputs"
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
          :class="{ active: form.bloodtype === 'A+' }"
          @click="form.bloodtype = 'A+'"
        >
          <span class="bloodtype-text">A+</span>
        </div>
        <div
          class="bloodtype-option"
          :class="{ active: form.bloodtype === 'A-' }"
          @click="form.bloodtype = 'A-'"
        >
          <span class="bloodtype-text">A-</span>
        </div>
        <div
          class="bloodtype-option"
          :class="{ active: form.bloodtype === 'B+' }"
          @click="form.bloodtype = 'B+'"
        >
          <span class="bloodtype-text">B+</span>
        </div>
        <div
          class="bloodtype-option"
          :class="{ active: form.bloodtype === 'B-' }"
          @click="form.bloodtype = 'B-'"
        >
          <span class="bloodtype-text">B-</span>
        </div>
        <div
          class="bloodtype-option"
          :class="{ active: form.bloodtype === 'AB+' }"
          @click="form.bloodtype = 'AB+'"
        >
          <span class="bloodtype-text">AB+</span>
        </div>
        <div
          class="bloodtype-option"
          :class="{ active: form.bloodtype === 'AB-' }"
          @click="form.bloodtype = 'AB-'"
        >
          <span class="bloodtype-text">AB-</span>
        </div>
        <div
          class="bloodtype-option"
          :class="{ active: form.bloodtype === '0+' }"
          @click="form.bloodtype = '0+'"
        >
          <span class="bloodtype-text">0+</span>
        </div>
        <div
          class="bloodtype-option"
          :class="{ active: form.bloodtype === '0-' }"
          @click="form.bloodtype = '0-'"
        >
          <span class="bloodtype-text">0-</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

/* 🔑 Proxy für v-model */
const form = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const getSliderPosition = () => {
  const positions = {
    Männlich: 'left: 4px',
    Weiblich: 'left: calc(33.333% + 1px)',
    Divers: 'left: calc(66.666% - 2px)',
  }
  return positions[form.value.gender] || 'left: 4px'
}
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

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
