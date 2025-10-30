import api from './api'

export const tagsService = {
  async getTags() {
    const response = await api.get('/tags')
    return response.data
  },

  async getTag(id) {
    const response = await api.get(`/tags/${id}`)
    return response.data
  },

  async createTag(tagData) {
    const response = await api.post('/tags', tagData)
    return response.data
  },

  async updateTag(id, tagData) {
    const response = await api.put(`/tags/${id}`, tagData)
    return response.data
  },

  async deleteTag(id) {
    const response = await api.delete(`/tags/${id}`)
    return response.data
  }
}

