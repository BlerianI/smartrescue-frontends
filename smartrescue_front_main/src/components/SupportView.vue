<template>
  <div class="q-pa-xl bg-grey-1" style="min-height: 100vh">
    <div class="q-mb-xl q-pa-xl rounded-borders-xl bg-gradient-primary">
      <h4 class="text-h3 q-ma-none text-weight-bold text-white font-display">Hilfe & Support</h4>
      <p class="text-h6 text-white-80 q-mt-md q-mb-none font-display">
        Wir helfen dir, wann immer du Unterstützung brauchst — kontaktiere unser Team direkt.
      </p>
    </div>

    <q-card flat class="content-container rounded-borders-lg q-mb-lg">
      <div class="section-header q-px-lg q-py-md">
        <div class="text-uppercase text-caption text-weight-bold text-grey-9 font-display">
          Dein SmartRescue-Team
        </div>
      </div>
      <q-separator />
      <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
          <div v-for="member in team" :key="member.email" class="col-12 col-md-4">
            <div class="contact-card q-pa-lg">
              <q-avatar size="64px" class="contact-avatar text-white text-weight-bold">
                {{ initials(member.name) }}
              </q-avatar>
              <div class="text-h6 text-weight-bold text-grey-9 font-display q-mt-md">
                {{ member.name }}
              </div>
              <div class="text-caption text-grey-7 q-mb-md">{{ member.role }}</div>
              <q-btn
                unelevated
                color="primary"
                icon="mail"
                :label="member.email"
                :href="`mailto:${member.email}`"
                class="contact-btn full-width text-weight-medium"
                no-caps
              />
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <q-card flat class="content-container rounded-borders-lg q-mb-lg">
      <div class="section-header q-px-lg q-py-md">
        <div class="text-uppercase text-caption text-weight-bold text-grey-9 font-display">
          Häufige Fragen
        </div>
      </div>
      <q-separator />
      <div class="q-pa-md">
        <q-list separator>
          <q-expansion-item
            v-for="(faq, idx) in faqs"
            :key="idx"
            :label="faq.question"
            expand-icon-class="text-primary"
            header-class="faq-header text-weight-medium text-grey-9 font-display"
          >
            <q-card flat>
              <q-card-section class="text-body2 text-grey-8">
                {{ faq.answer }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </q-card>

    <q-card flat class="content-container rounded-borders-lg">
      <div class="section-header q-px-lg q-py-md">
        <div class="text-uppercase text-caption text-weight-bold text-grey-9 font-display">
          Notfall? Sofortige Hilfe
        </div>
      </div>
      <q-separator />
      <div class="q-pa-lg">
        <div class="row q-col-gutter-md">
          <div v-for="num in emergencyNumbers" :key="num.number" class="col-12 col-md-4">
            <div class="emergency-card q-pa-md row items-center">
              <q-icon :name="num.icon" size="32px" class="text-primary q-mr-md" />
              <div>
                <div class="text-caption text-grey-7">{{ num.label }}</div>
                <a :href="`tel:${num.number}`" class="text-h6 text-weight-bold text-grey-9 emergency-link">
                  {{ num.number }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
const team = [
  {
    name: 'Majd Alshikh',
    role: 'Entwickler',
    email: 'alshikh.m21@htlwienwest.at',
  },
  {
    name: 'Blerian Istrefi',
    role: 'Entwickler',
    email: 'istrefi.b21@htlwienwest.at',
  },
  {
    name: 'Pawel Otreba',
    role: 'Entwickler',
    email: 'otreba.p21@htlweinwest.at',
  },
]

const faqs = [
  {
    question: 'Wie funktioniert SmartRescue im Notfall?',
    answer:
      'Im Notfall scannen Ersthelfer den QR-Code auf deinem Notfallarmband. Sie erhalten sofort Zugriff auf deine wichtigsten medizinischen Daten — auch ohne Login.',
  },
  {
    question: 'Wer kann meine Daten sehen?',
    answer:
      'Nur Personen, die physisch deinen QR-Code scannen, sehen deine Notfall-Daten. Persönliche Kontakte sind nur für dich sichtbar.',
  },
  {
    question: 'Kann ich mehrere Profile anlegen?',
    answer:
      'Ja, du kannst beliebig viele Profile anlegen — z. B. für Familienmitglieder. Jedes Profil hat seinen eigenen QR-Code.',
  },
  {
    question: 'Was passiert, wenn ich mein Armband verliere?',
    answer:
      'Melde dich in deinem Konto an und deaktiviere das verlorene Armband. Anschließend kannst du ein neues bestellen und mit deinen bestehenden Profilen verknüpfen.',
  },
  {
    question: 'Wie aktualisiere ich meine medizinischen Daten?',
    answer:
      'Gehe zu „Meine Profile", wähle das gewünschte Profil aus und klicke auf das Bearbeiten-Symbol. Änderungen sind sofort live.',
  },
  {
    question: 'Werden meine Daten verschlüsselt gespeichert?',
    answer:
      'Ja, alle Daten werden verschlüsselt in unserer Datenbank gespeichert und nur über sichere Verbindungen (HTTPS) übertragen.',
  },
]

const emergencyNumbers = [
  { label: 'Feuerwehr', number: '122', icon: 'local_fire_department' },
  { label: 'Polizei', number: '133', icon: 'local_police' },
  { label: 'Rettung', number: '144', icon: 'medical_services' },
]

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
</script>

<style lang="scss" scoped>
$primary: #e53935;
$secondary: #b71c1c;

.bg-gradient-primary {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
}
.text-white-80 {
  color: rgba(255, 255, 255, 0.9);
}
.font-display {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  letter-spacing: -0.01em;
}
.rounded-borders-lg {
  border-radius: 20px;
}
.rounded-borders-xl {
  border-radius: 32px;
}
.content-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.section-header {
  background: #f8f9fa;
}

.contact-card {
  background: white;
  border: 1px solid #eeeeee;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px -10px rgba(229, 57, 53, 0.25);
    border-color: rgba(229, 57, 53, 0.3);
  }
}
.contact-avatar {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
  font-size: 22px;
}
.contact-btn {
  border-radius: 12px;
}

.faq-header {
  padding: 12px 16px;

  &:hover {
    background: rgba(229, 57, 53, 0.04);
  }
}

.emergency-card {
  background: white;
  border: 1px solid #fee2e2;
  border-radius: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(229, 57, 53, 0.04);
    border-color: rgba(229, 57, 53, 0.4);
  }
}
.emergency-link {
  text-decoration: none;
  color: inherit;
}
</style>
