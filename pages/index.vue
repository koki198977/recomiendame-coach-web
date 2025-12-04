<template>
  <div>
    <!-- Hero Section con Chapi -->
    <section
      class="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white overflow-hidden"
    >
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="text-center lg:text-left z-10">
            <div class="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span class="text-sm font-semibold">🎯 Coaching Nutricional + Fitness + Red Social</span>
            </div>
            <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforma tu vida con
              <span class="block text-secondary-300 mt-2"
                >Recomiéndame Coach</span
              >
            </h1>
            <p
              class="text-lg lg:text-xl mb-8 text-primary-100 leading-relaxed"
            >
              Tu coach personal con IA que crea planes nutricionales y de ejercicio 100% personalizados. 
              Únete a una comunidad motivadora y alcanza tus objetivos con Chapi, tu compañero 3D.
            </p>
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <NuxtLink
                to="/download"
                class="btn-primary bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4 shadow-strong"
              >
                📱 Descargar Gratis
              </NuxtLink>
              <NuxtLink
                to="#features"
                class="flex items-center justify-center rounded-xl border-2 border-white/70 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-primary-600"
              >
                ✨ Ver Funcionalidades
              </NuxtLink>
            </div>
            
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div>
                <div class="text-3xl font-bold">100%</div>
                <div class="text-sm text-primary-200">Personalizado</div>
              </div>
              <div>
                <div class="text-3xl font-bold">24/7</div>
                <div class="text-sm text-primary-200">Con IA</div>
              </div>
              <div>
                <div class="text-3xl font-bold">∞</div>
                <div class="text-sm text-primary-200">Comunidad</div>
              </div>
            </div>
          </div>

          <!-- Chapi Hero Image -->
          <div class="relative z-10">
            <div class="relative max-w-md mx-auto">
              <img 
                src="/assets/chapi-3d-promocionando.png" 
                alt="Chapi - Tu coach personal"
                class="w-full h-auto drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Funcionalidades</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            Todo lo que necesitas en una app
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Coaching nutricional, planes de ejercicio, red social y mucho más
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1: Plan Nutricional -->
          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all duration-300 border border-primary-100">
            <div class="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-medium">
              <span class="text-3xl">🍽️</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Plan Nutricional IA
            </h3>
            <p class="text-gray-600 mb-4">
              Planes semanales personalizados con recetas detalladas, macros calculados y lista de compras automática.
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>7 días de comidas completas</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Cambiar comidas individuales</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Lista de compras inteligente</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Registro manual con escaneo</span>
              </li>
            </ul>
          </div>

          <!-- Feature 2: Ejercicios -->
          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all duration-300 border border-secondary-100">
            <div class="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center mb-6 shadow-medium">
              <span class="text-3xl">💪</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Rutinas de Ejercicio
            </h3>
            <p class="text-gray-600 mb-4">
              Planes de entrenamiento adaptados a tu equipamiento y objetivos con videos instructivos.
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Escaneo de equipamiento</span>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Videos de YouTube integrados</span>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Tracking de series y peso</span>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Planes de 1-7 días/semana</span>
              </li>
            </ul>
          </div>

          <!-- Feature 3: Red Social -->
          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all duration-300 border border-primary-100">
            <div class="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-medium">
              <span class="text-3xl">👥</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Red Social Motivadora
            </h3>
            <p class="text-gray-600 mb-4">
              Comparte tu progreso, inspírate con otros y construye una comunidad de apoyo.
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Posts con fotos y texto</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Likes y comentarios</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Seguir usuarios</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Feed personalizado</span>
              </li>
            </ul>
          </div>

          <!-- Feature 4: Progreso -->
          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all duration-300 border border-secondary-100">
            <div class="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center mb-6 shadow-medium">
              <span class="text-3xl">📊</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Tracking Completo
            </h3>
            <p class="text-gray-600 mb-4">
              Visualiza tu evolución con gráficas, métricas y comparación de fotos.
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Gráficas de peso y adherencia</span>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Checkin diario</span>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Fotos antes/después</span>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Historial de 30 días</span>
              </li>
            </ul>
          </div>

          <!-- Feature 5: Logros -->
          <div class="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all duration-300 border border-primary-100">
            <div class="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6 shadow-medium">
              <span class="text-3xl">🏆</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Sistema de Logros
            </h3>
            <p class="text-gray-600 mb-4">
              Desbloquea trofeos y celebra cada hito en tu transformación.
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Trofeos por consistencia</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Logros sociales</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Celebraciones animadas</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-500 mr-2">✓</span>
                <span>Galería de trofeos</span>
              </li>
            </ul>
          </div>

          <!-- Feature 6: Chapi -->
          <div class="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 shadow-medium hover:shadow-strong transition-all duration-300 border border-secondary-100">
            <div class="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center mb-6 shadow-medium">
              <span class="text-3xl">🤖</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Chapi, tu Compañero
            </h3>
            <p class="text-gray-600 mb-4">
              Un asistente 3D que te acompaña, motiva y guía en cada paso del camino.
            </p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Tips personalizados</span>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Motivación diaria</span>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Asistente flotante</span>
              </li>
              <li class="flex items-start">
                <span class="text-secondary-500 mr-2">✓</span>
                <span>Celebra tus logros</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Proceso</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            ¿Cómo funciona?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Comienza tu transformación en 3 pasos simples
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <!-- Step 1 -->
          <div class="relative">
            <div class="text-center">
              <div
                class="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-strong transform hover:scale-110 transition-transform duration-300"
              >
                <span class="text-white font-bold text-3xl">1</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                Completa tu Perfil
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Cuéntanos sobre tus objetivos, preferencias alimentarias, nivel de actividad y estilo de vida. Chapi te guiará en el proceso.
              </p>
            </div>
            <!-- Connector line -->
            <div class="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-primary-300 to-secondary-300 -translate-x-1/2"></div>
          </div>

          <!-- Step 2 -->
          <div class="relative">
            <div class="text-center">
              <div
                class="w-24 h-24 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-strong transform hover:scale-110 transition-transform duration-300"
              >
                <span class="text-white font-bold text-3xl">2</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                IA Crea tu Plan
              </h3>
              <p class="text-gray-600 leading-relaxed">
                Nuestra inteligencia artificial genera planes nutricionales y de ejercicio 100% personalizados para ti en segundos.
              </p>
            </div>
            <!-- Connector line -->
            <div class="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-secondary-300 to-primary-300 -translate-x-1/2"></div>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div
              class="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-strong transform hover:scale-110 transition-transform duration-300"
            >
              <span class="text-white font-bold text-3xl">3</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Sigue y Progresa
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Registra tu progreso diario, comparte en la comunidad y ve cómo alcanzas tus objetivos con el apoyo de Chapi.
            </p>
          </div>
        </div>

        <!-- Chapi Image -->
        <div class="mt-16 text-center">
          <img 
            src="/assets/chapi-3d-ejercicio-2.png" 
            alt="Chapi motivándote"
            class="w-64 h-auto mx-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </section>

    <!-- Chapi Showcase Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Conoce a Chapi</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            Tu compañero en cada momento
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Chapi es más que una mascota, es tu motivador personal que te acompaña en cada paso
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Chapi Compras -->
          <div class="group">
            <div class="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-6 shadow-medium hover:shadow-strong transition-all duration-300 border border-primary-100">
              <img 
                src="/assets/chapi-3d-compras.png" 
                alt="Chapi ayudándote con las compras"
                class="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p class="text-center text-gray-900 font-semibold mt-4">Lista de Compras</p>
            <p class="text-center text-gray-600 text-sm">Te ayuda a organizar tus ingredientes</p>
          </div>

          <!-- Chapi Ejercicio -->
          <div class="group">
            <div class="bg-gradient-to-br from-secondary-50 to-white rounded-3xl p-6 shadow-medium hover:shadow-strong transition-all duration-300 border border-secondary-100">
              <img 
                src="/assets/chapi-3d-ejercicio-3.png" 
                alt="Chapi motivándote a ejercitarte"
                class="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p class="text-center text-gray-900 font-semibold mt-4">Rutinas de Ejercicio</p>
            <p class="text-center text-gray-600 text-sm">Te motiva en cada entrenamiento</p>
          </div>

          <!-- Chapi Foto Alimento -->
          <div class="group">
            <div class="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-6 shadow-medium hover:shadow-strong transition-all duration-300 border border-primary-100">
              <img 
                src="/assets/chapi-3d-foto-alimento.png" 
                alt="Chapi escaneando alimentos"
                class="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p class="text-center text-gray-900 font-semibold mt-4">Escaneo de Alimentos</p>
            <p class="text-center text-gray-600 text-sm">Registra comidas con fotos</p>
          </div>

          <!-- Chapi Post -->
          <div class="group">
            <div class="bg-gradient-to-br from-secondary-50 to-white rounded-3xl p-6 shadow-medium hover:shadow-strong transition-all duration-300 border border-secondary-100">
              <img 
                src="/assets/chapi-3d-post.png" 
                alt="Chapi en la red social"
                class="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p class="text-center text-gray-900 font-semibold mt-4">Red Social</p>
            <p class="text-center text-gray-600 text-sm">Comparte tu progreso</p>
          </div>
        </div>
      </div>
    </section>

    <!-- App Screenshots Gallery -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Interfaz</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
            Descubre la App
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Una interfaz intuitiva diseñada para hacer tu experiencia simple y efectiva
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <!-- Screenshot 1 -->
          <div class="group">
            <div class="bg-white rounded-2xl p-3 shadow-medium hover:shadow-strong transition-shadow duration-300">
              <img 
                src="/screen1.jpeg" 
                alt="Pantalla de inicio"
                class="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p class="text-center text-gray-600 mt-3 font-medium text-sm">Home</p>
          </div>

          <!-- Screenshot 2 -->
          <div class="group">
            <div class="bg-white rounded-2xl p-3 shadow-medium hover:shadow-strong transition-shadow duration-300">
              <img 
                src="/screen2.jpeg" 
                alt="Plan nutricional"
                class="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p class="text-center text-gray-600 mt-3 font-medium text-sm">Mi Programa</p>
          </div>

          <!-- Screenshot 3 -->
          <div class="group">
            <div class="bg-white rounded-2xl p-3 shadow-medium hover:shadow-strong transition-shadow duration-300">
              <img 
                src="/screen3.jpeg" 
                alt="Ejercicios"
                class="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p class="text-center text-gray-600 mt-3 font-medium text-sm">Ejercicios</p>
          </div>

          <!-- Screenshot 4 -->
          <div class="group">
            <div class="bg-white rounded-2xl p-3 shadow-medium hover:shadow-strong transition-shadow duration-300">
              <img 
                src="/screen4.jpeg" 
                alt="Red social"
                class="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p class="text-center text-gray-600 mt-3 font-medium text-sm">Social</p>
          </div>

          <!-- Screenshot 5 -->
          <div class="group">
            <div class="bg-white rounded-2xl p-3 shadow-medium hover:shadow-strong transition-shadow duration-300">
              <img 
                src="/screen5.jpeg" 
                alt="Perfil de usuario"
                class="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p class="text-center text-gray-600 mt-3 font-medium text-sm">Perfil</p>
          </div>
        </div>

        <!-- Call to action -->
        <div class="text-center mt-12">
          <NuxtLink
            to="/download"
            class="btn-primary text-lg px-8 py-4 shadow-strong"
          >
            📱 Prueba la App Gratis
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Image -->
          <div class="order-2 lg:order-1">
            <img 
              src="/assets/chapi-3d-ejercicio-2.png" 
              alt="Chapi celebrando tus logros"
              class="w-full h-auto drop-shadow-2xl"
            />
          </div>

          <!-- Content -->
          <div class="order-1 lg:order-2">
            <span class="text-primary-500 font-semibold text-sm uppercase tracking-wide">Beneficios</span>
            <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 mt-2">
              ¿Por qué Recomiéndame Coach?
            </h2>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">100% Personalizado</h3>
                  <p class="text-gray-600">Planes adaptados a tu edad, peso, objetivos y preferencias. No hay dos planes iguales.</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Inteligencia Artificial</h3>
                  <p class="text-gray-600">Generación automática de planes nutricionales y de ejercicio en segundos.</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl">👥</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Comunidad Motivadora</h3>
                  <p class="text-gray-600">Red social integrada para compartir progreso, inspirarte y recibir apoyo.</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl">📊</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Tracking Completo</h3>
                  <p class="text-gray-600">Gráficas, métricas, fotos y logros para visualizar tu transformación.</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl">🔄</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Flexibilidad Total</h3>
                  <p class="text-gray-600">Cambia comidas, regenera días, ajusta tu plan cuando quieras.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials / Stats Section -->
    <section class="py-20 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-bold mb-6">
            Únete a la comunidad
          </h2>
          <p class="text-xl text-primary-100">
            Miles de personas ya están transformando su vida
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-5xl font-bold mb-2">10K+</div>
            <div class="text-primary-100">Usuarios Activos</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold mb-2">50K+</div>
            <div class="text-primary-100">Planes Generados</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold mb-2">100K+</div>
            <div class="text-primary-100">Comidas Registradas</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold mb-2">25K+</div>
            <div class="text-primary-100">Posts Compartidos</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-12 shadow-strong text-white">
          <img 
            src="/assets/chapi-3d-promocionando.png" 
            alt="Chapi te invita"
            class="w-48 h-auto mx-auto mb-8 drop-shadow-2xl"
          />
          <h2 class="text-3xl lg:text-5xl font-bold mb-6">
            ¿Listo para transformar tu vida?
          </h2>
          <p class="text-xl mb-8 text-primary-100">
            Descarga Recomiéndame Coach y comienza tu viaje hacia una vida más saludable con Chapi a tu lado
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/download"
              class="btn-primary bg-white text-primary-600 hover:bg-gray-50 text-lg px-10 py-5 shadow-strong"
            >
              📱 Descargar Gratis Ahora
            </NuxtLink>
          </div>
          <p class="text-sm text-primary-200 mt-6">
            ✓ Gratis para siempre  ✓ Sin tarjeta de crédito  ✓ Disponible en iOS y Android
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "Recomiéndame Coach - Coaching Nutricional y Fitness con IA + Red Social",
  meta: [
    {
      name: "description",
      content:
        "App de coaching nutricional y fitness con IA. Planes personalizados, rutinas de ejercicio, red social motivadora y Chapi, tu compañero 3D. Transforma tu vida hoy.",
    },
    {
      name: "keywords",
      content:
        "coach nutricional, plan nutricional, ejercicios, fitness, IA, inteligencia artificial, red social fitness, dieta personalizada, Chapi, tracking progreso",
    },
    {
      property: "og:title",
      content: "Recomiéndame Coach - Tu Coach Personal con IA",
    },
    {
      property: "og:description",
      content:
        "Planes nutricionales y de ejercicio 100% personalizados con IA. Únete a la comunidad y alcanza tus objetivos con Chapi.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>
