import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref(JSON.parse(localStorage.getItem('cart_items') || '[]'))

  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      const price = item.book.discountedPrice || item.book.price
      return total + (price * item.quantity)
    }, 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  function addItem(book, quantity = 1) {
    const existingItem = items.value.find(item => item.book.id === book.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        book,
        quantity
      })
    }
    
    saveToLocalStorage()
  }

  function removeItem(bookId) {
    items.value = items.value.filter(item => item.book.id !== bookId)
    saveToLocalStorage()
  }

  function updateQuantity(bookId, quantity) {
    const item = items.value.find(item => item.book.id === bookId)
    
    if (item) {
      if (quantity <= 0) {
        removeItem(bookId)
      } else {
        item.quantity = quantity
        saveToLocalStorage()
      }
    }
  }

  function clearCart() {
    items.value = []
    saveToLocalStorage()
  }

  function saveToLocalStorage() {
    localStorage.setItem('cart_items', JSON.stringify(items.value))
  }

  return {
    // State
    items,
    // Getters
    totalItems,
    totalPrice,
    isEmpty,
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})

