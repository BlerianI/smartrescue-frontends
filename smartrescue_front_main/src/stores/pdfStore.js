import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export const usePDFStore = defineStore('pdfStore', () => {
  const profile = ref([]);
  const getProfilePDF = async (profile_id) => {
    try {
      const response = await axios.get(`${API_URL}/user/pdf/${profile_id}`)
      profile.value = response.data
      return profile.value
    } catch (err) {
      console.error('Fehler bei dem Laden des Profils', err)
      throw err
    }
  }



  return { profile, getProfilePDF }
})
