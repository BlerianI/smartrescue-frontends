<template>
  <div class="q-pt-md" style="max-width: 450px">
    <div>
      <h4 class="header">Willkommen zurück</h4>
      <p class="subheading text-grey-7">Melde dich an und verwalte deine Profile</p>
    </div>
    <q-form @submit="handleSubmit" class="q-gutter-md">
      <div>
        <div class="text-body2 text-grey-7 q-mb-xs input-header">E-Mail Adresse</div>
        <q-input
          outlined
          v-model="email"
          class="login-input"
          placeholder="max@beispiel.de"
          lazy-rules
          :rules="[
            (val) => !!val || 'Bitte E-Mail eingeben',
            (val) =>
              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(val) ||
              'Ungültige E-Mail-Adresse',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </div>

      <div>
        <div class="text-body2 text-grey-7 q-mb-xs input-header" style="margin-top: -6px">Passwort</div>

        <q-input
          outlined
          v-model="password"
          class="login-input"
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            (val) => val.length > 0 || 'Bitte Password eingeben',
            (val) => val.length >= 8 || 'Password muss mindestens 8 Zeichen beinhalten',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>

          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>

      <q-btn
        type="submit"
        label="Anmelden"
        icon-right="eva-arrow-forward-outline"
        class="jwtLogin text-white shadow-2"
      />

      <div class="row items-center q-gutter-sm seperator" style="width: 450px">
        <q-separator class="col-grow" />
        <div class="text-grey text-caption">ODER</div>
        <q-separator class="col-grow" />
      </div>

      <q-btn
        @click="authStore.googleLogin()"
        label="Mit Google anmelden"
        class="googleLogin"
        icon="eva-google"
      />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const isPwd = ref(true)

const handleSubmit = async () => {
  try {
    // 1. Zuerst einloggen (setzt authStore.user)
    await authStore.signIn(email.value, password.value)

    // 2. Warten bis Store definitiv gesetzt ist
    if (!authStore.user) {
      throw new Error('Login fehlgeschlagen')
    }

    await router.push('/profile')
  } catch (error) {
    console.error('Login Error:', error)
    // Optional: Fehler dem User anzeigen
  }
}
</script>

<style lang="scss" scoped>
.login-input {
  width: 450px;
}

:deep(.q-field__control) {
  border-radius: 15px !important;
}

:deep(.q-field--outlined .q-field__control::before) {
  border: 1.6px solid #e5e7eb !important;
}

.q-btn {
  width: 450px;
  height: 56px;
}

.jwtLogin {
  background: linear-gradient(90deg, rgba(251, 44, 54, 1) 0%, rgba(231, 0, 11, 1) 50%) !important;
}

:deep(.googleLogin) {
  border: 1.6px solid #e5e7eb !important;
}

/*margin: top, right, bottom, left*/
.header {
  margin: 15px 0px 5px 0px;
}

.subheading {
  margin-bottom: 50px;
}

@media (max-width: 599px) {
  body {
    overflow-x: hidden;
  }

  .login-container {
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .login-input {
    width: 280px;
  }

  :deep(.q-field__control) {
    height: 45px;
  }

  :deep(.q-field__marginal) {
    height: 45px;
  }

  .separator-container {
    width: 280px;
  }

  .q-btn {
    width: 280px;
    height: 45px;
    font-size: 12px;
  }

  .header {
    font-size: 24px;
  }

  .subheading {
    font-size: 14.5px;
    margin-bottom: 30px;
  }

  .input-header {
    font-size: 0.8rem;
  }

  .seperator {
    max-width: 280px;
  }
}
</style>
