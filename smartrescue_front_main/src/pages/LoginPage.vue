<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <!-- Ist für den Split zuständig -->
      <q-page class="row">
        <!-- Links -->
        <div class="col-12 col-md-6 col-sm-12 bg-white column items-center justify-center">
          <q-btn-toggle
            style="width: 200px;"
            v-model="model"
            spread
            no-caps
            toggle-color="red"
            color="white"
            text-color="black"
            :options="[
              { label: 'Sign Up', value: true },
              { label: 'Sign In', value: false },
            ]"
          />

          <SignIn v-if="model == false"></SignIn>

          <SignUp v-if="model == true"></SignUp>
        </div>

        <!-- Rechst -->
        <div class="col-12 col-md-6 col-sm-0 flex flex-center right-container gt-xs"></div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import SignIn from 'src/components/SignIn.vue';
import SignUp from 'src/components/SignUp.vue';
import { ref } from 'vue'

let model = ref(true);
</script>

<style lang="scss" scoped>
.right-container {
  background-image: linear-gradient(
    to right top,
    #ab0000,
    #b70000,
    #c30000,
    #cf0000,
    #db0000,
    #e30e0a,
    #ea1814,
    #f2201c,
    #f62e2b,
    #f93b38,
    #fc4644,
    #ff5050
  );
}

:deep(.row) {
  flex-wrap: nowrap;
}
</style>
