<template>
  <div class="justify-center text-center text-h6 q-mb-md" style="color: #5a6c7d; font-weight: 500">
    Hausarzt
  </div>
  <q-form ref="formRef">
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <label class="field-label">VORNAME</label>
        <q-input
          outlined
          v-model="doctorForm.first_name"
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
          v-model="doctorForm.last_name"
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

      <div class="col-6">
        <label class="field-label">STRASSE</label>
        <q-input
          outlined
          v-model="doctorForm.street"
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
          v-model="doctorForm.housenumber"
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

      <div class="col-6">
        <label class="field-label">POSTLEITZAHL</label>
        <q-input
          outlined
          v-model="doctorForm.postalcode"
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
          v-model="doctorForm.city"
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

      <!-- PHONE NUMBER -->
      <div class="col-6">
        <label class="field-label">TELEFONNUMMER</label>
        <q-input
          outlined
          v-model="doctorForm.phone_number"
          class="inputs"
          placeholder="+43 660 1234567"
          lazy-rules
          :rules="[
            (val) => !!val || 'Telefonnummer ist erforderlich',
            (val) => val.replace(/[^0-9]/g, '').length >= 8 || 'Mindestens 8 Ziffern',
            (val) => val.replace(/[^0-9]/g, '').length <= 15 || 'Maximal 15 Ziffern',
          ]"
        >
        </q-input>
      </div>

      <!-- DOCTOR TITLE -->
      <div class="col-6">
        <label class="field-label">TITEL</label>
        <q-select
          outlined
          v-model="doctorForm.title"
          class="inputs"
          placeholder="z. B. Dr. med."
          lazy-rules
          :rules="[(val) => !!val || 'Titel ist erforderlich']"
          :options="[
            'Dr. med.',
            'Dr. med. dent.',
            'Dr. med. vet.',
            'Mag. med.',
            'PhD',
            'Prof. Dr.',
            'PD Dr.',
            'Kein Titel',
          ]"
          clearable
        >
        </q-select>
      </div>

      <!-- SPECIALTY FULL WIDTH -->
      <div class="col-12">
        <label class="field-label">FACHRICHTUNG</label>
        <q-select
          outlined
          v-model="doctorForm.specialty"
          class="inputs"
          placeholder="Fachrichtung auswählen"
          lazy-rules
          :rules="[(val) => !!val || 'Fachrichtung ist erforderlich']"
          :options="[
            'Allgemeinmedizin',
            'Kardiologie',
            'Dermatologie',
            'Neurologie',
            'Orthopädie',
            'Chirurgie',
            'Radiologie',
            'Pädiatrie',
            'Psychiatrie',
          ]"
        >
        </q-select>
      </div>
    </div>
    <!-- Notfallkontakte -->
    <div
      class="justify-center text-center text-h6 q-mb-md"
      style="color: #5a6c7d; font-weight: 500"
    >
      Notfallkontakte
    </div>

    <div class="col-12">
      <q-btn
        flat
        class="full-width q-py-sm"
        style="background: var(--q-primary); color: white; border-radius: 8px; font-weight: 500"
        icon="add"
        label="Kontakt hinzufügen"
        @click="addEmergencyContact"
      />
    </div>

    <!-- Notfallkontakte Karten -->
    <div v-for="(contact, index) in contacts" :key="index" class="q-mt-md">
      <q-card flat bordered class="contact-card">
        <q-card-section class="row items-center justify-between">
          <div class="text-subtitle2" style="color: #5a6c7d; font-weight: 600">
            Notfallkontakt {{ index + 1 }}
          </div>
          <q-btn
            dense
            flat
            round
            icon="delete"
            color="negative"
            @click="removeEmergencyContact(index)"
          />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <label class="field-label">VORNAME</label>
              <q-input outlined v-model="contact.first_name" class="inputs" placeholder="Vorname" />
            </div>

            <div class="col-6">
              <label class="field-label">NACHNAME</label>
              <q-input outlined v-model="contact.last_name" class="inputs" placeholder="Nachname" />
            </div>

            <div class="col-6">
              <label class="field-label">TELEFONNUMMER</label>
              <q-input
                outlined
                v-model="contact.phone_number"
                class="inputs"
                placeholder="+43 660 1234567"
              />
            </div>

            <div class="col-6">
              <label class="field-label">BEZIEHUNG</label>
              <q-input
                outlined
                v-model="contact.relationship"
                class="inputs"
                placeholder="z. B. Mutter"
              />
            </div>

            <div class="col-12">
              <label class="field-label">PRIORITÄT</label>
              <q-select
                outlined
                v-model="contact.priority"
                :options="[
                  { label: 'Hoch', value: 1 },
                  { label: 'Mittel', value: 2 },
                  { label: 'Niedrig', value: 3 },
                ]"
                emit-value
                map-options
                class="inputs"
                placeholder="Priorität wählen"
              />
            </div>

            <div class="col-12">
              <label class="field-label">NOTIZ</label>
              <q-input
                outlined
                type="textarea"
                v-model="contact.note"
                class="inputs"
                placeholder="Zusätzliche Informationen"
                autogrow
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-form>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  doctor: {
    type: Object,
    required: true,
  },
  emergencyContacts: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:doctor', 'update:emergencyContacts'])
const formRef = ref(null)

/* 🔑 Proxy für doctor */
const doctorForm = computed({
  get: () => props.doctor,
  set: (val) => emit('update:doctor', val),
})

/* 🔑 Proxy für emergencyContacts */
const contacts = computed({
  get: () => props.emergencyContacts,
  set: (val) => emit('update:emergencyContacts', val),
})

function validate() {
  return formRef.value.validate()
}

/* Aktionen */
const addEmergencyContact = () => {
  contacts.value = [
    ...contacts.value,
    {
      first_name: '',
      last_name: '',
      phone_number: '',
      relationship: '',
      priority: '',
      note: '',
    },
  ]
}

const removeEmergencyContact = (index) => {
  contacts.value = contacts.value.filter((_, i) => i !== index)
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
