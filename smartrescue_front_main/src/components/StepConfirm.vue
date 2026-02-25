<template>
  <div class="confirm-container">
    <!-- Success Header -->
    <div class="confirm-header text-center q-mb-lg">
      <div class="check-icon-wrapper q-mb-md">
        <q-icon name="check_circle" size="64px" color="primary" />
      </div>
      <div class="text-h5 text-weight-bold text-grey-9 font-display">Profil bereit!</div>
      <div class="text-body2 text-grey-6 q-mt-xs">
        Bitte überprüfe deine Angaben vor dem Speichern.
      </div>
    </div>

    <!-- Personal Data Card -->
    <div class="summary-card q-mb-md">
      <div class="card-header row items-center q-mb-md">
        <q-icon name="person" size="20px" class="text-primary q-mr-sm" />
        <span class="text-weight-bold text-grey-9 font-display text-uppercase" style="font-size: 12px; letter-spacing: 0.05em">Persönliche Daten</span>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <div class="data-label">Name</div>
          <div class="data-value">{{ data.personal.first_name }} {{ data.personal.last_name }}</div>
        </div>
        <div class="col-6">
          <div class="data-label">Geburtsdatum</div>
          <div class="data-value">{{ data.personal.birthdate || '–' }}</div>
        </div>
        <div class="col-6">
          <div class="data-label">Geschlecht</div>
          <div class="data-value">{{ data.personal.gender || '–' }}</div>
        </div>
        <div class="col-6">
          <div class="data-label">Blutgruppe</div>
          <div class="data-value highlight">{{ data.personal.bloodtype || '–' }}</div>
        </div>
        <div class="col-6">
          <div class="data-label">Größe</div>
          <div class="data-value">{{ data.personal.height ? data.personal.height + ' cm' : '–' }}</div>
        </div>
        <div class="col-6">
          <div class="data-label">Gewicht</div>
          <div class="data-value">{{ data.personal.weight ? data.personal.weight + ' kg' : '–' }}</div>
        </div>
        <div class="col-12">
          <div class="data-label">Adresse</div>
          <div class="data-value">
            {{ data.personal.street || '' }} {{ data.personal.housenumber || '' }}<span v-if="data.personal.postalcode || data.personal.city">,
            {{ data.personal.postalcode || '' }} {{ data.personal.city || '' }}</span>
            <span v-if="!data.personal.street && !data.personal.city">–</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Doctor Card -->
    <div class="summary-card q-mb-md" v-if="data.doctor">
      <div class="card-header row items-center q-mb-md">
        <q-icon name="local_hospital" size="20px" class="text-primary q-mr-sm" />
        <span class="text-weight-bold text-grey-9 font-display text-uppercase" style="font-size: 12px; letter-spacing: 0.05em">Hausarzt</span>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <div class="data-label">Name</div>
          <div class="data-value">{{ data.doctor.title || '' }} {{ data.doctor.first_name }} {{ data.doctor.last_name }}</div>
        </div>
        <div class="col-6">
          <div class="data-label">Fachrichtung</div>
          <div class="data-value">{{ data.doctor.specialty || '–' }}</div>
        </div>
        <div class="col-6">
          <div class="data-label">Telefon</div>
          <div class="data-value">{{ data.doctor.phone_number || '–' }}</div>
        </div>
        <div class="col-6">
          <div class="data-label">Ort</div>
          <div class="data-value">{{ data.doctor.city || '–' }}</div>
        </div>
      </div>
    </div>

    <!-- Emergency Contacts -->
    <div class="summary-card q-mb-md" v-if="data.emergencyContacts && data.emergencyContacts.length > 0">
      <div class="card-header row items-center q-mb-md">
        <q-icon name="emergency" size="20px" class="text-primary q-mr-sm" />
        <span class="text-weight-bold text-grey-9 font-display text-uppercase" style="font-size: 12px; letter-spacing: 0.05em">Notfallkontakte</span>
        <q-badge class="q-ml-sm" color="primary" :label="data.emergencyContacts.length" />
      </div>
      <div v-for="(contact, i) in data.emergencyContacts" :key="i" class="contact-row row items-center q-py-xs">
        <div class="col-5">
          <div class="data-value text-weight-medium">{{ contact.first_name }} {{ contact.last_name }}</div>
        </div>
        <div class="col-4">
          <div class="data-value" style="font-size: 13px">{{ contact.phone_number || '–' }}</div>
        </div>
        <div class="col-3">
          <div class="data-value" style="font-size: 13px; color: #999">{{ contact.relationship || '' }}</div>
        </div>
      </div>
    </div>

    <!-- Medical Summary -->
    <div class="summary-card" v-if="data.medical">
      <div class="card-header row items-center q-mb-md">
        <q-icon name="monitor_heart" size="20px" class="text-primary q-mr-sm" />
        <span class="text-weight-bold text-grey-9 font-display text-uppercase" style="font-size: 12px; letter-spacing: 0.05em">Medizinisch</span>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <div class="stat-box">
            <div class="stat-number text-primary">{{ data.medical.medications ? data.medical.medications.length : 0 }}</div>
            <div class="stat-label">Medikamente</div>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-box">
            <div class="stat-number text-primary">{{ data.medical.conditions ? data.medical.conditions.length : 0 }}</div>
            <div class="stat-label">Erkrankungen</div>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-box">
            <div class="stat-number text-primary">{{ data.medical.allergies ? data.medical.allergies.length : 0 }}</div>
            <div class="stat-label">Allergien</div>
          </div>
        </div>
      </div>
      <div v-if="data.medical.key_info" class="q-mt-md">
        <div class="data-label">Wichtige Info</div>
        <div class="data-value" style="font-size: 13px">{{ data.medical.key_info }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.confirm-container {
  text-align: left;
}

.font-display {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  letter-spacing: -0.01em;
}

.check-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(229, 57, 53, 0.08);
}

.summary-card {
  background: #fafafa;
  border-radius: 12px;
  padding: 16px 20px;
  border: 1px solid #f0f0f0;
}

.card-header {
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.data-label {
  font-size: 10px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 2px;
}

.data-value {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}

.data-value.highlight {
  color: var(--q-primary);
  font-weight: 700;
}

.contact-row {
  border-bottom: 1px solid #f5f5f5;
}

.contact-row:last-child {
  border-bottom: none;
}

.stat-box {
  text-align: center;
  background: white;
  border-radius: 10px;
  padding: 12px 8px;
  border: 1px solid #f0f0f0;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  color: #999;
  font-weight: 500;
}
</style>
