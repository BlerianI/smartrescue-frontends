import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export const useUserStore = defineStore('user', () => {
  const profiles = reactive([])

  // Reaktives Profil-Objekt initialisieren
  const currentProfile = reactive({
    personal: {
      first_name: '',
      last_name: '',
      birthdate: '',
      gender: '',
      street: '',
      housenumber: '',
      postalcode: '',
      city: '',
      weight: '',
      height: '',
      bloodtype: '',
      avatar_url: '',
    },
    doctor: {
      first_name: '',
      last_name: '',
      street: '',
      city: '',
      housenumber: '',
      postalcode: '',
      specialty: '',
      phone_number: '',
      title: '',
    },
    emergencyContacts: [],
    medical: {
      key_info: '',
      medications: [],
      conditions: [],
      allergies: [],
      documents: [],
    },
  })

  const getProfilesFromUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/profiles/${userId}`)
      profiles.splice(0, profiles.length, ...response.data)
      return profiles
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // ⬇️ im Store
  const saveProfileWithAllData = async (userId) => {
    try {
      // 1️⃣ Profil
      const profileRes = await axios.post(
        `${API_URL}/user/profiles/${userId}`,
        currentProfile.personal,
      )

      const profileId = profileRes.data.profile_id
      // 2️⃣ Doctor
      await axios.post(`${API_URL}/user/doctor/${profileId}`, currentProfile.doctor)

      // 3️⃣ Emergency Contacts
      for (const contact of currentProfile.emergencyContacts) {
        await axios.post(`${API_URL}/user/emergency_contacts/${profileId}`, contact)
      }

      // 4️⃣ Medical Base
      await axios.post(`${API_URL}/user/meddata/${profileId}`, {
        key_info: currentProfile.medical.key_info,
      })
      // 5️⃣ Medications
      for (const med of currentProfile.medical.medications) {
        await axios.post(`${API_URL}/user/medications/${profileId}`, med)
      }

      // 6️⃣ Conditions
      for (const condition of currentProfile.medical.conditions) {
        await axios.post(`${API_URL}/user/med_conditions/${profileId}`, condition)
      }

      // 7️⃣ Allergies
      for (const allergy of currentProfile.medical.allergies) {
        await axios.post(`${API_URL}/user/allergies/${profileId}`, allergy)
      }

      // 8️⃣ Documents
      for (const doc of currentProfile.medical.documents) {
        await axios.post(`${API_URL}/user/documents/${profileId}`, doc)
      }

      profiles.push(profileRes.data)
      return profileRes.data
    } catch (err) {
      console.error('Fehler beim Speichern:', err)
      throw err
    }
  }

  return {
    profiles,
    currentProfile,
    getProfilesFromUser,
    saveProfileWithAllData,
  }
})
