<template>
  <div>
    <q-toolbar class="text-white bar">
      <q-img src="LogoIconWeiss.svg" class="logo"></q-img>

      <q-toolbar-title class="text-bold text-h6 title">Smart Rescue</q-toolbar-title>
    </q-toolbar>
  </div>
</template>

<script setup></script>

<style scoped>
.bar {
  min-height: 70px;
  padding: 0 28px;
  width: 100%;
  background: #dc2626;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}
.logo {
  height: 36px;
  width: 36px;
  object-fit: contain;
}
.title {
  padding-left: 1.2rem;
  letter-spacing: 1px;
  font-size: 22px;
}
.switch-button {
  border-radius: 100%;
  background-color: white;
  opacity: 80%;
  width: 35px;
  height: 35px;
}
.switch {
  color: #ff0000;
  size: 19px;
}
</style>
