<template>
  <q-card class="container q-px-md q-py-md column" style="max-width: 400px">
    <q-card-section>
      <div class="title text-weight-medium">Notfallkontakte</div>
    </q-card-section>

    <template v-if="contacts && contacts.length > 0">
      <q-card-section
        v-for="contact of contacts"
        :key="contact.nummer"
        class="row items-center"
        style="
          margin-left: 15px;
          margin-right: 19px;
          background: #ffffff;
          border: 1px solid #fee2e2;
          border-radius: 12px;
          margin-bottom: 9px;
        "
      >
        <div class="column" style="flex: 1; line-height: 0.8">
          <div class="text-subtitle1 text-bold" style="font-size: 15px; color: #1e293b">
            {{ contact.name }}
          </div>
          <div class="text-bold" style="color: #1e293b; display: inline-block">
            {{ contact.rolle }}
          </div>
          <q-separator spaced />
          <div
            class="text-subtitle1 text-bold"
            style="font-size: 15px; line-height: 0.8; color: #1e293b"
          >
            {{ contact.nummer }}
          </div>
        </div>

        <q-btn
          :href="`tel:${contact.nummer}`"
          round
          unelevated
          style="
            margin-left: 20px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2);
          "
        >
          <q-icon name="call" color="white"></q-icon>
        </q-btn>
      </q-card-section>
    </template>

    <q-card-section v-else class="q-pt-none">
      <div class="text-italic" style="color: #94a3b8">Keine Angaben</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  contacts: Array,
})
</script>

<style scoped>
.container {
  width: calc(100% - 32px);
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 10px 30px -5px rgba(220, 38, 38, 0.1);
}
.title {
  font-size: 18px;
}

.gradient-red {
  background: linear-gradient(90deg, #cc0000, #880000);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
