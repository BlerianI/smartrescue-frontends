<template>
  <div class="container">
    <q-btn class="btn" href="tel:+436502727590">
      <span class="number">{{ number }}</span>
      <span class="service">{{ service }}</span>
    </q-btn>
  </div>
</template>

<script setup>
defineProps({
  service: String,
  number: Number,
})
</script>

<style scoped>
.container {
  margin-bottom: 16px;
  margin-top: 16px;
}

.btn {
  width: 27.9vw;
  height: 20vw;

  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border-radius: 20px;
  margin: 0px 8px 0px 8px;
  box-shadow:
    0 8px 15px -3px rgba(220, 38, 38, 0.4),
    0 4px 6px -4px rgba(220, 38, 38, 0.2);
  border: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: none;
}

.service {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 600;
  margin-top: -20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.number {
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
