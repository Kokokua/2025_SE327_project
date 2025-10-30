import { defineStore } from 'pinia'
import { ref } from 'vue'
import { booksService } from '@/services/booksService'

export const useBooksStore = defineStore('books', () => {
  const books = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchBooks(filters = {}) {
    loading.value = true
    error.value = null
    try {
      books.value = await booksService.getBooks(filters)
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
      return await booksService.getBook(id)
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch book'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    books,
    loading,
    error,
    fetchBooks,
    fetchBook
  }
})
