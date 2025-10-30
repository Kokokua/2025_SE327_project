<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Admin Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card">
        <h3 class="text-lg font-medium text-gray-600">Total Users</h3>
        <p class="text-3xl font-bold text-primary-600">{{ users.length }}</p>
      </div>
      <div class="card">
        <h3 class="text-lg font-medium text-gray-600">Total Orders</h3>
        <p class="text-3xl font-bold text-primary-600">{{ orders.length }}</p>
      </div>
      <div class="card">
        <h3 class="text-lg font-medium text-gray-600">Total Revenue</h3>
        <p class="text-3xl font-bold text-primary-600">${{ totalRevenue.toFixed(2) }}</p>
      </div>
    </div>

    <div class="space-y-8">
      <!-- Recent Orders -->
      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Recent Orders</h2>
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
        <div v-else-if="orders.length === 0" class="text-center py-8 text-gray-500">
          No orders yet
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">Order ID</th>
                <th class="text-left py-2">User</th>
                <th class="text-left py-2">Total</th>
                <th class="text-left py-2">Status</th>
                <th class="text-left py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders.slice(0, 10)" :key="order.id" class="border-b">
                <td class="py-2">#{{ order.id }}</td>
                <td class="py-2">{{ order.user?.email || 'N/A' }}</td>
                <td class="py-2">${{ order.totalAmount }}</td>
                <td class="py-2">
                  <span 
                    class="px-2 py-1 rounded-full text-xs"
                    :class="{
                      'bg-yellow-100 text-yellow-800': order.status === 'pending',
                      'bg-green-100 text-green-800': order.status === 'completed',
                      'bg-red-100 text-red-800': order.status === 'cancelled'
                    }"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td class="py-2">{{ new Date(order.createdAt).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Users List -->
      <div class="card">
        <h2 class="text-2xl font-bold mb-4">Users</h2>
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
        <div v-else-if="users.length === 0" class="text-center py-8 text-gray-500">
          No users yet
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2">ID</th>
                <th class="text-left py-2">Email</th>
                <th class="text-left py-2">Role</th>
                <th class="text-left py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="border-b">
                <td class="py-2">{{ user.id }}</td>
                <td class="py-2">{{ user.email }}</td>
                <td class="py-2">
                  <span 
                    class="px-2 py-1 rounded-full text-xs"
                    :class="{
                      'bg-purple-100 text-purple-800': user.role === 'admin',
                      'bg-blue-100 text-blue-800': user.role === 'user'
                    }"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="py-2">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'

const users = ref([])
const orders = ref([])
const loading = ref(false)

const totalRevenue = computed(() => 
  orders.value.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0)
)

onMounted(async () => {
  loading.value = true
  try {
    const [usersRes, ordersRes] = await Promise.all([
      api.get('/admin/users'),
      api.get('/admin/orders')
    ])
    users.value = usersRes.data
    orders.value = ordersRes.data
  } catch (err) {
    console.error('Failed to load admin data:', err)
  } finally {
    loading.value = false
  }
})
</script>

