import api from './api'

export const booksService = {
  async getBooks(filters = {}) {
    const params = new URLSearchParams()
    if (filters.search) params.append('search', filters.search)
    if (filters.tagIds) params.append('tagIds', filters.tagIds)
    if (filters.minPrice) params.append('minPrice', filters.minPrice)
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
    
    const response = await api.get(`/books?${params.toString()}`)
    return response.data
  },

  async getBook(id) {
    const response = await api.get(`/books/${id}`)
    return response.data
  },

  async createBook(bookData) {
    const response = await api.post('/books', bookData)
    return response.data
  },

  async updateBook(id, bookData) {
    const response = await api.put(`/books/${id}`, bookData)
    return response.data
  },

  async deleteBook(id) {
    const response = await api.delete(`/books/${id}`)
    return response.data
  }
}

