<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full text-center">
      <div class="bg-white rounded-3xl shadow-lg p-8">
        <!-- Error Icon -->
        <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span class="text-red-500 text-2xl">⚠️</span>
        </div>
        
        <!-- Error Message -->
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Página no encontrada
        </h1>
        
        <p class="text-gray-600 mb-6">
          La página que buscas no existe o ha sido movida.
        </p>
        
        <!-- Actions -->
        <div class="space-y-3">
          <NuxtLink
            to="/"
            class="block w-full bg-primary-500 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-primary-600 transition"
          >
            Ir al inicio
          </NuxtLink>
          
          <button
            @click="$router.back()"
            class="w-full border border-gray-300 rounded-xl px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            ← Volver atrás
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Configurar el título de la página
useHead({
  title: 'Página no encontrada - Recomiéndame Coach'
})
</script>