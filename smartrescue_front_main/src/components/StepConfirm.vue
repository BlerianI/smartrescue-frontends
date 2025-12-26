<template>
  <q-icon name="check_circle" size="80px" color="positive" />
  <div class="text-h6 q-mt-md" style="color: #5a6c7d">Profil bereit!</div>
  <div class="text-body2 text-grey-6 q-mt-sm">Alle Daten wurden erfolgreich eingegeben.</div>

  <q-card flat bordered class="q-mt-lg text-left">
    <q-card-section>
      <div class="text-subtitle2" style="color: #5a6c7d">Zusammenfassung:</div>

      <div class="q-mt-sm text-body2">
        <div>
          <strong>Name:</strong>
          {{ data.personal.first_name }} {{ data.personal.last_name }}
        </div>

        <div>
          <strong>Größe:</strong>
          {{ data.personal.height }} cm
        </div>

        <div>
          <strong>Gewicht:</strong>
          {{ data.personal.weight }} kg
        </div>

        <div>
          <strong>Geschlecht:</strong>
          {{ data.personal.gender }}
        </div>

        <div>
          <strong>Geburtsdatum:</strong>
          {{ data.personal.birthdate }}
        </div>

        <div>
          <strong>Blutgruppe:</strong>
          {{ data.personal.bloodtype }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>
