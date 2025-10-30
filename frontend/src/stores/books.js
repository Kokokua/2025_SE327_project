import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useBooksStore = defineStore('books', () => {
  // State
  const books = ref([])
  const currentBook = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Actions
  async function fetchBooks(filters = {}) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get('/api/books', { params: filters })
      books.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch books'
    } finally {
      loading.value = false
    }
  }

  async function fetchBook(id) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get(`/api/books/${id}`)
      currentBook.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch book'
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    books,
    currentBook,
    loading,
    error,
    // Actions
    fetchBooks,
    fetchBook,
  }
})

