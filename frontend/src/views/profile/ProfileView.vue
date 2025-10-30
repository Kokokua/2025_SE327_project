<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">My Profile</h1>

    <div class="card">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <p class="text-lg">{{ authStore.user?.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <p class="text-lg capitalize">{{ authStore.user?.role }}</p>
        </div>

        <div class="pt-4 border-t">
          <router-link to="/orders" class="btn-primary">
            View My Orders
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

