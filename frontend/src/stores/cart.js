import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

  const totalItems = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() => 
    items.value.reduce((sum, item) => sum + (item.discountedPrice || item.price) * item.quantity, 0)
  )

  function addToCart(book, quantity = 1) {
    const existingItem = items.value.find(item => item.id === book.id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ ...book, quantity })
    }
    saveCart()
  }

  function removeFromCart(bookId) {
    items.value = items.value.filter(item => item.id !== bookId)
    saveCart()
  }

  function updateQuantity(bookId, quantity) {
    const item = items.value.find(item => item.id === bookId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(bookId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  function clearCart() {
    items.value = []
    saveCart()
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})
