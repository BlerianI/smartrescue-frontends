<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="row">
        <!-- Links -->
        <div class="col-12 col-md-6 col-sm-12 bg-white column items-center justify-center">
          <div
            class="relative-position row items-center shadow-1"
            style="width: 450px; height: 60px; border-radius: 15px"
          >
            <!-- Slider -->
            <div class="slider" :class="mode === 'signup' ? 'slider-left' : 'slider-right'"></div>

            <div
              class="col text-center text-weight-medium cursor-pointer"
              :class="mode === 'signup' ? 'text-white' : 'text-grey-7'"
              @click="mode = 'signup'"
              style="z-index: 2"
            >
              Sign Up
            </div>

            <div
              class="col text-center text-weight-medium cursor-pointer"
              :class="mode === 'signin' ? 'text-white' : 'text-grey-7'"
              @click="mode = 'signin'"
              style="z-index: 2"
            >
              Sign In
            </div>
          </div>

          <SignIn v-if="mode == 'signin'"></SignIn>

          <SignUp v-if="mode == 'signup'"></SignUp>

          <div class="text-body2 text-grey-7 q-mt-lg text-center">
            <q-icon name="lock" />
            Deine Daten sind sicher • DSGVO-konform
          </div>
        </div>

        <!-- Rechst -->
        <div class="col-12 col-md-6 col-sm-0 flex flex-center right-container gt-xs"></div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import SignIn from 'src/components/SignIn.vue'
import SignUp from 'src/components/SignUp.vue'
import { ref } from 'vue'

const mode = ref('signup')
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

.slider {
  position: absolute;
  top: 7px;
  bottom: 7px;
  left: 7px;
  width: calc(50% - 7px);
  border-radius: 15px;
  background: linear-gradient(90deg, rgba(251, 44, 54, 1) 0%, rgba(231, 0, 11, 1) 50%) !important;
  transition: transform 0.25s;
  z-index: 0;
}

.slider-right {
  transform: translateX(100%);
}

.slider-left {
  transform: translateX(0);
}
</style>
