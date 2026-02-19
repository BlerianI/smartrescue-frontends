<template>
  <q-page class="login-page">
    <div class="login-container">
      <div class="logo-section">
        <img src="/Logo1000x350.png" alt="Smart Rescue Logo" class="logo" />
      </div>

      <div class="separator-container">
        <div class="separator-content">
          <q-separator class="custom-separator" />
          <span class="separator-label">Digitale Notfallkarte</span>
          <q-separator class="custom-separator" />
        </div>
      </div>

      <div class="content-section">
        <div class="button-section">
          <q-btn class="login-btn" label="Anmelden" size="lg" unelevated @click="handleLogin" />
        </div>

        <div class="instruction-section">
          <div class="instruction-box">
            <q-icon name="info" size="24px" class="instruction-icon" />
            <p class="instruction-text">Scannen Sie jetzt den QR-Code im inneren des Armbandes</p>
          </div>
        </div>

        <div class="bracelet-section">
          <div class="bracelet-placeholder">
            <q-icon name="qr_code_scanner" size="100px" color="grey-4" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogin() {
  router.push('/scanner')
}
</script>

<style scoped>
.login-page {
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.login-container {
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
}

.logo-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 30px 5px 30px;
  background: #ffffff;
}

.logo {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: contain;
}

.separator-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 0;
  margin-bottom: 45px;
}

.separator-content {
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.custom-separator {
  flex: 1;
  height: 1px;
  background: #dc2626;
}

.separator-label {
  color: #dc2626;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}

.content-section {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 30px 35px 30px;
  gap: 25px;
  align-items: center;
}

.button-section {
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
}

.login-btn {
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: #dc2626;
  color: #ffffff;
  border-radius: 15px;
  transition: all 0.2s ease;
}

.login-btn:hover {
  background: #b91c1c;
  transform: translateY(-1px);
}

.login-btn:active {
  background: #991b1b;
  transform: translateY(0);
}

.instruction-section {
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
}

.instruction-box {
  width: 100%;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%,
  100% {
    border-color: #f59e0b;
  }
  50% {
    border-color: #d97706;
  }
}

.instruction-icon {
  color: #d97706;
  flex-shrink: 0;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.instruction-text {
  margin: 0;
  color: #92400e;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  flex: 1;
}

.bracelet-section {
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.bracelet-placeholder {
  width: 100%;
  aspect-ratio: 1.2;
  background: #f9fafb;
  border-radius: 20px;
  border: 2px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.bracelet-placeholder:hover {
  border-color: #d1d5db;
}

@media (max-width: 480px) {
  .logo {
    max-width: 300px;
  }

  .login-btn {
    max-width: 100%;
    height: 50px;
    font-size: 15px;
  }

  .instruction-box {
    padding: 12px 15px;
  }

  .instruction-text {
    font-size: 13px;
  }

  .bracelet-placeholder {
    max-width: 100%;
  }

  .content-section {
    gap: 25px;
    padding: 20px 25px 30px 25px;
  }

  .logo-section {
    padding: 30px 25px 20px 25px;
  }
}

@media (min-width: 768px) {
  .login-container {
    max-width: 480px;
    margin: 0 auto;
  }
}
</style>
