<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" style="height: 100vh">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        side="left"
        :width="270"
        class="custom-drawer column no-wrap"
      >
        <q-card class="wireframe-card">
          <q-card-section class="q-pa-md">
            <div class="image-container">
              <q-img src="/Logo-150.png" ratio="16/9" class="rounded-borders">
                <template v-slot:loading>
                  <q-spinner-gears color="primary" />
                </template>
              </q-img>
            </div>
          </q-card-section>
        </q-card>
        <!-- PROFILE SECTION (FIXED BOTTOM) -->
        <div class="drawer-profile q-pa-md row items-center no-wrap">
          <q-avatar size="48px" color="accent">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div class="column q-ml-sm">
            <div class="text-weight-medium text-dark">Max Mustermann</div>
            <div class="text-caption text-grey-7">max@beispiel.de</div>
          </div>
        </div>
      </q-drawer>
      <q-page-container>
        <q-page padding> </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/authStore'
import { ref } from 'vue'
const drawer = ref(false)
// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
const store = useAuthStore()
console.log(store.user)
</script>

<style lang="scss" scoped>
/* bottom profile area */
.drawer-profile {
  border-top: 1px solid #c9d4e4;
  background: #e7ecf4;
  border-radius: 18px 18px 0 0;
}

.wireframe-card {
  max-width: 400px;
  margin: 0 auto;
}

.image-container {
  background: #8b9cb6;
  border-radius: 8px;
  overflow: hidden;
}

.text-dark {
  color: #2a2f35;
}

/* accent color */
:root {
  --accent: #95aecd;
}
.accent {
  background: var(--accent);
}
</style>
