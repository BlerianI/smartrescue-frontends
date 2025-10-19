<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="handleSubmit" class="q-gutter-md">
      <q-input
        outlined
        v-model="firstname"
        class="login-buttons"
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
        class="login-buttons"
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
        class="login-buttons"
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
        class="login-buttons"
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
        class="login-buttons"
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
        color="negative"
        class="full-width"
      />

      <div class="row items-center q-gutter-sm">
        <q-separator class="col-grow" />
        <div class="text-grey text-caption">ODER</div>
        <q-separator class="col-grow" />
      </div>

      <q-btn
        @click="authStore.googleLogin()"
        label="Mit Google anmelden"
        class="full-width"
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
.login-buttons {
  width: 350px;
}
</style>
