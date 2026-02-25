<template>
  <div>
    <div class="profile-row row items-center q-px-lg q-py-md">
      <div class="col-5 row items-center">
        <q-avatar size="56px">
          <img :src="profile.avatar_url" v-if="profile.avatar_url" />
          <q-icon v-else name="person" color="white" size="32px" />
        </q-avatar>
        <span class="q-ml-md text-body1 text-grey-8 text-weight-medium">
          {{ profile.first_name }} {{ profile.last_name }}
        </span>
      </div>
      <div class="col-3 text-center">
        <q-badge outline label="0 Scans" color="primary" class="scans-badge text-weight-bold" />
      </div>
      <div class="col-4 row items-center justify-center q-gutter-sm">
        <q-btn flat round dense icon="edit" color="grey-6" class="hover-primary-icon" size="md" @click="onEdit(profile)">
          <q-tooltip>Bearbeiten</q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          dense
          icon="picture_as_pdf"
          color="grey-6"
          class="hover-primary-icon"
          size="md"
          @click="generatePDF(profile)"
        >
          <q-tooltip>PDF-Karte erstellen</q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          dense
          icon="delete"
          color="grey-6"
          class="hover-primary-icon"
          size="md"
          @click="onDelete(profile)"
        >
          <q-tooltip>Löschen</q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          dense
          :icon="isExpanded ? 'expand_less' : 'expand_more'"
          color="grey-7"
          class="hover-primary-icon"
          size="md"
          @click="toggleExpanded"
        />
      </div>
    </div>
    <q-slide-transition>
      <div v-show="isExpanded" class="expanded-section">
        <div class="q-px-lg q-py-md">
          <div class="text-weight-medium text-grey-7 q-mb-md">Profil Details</div>
          <div class="history-item row items-start q-pa-md">
            <div class="col-12">
              <div class="row q-mb-sm">
                <div class="col-6">
                  <div class="text-caption text-primary text-weight-bold text-uppercase">Geschlecht</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.gender }}</div>
                </div>
                <div class="col-6">
                  <div class="text-caption text-primary text-weight-bold text-uppercase">Geburtsdatum</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.birthdate }}</div>
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6">
                  <div class="text-caption text-primary text-weight-bold text-uppercase">Größe</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.height }} cm</div>
                </div>
                <div class="col-6">
                  <div class="text-caption text-primary text-weight-bold text-uppercase">Gewicht</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.weight }} kg</div>
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6">
                  <div class="text-caption text-primary text-weight-bold text-uppercase">Blutgruppe</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.blood_type }}</div>
                </div>
                <div class="col-6">
                  <div class="text-caption text-primary text-weight-bold text-uppercase">Adresse</div>
                  <div class="text-weight-medium text-grey-9">
                    {{ profile.street }} {{ profile.house_number }}, {{ profile.postal_code }}
                    {{ profile.city }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-slide-transition>
    <q-separator />
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import { useUserStore } from 'src/stores/userStore'
import { usePDFStore } from 'src/stores/pdfStore'
import axios from 'axios'
const userStore = useUserStore()
const pdfStore = usePDFStore()

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})
console.log('URL:', props.profile.avatar_url)
const isExpanded = ref(false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const emit = defineEmits(['edit'])

const onEdit = (profile) => {
  console.log('Bearbeiten:', profile.first_name, profile.last_name)
  emit('edit', profile)
}

const onDelete = (profile) => {
  console.log(profile.user_id)
  userStore.deleteProfileFromUser(profile.profile_id, profile.user_id)
}

const generatePDF = async (profile) => {
  try {
    console.log('PDF erstellen für:', profile.first_name, profile.last_name)
    console.log('Profil-ID:', profile.profile_id)
    const profileDataPdf = toRaw(await pdfStore.getProfilePDF(profile.profile_id));
    console.log('PDF-Daten erhalten:', profileDataPdf)
    const response = await axios.post('http://localhost:3000/api/v1/pdf/generate', profileDataPdf, {
      responseType: 'blob',
    })

    // PDF als Blob herunterladen
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${profile.first_name}_${profile.last_name}_SmartRescue.pdf`)
    document.body.appendChild(link)
    link.click()
    link.parentNode.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Fehler beim PDF-Download:', error)
  }
}
</script>

<style scoped>
.profile-row {
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}
.profile-row:hover {
  background: rgba(229, 57, 53, 0.03); /* Slight red tint on hover */
  border-left: 4px solid var(--q-primary);
}
.hover-primary-icon {
  transition: all 0.3s ease;
}
.hover-primary-icon:hover {
  color: var(--q-primary) !important;
  background: rgba(229, 57, 53, 0.1) !important;
  transform: scale(1.1);
}
.scans-badge {
  background-color: rgba(229, 57, 53, 0.1) !important;
}
</style>
