import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

// ✅ WICHTIG: Axios global konfigurieren
axios.defaults.withCredentials = true

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const signUp = async (firstName, lastName, email, password) => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      lastName,
      firstName,
      email,
      password,
    })
    user.value = response.data.data.user
    console.log('✅ SignUp User:', user.value)
  }

  const signIn = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/signin`, { email, password })
    user.value = response.data.data.user
    console.log('✅ SignIn User:', user.value)
  }

  const googleLogin = () => {
    window.location.href = `${API_URL}/auth/google`
  }

  const logout = async () => {
    await axios.post(`${API_URL}/auth/logout`)
    user.value = null
  }

  const getCurrentUser = async () => {
    try {
      console.log('📡 Rufe /auth/me auf...')
      console.log('🍪 Cookies:', document.cookie)

      const response = await axios.get(`${API_URL}/auth/me`)

      console.log('✅ Response:', response.data)
      user.value = response.data.data.user
      console.log('👤 User gesetzt:', user.value)
    } catch (err) {
      console.error('❌ getCurrentUser Fehler:', err.response?.status, err.response?.data)
      user.value = null
    }
  }

  return {
    user,
    signUp,
    signIn,
    googleLogin,
    logout,
    getCurrentUser,
  }
})
