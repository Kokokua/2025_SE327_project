<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-12 text-center">
      <h1 class="text-5xl font-bold mb-4">Welcome to Bookstore</h1>
      <p class="text-xl mb-8">Discover your next favorite book</p>
      <router-link to="/books" class="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition">
        Browse Books
      </router-link>
    </section>

    <!-- Featured Books -->
    <section>
      <h2 class="text-3xl font-bold mb-6">Featured Books</h2>
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
      <div v-else-if="error" class="text-center py-12 text-red-600">
        {{ error }}
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="book in books.slice(0, 8)" :key="book.id" class="card hover:shadow-lg transition">
          <img v-if="book.imageUrl" :src="book.imageUrl" :alt="book.title" class="w-full h-48 object-cover rounded-lg mb-4">
          <div v-else class="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
          </div>
          <h3 class="font-bold text-lg mb-2 line-clamp-2">{{ book.title }}</h3>
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ book.description || 'No description available' }}</p>
          <div class="flex justify-between items-center">
            <div>
              <span v-if="book.discountedPrice" class="text-sm text-gray-500 line-through">${{ book.price }}</span>
              <span class="text-primary-600 font-bold text-xl">${{ book.discountedPrice || book.price }}</span>
            </div>
            <router-link :to="`/books/${book.id}`" class="btn-primary text-sm">
              View
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBooksStore } from '@/stores/books'

const booksStore = useBooksStore()
const books = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    await booksStore.fetchBooks()
    books.value = booksStore.books
  } catch (err) {
    error.value = 'Failed to load books'
  } finally {
    loading.value = false
  }
})
</script>
