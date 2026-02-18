import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export const useUserStore = defineStore('user', () => {
  const profiles = ref([])

  const getProfilesFromUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/profiles/${userId}`)
      profiles.value = response.data
      return profiles.value
    } catch (err) {
      console.error('Fehler beim initialisieren der Profile:', err)
      throw err
    }
  }

  const deleteProfileFromUser = async (profileId, userId) => {
    try {
      await axios.delete(`${API_URL}/user/profiles/${profileId}`)
      await getProfilesFromUser(userId)
    } catch (err) {
      console.error('Fehler beim Löschen des Profils:', err)
      throw err
    }
  }

  const savePersonal = async (userId, personalData) => {
    const response = await axios.post(`${API_URL}/user/profiles/${userId}`, personalData)
    await getProfilesFromUser(userId)
    return response.data
  }

  const saveDoctor = async (profileId, doctorData) => {
    const response = await axios.post(`${API_URL}/user/doctor/${profileId}`, doctorData)
    return response.data
  }

  const saveEmergencyContacts = async (profileId, emergencyContacts) => {
    const contacts = []
    for (const contact of emergencyContacts) {
      const response = await axios.post(`${API_URL}/user/emergency_contacts/${profileId}`, contact)
      contacts.push(response.data)
    }
    return contacts
  }

  const saveMeddata = async (profileId, medicalData) => {
    const response = await axios.post(`${API_URL}/user/meddata/${profileId}`, medicalData)
    return response.data
  }

  const saveMedication = async (medId, medicationsData) => {
    const medications = []
    for (const med of (medicationsData || [])) {
      const response = await axios.post(`${API_URL}/user/medications/${medId}`, med)
      medications.push(response.data)
    }
    return medications
  }

  const saveConditions = async (medId, conditionsData) => {
    const conditions = []
    for (const condition of conditionsData || []) {
      const response = await axios.post(`${API_URL}/user/med_conditions/${medId}`, condition)
      conditions.push(response.data)
    }
    return conditions
  }

  const saveAllergies = async (medId, allergiesData) => {
    const allergies = []
    for (const allergy of allergiesData || []) {
      const response = await axios.post(`${API_URL}/user/allergies/${medId}`, allergy)
      allergies.push(response.data)
    }
    return allergies
  }

  const saveDocuments = async (medId, documentsData) => {
    const documents = []
    for (const doc of documentsData || []) {
      const response = await axios.post(`${API_URL}/user/documents/${medId}`, doc)
      documents.push(response.data)
    }
    return documents
  }

  return {
    profiles,
    getProfilesFromUser,
    deleteProfileFromUser,
    savePersonal,
    saveDoctor,
    saveEmergencyContacts,
    saveMeddata,
    saveMedication,
    saveConditions,
    saveAllergies,
    saveDocuments,
  }
})
