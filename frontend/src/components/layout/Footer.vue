<template>
  <footer class="bg-gray-800 text-white mt-auto">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Bookstore</h3>
          <p class="text-gray-400">Your one-stop shop for all your reading needs.</p>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-gray-400">
            <li><router-link to="/" class="hover:text-white">Home</router-link></li>
            <li><router-link to="/books" class="hover:text-white">Books</router-link></li>
            <li><router-link to="/cart" class="hover:text-white">Cart</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4">Contact</h3>
          <p class="text-gray-400">Email: info@bookstore.com</p>
          <p class="text-gray-400">Phone: +1 234 567 890</p>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ currentYear }} Bookstore. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

