<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Navbar />
    
    <main class="flex-1 container mx-auto px-4 py-8 max-w-7xl">
      <RouterView />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>
