<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" style="height: 100vh">
      <!-- HEADER MIT TOGGLE BUTTON -->
      <q-header elevated class="bg-white text-dark">
        <q-toolbar>
          <q-btn flat dense round icon="menu" @click="drawer = !drawer" />
        </q-toolbar>
      </q-header>

      <!-- SIDEBAR -->
      <q-drawer v-model="drawer" show-if-above side="left" :width="250" class="sidebar-drawer">
        <!-- LOGO OBEN -->
        <div class="q-pa-md flex flex-center bg-white full-width rounded-borders">
          <img
            src="/Logo1000x350.png"
            alt="Logo"
            style="max-width: 100%; height: 100px; object-fit: contain"
          />
        </div>
        <q-separator class="separator-line" />

        <!-- NAVIGATION ITEMS -->
        <q-list class="q-px-md">
          <q-item v-for="i in 5" :key="i" clickable class="nav-item q-mb-xs">
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" size="32px">
                <q-icon name="person" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">Lorem</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- PROFIL - ABSOLUTE BOTTOM -->
        <div class="absolute-bottom full-width">
          <q-separator class="separator-line" />
          <div class="profile-section q-pa-md">
            <div class="row items-center no-wrap">
              <q-avatar size="48px">
                <img :src="store.user.avatar_url" />
              </q-avatar>
              <div class="column q-ml-sm">
                <div class="text-weight-bold profile-name">
                  {{ store.user.first_name + ' ' + store.user.last_name }}
                </div>
                <div class="text-caption profile-email">
                  {{ store.user.email }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <div class="q-pa-lg" style="background: #f5f5f5; min-height: 100vh">
            <!-- ÜBERSCHRIFT MIT BUTTON -->
            <div class="q-mb-lg row items-center justify-between">
              <div>
                <h4 class="text-h4 q-ma-none text-weight-medium text-grey-9">
                  Meine Notfall-Profile
                </h4>
                <p class="text-body2 text-grey-6 q-mt-xs q-mb-none">
                  Es ist Aykut Anhan, Hermann-Steinhäuser Straße Mainpark
                </p>
              </div>

              <!-- NEUES PROFIL BUTTON -->
              <q-btn
                outline
                color="red"
                label="+ NEUES PROFIL"
                class="neues-profil-btn"
                @click="onNeuesProfil"
              />
            </div>
            <!-- LEERER WEIßER CONTAINER -->
            <q-card flat class="content-container">
              <!-- TABELLEN HEADER -->
              <div class="table-header row items-center q-px-lg q-py-md">
                <div class="col-5 text-weight-medium text-grey-8">Namen</div>
                <div class="col-3 text-weight-medium text-grey-8 text-center">Scans</div>
                <div class="col-4 text-weight-medium text-grey-8 text-center">Aktionen</div>
              </div>

              <q-separator />

              <!-- PROFILE ITEMS -->
              <ProfileItem v-for="profile in profiles" :key="profile.id" :profile="profile" />
            </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/authStore'
import { ref } from 'vue'
import ProfileItem from 'src/components/ProfileItem.vue'

const drawer = ref(true)
const store = useAuthStore()

const profiles = ref([
  {
    id: 1,
    name: 'Max Mustermann',
    scans: 0,
    history: [],
  },
  {
    id: 2,
    name: 'Max Mustermann',
    scans: 1,
    history: [
      {
        date: '20.09.2025 16:45',
        location: 'Oesterreich, Wien, Linzer Strasse 15',
      },
    ],
  },
  {
    id: 3,
    name: 'Max Mustermann',
    scans: 0,
    history: [],
  },
])
</script>

<style lang="scss" scoped>
// Sidebar
.sidebar-drawer {
  background: #e8ecf1;
  border-right: 1px solid #c9d4e4;
}

// Navigation Items
.nav-item {
  margin-top: 10%;
  background: white;
  border-radius: 10px;
  padding: 8px 12px;
  transition: all 0.2s;

  &:hover {
    background: #f0f4f8;
  }
}

// Profil unten
.separator-line {
  margin: 20px;
  background: #b8c5d6;
  height: 2px;
}

.content-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
file-section {
  border-radius: 20px 20px 0 0;
}

.profile-name {
  color: #2c3e50;
  font-size: 14px;
}

.profile-email {
  color: #6c7a89;
  font-size: 12px;
}
.table-header {
  background: #e8e8e8;
}
.neues-profil-btn {
  border-radius: 8px;
  border-width: 2px;
  padding: 8px 20px;
  font-weight: 500;
  margin-right: 5px;
}
</style>
