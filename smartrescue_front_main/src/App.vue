<template>
  <router-view />
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

 if (window.matchMedia("(display-mode: standalone)").matches) {
    router.replace("/auth")
  }
</script>
