<template>
  <div :class="cardClasses">
    <!-- Header Slot -->
    <div v-if="$slots.header" class="card-header border-b border-gray-200 pb-4 mb-4">
      <slot name="header" />
    </div>
    
    <!-- Default Content -->
    <div class="card-content">
      <slot />
    </div>
    
    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="card-footer border-t border-gray-200 pt-4 mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  hover: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  }
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white rounded-lg shadow-md'
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const hoverClasses = props.hover ? 'hover:shadow-lg transition-shadow duration-200' : ''
  const clickableClasses = props.clickable ? 'cursor-pointer' : ''
  
  return [
    baseClasses,
    paddingClasses[props.padding],
    hoverClasses,
    clickableClasses
  ].join(' ')
})
</script>

