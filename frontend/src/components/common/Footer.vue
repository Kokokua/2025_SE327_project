<template>
  <footer class="bg-gray-800 text-white mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-lg font-bold mb-4">📚 Bookstore</h3>
          <p class="text-gray-400 text-sm">
            Your one-stop shop for all your favorite books. 
            SE327 Software Metrics Project.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-white transition-colors text-sm">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/books" class="text-gray-400 hover:text-white transition-colors text-sm">
                Browse Books
              </router-link>
            </li>
            <li>
              <router-link to="/cart" class="text-gray-400 hover:text-white transition-colors text-sm">
                Shopping Cart
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="text-lg font-bold mb-4">Customer Service</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/about" class="text-gray-400 hover:text-white transition-colors text-sm">
                About Us
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </router-link>
            </li>
            <li>
              <router-link to="/faq" class="text-gray-400 hover:text-white transition-colors text-sm">
                FAQ
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-bold mb-4">Contact Us</h3>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li>📧 info@bookstore.com</li>
            <li>📱 +66 XX XXX XXXX</li>
            <li>📍 Chiang Mai, Thailand</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        <p>&copy; {{ currentYear }} Bookstore. SE327 Term Project - All rights reserved.</p>
        <p class="mt-2">
          Built with 
          <span class="text-red-500">♥</span> 
          using Vue 3, NestJS, and PostgreSQL
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

