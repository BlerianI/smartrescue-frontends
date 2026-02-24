<script setup>
import Navbar from '../components/NavbarSM.vue'
import Footer from '../components/FooterSM.vue'
import EmeCalls from '../components/EmeCalls.vue'
import ImportantInfo from '../components/ImportantInfo.vue'
import PersonInfo from '../components/PersonInfo.vue'
import MedicalInfo from '../components/MedicalInfo.vue'
import ContactInfo from '../components/ContactInfo.vue'
import DoctorInfo from '../components/DoctorInfo.vue'
import MedicalData from '../components/MedicalData.vue'
import { emergencyNumbers } from '../data/testdata.js'
import { useEmergencyStore } from '../stores/emergencyStore'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useEmergencyStore()
const router = useRouter()

onMounted(() => {
  if (!store.personData) {
    router.replace('/scanner')
  }
})

const person = computed(() => store.personData?.profile)
const contacts = computed(() => store.personData?.contactNumbers || [])
const doctors = computed(() => store.personData?.doctors || [])
const importantInfo = computed(() => store.personData?.importantInfo || '')
const diseases = computed(() => store.personData?.diseases || [])
const allergies = computed(() => store.personData?.allergies || [])
const medications = computed(() => store.personData?.medications || [])
const documents = computed(() => store.personData?.documents || [])

const date = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString('de-AT', options)
})
</script>

<template>
  <q-layout view="hHh lpR fFf" v-if="store.personData">
    <q-header>
      <Navbar></Navbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="container-em-calls">
          <EmeCalls
            v-for="call of emergencyNumbers"
            :key="call.number"
            :number="call.number"
            :service="call.service"
          ></EmeCalls>
        </div>

        <div v-if="importantInfo">
          <ImportantInfo :infos="importantInfo" class="container-banner-info"></ImportantInfo>
        </div>

        <div class="container-person-info" v-if="person">
          <PersonInfo :person="person"></PersonInfo>
        </div>

        <div class="container-medical-info">
          <MedicalInfo
            :deaseses="diseases"
            :allergies="allergies"
            :medications="medications"
          ></MedicalInfo>
        </div>

        <div class="container-medical-data">
          <MedicalData :documents="documents"></MedicalData>
        </div>

        <div class="container-contact-info">
          <ContactInfo :contacts="contacts"></ContactInfo>
        </div>

        <div class="container-doctor-info column items-center">
          <template v-if="doctors && doctors.length > 0">
            <DoctorInfo
              v-for="doctor in doctors"
              :key="doctor.nummer"
              :doctor="doctor"
              class="q-mb-md"
            ></DoctorInfo>
          </template>
          <q-card
            v-else
            class="container q-px-md q-py-md q-my-md column"
            style="
              max-width: 400px;
              background-color: #ffffff;
              border-radius: 20px;
              box-shadow: 0 10px 30px -5px rgba(220, 38, 38, 0.1);
              width: calc(100% - 32px);
            "
          >
            <q-card-section>
              <div class="text-weight-medium" style="font-size: 18px; color: #1e293b">Hausarzt</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-italic" style="color: #94a3b8">Keine Angaben</div>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>

    <q-footer>
      <Footer :date="date"></Footer>
    </q-footer>
  </q-layout>
</template>

<style scoped>
.container-em-calls {
  width: 100%;
  background-color: white;
  border-radius: 0 0 15px 15px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
.container-banner-info {
  display: flex;
  justify-content: center;
}

.container-person-info,
.container-medical-info,
.container-contact-info,
.container-doctor-info,
.container-medical-data {
  display: flex;
  justify-content: center;
}
</style>
