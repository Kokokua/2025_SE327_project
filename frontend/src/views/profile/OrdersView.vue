<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">My Orders</h1>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-12 text-red-600">
      {{ error }}
    </div>

    <div v-else-if="orders.length === 0" class="card text-center py-12">
      <p class="text-xl text-gray-600 mb-4">No orders yet</p>
      <router-link to="/books" class="btn-primary">
        Start Shopping
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.id" class="card">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-bold text-lg">Order #{{ order.id }}</h3>
            <p class="text-gray-600 text-sm">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
          </div>
          <span 
            class="px-3 py-1 rounded-full text-sm font-medium"
            :class="{
              'bg-yellow-100 text-yellow-800': order.status === 'pending',
              'bg-green-100 text-green-800': order.status === 'completed',
              'bg-red-100 text-red-800': order.status === 'cancelled'
            }"
          >
            {{ order.status }}
          </span>
        </div>

        <div class="space-y-2 mb-4">
          <div v-for="(item, idx) in order.items" :key="idx" class="flex justify-between text-sm">
            <span>{{ item.title }} x {{ item.quantity }}</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <div class="pt-4 border-t flex justify-between items-center font-bold">
          <span>Total</span>
          <span>${{ order.totalAmount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ordersService } from '@/services/ordersService'

const orders = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    orders.value = await ordersService.getOrders()
  } catch (err) {
    error.value = 'Failed to load orders'
  } finally {
    loading.value = false
  }
})
</script>

