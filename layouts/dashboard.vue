<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside
        class="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white px-7 py-10 space-y-12 shadow-sm"
      >
        <div>
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <img :src="logoUrl" alt="Recomiéndame Coach" class="h-12 w-auto" />
            <div>
              <p class="text-xs uppercase tracking-[0.35em] text-primary-500">
                Recomiéndame
              </p>
              <p class="text-xl font-semibold text-gray-900">Dashboard</p>
            </div>
          </NuxtLink>
        </div>

        <nav class="space-y-6 text-sm text-gray-600">
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.35em] text-gray-400">
              General
            </p>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/dashboard"
                  class="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-primary-50 hover:text-primary-600"
                  active-class="bg-primary-500 text-white hover:bg-primary-600 hover:text-white"
                  exact
                >
                  <span class="text-lg">🏠</span>
                  <span>Inicio</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/app/plan"
                  class="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-primary-50 hover:text-primary-600"
                  active-class="bg-primary-500 text-white hover:bg-primary-600 hover:text-white"
                >
                  <span class="text-lg">🍽</span>
                  <span>Plan semanal</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/app/progreso"
                  class="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-primary-50 hover:text-primary-600"
                  active-class="bg-primary-500 text-white hover:bg-primary-600 hover:text-white"
                >
                  <span class="text-lg">📊</span>
                  <span>Progreso</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/app/social"
                  class="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-primary-50 hover:text-primary-600"
                  active-class="bg-primary-500 text-white hover:bg-primary-600 hover:text-white"
                >
                  <span class="text-lg">👥</span>
                  <span>Comunidad</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/dashboard/app/perfil"
                  class="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-primary-50 hover:text-primary-600"
                  active-class="bg-primary-500 text-white hover:bg-primary-600 hover:text-white"
                >
                  <span class="text-lg">👤</span>
                  <span>Perfil</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Main content -->
      <div class="flex-1">
        <header
          class="border-b border-gray-200 bg-white px-6 py-6 shadow-sm"
        >
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.35em] text-primary-500">
                Recomiéndame Coach
              </p>
              <h1 class="text-3xl font-semibold tracking-tight text-gray-900">
                Panel de recomendaciones
              </h1>
              <p class="mt-2 text-sm text-gray-500">
                Gestiona tus planes personalizados, registra tus check-ins y conecta con la comunidad.
              </p>
            </div>

            <div class="flex flex-col-reverse gap-4 sm:flex-row sm:items-center">
              <div class="relative">
                <input
                  type="text"
                  placeholder="Busca dentro del dashboard..."
                  class="w-full rounded-full border border-gray-200 bg-white px-5 py-3 pr-12 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 sm:w-80"
                />
                <span class="absolute inset-y-0 right-4 flex items-center text-gray-400">
                  ⌕
                </span>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div
                  class="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 shadow-sm"
                >
                  <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 font-semibold text-white">
                    {{ userInitials }}
                  </span>
                  <span class="hidden sm:inline text-gray-700">{{ userEmail || 'Usuario' }}</span>
                </div>
                <button
                  class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-primary-600 transition hover:border-primary-200 hover:bg-primary-50"
                  @click="handleLogout"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </header>

        <main class="px-6 py-8">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useState } from '#imports'
import logoUrl from '~/assets/logo.png'
import { authService } from '~/services/auth'

const router = useRouter()
const authUser = useState('auth-user', () => authService.getCachedUser())

const userEmail = computed(() => authUser.value?.email || '')
const userInitials = computed(() => {
  const value = authUser.value
  const source = value?.name || value?.email || ''
  if (!source) return 'U'
  return source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('') || 'U'
})

const handleLogout = async () => {
  await authService.logout()
  authUser.value = null
  router.push('/login')
}

onMounted(() => {
  authUser.value = authService.getCachedUser()
})
</script>
