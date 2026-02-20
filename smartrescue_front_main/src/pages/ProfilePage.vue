<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" style="height: 100vh">
      <q-header elevated class="bg-white text-dark">
        <q-toolbar>
          <q-btn flat dense round icon="menu" @click="drawer = !drawer" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        side="left"
        :width="250"
        class="sidebar-drawer shadow-1"
      >
        <div
          class="q-pa-md flex flex-center bg-white full-width rounded-borders cursor-pointer"
          @click="onLogoClick"
        >
          <img
            src="/Logo1000x350.png"
            alt="Logo"
            style="max-width: 100%; height: 100px; object-fit: contain"
          />
        </div>
        <q-separator class="separator-line" />

        <!-- <q-list class="q-px-md">
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
        </q-list> -->

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
            <div class="q-mb-lg row items-center justify-between">
              <div>
                <h4 class="text-h4 q-ma-none text-weight-medium text-grey-9">
                  Meine Notfall-Profile
                </h4>
                <p class="text-body2 text-grey-6 q-mt-xs q-mb-none">
                  Alle deine Notfallarmband-Profile an einem Ort – verwalten, anpassen und als PDF sichern.
                </p>
              </div>

              <q-btn
                outline
                color="red"
                label="+ NEUES PROFIL"
                class="neues-profil-btn"
                @click="onNeuesProfil"
              />
            </div>
            <q-card flat class="content-container">
              <div class="table-header row items-center q-px-lg q-py-md">
                <div class="col-5 text-weight-medium text-grey-8">Namen</div>
                <div class="col-3 text-weight-medium text-grey-8 text-center">Scans</div>
                <div class="col-4 text-weight-medium text-grey-8 text-center">Aktionen</div>
              </div>

              <q-separator />

              <ProfileItem
                v-for="profile in userStore.profiles"
                :key="profile.profile_id"
                :profile="profile"
                @edit="onEditProfile"
              />
            </q-card>
          </div>
        </q-page>
        <NewProfile
          v-model="showNewProfile"
          :user-id="store.user.user_id"
          :profile-id="currentProfileId"
          @profile-saved="onProfileSaved"
        />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import { useAuthStore } from 'src/stores/authStore'
import { useUserStore } from 'src/stores/userStore'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProfileItem from 'src/components/ProfileItem.vue'
import NewProfile from './NewProfile.vue'

const router = useRouter()
const drawer = ref(true)
const store = useAuthStore()
const userStore = useUserStore()

const showNewProfile = ref(false)
const currentProfileId = ref(null)

// Lade die Profile wenn die Komponente gemountet ist
onMounted(async () => {
  await userStore.getProfilesFromUser(store.user.user_id)
})
const onProfileSaved = async () => {
  showNewProfile.value = false
  currentProfileId.value = null
  await userStore.getProfilesFromUser(store.user.user_id)
}
const onNeuesProfil = () => {
  currentProfileId.value = null
  showNewProfile.value = true
}

const onEditProfile = (profile) => {
  currentProfileId.value = profile.profile_id
  showNewProfile.value = true
}

const onLogoClick = () => {
  router.push('/')
}
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
