<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <!-- Ist für den Split zuständig -->
      <q-page class="row  window-height no-scroll q-pa-none">

        <!-- Links -->
        <div class="col-12 col-md-6 bg-white flex flex-center justify-center">
          <SignIn></SignIn>
        </div>

        <!-- Rechst -->
        <div class="col-12 col-md-6 flex flex-center right-container">

        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import SignIn from 'src/components/SignIn.vue';
</script>

<style lang="scss" scoped>
.right-container {
  background-image: linear-gradient(to right top, #ab0000, #b70000, #c30000, #cf0000, #db0000, #e30e0a, #ea1814, #f2201c, #f62e2b, #f93b38, #fc4644, #ff5050);
}
</style>
