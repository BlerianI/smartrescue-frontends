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
      <div class="title text-weight-medium" style="color: #1e293b">Medizinische Bescheide</div>
    </q-card-section>

    <q-card-section class="q-pt-xs">
      <template v-if="documents && documents.length > 0">
        <q-btn
          v-for="doc in documents"
          :key="doc.url"
          :href="doc.url"
          target="_blank"
          :label="doc.title || 'Bescheid ansehen'"
          class="q-mb-sm"
          style="
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: #fff;
            border-radius: 10px;
            width: 100%;
            box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2);
          "
          unelevated
        />
      </template>
      <div v-else class="text-italic" style="color: #94a3b8">Keine Angaben</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  documents: Array,
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
</style>
