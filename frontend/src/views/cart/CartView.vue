<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="card text-center py-12">
      <svg class="w-24 h-24 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
      </svg>
      <p class="text-xl text-gray-600 mb-4">Your cart is empty</p>
      <router-link to="/books" class="btn-primary">
        Browse Books
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cartStore.items" :key="item.id" class="card flex gap-4">
          <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="w-24 h-24 object-cover rounded">
          <div v-else class="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg">{{ item.title }}</h3>
            <p class="text-primary-600 font-bold">${{ item.discountedPrice || item.price }}</p>
            <div class="flex items-center gap-2 mt-2">
              <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="btn-secondary px-3 py-1">-</button>
              <span class="font-medium">{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="btn-secondary px-3 py-1">+</button>
            </div>
          </div>
          <div>
            <button @click="cartStore.removeFromCart(item.id)" class="text-red-600 hover:text-red-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="card sticky top-4">
          <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span>Items ({{ cartStore.totalItems }})</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg pt-4 border-t">
              <span>Total</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
          </div>
          <router-link to="/checkout" class="block w-full btn-primary text-center">
            Proceed to Checkout
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

