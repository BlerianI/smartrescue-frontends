<template>
  <div class="scanner-page">
    <div class="scanner-container">
      <qrcode-stream
        @detect="onDetect"
        @error="onError"
        @camera-on="onCameraOn"
        :track="paintBoundingBox"
      >
        <div class="overlay-container" v-if="!error && !loading">
          <div class="scan-frame"></div>
          <p class="scan-text">
            Scannen Sie den QR-Code <br />
            auf Ihrem Armband
          </p>
        </div>
        <div v-if="error" class="error-container">
          <q-icon name="error" size="4rem" color="negative" />
          <p class="text-negative text-center q-mt-md">{{ errorMessage }}</p>
          <q-btn label="Zurück" color="white" text-color="black" to="/" class="q-mt-md" />
        </div>
        <div v-if="loading && !error" class="loading-overlay">
          <q-spinner size="3rem" color="primary" />
          <p class="text-white q-mt-sm">Kamera wird gestartet...</p>
        </div>
      </qrcode-stream>

      <q-btn
        round
        color="white"
        text-color="black"
        icon="arrow_back"
        class="back-button shadow-2"
        to="/"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useEmergencyStore } from '../stores/emergencyStore'
import { useQuasar } from 'quasar'

const error = ref(false)
const errorMessage = ref('')
const loading = ref(true)

const router = useRouter()
const store = useEmergencyStore()
const $q = useQuasar()

function onCameraOn() {
  loading.value = false
}

async function onDetect(detectedCodes) {
  const result = detectedCodes[0]
  if (result) {
    const uuid = result.rawValue
    console.log('QR Code detected:', uuid)

    // UUID regex to ensure it's a valid uuid before querying backend
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

    if (uuidRegex.test(uuid)) {
      loading.value = true

      await store.fetchEmergencyData(uuid)

      if (store.error) {
        loading.value = false
        $q.notify({
          type: 'negative',
          position: 'center',
          message: 'Es konnten keine Notfalldaten für diese Benutzer-ID gefunden werden.',
          timeout: 4000,
        })
      } else {
        router.push('/med')
      }
    } else {
      $q.notify({
        type: 'negative',
        position: 'center',
        message:
          'Dieser QR-Code enthält keine gültige Notfall-ID. Bitte scannen Sie ein offizielles Armband.',
        timeout: 4000,
      })
    }
  }
}

function onError(err) {
  loading.value = false
  error.value = true

  if (err.name === 'NotAllowedError') {
    errorMessage.value =
      'Kamerazugriff verweigert. Bitte erlauben Sie den Zugriff in Ihren Einstellungen.'
  } else if (err.name === 'NotFoundError') {
    errorMessage.value = 'Keine Kamera gefunden.'
  } else if (err.name === 'NotSupportedError') {
    errorMessage.value = 'Sichere Verbindung erforderlich (HTTPS).'
  } else if (err.name === 'NotReadableError') {
    errorMessage.value = 'Kamera wird bereits verwendet.'
  } else if (err.name === 'OverconstrainedError') {
    errorMessage.value = 'Kamera erfüllt nicht die Anforderungen.'
  } else if (err.name === 'StreamApiNotSupportedError') {
    errorMessage.value = 'Browser unterstützt keine Kamera.'
  } else {
    errorMessage.value = `Unbekannter Fehler: ${err.message}`
  }
}

function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}
</script>

<style scoped>
.scanner-page {
  background: black;
}

.scanner-container {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.scan-frame {
  width: 250px;
  height: 250px;
  border: 2px solid rgba(255, 36, 36, 0.8);
  border-radius: 12px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  position: relative;
}

.scan-text {
  color: white;
  margin-top: 2rem;
  font-size: 1.1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  z-index: 10;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 20;
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
  background: #2b2b2b;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000;
  z-index: 5;
}
</style>
