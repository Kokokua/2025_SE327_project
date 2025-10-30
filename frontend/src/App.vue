<template>
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    
    <main class="flex-1 container mx-auto px-4 py-8">
      <RouterView />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'
</script>

