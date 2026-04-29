<template>
  <div class="q-pa-xl bg-grey-1" style="min-height: 100vh">
    <div class="q-mb-xl q-pa-xl rounded-borders-xl bg-gradient-primary">
      <h4 class="text-h3 q-ma-none text-weight-bold text-white font-display">Einstellungen</h4>
      <p class="text-h6 text-white-80 q-mt-md q-mb-none font-display">
        Verwalte dein Konto, deine Sicherheit und deine Präferenzen.
      </p>
    </div>

    <q-card flat class="content-container rounded-borders-lg q-mb-lg">
      <div class="section-header q-px-lg q-py-md">
        <div class="text-uppercase text-caption text-weight-bold text-grey-9 font-display">
          Konto-Informationen
        </div>
      </div>
      <q-separator />
      <div class="q-pa-lg">
        <div class="row items-center q-mb-lg">
          <q-avatar size="72px">
            <img v-if="store.user?.avatar_url" :src="store.user.avatar_url" />
            <q-icon v-else name="person" color="white" size="40px" />
          </q-avatar>
          <div class="q-ml-lg">
            <div class="text-h6 text-weight-bold text-grey-9 font-display">
              {{ store.user?.first_name }} {{ store.user?.last_name }}
            </div>
            <div class="text-body2 text-grey-7">{{ store.user?.email }}</div>
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div class="text-caption text-grey-7 q-mb-xs input-header">Vorname</div>
            <q-input outlined v-model="firstName" disable />
          </div>
          <div class="col-12 col-md-6">
            <div class="text-caption text-grey-7 q-mb-xs input-header">Nachname</div>
            <q-input outlined v-model="lastName" disable />
          </div>
          <div class="col-12">
            <div class="text-caption text-grey-7 q-mb-xs input-header">E-Mail Adresse</div>
            <q-input outlined v-model="email" disable />
          </div>
        </div>
      </div>
    </q-card>

    <q-card flat class="content-container rounded-borders-lg q-mb-lg">
      <div class="section-header q-px-lg q-py-md">
        <div class="text-uppercase text-caption text-weight-bold text-grey-9 font-display">
          Sicherheit
        </div>
      </div>
      <q-separator />
      <div class="q-pa-lg">
        <div class="row items-center justify-between">
          <div>
            <div class="text-weight-medium text-grey-9 font-display">Passwort ändern</div>
            <div class="text-body2 text-grey-7">
              Aktualisiere dein Passwort regelmäßig, um dein Konto zu schützen.
            </div>
          </div>
          <q-btn
            outline
            color="primary"
            label="Ändern"
            class="action-btn"
            @click="onChangePassword"
          />
        </div>
      </div>
    </q-card>

    <q-card flat class="content-container rounded-borders-lg q-mb-lg">
      <div class="section-header q-px-lg q-py-md">
        <div class="text-uppercase text-caption text-weight-bold text-grey-9 font-display">
          Präferenzen
        </div>
      </div>
      <q-separator />
      <div class="q-pa-lg">
        <div class="row items-center justify-between q-mb-md">
          <div>
            <div class="text-weight-medium text-grey-9 font-display">Sprache</div>
            <div class="text-body2 text-grey-7">Wähle deine bevorzugte Sprache für die Webseite.</div>
          </div>
          <q-select
            outlined
            v-model="language"
            :options="languageOptions"
            emit-value
            map-options
            style="min-width: 200px"
          />
        </div>

        <q-separator class="q-my-md" />

        <div class="row items-center justify-between">
          <div>
            <div class="text-weight-medium text-grey-9 font-display">E-Mail-Benachrichtigungen</div>
            <div class="text-body2 text-grey-7">
              Erhalte Benachrichtigungen über Profil-Scans und Sicherheitsaktivitäten.
            </div>
          </div>
          <q-toggle v-model="emailNotifications" color="primary" />
        </div>
      </div>
    </q-card>

    <q-card flat class="content-container rounded-borders-lg danger-zone">
      <div class="section-header q-px-lg q-py-md">
        <div class="text-uppercase text-caption text-weight-bold text-negative font-display">
          Gefahrenzone
        </div>
      </div>
      <q-separator />
      <div class="q-pa-lg">
        <div class="row items-center justify-between q-mb-md">
          <div>
            <div class="text-weight-medium text-grey-9 font-display">Abmelden</div>
            <div class="text-body2 text-grey-7">
              Melde dich von deinem Konto auf diesem Gerät ab.
            </div>
          </div>
          <q-btn outline color="grey-8" label="Abmelden" class="action-btn" @click="onLogout" />
        </div>

        <q-separator class="q-my-md" />

        <div class="row items-center justify-between">
          <div>
            <div class="text-weight-medium text-negative font-display">Konto löschen</div>
            <div class="text-body2 text-grey-7">
              Lösche dein Konto und alle zugehörigen Profile unwiderruflich.
            </div>
          </div>
          <q-btn unelevated color="negative" label="Konto löschen" class="action-btn" />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from 'src/stores/authStore'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const store = useAuthStore()
const router = useRouter()
const $q = useQuasar()

const firstName = computed(() => store.user?.first_name || '')
const lastName = computed(() => store.user?.last_name || '')
const email = computed(() => store.user?.email || '')

const language = ref('de')
const emailNotifications = ref(true)

const languageOptions = [
  { label: 'Deutsch', value: 'de' },
  { label: 'English', value: 'en' },
  { label: 'Polski', value: 'pl' },
  { label: 'Türkçe', value: 'tr' },
]

const onChangePassword = () => {
  $q.notify({
    type: 'info',
    message: 'Passwort-Änderung wird in Kürze verfügbar sein.',
    position: 'top',
  })
}

const onLogout = async () => {
  await store.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
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
.content-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.section-header {
  background: #f8f9fa;
}
.input-header {
  font-weight: 500;
}
.action-btn {
  border-radius: 12px;
  padding: 8px 20px;
  font-weight: 600;
}
.danger-zone {
  border: 1px solid rgba(229, 57, 53, 0.15);
}
:deep(.q-field--outlined .q-field__control) {
  border-radius: 12px;
}
</style>
