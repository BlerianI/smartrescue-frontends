<template>
  <div class="q-pa-md" style="max-width: 500px">
    <div>
      <h4 class="header">Willkommen zurück</h4>
      <p class="subheading text-grey-7">Melde dich an und verwalte deine Profile</p>
    </div>

    <div class="flex justify-center items-center q-pa-md q-mb-xl">
      <q-avatar size="120px" class="cursor-pointer" @click="$refs.fileInput.click()" style="border: 2px solid #e5e7eb;">
        <q-icon name="upload" size="60px" class="text-grey-7"/>
      </q-avatar>
      <input ref="fileInput" type="file" hidden accept="image/*" @change="onFileChange" />
    </div>

    <q-form @submit.prevent="handleSubmit" ref="myForm" class="q-gutter-md">
      <div class="row" style="max-width: 450px">
        <div>
          <div class="text-body2 text-grey-7 q-mb-xs">Vorname</div>
          <q-input
            outlined
            v-model="firstname"
            class="col q-mr-md"
            placeholder="Max"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Bitte Vornamen eingeben']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>

        <div>
          <div class="text-body2 text-grey-7 q-mb-xs">Nachname</div>
          <q-input
            outlined
            v-model="lastname"
            class="col"
            placeholder="Mustermann"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Bitte Nachnamen eingeben']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>
      </div>

      <div>
        <div class="text-body2 text-grey-7 q-mb-xs" style="margin-top: -6px">E-Mail Adresse</div>
        <q-input
          outlined
          v-model="email"
          class="login-input"
          placeholder="max@beispiel.de"
          lazy-rules="ondemand"
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
        <div class="text-body2 text-grey-7 q-mb-xs" style="margin-top: -6px">Passwort</div>
        <q-input
          outlined
          v-model="password"
          class="login-input"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules="ondemand"
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

      <div>
        <div class="text-body2 text-grey-7 q-mb-xs" style="margin-top: -6px">
          Passwort bestätigen
        </div>
        <q-input
          outlined
          v-model="passwordProof"
          class="login-input"
          :type="isPwd2 ? 'password' : 'text'"
          lazy-rules="ondemand"
          :rules="[
            (val) => !!val || 'Bitte Password bestätigen',
            (val) => val === password || 'Falsches Password',
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
      </div>

      <q-btn
        type="submit"
        label="Kostenlos registrieren"
        icon-right="eva-arrow-forward-outline"
        class="jwtLogin text-white shadow-2"
      />

      <div class="row items-center q-gutter-sm" style="width: 450px">
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

const myForm = ref(null)
const file = ref(null)

const handleSubmit = async () => {
  const success = myForm.value.validate()
  console.log(file)
  console.log(1)

  if (!success) {
    return
  }

  await authStore.signUp(firstname.value, lastname.value, email.value, password.value)
  router.push('/profile')
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
  height: 56px;
  width: 450px;
}

.jwtLogin {
  background: linear-gradient(90deg, rgba(251, 44, 54, 1) 0%, rgba(231, 0, 11, 1) 50%) !important;
}

:deep(.googleLogin) {
  border: 1.6px solid #e5e7eb !important;
}

.nv-input {
  width: 216px;
}

/*margin: top, right, bottom, left*/
.header {
  margin: 15px 0px 5px 0px;
}

.subheading {
  margin-bottom: 15px;
}
</style>
