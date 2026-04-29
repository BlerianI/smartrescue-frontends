import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export const useEmergencyStore = defineStore('emergencyStore', () => {
  const personData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const fetchEmergencyData = async (uuid) => {
    isLoading.value = true
    error.value = null
    personData.value = null

    try {
      const response = await axios.get(`${API_URL}/emergency/${uuid}`)
      if (response.data && response.data.length > 0) {
        personData.value = response.data[0].personinfo
      } else {
        error.value = 'Keine Daten für diesen QR-Code gefunden.'
      }
    } catch (err) {
      console.error('Error fetching emergency data:', err)
      if (err.response && err.response.status === 404) {
        error.value = 'QR-Code ungültig oder Person nicht gefunden.'
      } else {
        error.value = 'Fehler beim Abrufen der Notfalldaten. Bitte versuchen Sie es später erneut.'
      }
    } finally {
      isLoading.value = false
    }
  }

  const location = ref(null)

  const logLocation = async (uuid) => {
    const coords = await new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(null)
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve(null),
        { enableHighAccuracy: false, maximumAge: 60000 },
      )
    })

    const locationString = coords
      ? `https://maps.google.com/?q=${coords.lat},${coords.lng}`
      : 'unknown'

    location.value = locationString

    try {
      await axios.post(`${API_URL}/emergency/${uuid}/log`, { location: locationString })
    } catch (err) {
      console.error('Failed to log access location:', err)
    }
  }

  const clearData = () => {
    personData.value = null
    error.value = null
    location.value = null
  }

  return { personData, isLoading, error, location, fetchEmergencyData, logLocation, clearData }
})
