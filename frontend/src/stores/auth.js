import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(localStorage.getItem('auth_token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  async function login(email, password) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/api/auth/login', { email, password })
      
      token.value = response.data.access_token
      user.value = response.data.user
      
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = null
    
    try {
      await api.post('/api/auth/register', userData)
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) return
    
    try {
      const response = await api.get('/api/users/me')
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (err) {
      logout()
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  return {
    // State
    token,
    user,
    loading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    // Actions
    login,
    register,
    fetchCurrentUser,
    logout,
  }
})

