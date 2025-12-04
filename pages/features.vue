<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl lg:text-6xl font-bold mb-6">
            Todas las Funcionalidades
          </h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Descubre todo lo que Recomiéndame Coach puede hacer por ti
          </p>
        </div>
      </div>
    </section>

    <!-- Onboarding & Perfil -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Inicio</span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 mt-2">
              Onboarding & Perfil
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Comienza tu viaje con un proceso de registro simple y completa tu perfil para obtener planes 100% personalizados.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <span class="text-primary-500 text-2xl mr-3">✓</span>
                <div>
                  <h3 class="font-semibold text-gray-900">Registro Rápido</h3>
                  <p class="text-gray-600">Email y contraseña, sin complicaciones</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 text-2xl mr-3">✓</span>
                <div>
                  <h3 class="font-semibold text-gray-900">Perfil Completo</h3>
                  <p class="text-gray-600">Edad, peso, altura, género, nivel de actividad y objetivos</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 text-2xl mr-3">✓</span>
                <div>
                  <h3 class="font-semibold text-gray-900">Edición Flexible</h3>
                  <p class="text-gray-600">Actualiza tu información cuando quieras</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <img 
                src="/assets/chapi-3d-promocionando.png" 
                alt="Chapi dándote la bienvenida"
                class="w-full h-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Home Dashboard -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <div class="bg-white rounded-3xl p-3 shadow-strong">
              <img 
                src="/screen1.jpeg" 
                alt="Pantalla Home"
                class="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="text-secondary-500 font-semibold text-sm uppercase tracking-wide">Dashboard</span>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 mt-2">
              Home - Tu Centro de Control
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Visualiza todo tu progreso del día en un solo lugar con acceso rápido a todas las funcionalidades.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <span class="text-secondary-500 text-2xl mr-3">📊</span>
                <div>
                  <h3 class="font-semibold text-gray-900">Resumen Diario</h3>
                  <p class="text-gray-600">Calorías consumidas vs objetivo, macros y comidas registradas</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 text-2xl mr-3">✅</span>
                <div>
                  <h3 class="font-semibold text-gray-900">Checkin Diario</h3>
                  <p class="text-gray-600">Registra peso, adherencia, nivel de hambre y notas</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 text-2xl mr-3">🤖</span>
                <div>
                  <h3 class="font-semibold text-gray-900">Chapi Bubble</h3>
                  <p class="text-gray-600">Asistente flotante con tips y motivación personalizada</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Mi Programa -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Nutrición</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            Mi Programa - Plan Nutricional IA
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Planes semanales personalizados generados por inteligencia artificial
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Generación Inteligente</h3>
            <p class="text-gray-600">
              La IA crea planes basados en tu perfil, preferencias alimentarias y nivel de actividad
            </p>
          </div>

          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">📅</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">7 Días Completos</h3>
            <p class="text-gray-600">
              Desayuno, almuerzo, cena y snacks con recetas detalladas, ingredientes y macros
            </p>
          </div>

          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">🔄</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Flexibilidad Total</h3>
            <p class="text-gray-600">
              Cambia comidas individuales o regenera días completos cuando quieras
            </p>
          </div>

          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">🛒</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Lista de Compras</h3>
            <p class="text-gray-600">
              Genera automáticamente tu lista semanal agrupada por categorías
            </p>
          </div>

          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">📸</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Registro Manual</h3>
            <p class="text-gray-600">
              Busca alimentos, escanea códigos de barras o toma fotos de tus comidas
            </p>
          </div>

          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">📆</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Navegación Semanal</h3>
            <p class="text-gray-600">
              Revisa semanas pasadas, actual y planifica las futuras
            </p>
          </div>
        </div>

        <div class="text-center">
          <div class="inline-block bg-white/10 backdrop-blur-sm rounded-3xl p-6">
            <img 
              src="/assets/chapi-3d-compras.png" 
              alt="Chapi con lista de compras"
              class="w-64 h-auto mx-auto drop-shadow-2xl rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Ejercicios -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-secondary-500 font-semibold text-sm uppercase tracking-wide">Fitness</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            Ejercicios - Rutinas Personalizadas
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Planes de entrenamiento adaptados a tu equipamiento y objetivos
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <ul class="space-y-6">
              <li class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl">📱</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Escaneo de Equipamiento</h3>
                  <p class="text-gray-600">Toma fotos de tu gym o casa para adaptar los ejercicios a lo que tienes disponible</p>
                </div>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Objetivos Personalizados</h3>
                  <p class="text-gray-600">Pérdida de peso, ganancia muscular o mantenimiento - tú eliges</p>
                </div>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl">📹</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Videos Integrados</h3>
                  <p class="text-gray-600">Búsqueda automática de videos de YouTube para cada ejercicio</p>
                </div>
              </li>
              <li class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl">📊</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Tracking de Progreso</h3>
                  <p class="text-gray-600">Registra series, repeticiones y peso para ver tu evolución</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <img 
                src="/assets/chapi-3d-ejercicio-3.png" 
                alt="Chapi ejercitándose"
                class="w-full h-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Red Social -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Comunidad</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            Red Social - Motivación Comunitaria
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Comparte, inspírate y conecta con personas que comparten tus objetivos
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Feed Personalizado</h3>
            <p class="text-gray-600 mb-4">
              Dos tipos de feed: "Todos" para descubrir y "Siguiendo" para tu círculo cercano
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>• Infinite scroll con paginación</li>
              <li>• Pull to refresh</li>
              <li>• Carga optimizada</li>
            </ul>
          </div>

          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">✍️</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Crear Posts</h3>
            <p class="text-gray-600 mb-4">
              Comparte tu progreso con texto e imágenes
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>• Hasta 500 caracteres</li>
              <li>• Fotos desde galería o cámara</li>
              <li>• Sugerencias de contenido</li>
            </ul>
          </div>

          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">❤️</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Interacciones</h3>
            <p class="text-gray-600 mb-4">
              Conecta con la comunidad de múltiples formas
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>• Likes en posts</li>
              <li>• Comentarios con respuestas anidadas</li>
              <li>• Notificaciones de interacciones</li>
            </ul>
          </div>

          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">👥</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Comunidad</h3>
            <p class="text-gray-600 mb-4">
              Encuentra y conecta con otros usuarios
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>• Buscar por nombre o email</li>
              <li>• Seguir/dejar de seguir</li>
              <li>• Ver perfiles y estadísticas</li>
            </ul>
          </div>
        </div>

        <div class="text-center">
          <div class="inline-block bg-white/10 backdrop-blur-sm rounded-3xl p-6">
            <img 
              src="/assets/chapi-3d-post.png" 
              alt="Chapi en redes sociales"
              class="w-64 h-auto mx-auto drop-shadow-2xl rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Progreso -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-secondary-500 font-semibold text-sm uppercase tracking-wide">Tracking</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            Progreso - Visualiza tu Transformación
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Métricas, gráficas y logros para mantenerte motivado
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">📈</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Gráficas de Evolución</h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Peso corporal (30 días)</li>
              <li>• Adherencia al plan</li>
              <li>• Nivel de hambre</li>
              <li>• Tendencias visuales</li>
            </ul>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">📸</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Comparación de Fotos</h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Fotos antes/después</li>
              <li>• Galería de progreso</li>
              <li>• Visualización lado a lado</li>
              <li>• Motivación visual</li>
            </ul>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-medium">
            <div class="text-4xl mb-4">📝</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Checkins Históricos</h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Historial completo</li>
              <li>• Notas personales</li>
              <li>• Métricas diarias</li>
              <li>• Análisis de patrones</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Logros -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Gamificación</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            Sistema de Logros 🏆
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Desbloquea trofeos y celebra cada hito en tu transformación
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 text-center shadow-medium">
            <div class="text-5xl mb-3">🎯</div>
            <h3 class="font-bold text-gray-900 mb-2">Primer Checkin</h3>
            <p class="text-sm text-gray-600">Comienza tu viaje</p>
          </div>

          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-6 text-center shadow-medium">
            <div class="text-5xl mb-3">🔥</div>
            <h3 class="font-bold text-gray-900 mb-2">7 Días Seguidos</h3>
            <p class="text-sm text-gray-600">Consistencia semanal</p>
          </div>

          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 text-center shadow-medium">
            <div class="text-5xl mb-3">💪</div>
            <h3 class="font-bold text-gray-900 mb-2">30 Días Seguidos</h3>
            <p class="text-sm text-gray-600">Hábito formado</p>
          </div>

          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-6 text-center shadow-medium">
            <div class="text-5xl mb-3">🍽️</div>
            <h3 class="font-bold text-gray-900 mb-2">Primera Comida</h3>
            <p class="text-sm text-gray-600">Registro inicial</p>
          </div>

          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 text-center shadow-medium">
            <div class="text-5xl mb-3">🎖️</div>
            <h3 class="font-bold text-gray-900 mb-2">50 Comidas</h3>
            <p class="text-sm text-gray-600">Tracking experto</p>
          </div>

          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-6 text-center shadow-medium">
            <div class="text-5xl mb-3">✍️</div>
            <h3 class="font-bold text-gray-900 mb-2">Primer Post</h3>
            <p class="text-sm text-gray-600">Comparte tu historia</p>
          </div>

          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 text-center shadow-medium">
            <div class="text-5xl mb-3">📱</div>
            <h3 class="font-bold text-gray-900 mb-2">10 Posts</h3>
            <p class="text-sm text-gray-600">Influencer activo</p>
          </div>

          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-6 text-center shadow-medium">
            <div class="text-5xl mb-3">❤️</div>
            <h3 class="font-bold text-gray-900 mb-2">100 Likes</h3>
            <p class="text-sm text-gray-600">Comunidad te apoya</p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <img 
            src="/assets/chapi-3d-ejercicio-2.png" 
            alt="Chapi celebrando"
            class="w-64 h-auto mx-auto drop-shadow-2xl"
          />
          <p class="text-gray-600 mt-6">
            Cada logro desbloqueado viene con una celebración animada de Chapi
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-20 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-5xl font-bold mb-6">
          ¿Listo para comenzar?
        </h2>
        <p class="text-xl mb-8 text-primary-100">
          Descarga Recomiéndame Coach y accede a todas estas funcionalidades
        </p>
        <NuxtLink
          to="/download"
          class="btn-primary bg-white text-primary-600 hover:bg-gray-50 text-lg px-10 py-5 shadow-strong inline-block"
        >
          📱 Descargar Gratis Ahora
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "Funcionalidades - Recomiéndame Coach",
  meta: [
    {
      name: "description",
      content:
        "Descubre todas las funcionalidades de Recomiéndame Coach: planes nutricionales IA, rutinas de ejercicio, red social, tracking de progreso, logros y más.",
    },
  ],
});
</script>
