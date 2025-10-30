<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      
      <!-- Icon Slot -->
      <div v-if="$slots.icon" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <slot name="icon" />
      </div>
    </div>
    
    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
    
    <!-- Helper Text -->
    <p v-else-if="helper" class="mt-1 text-sm text-gray-500">
      {{ helper }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  helper: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue', 'blur', 'focus'])

const inputClasses = computed(() => {
  const baseClasses = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all'
  const errorClasses = props.error 
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-300 focus:ring-primary-500 focus:border-transparent'
  const disabledClasses = props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
  
  return [baseClasses, errorClasses, disabledClasses].join(' ')
})
</script>

