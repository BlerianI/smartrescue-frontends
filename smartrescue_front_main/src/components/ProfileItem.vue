<template>
  <div v-for="profile in props.profiles" :key="profile.profile_id">
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
        <q-badge outline label="0 Scans" color="grey-7" class="scans-badge" />
      </div>
      <div class="col-4 row items-center justify-center q-gutter-sm">
        <q-btn flat round dense icon="edit" color="blue-grey-5" size="md" @click="onEdit(profile)">
          <q-tooltip>Bearbeiten</q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          dense
          icon="delete"
          color="blue-grey-5"
          size="md"
          @click="onDelete(profile)"
        >
          <q-tooltip>Löschen</q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          dense
          :icon="expandedProfiles[profile.profile_id] ? 'expand_less' : 'expand_more'"
          color="grey-9"
          size="md"
          @click="toggleExpanded(profile.profile_id)"
        />
      </div>
    </div>
    <q-slide-transition>
      <div v-show="expandedProfiles[profile.profile_id]" class="expanded-section">
        <div class="q-px-lg q-py-md">
          <div class="text-weight-medium text-grey-7 q-mb-md">Profil Details</div>
          <div class="history-item row items-start q-pa-md">
            <div class="col-12">
              <div class="row q-mb-sm">
                <div class="col-6">
                  <div class="text-caption text-grey-6">Geschlecht</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.gender }}</div>
                </div>
                <div class="col-6">
                  <div class="text-caption text-grey-6">Geburtsdatum</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.birthdate }}</div>
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6">
                  <div class="text-caption text-grey-6">Größe</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.height }} cm</div>
                </div>
                <div class="col-6">
                  <div class="text-caption text-grey-6">Gewicht</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.weight }} kg</div>
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6">
                  <div class="text-caption text-grey-6">Blutgruppe</div>
                  <div class="text-weight-medium text-grey-9">{{ profile.blood_type }}</div>
                </div>
                <div class="col-6">
                  <div class="text-caption text-grey-6">Adresse</div>
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
import { ref } from 'vue'

const props = defineProps({
  profiles: {
    type: Array,
    required: true,
  },
})
console.log('Alle Profile:', props.profiles)
props.profiles.forEach((p) => {
  console.log(`Profil: ${p.first_name} ${p.last_name}`)
})
const expandedProfiles = ref({})

const toggleExpanded = (profileId) => {
  expandedProfiles.value[profileId] = !expandedProfiles.value[profileId]
}

const onEdit = (profile) => {
  console.log('Bearbeiten:', profile.first_name, profile.last_name)
}

const onDelete = (profile) => {
  console.log('Löschen:', profile.first_name, profile.last_name)
}
</script>
