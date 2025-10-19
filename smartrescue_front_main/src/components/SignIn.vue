<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="handleSubmit" class="q-gutter-md">
      <q-input
        outlined
        v-model="email"
        class="login-buttons"
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

      <q-input
        outlined
        v-model="password"
        class="login-buttons"
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

      <q-btn
        type="submit"
        label="Anmelden"
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

const email = ref('')
const password = ref('')
const isPwd = ref(true)

const handleSubmit = async () => {
  await authStore.signIn(email.value, password.value)
  router.push('/profile')
}
</script>

<style lang="scss" scoped>
.login-buttons {
  width: 350px;
}
</style>
