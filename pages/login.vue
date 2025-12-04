<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-3xl shadow-soft p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-medium">
            <span class="text-white text-2xl">🔐</span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p class="mt-2 text-gray-600">
            Ingresa tus credenciales para acceder a Recomiéndame Coach
          </p>
        </div>

        <!-- Formulario de login -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div class="flex items-center justify-between text-sm">
            <NuxtLink to="/request-reset-password" class="font-medium text-primary-500 hover:text-primary-600 transition">
              ¿Olvidaste tu contraseña?
            </NuxtLink>
            <NuxtLink to="/download" class="text-gray-500 hover:text-gray-700 transition">
              Descarga la app
            </NuxtLink>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary flex items-center justify-center"
          >
            <span v-if="loading" class="mr-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Iniciando sesión...' : 'Entrar' }}
          </button>
        </form>

        <!-- Mensajes de estado -->
        <div v-if="success" class="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-xl text-primary-700">
          <div class="flex items-center gap-2">
            <span>✅</span>
            <p>{{ successMessage }}</p>
          </div>
          <p v-if="hasTokens" class="mt-2 text-sm text-primary-600">
            Tus tokens de autenticación han sido guardados en el navegador.
          </p>
        </div>

        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <div class="flex items-center gap-2">
            <span>❌</span>
            <p>{{ error }}</p>
          </div>
        </div>

        <!-- Back to Home -->
        <div class="mt-10 text-center text-sm">
          <NuxtLink to="/" class="text-primary-500 hover:text-primary-600 font-medium">
            ← Volver al inicio
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useState } from '#imports'
import { authService } from '~/services/auth'
import { setUserData } from '~/utils/storage'
definePageMeta({
  middleware: 'guest'
})

useHead({
  title: 'Iniciar Sesión - Recomiéndame Coach',
  meta: [
    { name: 'description', content: 'Inicia sesión en Recomiéndame Coach ingresando tu correo y contraseña.' }
  ]
})

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const success = ref(false)
const successMessage = ref('')
const hasTokens = ref(false)
const error = ref('')

const authUser = useState('auth-user', () => authService.getCachedUser())

const extractToken = (payload, candidates) => {
  for (const path of candidates) {
    const value = path.split('.').reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return acc[key]
      }
      return undefined
    }, payload)

    if (typeof value === 'string' && value.trim().length > 0) {
      return value
    }
  }
  return ''
}

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor ingresa tu correo electrónico y contraseña.'
    return
  }

  loading.value = true
  success.value = false
  error.value = ''
  successMessage.value = ''
  hasTokens.value = false

  try {
    const response = await $fetch('https://api-coach.recomiendameapp.cl/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: email.value,
        password: password.value
      }
    })

    const accessToken = extractToken(response, [
      'accessToken',
      'access_token',
      'token',
      'token.accessToken',
      'token.access_token',
      'data.accessToken',
      'data.access_token',
      'data.token',
      'data.token.accessToken',
      'data.token.access_token',
      'tokens.accessToken',
      'tokens.access_token',
      'data.tokens.accessToken',
      'data.tokens.access_token',
      'jwt',
      'data.jwt'
    ])

    const refreshToken = extractToken(response, [
      'refreshToken',
      'refresh_token',
      'token.refreshToken',
      'token.refresh_token',
      'data.refreshToken',
      'data.refresh_token',
      'data.token.refreshToken',
      'data.token.refresh_token',
      'tokens.refreshToken',
      'tokens.refresh_token',
      'data.tokens.refreshToken',
      'data.tokens.refresh_token'
    ])

    if (process.client) {
      if (accessToken) {
        localStorage.setItem('recomiendame_access_token', accessToken)
      }

      if (refreshToken) {
        localStorage.setItem('recomiendame_refresh_token', refreshToken)
      }

      hasTokens.value = Boolean(accessToken || refreshToken)

      if (!accessToken) {
        throw new Error('No se recibió un token de acceso válido.')
      }

      authUser.value = {
        email: email.value,
        name: email.value.split('@')[0] ?? email.value
      }

      setUserData(authUser.value)

      success.value = true
      successMessage.value = response?.message || 'Inicio de sesión exitoso.'

      email.value = ''
      password.value = ''

      // Redirige al dashboard una vez guardados los tokens
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    }
  } catch (err) {
    console.error('Error al iniciar sesión:', err)

    const status = err?.status
    const messageFromApi = err?.data?.message || err?.statusMessage || err?.message

    if (status === 401 || status === 403) {
      error.value = 'Credenciales incorrectas. Revisa tu correo y contraseña.'
    } else if (status === 400) {
      error.value = 'Datos inválidos. Verifica la información ingresada.'
    } else if (messageFromApi) {
      error.value = messageFromApi
    } else {
      error.value = 'Hubo un problema al iniciar sesión. Intenta nuevamente en unos minutos.'
    }
  } finally {
    loading.value = false
  }
}
</script>
