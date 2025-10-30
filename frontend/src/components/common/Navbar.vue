<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <span class="text-2xl">📚</span>
          <span class="text-xl font-bold text-primary-600">Bookstore</span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link to="/" class="text-gray-700 hover:text-primary-600 transition-colors">
            Home
          </router-link>
          <router-link to="/books" class="text-gray-700 hover:text-primary-600 transition-colors">
            Books
          </router-link>
          <router-link to="/about" class="text-gray-700 hover:text-primary-600 transition-colors">
            About
          </router-link>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Cart -->
          <router-link to="/cart" class="relative">
            <button class="p-2 text-gray-700 hover:text-primary-600 transition-colors">
              🛒
              <span 
                v-if="cartStore.totalItems > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
              >
                {{ cartStore.totalItems }}
              </span>
            </button>
          </router-link>

          <!-- Auth Buttons -->
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="text-gray-700 hover:text-primary-600 transition-colors">
              Login
            </router-link>
            <router-link to="/register" class="btn-primary text-sm">
              Sign Up
            </router-link>
          </template>

          <!-- User Menu -->
          <template v-else>
            <div class="relative">
              <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <span>👤</span>
                <span class="hidden md:inline">{{ authStore.user?.email }}</span>
              </button>
              
              <!-- Dropdown Menu -->
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <router-link 
                  to="/profile" 
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  Profile
                </router-link>
                <router-link 
                  to="/orders" 
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  My Orders
                </router-link>
                <button 
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </template>
        </div>
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
const showUserMenu = ref(false)

function handleLogout() {
  authStore.logout()
  showUserMenu.value = false
  router.push('/login')
}
</script>

