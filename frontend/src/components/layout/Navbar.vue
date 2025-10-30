<template>
  <nav class="bg-primary-600 text-white shadow-lg">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
          </svg>
          <span class="text-2xl font-bold">Bookstore</span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link to="/" class="hover:text-primary-200 transition">Home</router-link>
          <router-link to="/books" class="hover:text-primary-200 transition">Books</router-link>
          
          <!-- Cart -->
          <router-link to="/cart" class="relative hover:text-primary-200 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {{ cartStore.totalItems }}
            </span>
          </router-link>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
            <router-link to="/orders" class="hover:text-primary-200 transition">Orders</router-link>
            <router-link v-if="authStore.isAdmin" to="/admin" class="hover:text-primary-200 transition">Admin</router-link>
            <button @click="handleLogout" class="hover:text-primary-200 transition">
              Logout
            </button>
          </div>
          <div v-else class="flex items-center space-x-4">
            <router-link to="/login" class="hover:text-primary-200 transition">Login</router-link>
            <router-link to="/register" class="px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition">
              Register
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen" class="md:hidden pb-4">
        <router-link to="/" class="block py-2 hover:text-primary-200">Home</router-link>
        <router-link to="/books" class="block py-2 hover:text-primary-200">Books</router-link>
        <router-link to="/cart" class="block py-2 hover:text-primary-200">Cart ({{ cartStore.totalItems }})</router-link>
        <template v-if="authStore.isAuthenticated">
          <router-link to="/orders" class="block py-2 hover:text-primary-200">Orders</router-link>
          <router-link v-if="authStore.isAdmin" to="/admin" class="block py-2 hover:text-primary-200">Admin</router-link>
          <button @click="handleLogout" class="block py-2 hover:text-primary-200 w-full text-left">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="block py-2 hover:text-primary-200">Login</router-link>
          <router-link to="/register" class="block py-2 hover:text-primary-200">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'home' })
}
</script>

