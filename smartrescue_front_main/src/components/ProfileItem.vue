<template>
  <div>
    <!-- PROFILE ROW -->
    <div class="profile-row row items-center q-px-lg q-py-md">
      <!-- AVATAR + NAME -->
      <div class="col-5 row items-center">
        <q-avatar size="56px" color="blue-grey-4">
          <q-icon name="person" color="white" size="32px" />
        </q-avatar>
        <span class="q-ml-md text-body1 text-grey-8 text-weight-medium">
          {{ profile.name }}
        </span>
      </div>

      <!-- SCANS BADGE -->
      <div class="col-3 text-center">
        <q-badge outline :label="`${profile.scans} Scans`" color="grey-7" class="scans-badge" />
      </div>

      <!-- AKTIONEN -->
      <div class="col-4 row items-center justify-center q-gutter-sm">
        <q-btn flat round dense icon="edit" color="blue-grey-5" size="md" @click="onEdit">
          <q-tooltip>Bearbeiten</q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="delete" color="blue-grey-5" size="md" @click="onDelete">
          <q-tooltip>Löschen</q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          dense
          :icon="expanded ? 'expand_less' : 'expand_more'"
          color="grey-9"
          size="md"
          @click="expanded = !expanded"
        />
      </div>
    </div>

    <!-- EXPANDED SECTION - QR CODE HISTORIE -->
    <q-slide-transition>
      <div v-show="expanded" class="expanded-section">
        <div class="q-px-lg q-py-md">
          <div class="text-weight-medium text-grey-7 q-mb-md">QR-Code Scan Historie</div>

          <div
            v-for="(scan, index) in profile.history"
            :key="index"
            class="history-item row items-center q-pa-md"
          >
            <q-avatar size="48px" color="blue-grey-4">
              <q-icon name="qr_code_scanner" color="white" size="24px" />
            </q-avatar>
            <div class="q-ml-md">
              <div class="text-weight-medium text-grey-9">{{ scan.date }}</div>
              <div class="text-caption text-grey-6">{{ scan.location }}</div>
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
  profile: {
    type: Object,
    required: true,
  },
})

const expanded = ref(false)

const onEdit = () => {
  console.log('Bearbeiten:', props.profile.name)
  // Hier deine Edit-Logik
}

const onDelete = () => {
  console.log('Löschen:', props.profile.name)
  // Hier deine Delete-Logik
}
</script>

<style lang="scss" scoped>
.profile-row {
  background: #f8f9fa;
  transition: background 0.2s;

  &:hover {
    background: #f0f1f3;
  }
}

.scans-badge {
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 13px;
}

.expanded-section {
  background: #f0f1f3;
}

.history-item {
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}
</style>
