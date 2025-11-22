<template>
  <div class="q-pa-md" style="max-width: 500px">
    <div>
      <h4 class="header">Erstelle dein Konto</h4>
      <p class="subheading text-grey-7">Kostenlos registrieren und Leben retten</p>
    </div>

    <div class="flex justify-center q-mb-xl">
      <div class="avatar-container">
        <q-avatar
          src="@/assets/Profil.png"
          :size="$q.screen.xs ? '80px' : '120px'"
          class="cursor-pointer"
          @click="$refs.fileInput.click()"
          style="border: 2px solid #e5e7eb"
        >
          <img v-if="avatar" :src="avatar">
          <q-icon v-if="!avatar" name="upload" :size="$q.screen.xs ? '40px' : '60px'" class="text-grey-7"/>
        </q-avatar>

        <div class="text-body2 text-grey-7 q-mb-xs input-header q-mt-sm">
          Profilbild hochladen
        </div>
      </div>
      <input ref="fileInput" type="file" hidden accept="image/*" @change="onFileChange" />
    </div>

    <q-form @submit.prevent="handleSubmit" ref="myForm" class="q-gutter-md">
      <div class="row name-row" style="max-width: 450px">
        <div class="col-12 col-md-6">
          <div class="text-body2 text-grey-7 q-mb-xs input-header">Vorname</div>
          <q-input
            outlined
            v-model="firstname"
            class="split"
            placeholder="Max"
            lazy-rules="ondemand"
            :rules="[(val) => (val && val.length > 0) || 'Bitte Vornamen eingeben']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-6">
          <div class="text-body2 text-grey-7 q-mb-xs input-header">Nachname</div>
          <q-input
            outlined
            v-model="lastname"
            class=""
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
        <div class="text-body2 text-grey-7 q-mb-xs input-header" style="margin-top: -6px">
          E-Mail Adresse
        </div>
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
        <div class="text-body2 text-grey-7 q-mb-xs input-header" style="margin-top: -6px">
          Passwort
        </div>
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
        <div class="text-body2 text-grey-7 q-mb-xs input-header" style="margin-top: -6px">
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

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const passwordProof = ref('')
const isPwd = ref(true)
const isPwd2 = ref(true)

const myForm = ref(null)

const avatar = ref(null)

const handleSubmit = async () => {
  const success = myForm.value.validate()
  console.log(1)

  if (!success) {
    return
  }

  await authStore.signUp(firstname.value, lastname.value, email.value, password.value)
  router.push('/profile')
};


const onFileChange = (event) => {
  console.log(event);

  const selectedFile = event.target.files[0];
  if(!selectedFile) return;

  avatar.value = URL.createObjectURL(selectedFile)
};
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

.split {
  margin-right: 16px;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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

  .container-signup {
    max-width: 280px;
  }

  .name-row {
    flex-direction: column;
  }

  .name-row > div {
    width: 100%;
  }

  .split {
    margin-right: 0px;
  }
}
</style>
