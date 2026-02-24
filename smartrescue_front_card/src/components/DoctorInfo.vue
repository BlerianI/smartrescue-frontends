<template>
  <q-card
    class="container q-px-md q-py-md q-my-md column"
    style="
      max-width: 400px;
      background-color: #ffffff;
      border-radius: 20px;
      box-shadow: 0 10px 30px -5px rgba(220, 38, 38, 0.1);
    "
  >
    <q-card-section>
      <div class="title text-weight-medium" style="color: #1e293b">Hausarzt</div>
    </q-card-section>

    <q-card-section class="q-pt-none q-pb-none">
      <div class="row items-center">
        <q-icon name="medical_services" size="30px" class="premium-icon" />

        <div class="column space">
          <div class="text-weight-medium text-bold" style="font-size: 16px; color: #1e293b">
            {{ doctor.name }}
          </div>
          <div class="text-caption" style="color: #64748b">{{ doctor.richtung }}</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="row items-center q-pt-none q-pb-none">
      <q-icon name="call" size="30px" class="premium-icon" />
      <span
        class="text-weight-medium text-bold space"
        style="font-size: 16px; text-decoration: none; color: #1e293b"
        >{{ doctor.nummer }}</span
      >

      <q-space />

      <q-btn
        round
        unelevated
        href="tel:+436764253471"
        style="
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2);
        "
      >
        <q-icon name="call" color="white" />
      </q-btn>
    </q-card-section>

    <q-card-section class="row items-center q-pt-none q-pb-none q-pb-md">
      <q-icon name="place" size="30px" class="premium-icon" />
      <div
        class="text-weight-medium text-bold space"
        style="font-size: 16px; max-width: 170px; color: #1e293b"
      >
        {{ doctor.adresse }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  doctor: Object,
})
</script>

<style lang="scss" scoped>
.container {
  width: calc(100% - 32px);
  border-radius: 15px;
}
.title {
  font-size: 18px;
}

.premium-icon {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(220, 38, 38, 0.2));
}

.space {
  padding-left: 10px;
}
</style>
