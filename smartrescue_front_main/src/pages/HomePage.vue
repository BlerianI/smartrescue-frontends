<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="landing-page bg-white">
        <q-scroll-observer @scroll="onScroll" />

        <section class="fullscreen-section hero-section relative-position flex flex-center">
          <div class="hero-bg absolute-full">
            <video
              autoplay
              loop
              muted
              playsinline
              class="absolute-full fit"
              style="object-fit: cover; opacity: 0.5"
            >
              <source src="/einsatz.mp4" type="video/mp4" />
            </video>
            <div class="absolute-full bg-overlay"></div>
          </div>

          <div class="floating-nav q-pa-xs rounded-borders glass-effect">
            <div class="row items-center justify-between no-wrap q-px-md" style="height: 70px">
              <div class="row items-center cursor-pointer" @click="scrollTo('hero')">
                <q-img src="/LogoIcon.png" width="50px" class="q-mr-sm" />
                <span class="text-weight-bold text-h5 text-dark font-display">Smart Rescue</span>
              </div>

              <div class="gt-sm row gap-md">
                <q-btn
                  flat
                  no-caps
                  label="Vision"
                  class="text-h6 text-primary"
                  @click="scrollTo('vision')"
                />
                <q-btn
                  flat
                  no-caps
                  label="Funktion"
                  class="text-h6 text-primary"
                  @click="scrollTo('how-it-works')"
                />
                <q-btn
                  flat
                  no-caps
                  label="Features"
                  class="text-h6 text-primary"
                  @click="scrollTo('features')"
                />
              </div>

              <div>
                <q-btn round flat icon="person_outline" size="md" color="primary" to="/auth" />
              </div>
            </div>
          </div>

          <div id="hero" class="hero-content text-center z-top q-pa-md">
            <q-chip color="white" text-color="dark" size="md" class="q-mb-xl text-weight-bold">
              100% Sicher - Keine versteckten Kosten
            </q-chip>

            <h1
              class="text-h2 text-weight-bolder text-dark q-mt-none q-mb-xl hero-title font-display"
            >
              Sicherheit, die <br />
              <span class="text-primary">Leben rettet.</span>
            </h1>

            <p
              class="text-h5 text-white q-mb-xl text-weight-light"
              style="max-width: 700px; margin: 0 auto 80px auto; line-height: 1.5"
            >
              Das digitale Notfallsystem mit doppelter Sicherheit. Ersthelfer scannen, Ärzte
              handeln.
            </p>

            <div class="row justify-center q-gutter-md" style="margin-top: 60px">
              <q-btn
                color="primary"
                label="Jetzt absichern"
                no-caps
                unelevated
                class="q-px-xl q-py-sm text-h6 rounded-borders-lg"
                to="/auth"
              />
              <q-btn
                unelevated
                color="dark"
                label="Mehr erfahren"
                no-caps
                class="q-px-xl q-py-sm text-h6 rounded-borders-lg bg-white text-black"
                @click="scrollTo('vision')"
              />
            </div>
          </div>

          <div
            class="absolute-bottom text-center q-mb-lg animate-bounce cursor-pointer z-top"
            @click="scrollTo('vision')"
          >
            <div class="text-uppercase text-caption text-primary q-mb-xs">Scroll Down</div>
            <q-icon name="keyboard_arrow_down" size="32px" color="primary" />
          </div>
        </section>

        <section id="vision" class="fullscreen-section bg-white flex flex-center">
          <div class="container text-center">
            <h2 class="text-h3 text-weight-bold text-primary q-mb-md font-display">
              Unsere Vision
            </h2>
            <p
              class="text-h6 text-grey-7 q-mb-xl"
              style="max-width: 800px; margin-left: auto; margin-right: auto"
            >
              Wir schaffen eine Welt, in der wichtige Gesundheitsdaten im Notfall sofort verfügbar
              sind – sicher, schnell und einfach.
            </p>

            <div class="row q-col-gutter-lg justify-center q-mb-xl">
              <div class="col-12 col-sm-6 col-md-3" v-for="(card, i) in missionCards" :key="i">
                <div
                  class="bg-white rounded-borders-lg q-pa-lg h-100 text-left feature-card-minimal"
                >
                  <div class="row items-center q-mb-md">
                    <q-icon :name="card.icon" size="36px" class="text-primary q-mb-sm" />
                  </div>
                  <h5 class="text-h6 text-weight-bold q-my-sm">{{ card.title }}</h5>
                  <p class="text-body2 text-grey-8 line-height-relaxed">{{ card.desc }}</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-primary text-white rounded-borders-lg q-pa-xl text-center full-width shadow-none"
            >
              <h3 class="text-h4 text-weight-bold q-mb-md">Komplett sicher für alle</h3>
              <p class="text-body1 text-white-80" style="max-width: 600px; margin: 0 auto">
                Egal ob du Sportler, Senior oder einfach vorsichtig bist. Smart Rescue ist für jeden
                gemacht, der auf Nummer sicher gehen will.
              </p>
            </div>
          </div>
        </section>

        <div id="how-it-works-wrapper" class="scroll-wrapper bg-grey-1">
          <div class="sticky-container flex flex-center">
            <div
              class="container relative-position text-center z-top"
              style="height: 100vh; display: flex; align-items: center; justify-content: center"
            >
              <div class="absolute-top q-pt-xl text-dark z-top" style="top: 100px">
                <h2 class="text-h3 text-weight-bold">So funktioniert's</h2>
              </div>

              <div
                class="step-content absolute-center full-width"
                :style="{
                  opacity: stepOpacities[0],
                  pointerEvents: stepOpacities[0] > 0.5 ? 'all' : 'none',
                }"
              >
                <div class="text-display-giant text-weight-black text-stroke-primary-light q-mb-sm">
                  01
                </div>
                <q-icon name="emergency" size="60px" class="text-accent q-mb-md" />
                <h3 class="text-h3 text-dark text-weight-bold q-my-sm font-display">Der Notfall</h3>
                <p
                  class="text-h5 text-grey-9 line-height-relaxed"
                  style="max-width: 650px; margin: 0 auto"
                >
                  Ein Unfall passiert. Du bist nicht ansprechbar. <br />Ersthelfer entdecken dein
                  Smart Rescue Armband.
                </p>
              </div>

              <div
                class="step-content absolute-center full-width"
                :style="{
                  opacity: stepOpacities[1],
                  pointerEvents: stepOpacities[1] > 0.5 ? 'all' : 'none',
                }"
              >
                <div class="text-display-giant text-weight-black text-stroke-primary-light q-mb-sm">
                  02
                </div>
                <q-icon name="qr_code_scanner" size="70px" class="text-primary q-mb-md" />
                <h3 class="text-h3 text-dark text-weight-bold q-my-sm font-display">
                  Sicherheits-Check
                </h3>
                <p
                  class="text-h5 text-grey-9 line-height-relaxed"
                  style="max-width: 650px; margin: 0 auto"
                >
                  Der Scan am Handgelenk startet die Rettung. <br />
                  Sofortige Identifikation, ohne sensible Daten preiszugeben.
                </p>
              </div>

              <div
                class="step-content absolute-center full-width"
                :style="{
                  opacity: stepOpacities[2],
                  pointerEvents: stepOpacities[2] > 0.5 ? 'all' : 'none',
                }"
              >
                <div class="text-display-giant text-weight-black text-stroke-primary-light q-mb-sm">
                  03
                </div>
                <q-icon name="lock_open" size="70px" class="text-accent q-mb-md" />
                <h3 class="text-h3 text-dark text-weight-bold q-my-sm font-display">
                  Medizinische Freigabe
                </h3>
                <p
                  class="text-h5 text-grey-9 line-height-relaxed"
                  style="max-width: 650px; margin: 0 auto"
                >
                  Erst der versteckte Code im Inneren gewährt Ärzten <br />
                  Zugriff auf deine Akte. Maximale Sicherheit.
                </p>
              </div>

              <div
                class="step-content absolute-center full-width"
                :style="{
                  opacity: stepOpacities[3],
                  pointerEvents: stepOpacities[3] > 0.5 ? 'all' : 'none',
                }"
              >
                <div class="text-display-giant text-weight-black text-stroke-primary-light q-mb-sm">
                  04
                </div>
                <q-icon name="medical_services" size="60px" class="text-primary q-mb-md" />
                <h3 class="text-h3 text-dark text-weight-bold q-my-sm font-display">Behandlung</h3>
                <p
                  class="text-h5 text-grey-9 line-height-relaxed"
                  style="max-width: 650px; margin: 0 auto"
                >
                  Ärzte sehen sofort Blutgruppe, Allergien & Kontakte. <br />Die richtige Behandlung
                  beginnt sofort.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section id="features" class="fullscreen-section bg-white flex flex-center">
          <div class="container">
            <div class="row items-center q-col-gutter-xl h-100">
              <div class="col-12 col-md-4">
                <h2 class="text-h3 text-weight-bold text-dark font-display q-mb-md">
                  High-End Features
                </h2>
                <p class="text-body1 text-grey-8 q-mb-lg line-height-relaxed">
                  Technologie, die sich nicht aufdrängt, aber im Ernstfall da ist. Smart Rescue ist
                  mehr als nur ein Armband.
                </p>
              </div>

              <div class="col-12 col-md-8">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6" v-for="(feature, index) in features" :key="index">
                    <div
                      class="feature-card-minimal no-shadow q-pa-xl bg-white rounded-borders-lg h-100"
                      style="min-height: 280px"
                    >
                      <q-icon :name="feature.icon" size="36px" class="text-primary q-mb-sm" />
                      <div class="text-h6 text-weight-bold q-mb-xs">{{ feature.title }}</div>
                      <div class="text-body2 text-grey-7">{{ feature.desc }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="fullscreen-section bg-grey-1 text-dark flex flex-center">
          <div class="container text-center" style="max-width: 800px">
            <h2 class="text-h3 text-weight-bold text-primary q-mb-sm font-display">
              Kontaktiere uns
            </h2>
            <p class="text-body1 text-grey-6 q-mb-xl">
              Wir sind für dich da. Schreib uns einfach, wenn du Fragen hast.
            </p>

            <div class="bg-gradient-primary text-white rounded-borders-xl q-pa-xl shadow-none">
              <q-form @submit="onSubmit" class="q-gutter-y-md text-left">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <label class="text-caption text-uppercase text-white text-weight-bold q-ml-xs"
                      >Vorname</label
                    >
                    <q-input
                      outlined
                      bg-color="white"
                      v-model="form.firstName"
                      placeholder="Max"
                      class="q-mt-xs contact-input-rounded"
                    >
                      <template v-slot:prepend>
                        <q-icon name="person" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="text-caption text-uppercase text-white text-weight-bold q-ml-xs"
                      >Nachname</label
                    >
                    <q-input
                      outlined
                      bg-color="white"
                      v-model="form.lastName"
                      placeholder="Mustermann"
                      class="q-mt-xs contact-input-rounded"
                    >
                      <template v-slot:prepend>
                        <q-icon name="person" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <div>
                  <label class="text-caption text-uppercase text-white text-weight-bold q-ml-xs"
                    >Email</label
                  >
                  <q-input
                    outlined
                    bg-color="white"
                    v-model="form.email"
                    placeholder="max@beispiel.de"
                    type="email"
                    class="q-mt-xs contact-input-rounded"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                </div>

                <div>
                  <label class="text-caption text-uppercase text-white text-weight-bold q-ml-xs"
                    >Message</label
                  >
                  <q-input
                    outlined
                    bg-color="white"
                    v-model="form.message"
                    type="textarea"
                    rows="4"
                    placeholder="Deine Nachricht..."
                    class="q-mt-xs contact-input-rounded"
                  >
                    <template v-slot:prepend>
                      <q-icon name="message" />
                    </template>
                  </q-input>
                </div>

                <div class="q-mt-lg">
                  <q-btn
                    label="Nachricht senden"
                    type="submit"
                    color="white"
                    text-color="primary"
                    unelevated
                    no-caps
                    class="q-px-lg text-weight-bold"
                  />
                </div>
              </q-form>
            </div>

            <div class="q-mt-lg text-grey-6">
              Oder kontaktiere uns direkt per E-Mail: <br />
              <a
                href="mailto:support@smartrescue.at"
                class="text-primary text-weight-bold text-decoration-none hover-red"
                >support@smartrescue.at</a
              >
            </div>
          </div>
        </section>

        <footer class="bg-dark text-white q-py-xl">
          <div class="container">
            <div class="row q-col-gutter-xl">
              <!-- Column 1: Brand & Mission -->
              <div class="col-12 col-md-4">
                <div class="row items-center gap-sm q-mb-md">
                  <q-img src="/LogoIconWeiss.svg" width="40px" />
                  <span class="text-h5 text-weight-bold font-display">Smart Rescue</span>
                </div>
                <p class="text-grey-5 text-body2 line-height-relaxed">
                  Das fortschrittlichste Notfall-Informationssystem.
                  <br />
                  Sicherheit, wenn es darauf ankommt.
                </p>
              </div>

              <!-- Column 2: Quick Links -->
              <div class="col-12 col-md-4">
                <div class="text-subtitle1 text-weight-bold q-mb-md text-primary">Navigation</div>
                <div class="column q-gutter-sm text-body2">
                  <a
                    href="#"
                    @click.prevent="scrollTo('vision')"
                    class="text-grey-5 text-decoration-none hover-red transition-fast"
                    >Unsere Vision</a
                  >
                  <a
                    href="#"
                    @click.prevent="scrollTo('how-it-works')"
                    class="text-grey-5 text-decoration-none hover-red transition-fast"
                    >Funktion</a
                  >
                  <a
                    href="#"
                    @click.prevent="scrollTo('features')"
                    class="text-grey-5 text-decoration-none hover-red transition-fast"
                    >Features</a
                  >
                  <a href="/auth" class="text-grey-5 text-decoration-none hover-red transition-fast"
                    >Login / Register</a
                  >
                </div>
              </div>

              <!-- Column 3: Legal & Contact -->
              <div class="col-12 col-md-4">
                <div class="text-subtitle1 text-weight-bold q-mb-md text-primary">Rechtliches</div>
                <div class="column q-gutter-sm text-body2">
                  <a href="#" class="text-grey-5 text-decoration-none hover-red transition-fast"
                    >Impressum</a
                  >
                  <a href="#" class="text-grey-5 text-decoration-none hover-red transition-fast"
                    >Datenschutz</a
                  >
                  <a href="#" class="text-grey-5 text-decoration-none hover-red transition-fast"
                    >AGB</a
                  >
                </div>
                <div class="q-mt-lg text-caption text-grey-6">
                  © 2024 Smart Rescue. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </footer>

        <!-- Scroll to Top Button -->
        <q-page-scroller position="bottom-right" :scroll-offset="800" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
})

const onSubmit = () => {
  $q.notify({
    color: 'positive',
    message: 'Nachricht erfolgreich gesendet!',
    icon: 'check',
  })
}

const missionCards = [
  {
    title: 'Innovation',
    desc: 'Modernste Technologie für maximale Sicherheit.',
    icon: 'lightbulb',
  },
  {
    title: 'Verlässlichkeit',
    desc: 'Funktioniert immer, überall und ohne Akku.',
    icon: 'battery_full',
  },
  { title: 'Datenschutz', desc: 'Deine Daten gehören dir. Volle Kontrolle.', icon: 'security' },
  { title: 'Einfachheit', desc: 'Keine komplizierte Einrichtung nötig.', icon: 'check_circle' },
]

const features = [
  {
    title: 'Double-Layer Security',
    desc: 'Einzigartiger Mechanismus mit zwei Sicherheitsstufen für maximalen Schutz.',
    icon: 'verified_user',
  },
  {
    title: 'Medizinische ID',
    desc: 'Alle lebenswichtigen Daten zentral und sicher abrufbar.',
    icon: 'badge',
  },
  {
    title: 'Universell Scanbar',
    desc: 'Funktioniert mit jedem Smartphone. Keine App erforderlich.',
    icon: 'qr_code',
  },
  {
    title: 'Datenschutz First',
    desc: 'Ende-zu-Ende Verschlüsselung auf deutschen Servern.',
    icon: 'lock',
  },
]

const stepOpacities = ref([1, 0, 0, 0])

const onScroll = () => {
  const wrapper = document.getElementById('how-it-works-wrapper')
  if (wrapper) {
    const rect = wrapper.getBoundingClientRect()
    const height = wrapper.clientHeight
    const windowHeight = window.innerHeight

    let progress = -rect.top / (height - windowHeight)
    if (progress < 0) progress = 0
    if (progress > 1) progress = 1

    const p = progress * 3

    stepOpacities.value = [0, 0, 0, 0]

    if (p < 0.5) {
      stepOpacities.value[0] = 1 - p * 2
      stepOpacities.value[1] = p * 2
    } else if (p < 1.5) {
      stepOpacities.value[1] = 1 - (p - 1) * 2
      stepOpacities.value[2] = (p - 1) * 2
    } else if (p < 2.5) {
      stepOpacities.value[2] = 1 - (p - 2) * 2
      stepOpacities.value[3] = (p - 2) * 2
    } else {
      stepOpacities.value[3] = 1
    }

    stepOpacities.value = stepOpacities.value.map((v) => Math.max(0, Math.min(1, v)))
  }
}
</script>

<style lang="scss" scoped>
$primary: #e53935;
$secondary: #b71c1c;
$accent: #f28b82;
$dark: #020101;

.text-primary {
  color: $primary !important;
}
.bg-primary {
  background-color: $primary !important;
}
.text-secondary {
  color: $secondary !important;
}
.bg-secondary {
  background-color: $secondary !important;
}
.text-accent {
  color: $accent !important;
}
.bg-accent {
  background-color: $accent !important;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

.container-standard {
  max-width: 1100px;
}

.font-display {
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  letter-spacing: -0.01em;
}

.text-display-giant {
  font-size: 4rem;
}

.text-stroke-grey {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
  color: transparent;
}

.text-stroke-primary-light {
  -webkit-text-stroke: 1px rgba(229, 57, 53, 0.5);
  color: transparent;
}

.fullscreen-section {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
}

.floating-nav {
  position: fixed;
  top: 10px;
  width: 95%; /* Responsive width */
  max-width: 1200px; /* Cap width for large screens */
  min-width: unset; /* Let it shrink if needed */
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  white-space: nowrap;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    min-width: unset;
    width: 95%;
    top: 10px;
    padding: 6px 12px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 1);
  }
}

.scroll-wrapper {
  position: relative;
  height: 250vh;
  width: 100%;
}

.sticky-container {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.step-content {
  transition: opacity 0.5s ease-out;
  padding: 0 20px;
  z-index: 10;
}

.rounded-borders-lg {
  border-radius: 20px;
}
.rounded-borders-xl {
  border-radius: 32px;
}

.circle-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.mission-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);

    .circle-icon {
      transform: scale(1.1);
      background-color: $primary !important;
      color: white !important;
    }
  }
}

.border-soft {
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
}

.text-white-80 {
  color: rgba(255, 255, 255, 0.8);
}
.bg-red-1 {
  background-color: #ffebee;
}

.feature-card-minimal {
  border: 1px solid #e0e0e0;
  transition: border-color 0.3s;

  &:hover {
    border-color: $primary;
  }
}

.border-grey {
  border-color: #eee;
}
.hover-white:hover {
  color: white !important;
}
.hover-red:hover {
  color: $primary !important;
}
.transition-fast {
  transition: all 0.3s ease;
}

.contact-input-rounded {
  :deep(.q-field__control) {
    border-radius: 15px !important;
  }
  :deep(fieldset) {
    border-radius: 15px !important;
  }
}
</style>
