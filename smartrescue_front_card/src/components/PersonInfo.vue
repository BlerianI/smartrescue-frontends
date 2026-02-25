/* eslint-disable */
<template>
  <q-card class="container q-px-md q-py-md column" style="max-width: 400px">
    <q-card-section class="section-container">
      <div class="row no-wrap">
        <div class="avatar-border">
          <q-avatar size="71px">
            <img v-if="person.avatar_url" :src="person.avatar_url" alt="Avatar" />
            <q-icon v-else name="person" size="40px" color="grey-5" />
          </q-avatar>
        </div>

        <div class="q-ml-lg column" style="line-height: 1.2">
          <div class="name">{{ person.name }}</div>

          <div class="date">DOB: {{ person.birthdate }}</div>

          <div>
            <q-chip
              style="
                background: #ffffff;
                border: 1px solid #fee2e2;
                color: #991b1b;
                font-weight: bold;
              "
            >
              {{ person.age }} Jahre
            </q-chip>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-6">
          <div class="info-box">
            <div class="title">Blutgruppe</div>
            <div class="value">{{ person.blood }}</div>
          </div>
        </div>

        <div class="col-6">
          <div class="info-box">
            <div class="title">Gewicht</div>
            <div class="value">{{ person.weight }} kg</div>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-6">
          <div class="info-box">
            <div class="title">Größe</div>
            <div class="value">{{ person.height }} cm</div>
          </div>
        </div>

        <div class="col-6">
          <div class="info-box">
            <div class="title">Geschlecht</div>
            <div class="value">{{ person.gender }}</div>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-xs">
        <div class="col-12">
          <div class="info-box row items-center no-wrap">
            <div class="col">
              <div class="title">Wohnadresse</div>
              <div class="value-special">{{ person.address }}</div>
            </div>

            <div class="col-auto">
              <q-btn
                round
                unelevated
                style="
                  background: linear-gradient(135deg, #ef4444, #dc2626);
                  box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2);
                "
                @click="openInMaps(person.address)"
              >
                <q-icon name="pin_drop" size="20px" color="white" />
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  person: Object,
})

const openInMaps = (adress) => {
  // encodeURIComponent kodiert Teile des strings den du ihn als parameter gibst
  // hier wird dies benötigt, weil ich die adresse als query parameter übergebe
  const adresse = encodeURIComponent(adress)
  const url = `https://www.google.com/maps/search/?api=1&query=${adresse}`
  window.open(url, '_blank')
}
</script>

<style scoped>
.info-box {
  background: #ffffff;
  border: 1px solid #fee2e2;
  border-radius: 12px;
  padding: 12px;
}

.container {
  width: calc(100% - 32px);
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.08);
}

.person-card {
  box-shadow: none;
  width: 100%;
}

.name {
  font-size: 18px;
  font-weight: normal;
}
.date {
  font-size: 16px;
  color: #959595;
  font-weight: normal;
}
.title {
  font-size: 14px;
  color: #1e293b;
  font-weight: normal;
}
.value {
  font-size: 18px;
  color: #991b1b;
  font-weight: bold;
}
.value-special {
  font-size: 16px;
  color: #991b1b;
  font-weight: bold;
}

.icon {
  display: inline-block;
  background: linear-gradient(90deg, rgba(204, 0, 0, 1) 0%, rgba(136, 0, 0, 1) 100%);

  /* Wichtig: Clip den Hintergrund auf den Text */
  -webkit-background-clip: text;
  background-clip: text;

  /* Der Text selbst wird transparent, damit nur der Hintergrundverlauf sichtbar ist */
  -webkit-text-fill-color: transparent;
  color: transparent;
}
</style>
