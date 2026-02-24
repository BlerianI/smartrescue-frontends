<template>
  <div class="container">
    <q-banner class="info">
      <div class="box">
        <div class="row items-center q-mb-sm">
          <q-icon name="warning" class="icon q-mr-xs" size="25px"></q-icon>
          <span class="text-information">Wichtige Information</span>
        </div>

        <div>
          <span v-text="infos" class="information"></span>
        </div>
      </div>
    </q-banner>
  </div>
</template>

<script setup>
defineProps({
  infos: String,
})
</script>

<style scoped>
.container {
  margin-bottom: 16px;
}
.info {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  height: 99px;
  width: calc(100% - 32px);
  max-width: 400px;

  display: flex;
  align-items: center;

  border-radius: 15px;
  box-shadow: none;
  border: 2px solid #f59e0b;
  animation: pulse-border 2s infinite alternate;
}
.icon {
  color: #d97706;
}
.text-information {
  color: #92400e;
  font-size: 16px;
  font-weight: bold;
}
.information {
  color: #b45309;
  font-size: 14px;
}
.box {
  padding-left: 8px;
}

@keyframes pulse-border {
  0% {
    border-color: #f59e0b;
  }
  50% {
    border-color: #d97706;
  }
  100% {
    border-color: #f59e0b;
  }
}
</style>
