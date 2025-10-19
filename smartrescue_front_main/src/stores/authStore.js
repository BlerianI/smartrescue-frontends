import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  // Sign Up
  const signUp = async (firstName, lastName, email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
      firstName,
      lastName,
      email,
      password,
    })

    token.value = response.data.data.token
    user.value = response.data.data.user
  }

  // Sign In
  const signIn = async (email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
      email,
      password,
    })

    token.value = response.data.data.token
    user.value = response.data.data.user
  }

  // Google OAuth Login
  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/google`
  }

  return {
    user,
    token,
    signUp,
    signIn,
    googleLogin,
  }
})
