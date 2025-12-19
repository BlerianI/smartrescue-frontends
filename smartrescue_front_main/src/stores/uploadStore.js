// src/stores/uploadStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export const useUploadStore = defineStore('upload', () => {
  const uploadAvatar = async (file) => {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await axios.post(`${API_URL}/user/upload-avatar`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response.data.data.imageUrl
  }

  return { uploadAvatar }
})
