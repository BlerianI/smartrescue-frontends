<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="handleSubmit" class="q-gutter-md">
      <q-input
        outlined
        v-model="firstname"
        class="login-input"
        placeholder="Max"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Bitte Vornamen eingeben']"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input
        outlined
        v-model="lastname"
        class="login-input"
        placeholder="Mustermann"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Bitte Nachnamen eingeben']"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input
        outlined
        v-model="email"
        class="login-input"
        placeholder="max@beispiel.de"
        lazy-rules
        :rules="[
          (val) => !!val || 'Bitte E-Mail eingeben',
          (val) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(val) || 'Ungültige E-Mail-Adresse'
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <q-input
        outlined
        v-model="password"
        class="login-input"
        :type="isPwd ? 'password' : 'text'"
        lazy-rules
        :rules="[
          (val) => (val.length > 0) || 'Bitte Password eingeben',
          (val) => (val.length >= 8) || 'Password muss mindestens 8 Zeichen beinhalten'
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

      <q-input
        outlined
        v-model="passwordProof"
        class="login-input"
        :type="isPwd2 ? 'password' : 'text'"
        lazy-rules
        :rules="[
          (val) => (val === password) || 'Falsches Password',
        ]"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>

        <template v-slot:append>
          <q-icon
            :name="isPwd2 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd2 = !isPwd2"
          />
        </template>
      </q-input>

      <q-btn
        type="submit"
        label="Kostenlos registrieren"
        icon-right="eva-arrow-forward-outline"
        class="jwtLogin text-white"
      />

      <div class="row items-center q-gutter-sm" style="width: 350px">
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

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const passwordProof = ref('')
const isPwd = ref(true)
const isPwd2 = ref(true)

const handleSubmit = async () => {
  await authStore.signUp(
    firstname.value,
    lastname.value,
    email.value,
    password.value
  )
  router.push('/profile')
}
</script>

<style lang="scss" scoped>
.login-input {
  width: 350px;
}

:deep(.q-field__control) {
  border-radius: 15px !important;
}

:deep(.q-field--outlined .q-field__control::before) {
  border: 1.6px solid #e5e7eb !important;
}

.q-btn {
  height: 56px;
  width: 350px;
}

.jwtLogin {
  background: linear-gradient(90deg, rgba(251, 44, 54, 1) 0%, rgba(231, 0, 11, 1) 50%) !important;
}

:deep(.googleLogin) {
  border: 1.6px solid #e5e7eb !important;
}
</style>
