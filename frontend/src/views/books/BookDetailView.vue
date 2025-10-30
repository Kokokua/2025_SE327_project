<template>
  <div>
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-600">
      {{ error }}
    </div>

    <div v-else-if="book" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Book Image -->
      <div>
        <img v-if="book.imageUrl" :src="book.imageUrl" :alt="book.title" class="w-full rounded-lg shadow-lg">
        <div v-else class="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
          <svg class="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
          </svg>
        </div>
      </div>

      <!-- Book Details -->
      <div class="space-y-6">
        <div>
          <h1 class="text-4xl font-bold mb-2">{{ book.title }}</h1>
          <p v-if="book.seller" class="text-gray-600">by {{ book.seller }}</p>
        </div>

        <div class="flex items-baseline space-x-4">
          <span v-if="book.discountedPrice" class="text-2xl text-gray-500 line-through">${{ book.price }}</span>
          <span class="text-4xl font-bold text-primary-600">${{ book.discountedPrice || book.price }}</span>
        </div>

        <div v-if="book.tags && book.tags.length" class="flex flex-wrap gap-2">
          <span v-for="tag in book.tags" :key="tag.id" class="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
            {{ tag.name }}
          </span>
        </div>

        <div>
          <h2 class="text-xl font-bold mb-2">Description</h2>
          <p class="text-gray-700 leading-relaxed">{{ book.description || 'No description available' }}</p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <label class="font-medium">Quantity:</label>
            <input 
              v-model.number="quantity" 
              type="number" 
              min="1" 
              class="w-20 input-field"
            >
          </div>

          <button 
            @click="addToCart" 
            class="w-full btn-primary py-3 text-lg"
          >
            Add to Cart
          </button>

          <router-link to="/books" class="block text-center text-primary-600 hover:text-primary-700">
            ← Back to Books
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBooksStore } from '@/stores/books'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const booksStore = useBooksStore()
const cartStore = useCartStore()

const book = ref(null)
const loading = ref(false)
const error = ref(null)
const quantity = ref(1)

const addToCart = () => {
  cartStore.addToCart(book.value, quantity.value)
  alert('Added to cart!')
}

onMounted(async () => {
  loading.value = true
  try {
    book.value = await booksStore.fetchBook(route.params.id)
  } catch (err) {
    error.value = 'Failed to load book'
  } finally {
    loading.value = false
  }
})
</script>

