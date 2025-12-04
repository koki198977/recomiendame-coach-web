<script setup>
// Redirigir automáticamente al nuevo dashboard
await navigateTo('/dashboard')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Redirigiendo...</p>
    </div>
  </div>
</template>