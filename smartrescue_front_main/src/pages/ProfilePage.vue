<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" style="height: 100vh">
      <q-drawer
        v-model="drawer"
        show-if-above
        side="left"
        :width="280"
        class="sidebar-drawer"
      >
        <div
          class="q-pa-lg flex flex-center bg-white full-width rounded-borders cursor-pointer transition-fast hover-scale"
          @click="onLogoClick"
        >
          <img
            src="/Logo1000x350.png"
            alt="Logo"
            style="max-width: 90%; height: auto; object-fit: contain"
          />
        </div>
        <q-separator class="separator-line" />

        <div class="q-px-md q-mt-md">
          <div class="text-caption text-grey-5 text-weight-bold text-uppercase q-mb-sm q-ml-sm font-display">Navigation</div>
          <q-list class="q-gutter-y-sm">
            <q-item clickable class="nav-item active-nav-item rounded-borders-md transition-fast">
              <q-item-section avatar>
                <q-icon name="group" class="text-primary" size="24px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold text-primary font-display">Meine Profile</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable class="nav-item rounded-borders-md transition-fast">
              <q-item-section avatar>
                <q-icon name="settings" class="text-grey-6" size="24px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium text-grey-8 font-display">Einstellungen</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable class="nav-item rounded-borders-md transition-fast">
              <q-item-section avatar>
                <q-icon name="help_outline" class="text-grey-6" size="24px" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium text-grey-8 font-display">Hilfe & Support</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

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
        <q-page>
          <div class="q-pa-xl bg-grey-1" style="min-height: 100vh">
            <div
              class="q-mb-xl q-pa-xl rounded-borders-xl bg-gradient-primary row items-center justify-between"
            >
              <div>
                <h4 class="text-h3 q-ma-none text-weight-bold text-white font-display">
                  Meine Notfall-Profile
                </h4>
                <p class="text-h6 text-white-80 q-mt-md q-mb-none font-display">
                  Alle deine Notfallarmband-Profile an einem Ort – verwalten, anpassen und als PDF sichern.
                </p>
              </div>

              <q-btn
                unelevated
                color="white"
                text-color="primary"
                label="+ NEUES PROFIL"
                class="neues-profil-btn text-weight-bold"
                @click="onNeuesProfil"
              />
            </div>
            <q-card flat class="content-container rounded-borders-lg">
              <div class="table-header row items-center q-px-lg q-py-md">
                <div class="col-5 text-weight-bold text-grey-9 text-uppercase text-caption font-display">Namen</div>
                <div class="col-3 text-weight-bold text-grey-9 text-center text-uppercase text-caption font-display">Scans</div>
                <div class="col-4 text-weight-bold text-grey-9 text-center text-uppercase text-caption font-display">Aktionen</div>
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
  background: white;
  border-right: 1px solid #eeeeee;
}

// Navigation Items
.nav-item {
  background: transparent;
  padding: 12px 16px;
  
  &:hover {
    background: rgba(229, 57, 53, 0.05);
    .q-icon {
      color: var(--q-primary) !important;
      transform: scale(1.1);
      transition: all 0.3s ease;
    }
    .text-grey-8 {
      color: var(--q-primary) !important;
      transition: all 0.3s ease;
    }
  }
}

.active-nav-item {
  background: rgba(229, 57, 53, 0.1) !important;
}

.hover-scale:hover {
  transform: scale(1.02);
}

.rounded-borders-md {
  border-radius: 12px;
}

// Profil unten
.separator-line {
  margin: 20px;
  background: #eeeeee;
  height: 1px;
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
  background: #f8f9fa;
  border-bottom: 1px solid #eeeeee;
}
.neues-profil-btn {
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
}

$primary: #e53935;
$secondary: #b71c1c;

.bg-gradient-primary {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
}
.text-white-80 {
  color: rgba(255, 255, 255, 0.9);
}
.font-display {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  letter-spacing: -0.01em;
}
.rounded-borders-lg {
  border-radius: 20px;
}
.rounded-borders-xl {
  border-radius: 32px;
}
</style>
