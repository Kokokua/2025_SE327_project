<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Checkout</h1>

    <div v-if="cartStore.items.length === 0" class="card text-center py-12">
      <p class="text-xl text-gray-600 mb-4">Your cart is empty</p>
      <router-link to="/books" class="btn-primary">
        Browse Books
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Order Items -->
      <div class="lg:col-span-2">
        <div class="card mb-6">
          <h2 class="text-2xl font-bold mb-4">Order Items</h2>
          <div class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between items-center pb-4 border-b last:border-b-0">
              <div>
                <h3 class="font-bold">{{ item.title }}</h3>
                <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
              </div>
              <span class="font-bold">${{ ((item.discountedPrice || item.price) * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary & Place Order -->
      <div class="lg:col-span-1">
        <div class="card sticky top-4">
          <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
          <div class="space-y-2 mb-6">
            <div class="flex justify-between">
              <span>Items</span>
              <span>{{ cartStore.totalItems }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg pt-4 border-t">
              <span>Total</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <div v-if="error" class="text-red-600 text-sm mb-4">
            {{ error }}
          </div>

          <button 
            @click="placeOrder" 
            :disabled="loading"
            class="w-full btn-primary disabled:opacity-50"
          >
            <span v-if="loading">Placing Order...</span>
            <span v-else>Place Order</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { ordersService } from '@/services/ordersService'

const router = useRouter()
const cartStore = useCartStore()
const loading = ref(false)
const error = ref('')

const placeOrder = async () => {
  loading.value = true
  error.value = ''

  try {
    const orderData = {
      items: cartStore.items.map(item => ({
        bookId: item.id,
        title: item.title,
        price: item.discountedPrice || item.price,
        quantity: item.quantity
      }))
    }

    await ordersService.createOrder(orderData)
    cartStore.clearCart()
    router.push({ name: 'orders' })
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to place order'
  } finally {
    loading.value = false
  }
}
</script>

