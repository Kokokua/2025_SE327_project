import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function register(email, password) {
    try {
      const response = await authService.register(email, password)
      token.value = response.accessToken
      user.value = response.user
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      }
    }
  }

  async function login(email, password) {
    try {
      const response = await authService.login(email, password)
      token.value = response.accessToken
      user.value = response.user
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  async function fetchProfile() {
    try {
      const profile = await authService.getProfile()
      user.value = profile
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    register,
    login,
    logout,
    fetchProfile
  }
})
