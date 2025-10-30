import api from './api'

export const authService = {
  async register(email, password) {
    const response = await api.post('/auth/register', { email, password })
    return response.data
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async getProfile() {
    const response = await api.get('/users/me')
    return response.data
  }
}

