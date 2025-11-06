<template>
  <div>
    {{ store.user }}
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/authStore'
const store = useAuthStore();
console.log(store.user);

</script>

<style lang="scss" scoped>

</style>
