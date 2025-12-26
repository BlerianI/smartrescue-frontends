<template>
  <div class="justify-center text-center text-h6 q-mb-md" style="color: #5a6c7d; font-weight: 500">
    Medizinische Informationen
  </div>

  <div class="row q-col-gutter-md">
    <div class="col-12">
      <label class="field-label">WICHTIGE INFORMATIONEN</label>
      <q-input
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
  >
    Medikamente
  </div>

  <div class="col-12">
    <q-btn
      flat
      class="full-width q-py-sm"
      style="background: #9fb4cc; color: white; border-radius: 8px; font-weight: 500"
      label="Medikament hinzufügen"
      @click="addMedication"
    />
  </div>

  <div v-for="(medication, index) in medications" :key="index" class="q-mt-md">
    <q-card flat bordered class="contact-card">
      <q-card-section class="row items-center justify-between">
        <div class="text-subtitle2" style="color: #5a6c7d; font-weight: 600">
          Medikament {{ index + 1 }}
        </div>
        <q-btn dense flat round icon="delete" color="negative" @click="removeMedication(index)" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <label class="field-label">MEDIKAMENTENNAME</label>
            <q-input
              outlined
              v-model="medication.med_name"
              class="inputs"
              placeholder="z. B. Aspirin"
            />
          </div>
          <div class="col-6">
            <label class="field-label">DOSIERUNG</label>
            <q-input
              outlined
              v-model="medication.dosage"
              class="inputs"
              placeholder="z. B. 500mg"
            />
          </div>
          <div class="col-6">
            <label class="field-label">HÄUFIGKEIT</label>
            <q-input
              outlined
              v-model="medication.frequency"
              class="inputs"
              placeholder="z. B. 2x täglich"
            />
          </div>
          <div class="col-12">
            <label class="field-label">NOTIZ</label>
            <q-input
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

  <div
    class="justify-center text-center text-h6 q-mb-md q-mt-lg"
    style="color: #5a6c7d; font-weight: 500"
  >
    Erkrankungen
  </div>

  <div class="col-12">
    <q-btn
      flat
      class="full-width q-py-sm"
      style="background: #9fb4cc; color: white; border-radius: 8px; font-weight: 500"
      label="Erkrankung hinzufügen"
      @click="addCondition"
    />
  </div>

  <div v-for="(condition, index) in conditions" :key="index" class="q-mt-md">
    <q-card flat bordered class="contact-card">
      <q-card-section class="row items-center justify-between">
        <div class="text-subtitle2" style="color: #5a6c7d; font-weight: 600">
          Erkrankung {{ index + 1 }}
        </div>
        <q-btn dense flat round icon="delete" color="negative" @click="removeCondition(index)" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <label class="field-label">ERKRANKUNG</label>
            <q-input
              outlined
              v-model="condition.condition_name"
              class="inputs"
              placeholder="z. B. Diabetes Typ 2"
            />
          </div>
          <div class="col-6">
            <label class="field-label">DIAGNOSE SEIT</label>
            <q-input
              outlined
              v-model="condition.diagnosed_since"
              class="inputs"
              placeholder="TT.MM.JJJJ"
              mask="##.##.####"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
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
            <label class="field-label">NOTIZ</label>
            <q-input
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

  <div
    class="justify-center text-center text-h6 q-mb-md q-mt-lg"
    style="color: #5a6c7d; font-weight: 500"
  >
    Allergien
  </div>

  <div class="col-12">
    <q-btn
      flat
      class="full-width q-py-sm"
      style="background: #9fb4cc; color: white; border-radius: 8px; font-weight: 500"
      label="Allergie hinzufügen"
      @click="addAllergy"
    />
  </div>

  <div v-for="(allergy, index) in allergies" :key="index" class="q-mt-md">
    <q-card flat bordered class="contact-card">
      <q-card-section class="row items-center justify-between">
        <div class="text-subtitle2" style="color: #5a6c7d; font-weight: 600">
          Allergie {{ index + 1 }}
        </div>
        <q-btn dense flat round icon="delete" color="negative" @click="removeAllergy(index)" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <label class="field-label">ALLERGIE</label>
            <q-input
              outlined
              v-model="allergy.allergie_name"
              class="inputs"
              placeholder="z. B. Penicillin"
            />
          </div>
          <div class="col-12">
            <label class="field-label">NOTIZ</label>
            <q-input
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

  <div
    class="justify-center text-center text-h6 q-mb-md q-mt-lg"
    style="color: #5a6c7d; font-weight: 500"
  >
    Dokumente
  </div>

  <div class="col-12">
    <q-btn
      flat
      class="full-width q-py-sm"
      style="background: #9fb4cc; color: white; border-radius: 8px; font-weight: 500"
      label="Dokument hinzufügen"
      @click="addDocument"
    />
  </div>

  <div v-for="(document, index) in documents" :key="index" class="q-mt-md">
    <q-card flat bordered class="contact-card">
      <q-card-section class="row items-center justify-between">
        <div class="text-subtitle2" style="color: #5a6c7d; font-weight: 600">
          Dokument {{ index + 1 }}
        </div>
        <q-btn dense flat round icon="delete" color="negative" @click="removeDocument(index)" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <label class="field-label">DOKUMENTTITEL</label>
            <q-input
              outlined
              v-model="document.document_title"
              class="inputs"
              placeholder="z. B. Blutbild 2025"
            />
          </div>
          <div class="col-12">
            <label class="field-label">DOKUMENT HOCHLADEN</label>
            <q-file outlined v-model="document.file" class="inputs" placeholder="Datei auswählen" />
          </div>
        </div>
      </q-card-section>
    </q-card>
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

/* 🔑 Proxy für komplettes Medical-Objekt */
const medical = computed({
  get: () =>
    props.modelValue ?? {
      key_info: '',
      medications: [],
      conditions: [],
      allergies: [],
      documents: [],
    },
  set: (val) => emit('update:modelValue', val),
})

/* 🔹 Helper-Arrays (nur Getter) */
const medications = computed(() => medical.value.medications)
const conditions = computed(() => medical.value.conditions)
const allergies = computed(() => medical.value.allergies)
const documents = computed(() => medical.value.documents)

/* 🔹 Aktionen */
const addMedication = () => {
  medical.value.medications.push({
    med_name: '',
    dosage: '',
    frequency: '',
    note: '',
  })
}

const removeMedication = (index) => {
  medical.value.medications.splice(index, 1)
}

const addCondition = () => {
  medical.value.conditions.push({
    condition_name: '',
    diagnosed_since: '',
    note: '',
  })
}

const removeCondition = (index) => {
  medical.value.conditions.splice(index, 1)
}

const addAllergy = () => {
  medical.value.allergies.push({
    allergie_name: '',
    note: '',
  })
}

const removeAllergy = (index) => {
  medical.value.allergies.splice(index, 1)
}

const addDocument = () => {
  medical.value.documents.push({
    document_title: '',
    file: null,
  })
}

const removeDocument = (index) => {
  medical.value.documents.splice(index, 1)
}
</script>

<style lang="scss" scoped></style>
