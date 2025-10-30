<template>
  <div class="max-w-md mx-auto">
    <div class="card">
      <h2 class="text-3xl font-bold mb-6 text-center">Register</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            v-model="email" 
            type="email" 
            required 
            class="input-field"
            placeholder="your@email.com"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            minlength="6"
            class="input-field"
            placeholder="••••••••"
          >
          <p class="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input 
            v-model="confirmPassword" 
            type="password" 
            required 
            class="input-field"
            placeholder="••••••••"
          >
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm">
          {{ errorMessage }}
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Registering...</span>
          <span v-else">Register</span>
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account? 
        <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-medium">
          Login here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  errorMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  loading.value = true

  const result = await authStore.register(email.value, password.value)

  if (result.success) {
    router.push('/')
  } else {
    errorMessage.value = result.error
  }

  loading.value = false
}
</script>

