<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="landing-page bg-white">
        <q-scroll-observer @scroll="onScroll" />

        <section class="fullscreen-section hero-section relative-position flex flex-center" aria-labelledby="hero-title">
          <div class="hero-bg absolute-full" aria-hidden="true">
            <video
              autoplay
              loop
              muted
              playsinline
              class="absolute-full fit"
              style="object-fit: cover; opacity: 0.5"
              aria-label="Hintergrundvideo: Rettungskräfte im Einsatz"
            >
              <source src="/einsatz.mp4" type="video/mp4" />
            </video>
            <div class="absolute-full bg-overlay"></div>
          </div>

          <nav class="floating-nav q-pa-xs rounded-borders glass-effect" aria-label="Hauptnavigation">
            <div class="row items-center justify-between no-wrap q-px-md" style="height: 70px">
              <div class="row items-center cursor-pointer" @click="scrollTo('hero')" role="link" aria-label="Zurück zum Start">
                <q-img src="/LogoIcon.png" width="50px" class="q-mr-sm" alt="Smart Rescue Logo" />
                <span class="text-weight-bold text-h5 text-dark font-display">Smart Rescue</span>
              </div>

              <div class="gt-sm row gap-md" role="menubar">
                <q-btn
                  flat
                  no-caps
                  label="Vision"
                  class="text-h6 text-primary"
                  @click="scrollTo('vision')"
                  aria-label="Zum Bereich Unsere Vision springen"
                />
                <q-btn
                  flat
                  no-caps
                  label="Funktion"
                  class="text-h6 text-primary"
                  @click="scrollTo('how-it-works')"
                  aria-label="Zum Bereich Funktionsweise springen"
                />
                <q-btn
                  flat
                  no-caps
                  label="Features"
                  class="text-h6 text-primary"
                  @click="scrollTo('features')"
                  aria-label="Zum Bereich Features springen"
                />
              </div>

              <div>
                <q-btn round flat icon="person_outline" size="md" color="primary" to="/auth" aria-label="Zum Login Bereich" />
              </div>
            </div>
          </nav>

          <div id="hero" class="hero-content text-center z-top q-pa-md">
            <q-chip color="white" text-color="dark" size="md" class="q-mb-xl text-weight-bold" aria-label="Information: 100% Sicher - Keine versteckten Kosten">
              100% Sicher - Keine versteckten Kosten
            </q-chip>

            <h1
              id="hero-title"
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
                aria-label="Jetzt absichern - Zum Registrierungsbereich"
              />
              <q-btn
                unelevated
                color="dark"
                label="Mehr erfahren"
                no-caps
                class="q-px-xl q-py-sm text-h6 rounded-borders-lg bg-white text-black"
                @click="scrollTo('vision')"
                aria-label="Mehr über unsere Vision erfahren"
              />
            </div>
          </div>

          <div
            class="absolute-bottom text-center q-mb-lg animate-bounce cursor-pointer z-top"
            @click="scrollTo('vision')"
            role="button"
            aria-label="Nach unten scrollen"
          >
            <div class="text-uppercase text-caption text-primary q-mb-xs" aria-hidden="true">Scroll Down</div>
            <q-icon name="keyboard_arrow_down" size="32px" color="primary" aria-hidden="true" />
          </div>
        </section>

        <section id="vision" class="fullscreen-section bg-white flex flex-center" aria-labelledby="vision-title">
          <div class="container text-center">
            <h2 id="vision-title" class="text-h3 text-weight-bold text-primary q-mb-md font-display">
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
                  role="article"
                  :aria-label="card.title + ': ' + card.desc"
                >
                  <div class="row items-center q-mb-md">
                    <q-icon :name="card.icon" size="36px" class="text-primary q-mb-sm" aria-hidden="true" />
                  </div>
                  <h3 class="text-h6 text-weight-bold q-my-sm">{{ card.title }}</h3>
                  <p class="text-body2 text-grey-8 line-height-relaxed">{{ card.desc }}</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-primary text-white rounded-borders-lg q-pa-xl text-center full-width shadow-none"
              role="region"
              aria-label="Sicherheitshinweis"
            >
              <h3 class="text-h4 text-weight-bold q-mb-md">Komplett sicher für alle</h3>
              <p class="text-body1 text-white-80" style="max-width: 600px; margin: 0 auto">
                Egal ob du Sportler, Senior oder einfach vorsichtig bist. Smart Rescue ist für jeden
                gemacht, der auf Nummer sicher gehen will.
              </p>
            </div>
          </div>
        </section>

        <!-- ... how it works section (skipped for now to focus on static accessibility) ... -->

        <section id="features" class="fullscreen-section bg-white flex flex-center" aria-labelledby="features-title">
          <div class="container">
            <div class="row items-center q-col-gutter-xl h-100">
              <div class="col-12 col-md-4">
                <h2 id="features-title" class="text-h3 text-weight-bold text-dark font-display q-mb-md">
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
                      role="article"
                      :aria-label="feature.title + ': ' + feature.desc"
                    >
                      <q-icon :name="feature.icon" size="36px" class="text-primary q-mb-sm" aria-hidden="true" />
                      <h3 class="text-h6 text-weight-bold q-mb-xs">{{ feature.title }}</h3>
                      <div class="text-body2 text-grey-7">{{ feature.desc }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="fullscreen-section bg-grey-1 text-dark flex flex-center" aria-labelledby="contact-title">
          <div class="container text-center" style="max-width: 800px">
            <h2 id="contact-title" class="text-h3 text-weight-bold text-primary q-mb-sm font-display">
              Kontaktiere uns
            </h2>
            <p class="text-body1 text-grey-6 q-mb-xl">
              Wir sind für dich da. Schreib uns einfach, wenn du Fragen hast.
            </p>

            <div class="bg-gradient-primary text-white rounded-borders-xl q-pa-xl shadow-none">
              <q-form @submit="onSubmit" class="q-gutter-y-md text-left">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <label for="first-name" class="text-caption text-uppercase text-white text-weight-bold q-ml-xs"
                      >Vorname</label
                    >
                    <q-input
                      id="first-name"
                      outlined
                      bg-color="white"
                      v-model="form.firstName"
                      placeholder="Max"
                      class="q-mt-xs contact-input-rounded"
                    >
                      <template v-slot:prepend>
                        <q-icon name="person" aria-hidden="true" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="last-name" class="text-caption text-uppercase text-white text-weight-bold q-ml-xs"
                      >Nachname</label
                    >
                    <q-input
                      id="last-name"
                      outlined
                      bg-color="white"
                      v-model="form.lastName"
                      placeholder="Mustermann"
                      class="q-mt-xs contact-input-rounded"
                    >
                      <template v-slot:prepend>
                        <q-icon name="person" aria-hidden="true" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <div>
                  <label for="email" class="text-caption text-uppercase text-white text-weight-bold q-ml-xs"
                    >Email</label
                  >
                  <q-input
                    id="email"
                    outlined
                    bg-color="white"
                    v-model="form.email"
                    placeholder="max@beispiel.de"
                    type="email"
                    class="q-mt-xs contact-input-rounded"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" aria-hidden="true" />
                    </template>
                  </q-input>
                </div>

                <div>
                  <label for="message" class="text-caption text-uppercase text-white text-weight-bold q-ml-xs"
                    >Nachricht</label
                  >
                  <q-input
                    id="message"
                    outlined
                    bg-color="white"
                    v-model="form.message"
                    type="textarea"
                    rows="4"
                    placeholder="Deine Nachricht..."
                    class="q-mt-xs contact-input-rounded"
                  >
                    <template v-slot:prepend>
                      <q-icon name="message" aria-hidden="true" />
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
                    aria-label="Kontaktformular absenden"
                  />
                </div>
              </q-form>
            </div>

            <div class="q-mt-lg text-grey-6">
              Oder kontaktiere uns direkt per E-Mail: <br />
              <a
                href="mailto:support@smartrescue.at"
                class="text-primary text-weight-bold text-decoration-none hover-red"
                aria-label="E-Mail an support@smartrescue.at senden"
                >support@smartrescue.at</a
              >
            </div>
          </div>
        </section>

        <footer class="bg-dark text-white q-py-xl" role="contentinfo">
          <div class="container">
            <div class="row q-col-gutter-xl">
              <!-- Column 1: Brand & Mission -->
              <div class="col-12 col-md-4">
                <div class="row items-center gap-sm q-mb-md">
                  <q-img src="/LogoIconWeiss.svg" width="40px" alt="Smart Rescue Logo Weiß" />
                  <span class="text-h5 text-weight-bold font-display">Smart Rescue</span>
                </div>
                <p class="text-grey-5 text-body2 line-height-relaxed">
                  Das fortschrittlichste Notfall-Informationssystem.
                  <br />
                  Sicherheit, wenn es darauf ankommt.
                </p>
              </div>

              <!-- Column 2: Quick Links -->
              <nav class="col-12 col-md-4" aria-label="Footer Navigation">
                <div class="text-subtitle1 text-weight-bold q-mb-md text-primary">Navigation</div>
                <div class="column q-gutter-sm text-body2">
                  <a
                    href="#"
                    @click.prevent="scrollTo('vision')"
                    class="text-grey-5 text-decoration-none hover-red transition-fast"
                    aria-label="Gehe zu Unsere Vision"
                    >Unsere Vision</a
                  >
                  <a
                    href="#"
                    @click.prevent="scrollTo('how-it-works')"
                    class="text-grey-5 text-decoration-none hover-red transition-fast"
                    aria-label="Gehe zu Funktion"
                    >Funktion</a
                  >
                  <a
                    href="#"
                    @click.prevent="scrollTo('features')"
                    class="text-grey-5 text-decoration-none hover-red transition-fast"
                    aria-label="Gehe zu Features"
                    >Features</a
                  >
                  <a href="/auth" class="text-grey-5 text-decoration-none hover-red transition-fast" aria-label="Zum Login oder zur Registrierung"
                    >Login / Register</a
                  >
                </div>
              </nav>

              <!-- Column 3: Legal & Contact -->
              <nav class="col-12 col-md-4" aria-label="Rechtliche Informationen">
                <div class="text-subtitle1 text-weight-bold q-mb-md text-primary">Rechtliches</div>
                <div class="column q-gutter-sm text-body2">
                  <a href="#" class="text-grey-5 text-decoration-none hover-red transition-fast" aria-label="Impressum lesen"
                    >Impressum</a
                  >
                  <a href="#" class="text-grey-5 text-decoration-none hover-red transition-fast" aria-label="Datenschutzerklärung lesen"
                    >Datenschutz</a
                  >
                  <a href="#" class="text-grey-5 text-decoration-none hover-red transition-fast" aria-label="Allgemeine Geschäftsbedingungen lesen"
                    >AGB</a
                  >
                </div>
                <div class="q-mt-lg text-caption text-grey-6">
                  © 2024 Smart Rescue. All rights reserved.
                </div>
              </nav>
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
