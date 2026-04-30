<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated role="banner">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Hauptmenü öffnen"
          aria-haspopup="true"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Smart Rescue </q-toolbar-title>

        <div aria-hidden="true">v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      role="navigation"
      aria-label="Seitenmenü"
    >
      <q-list>
        <q-item-label header> Navigation </q-item-label>
        <!-- Hier könnten Links folgen -->
      </q-list>
    </q-drawer>

    <q-page-container role="main">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
