<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="text"
        :dense="dense"
        class="login-buttons q-mb-md shadow-2 custom-input"
        :underline="false"
        standout
      >
        <template v-slot:prepend>
          <q-icon name="mail" color="red" />
        </template>
      </q-input>
    </q-form>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.login-buttons {
  width: 350px;
}

.custom-input {
  :deep(.q-field__control) {
    background: white !important;
    border: 2px solid #ff0000 !important;
    border-radius: 15px !important;
    transition: all 0.3s ease;

    &::before,
    &::after {
      display: none !important;
    }
  }

  :deep(.q-field__control-container) {
    border-radius: 15px !important;
    background: transparent !important;
  }

  :deep(.q-field--focused .q-field__control) {
    background: white !important;
    border-color: #ff3333 !important;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5) !important;
  }

  :deep(.q-field__native) {
    color: black;
  }

  :deep(.q-field__marginal) {
    color: #ff0000;
  }

  // Remove any standout backgrounds
  :deep(.q-field--standout .q-field__control) {
    background: transparent !important;
  }
}
</style>
