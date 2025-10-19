<template>
  <div>
    {{ store.user }}
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/authStore'
const store = useAuthStore();
</script>

<style lang="scss" scoped>

</style>
