<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-4xl lg:text-6xl font-bold mb-6">
              Descarga Recomiéndame Coach
            </h1>
            <p class="text-xl lg:text-2xl mb-8 text-primary-100">
              Disponible gratis para iOS y Android. Comienza tu transformación hoy con Chapi a tu lado.
            </p>
            
            <!-- Download Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#" class="flex items-center justify-center bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition-colors shadow-strong">
                <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div class="text-left">
                  <div class="text-xs">Descargar en</div>
                  <div class="text-lg font-semibold">App Store</div>
                </div>
              </a>
              
              <a href="#" class="flex items-center justify-center bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition-colors shadow-strong">
                <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div class="text-left">
                  <div class="text-xs">Disponible en</div>
                  <div class="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>

            <p class="text-sm text-primary-200 mt-6">
              ✓ Gratis para siempre  ✓ Sin tarjeta de crédito  ✓ Más de 10,000 usuarios
            </p>
          </div>

          <div>
            <img 
              src="/assets/chapi-3d-promocionando.png" 
              alt="Chapi te invita a descargar"
              class="w-full h-auto drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Preview -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Funcionalidades</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            Todo lo que necesitas en una app
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre todas las funciones que te ayudarán a transformar tu vida
          </p>
        </div>

        <!-- App Screenshots Grid con Chapi -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div class="text-center">
            <div class="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-6 mb-4 shadow-medium hover:shadow-strong transition-all duration-300">
              <img 
                src="/assets/chapi-3d-compras.png" 
                alt="Plan Nutricional"
                class="w-full h-64 object-contain"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Plan Nutricional IA</h3>
            <p class="text-gray-600">Planes semanales personalizados con lista de compras</p>
          </div>

          <div class="text-center">
            <div class="bg-gradient-to-br from-secondary-50 to-white rounded-3xl p-6 mb-4 shadow-medium hover:shadow-strong transition-all duration-300">
              <img 
                src="/assets/chapi-3d-ejercicio-3.png" 
                alt="Rutinas de Ejercicio"
                class="w-full h-64 object-contain"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Rutinas de Ejercicio</h3>
            <p class="text-gray-600">Entrenamientos adaptados a tu equipamiento</p>
          </div>

          <div class="text-center">
            <div class="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-6 mb-4 shadow-medium hover:shadow-strong transition-all duration-300">
              <img 
                src="/assets/chapi-3d-post.png" 
                alt="Red Social"
                class="w-full h-64 object-contain"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Red Social</h3>
            <p class="text-gray-600">Comparte progreso y conecta con la comunidad</p>
          </div>

          <div class="text-center">
            <div class="bg-gradient-to-br from-secondary-50 to-white rounded-3xl p-6 mb-4 shadow-medium hover:shadow-strong transition-all duration-300">
              <img 
                src="/assets/chapi-3d-foto-alimento.png" 
                alt="Tracking de Progreso"
                class="w-full h-64 object-contain"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Tracking Completo</h3>
            <p class="text-gray-600">Escanea alimentos y visualiza tu evolución</p>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink to="/features" class="btn-primary text-lg px-8 py-4">
            Ver Todas las Funcionalidades →
          </NuxtLink>
        </div>

        <!-- System Requirements -->
        <div class="bg-gray-50 rounded-3xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Requisitos del Sistema</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 mb-2">iOS</h4>
              <ul class="text-gray-600 space-y-1">
                <li>iOS 14.0 o superior</li>
                <li>iPhone 7 o más reciente</li>
                <li>100 MB de espacio libre</li>
              </ul>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 mb-2">Android</h4>
              <ul class="text-gray-600 space-y-1">
                <li>Android 8.0 (API 26) o superior</li>
                <li>2 GB de RAM mínimo</li>
                <li>100 MB de espacio libre</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Preguntas Frecuentes
          </h2>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-soft">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¿La app es gratuita?</h3>
            <p class="text-gray-600">
              Sí, Recomiéndame Coach es completamente gratuita. Puedes acceder a todas las funciones básicas sin costo alguno.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-soft">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¿Necesito conexión a internet?</h3>
            <p class="text-gray-600">
              Necesitas conexión para generar planes con IA y usar las funciones sociales, pero puedes ver tus planes guardados sin conexión.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-soft">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¿Mis datos están seguros?</h3>
            <p class="text-gray-600">
              Absolutamente. Utilizamos encriptación de extremo a extremo y nunca compartimos tu información personal con terceros.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-soft">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">¿Puedo usar la app sin crear una cuenta?</h3>
            <p class="text-gray-600">
              Para acceder a todas las funciones, incluyendo los planes personalizados con IA, necesitas crear una cuenta gratuita.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 bg-primary-500 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-5xl font-bold mb-6">
          ¡Comienza tu transformación hoy!
        </h2>
        <p class="text-xl mb-8 text-primary-100">
          Únete a miles de personas que ya están alcanzando sus objetivos
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <a href="#" class="flex items-center justify-center bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-colors shadow-medium">
            <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </a>
          
          <a href="#" class="flex items-center justify-center bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-colors shadow-medium">
            <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            Google Play
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Descargar App - Recomiéndame Coach',
  meta: [
    { name: 'description', content: 'Descarga gratis Recomiéndame Coach para iOS y Android. Tu coach nutricional con inteligencia artificial disponible en App Store y Google Play.' }
  ]
})
</script>