<template>
  <div class="justify-center text-center text-h6 q-mb-md" style="color: #5a6c7d; font-weight: 500" id="medical-info-label">
    Medizinische Informationen
  </div>
  <q-form ref="formRef" aria-labelledby="medical-info-label">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <label for="medical-key-info" class="field-label">WICHTIGE INFORMATIONEN</label>
        <q-input
          id="medical-key-info"
          outlined
          type="textarea"
          v-model="medical.key_info"
          class="inputs"
          placeholder="Wichtige medizinische Informationen"
          autogrow
        />
      </div>
    </div>

    <div
      class="justify-center text-center text-h6 q-mb-md q-mt-lg"
      style="color: #5a6c7d; font-weight: 500"
      id="medications-label"
    >
      Medikamente
    </div>

    <div class="col-12">
      <q-btn
        flat
        class="full-width q-py-sm"
        style="background: var(--q-primary); color: white; border-radius: 8px; font-weight: 500"
        label="Medikament hinzufügen"
        @click="addMedication"
        aria-label="Ein neues Medikament zur Liste hinzufügen"
      />
    </div>

    <div role="region" aria-live="polite" aria-labelledby="medications-label">
      <div v-for="(medication, index) in medical.medications" :key="index" class="q-mt-md">
        <q-card flat bordered class="contact-card">
          <q-card-section class="row items-center justify-between">
            <div class="text-subtitle2" style="color: #5a6c7d; font-weight: 600">
              Medikament {{ index + 1 }}
            </div>
            <q-btn dense flat round icon="delete" color="negative" @click="removeMedication(index)" :aria-label="'Medikament ' + (index + 1) + ' entfernen'" />
          </q-card-section>
          <q-separator aria-hidden="true" />
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <label :for="'med-name-' + index" class="field-label">MEDIKAMENTENNAME</label>
                <q-input
                  :id="'med-name-' + index"
                  outlined
                  v-model="medication.med_name"
                  class="inputs"
                  placeholder="z. B. Aspirin"
                />
              </div>
              <div class="col-6">
                <label :for="'med-dosage-' + index" class="field-label">DOSIERUNG</label>
                <q-input
                  :id="'med-dosage-' + index"
                  outlined
                  v-model="medication.dosage"
                  class="inputs"
                  placeholder="z. B. 500mg"
                />
              </div>
              <div class="col-6">
                <label :for="'med-freq-' + index" class="field-label">HÄUFIGKEIT</label>
                <q-input
                  :id="'med-freq-' + index"
                  outlined
                  v-model="medication.frequency"
                  class="inputs"
                  placeholder="z. B. 2x täglich"
                />
              </div>
              <div class="col-12">
                <label :for="'med-note-' + index" class="field-label">NOTIZ</label>
                <q-input
                  :id="'med-note-' + index"
                  outlined
                  type="textarea"
                  v-model="medication.note"
                  class="inputs"
                  placeholder="Zusätzliche Informationen"
                  autogrow
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div
      class="justify-center text-center text-h6 q-mb-md q-mt-lg"
      style="color: #5a6c7d; font-weight: 500"
      id="conditions-label"
    >
      Erkrankungen
    </div>

    <div class="col-12">
      <q-btn
        flat
        class="full-width q-py-sm"
        style="background: var(--q-primary); color: white; border-radius: 8px; font-weight: 500"
        label="Erkrankung hinzufügen"
        @click="addCondition"
        aria-label="Eine neue Erkrankung zur Liste hinzufügen"
      />
    </div>

    <div role="region" aria-live="polite" aria-labelledby="conditions-label">
      <div v-for="(condition, index) in medical.conditions" :key="index" class="q-mt-md">
        <q-card flat bordered class="contact-card">
          <q-card-section class="row items-center justify-between">
            <div class="text-subtitle2" style="color: #5a6c7d; font-weight: 600">
              Erkrankung {{ index + 1 }}
            </div>
            <q-btn dense flat round icon="delete" color="negative" @click="removeCondition(index)" :aria-label="'Erkrankung ' + (index + 1) + ' entfernen'" />
          </q-card-section>
          <q-separator aria-hidden="true" />
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <label :for="'cond-name-' + index" class="field-label">ERKRANKUNG</label>
                <q-input
                  :id="'cond-name-' + index"
                  outlined
                  v-model="condition.condition_name"
                  class="inputs"
                  placeholder="z. B. Diabetes Typ 2"
                />
              </div>
              <div class="col-6">
                <label :for="'cond-date-' + index" class="field-label">DIAGNOSE SEIT</label>
                <q-input
                  :id="'cond-date-' + index"
                  outlined
                  v-model="condition.diagnosed_since"
                  class="inputs"
                  placeholder="TT.MM.JJJJ"
                  mask="##.##.####"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" aria-label="Kalender öffnen" role="button">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date
                          v-model="condition.diagnosed_since"
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
              <div class="col-12">
                <label :for="'cond-note-' + index" class="field-label">NOTIZ</label>
                <q-input
                  :id="'cond-note-' + index"
                  outlined
                  type="textarea"
                  v-model="condition.note"
                  class="inputs"
                  placeholder="Zusätzliche Informationen"
                  autogrow
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div
      class="justify-center text-center text-h6 q-mb-md q-mt-lg"
      style="color: #5a6c7d; font-weight: 500"
      id="allergies-label"
    >
      Allergien
    </div>

    <div class="col-12">
      <q-btn
        flat
        class="full-width q-py-sm"
        style="background: var(--q-primary); color: white; border-radius: 8px; font-weight: 500"
        label="Allergie hinzufügen"
        @click="addAllergy"
        aria-label="Eine neue Allergie zur Liste hinzufügen"
      />
    </div>

    <div role="region" aria-live="polite" aria-labelledby="allergies-label">
      <div v-for="(allergy, index) in medical.allergies" :key="index" class="q-mt-md">
        <q-card flat bordered class="contact-card">
          <q-card-section class="row items-center justify-between">
            <div class="text-subtitle2" style="color: #5a6c7d; font-weight: 600">
              Allergie {{ index + 1 }}
            </div>
            <q-btn dense flat round icon="delete" color="negative" @click="removeAllergy(index)" :aria-label="'Allergie ' + (index + 1) + ' entfernen'" />
          </q-card-section>
          <q-separator aria-hidden="true" />
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <label :for="'allergy-name-' + index" class="field-label">ALLERGIE</label>
                <q-input
                  :id="'allergy-name-' + index"
                  outlined
                  v-model="allergy.allergie_name"
                  class="inputs"
                  placeholder="z. B. Penicillin"
                />
              </div>
              <div class="col-12">
                <label :for="'allergy-note-' + index" class="field-label">NOTIZ</label>
                <q-input
                  :id="'allergy-note-' + index"
                  outlined
                  type="textarea"
                  v-model="allergy.note"
                  class="inputs"
                  placeholder="Zusätzliche Informationen"
                  autogrow
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div
      class="justify-center text-center text-h6 q-mb-md q-mt-lg"
      style="color: #5a6c7d; font-weight: 500"
      id="documents-label"
    >
      Dokumente
    </div>

    <div class="col-12">
      <q-btn
        flat
        class="full-width q-py-sm"
        style="background: var(--q-primary); color: white; border-radius: 8px; font-weight: 500"
        label="Dokument hinzufügen"
        @click="addDocument"
        aria-label="Ein neues Dokument zur Liste hinzufügen"
      />
    </div>

    <div role="region" aria-live="polite" aria-labelledby="documents-label">
      <div v-for="(document, index) in medical.documents" :key="index" class="q-mt-md">
        <q-card flat bordered class="contact-card">
          <q-card-section class="row items-center justify-between">
            <div class="text-subtitle2" style="color: #5a6c7d; font-weight: 600">
              Dokument {{ index + 1 }}
            </div>
            <q-btn dense flat round icon="delete" color="negative" @click="removeDocument(index)" :aria-label="'Dokument ' + (index + 1) + ' entfernen'" />
          </q-card-section>
          <q-separator aria-hidden="true" />
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <label :for="'doc-title-' + index" class="field-label">DOKUMENTTITEL</label>
                <q-input
                  :id="'doc-title-' + index"
                  outlined
                  v-model="document.document_title"
                  class="inputs"
                  placeholder="z. B. Blutbild 2025"
                />
              </div>
              <div class="col-12">
                <label :for="'doc-file-' + index" class="field-label">DOKUMENT HOCHLADEN</label>
                <q-file
                  :id="'doc-file-' + index"
                  outlined
                  v-model="document.file"
                  class="inputs"
                  placeholder="Datei auswählen"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  medical: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:medical'])

/**
 * ✅ DEFAULT-STRUKTUR
 * verhindert undefined-Fehler & Vue-Warnungen
 */
const medical = computed({
  get: () => props.medical,
  set: (val) => emit('update:medical', val),
})

const formRef = ref(null)

function validate() {
  return formRef.value.validate()
}

/* Medikamente */
const addMedication = () => {
  const newMedications = [...props.medical.medications, {
    med_name: '',
    dosage: '',
    frequency: '',
    note: '',
    med_id: null,
  }];
  emit('update:medical', { ...props.medical, medications: newMedications });
}

const removeMedication = (index) => {
  const newMedications = [...props.medical.medications];
  newMedications.splice(index, 1);
  emit('update:medical', { ...props.medical, medications: newMedications });
}

/* Erkrankungen */
const addCondition = () => {
  const newConditions = [...props.medical.conditions, {
    condition_name: '',
    diagnosed_since: '',
    note: '',
    condition_id: null,
  }];
  emit('update:medical', { ...props.medical, conditions: newConditions });
}

const removeCondition = (index) => {
  const newConditions = [...props.medical.conditions];
  newConditions.splice(index, 1);
  emit('update:medical', { ...props.medical, conditions: newConditions });
}

/* Allergien */
const addAllergy = () => {
  const newAllergies = [...props.medical.allergies, {
    allergy_name: '',
    note: '',
    allergy_id: null,
  }];
  emit('update:medical', { ...props.medical, allergies: newAllergies });
}

const removeAllergy = (index) => {
  const newAllergies = [...props.medical.allergies];
  newAllergies.splice(index, 1);
  emit('update:medical', { ...props.medical, allergies: newAllergies });
}

/* Dokumente */
const addDocument = () => {
  const newDocuments = [...props.medical.documents, {
    document_title: '',
    file: null,
    document_id: null,
  }];
  emit('update:medical', { ...props.medical, documents: newDocuments });
}

const removeDocument = (index) => {
  const newDocuments = [...props.medical.documents];
  newDocuments.splice(index, 1);
  emit('update:medical', { ...props.medical, documents: newDocuments });
}

defineExpose({
  validate,
})
</script>

<style lang="scss" scoped></style>
