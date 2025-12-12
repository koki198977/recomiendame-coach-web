<template>
  <div class="space-y-8">
    <!-- Header -->
    <section class="rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-primary-500">
            Mi perfil
          </p>
          <h1 class="mt-3 text-3xl font-semibold text-gray-900">
            Configuración de cuenta
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Gestiona tu información personal y preferencias
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-primary-200 hover:text-primary-600"
            @click="loadUserData"
          >
            🔄 Actualizar
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-red-600"
            @click="handleLogout"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </section>

    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 text-gray-500">
      <span class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-400"></span>
      <p class="mt-6 text-sm">Cargando perfil...</p>
    </div>

    <!-- Error state -->
    <section v-if="error" class="rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700">
      <div class="flex items-start gap-3">
        <span class="mt-0.5 text-lg">⚠️</span>
        <div>
          <p class="font-medium">Error al cargar el perfil</p>
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
        <button class="ml-auto text-sm underline" @click="error = ''">
          Ocultar
        </button>
      </div>
    </section>

    <!-- Profile content -->
    <div v-if="!loading" class="space-y-8">
      <!-- Profile Info -->
      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div class="flex flex-col items-center text-center">
          <div class="h-20 w-20 rounded-full bg-primary-500 flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-white">
              {{ userInitials }}
            </span>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">{{ user?.name || 'Usuario' }}</h2>
          <p class="text-gray-600">{{ user?.email }}</p>
        </div>
      </section>

      <!-- Social Stats -->
      <section v-if="socialProfile" class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Red Social</h2>
        
        <div class="grid gap-6 md:grid-cols-3">
          <div class="flex items-center gap-4 p-4 rounded-xl bg-blue-50">
            <span class="text-2xl">📝</span>
            <div>
              <p class="text-2xl font-bold text-blue-600">{{ socialProfile.postsCount || 0 }}</p>
              <p class="text-sm text-blue-700">Mis posts</p>
            </div>
          </div>
          
          <button
            class="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition text-left"
            @click="showFollowersModal = true"
          >
            <span class="text-2xl">👥</span>
            <div>
              <p class="text-2xl font-bold text-green-600">{{ socialProfile.followersCount || 0 }}</p>
              <p class="text-sm text-green-700">Seguidores</p>
            </div>
            <span class="ml-auto text-green-600">›</span>
          </button>
          
          <button
            class="flex items-center gap-4 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition text-left"
            @click="showFollowingModal = true"
          >
            <span class="text-2xl">👤</span>
            <div>
              <p class="text-2xl font-bold text-purple-600">{{ socialProfile.followingCount || 0 }}</p>
              <p class="text-sm text-purple-700">Siguiendo</p>
            </div>
            <span class="ml-auto text-purple-600">›</span>
          </button>
        </div>
      </section>

      <!-- Health Data -->
      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Datos de Salud</h2>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50">
            <div class="flex items-center gap-3">
              <span class="text-xl">⚖️</span>
              <span class="font-medium text-gray-900">Peso actual</span>
            </div>
            <span class="font-semibold text-primary-600">
              {{ userProfile?.weightKg ? `${userProfile.weightKg} kg` : 'No especificado' }}
            </span>
          </div>
          
          <div class="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50">
            <div class="flex items-center gap-3">
              <span class="text-xl">📏</span>
              <span class="font-medium text-gray-900">Estatura</span>
            </div>
            <span class="font-semibold text-primary-600">
              {{ userProfile?.heightCm ? `${userProfile.heightCm} cm` : 'No especificado' }}
            </span>
          </div>
          
          <div class="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50">
            <div class="flex items-center gap-3">
              <span class="text-xl">👤</span>
              <span class="font-medium text-gray-900">Género</span>
            </div>
            <span class="font-semibold text-primary-600">
              {{ getGenderLabel(userProfile?.sex) }}
            </span>
          </div>
          
          <div class="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50">
            <div class="flex items-center gap-3">
              <span class="text-xl">🏃</span>
              <span class="font-medium text-gray-900">Actividad física</span>
            </div>
            <span class="font-semibold text-primary-600">
              {{ getActivityLevelLabel(userProfile?.activityLevel) }}
            </span>
          </div>
          
          <button
            class="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-left"
            @click="showPreferencesModal('allergies')"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">🚫</span>
              <span class="font-medium text-gray-900">Alergias</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-primary-600">
                {{ userProfile?.allergies?.length > 0 ? `${userProfile.allergies.length} registradas` : 'Ninguna' }}
              </span>
              <span class="text-gray-400">›</span>
            </div>
          </button>
          
          <button
            class="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-left"
            @click="showPreferencesModal('conditions')"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">🏥</span>
              <span class="font-medium text-gray-900">Condiciones médicas</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-primary-600">
                {{ userProfile?.conditions?.length > 0 ? `${userProfile.conditions.length} registradas` : 'Ninguna' }}
              </span>
              <span class="text-gray-400">›</span>
            </div>
          </button>
        </div>
      </section>

      <!-- Culinary Preferences -->
      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Preferencias Culinarias</h2>
        
        <div class="space-y-4">
          <button
            class="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-left"
            @click="showPreferencesModal('cuisinesLike')"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">❤️</span>
              <span class="font-medium text-gray-900">Cocinas favoritas</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-primary-600">
                {{ userProfile?.cuisinesLike?.length > 0 ? `${userProfile.cuisinesLike.length} seleccionadas` : 'No especificadas' }}
              </span>
              <span class="text-gray-400">›</span>
            </div>
          </button>
          
          <button
            class="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-left"
            @click="showPreferencesModal('cuisinesDislike')"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">❌</span>
              <span class="font-medium text-gray-900">Cocinas evitadas</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-primary-600">
                {{ userProfile?.cuisinesDislike?.length > 0 ? `${userProfile.cuisinesDislike.length} seleccionadas` : 'Ninguna' }}
              </span>
              <span class="text-gray-400">›</span>
            </div>
          </button>
        </div>
      </section>

      <!-- Settings -->
      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Configuración</h2>
        
        <div class="space-y-4">
          <button class="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-left">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔔</span>
              <span class="font-medium text-gray-900">Notificaciones</span>
            </div>
            <span class="text-gray-400">›</span>
          </button>
          
          <button class="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-left">
            <div class="flex items-center gap-3">
              <span class="text-xl">🌍</span>
              <span class="font-medium text-gray-900">Idioma</span>
            </div>
            <span class="text-gray-400">›</span>
          </button>
          
          <button class="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-left">
            <div class="flex items-center gap-3">
              <span class="text-xl">📊</span>
              <span class="font-medium text-gray-900">Unidades</span>
            </div>
            <span class="text-gray-400">›</span>
          </button>
        </div>
      </section>

      <!-- History -->
      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Historial</h2>
        
        <div class="space-y-4">
          <button class="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-left">
            <div class="flex items-center gap-3">
              <span class="text-xl">📋</span>
              <span class="font-medium text-gray-900">Planes guardados</span>
            </div>
            <span class="text-gray-400">›</span>
          </button>
          
          <button class="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-left">
            <div class="flex items-center gap-3">
              <span class="text-xl">📤</span>
              <span class="font-medium text-gray-900">Exportar datos</span>
            </div>
            <span class="text-gray-400">›</span>
          </button>
        </div>
      </section>

      <!-- App Info -->
      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <p class="text-sm text-gray-500">Versión 1.0.0</p>
        <p class="text-xs text-gray-400 mt-1">Recomiéndame Coach</p>
      </section>
    </div>

    <!-- Preferences Modal -->
    <transition name="fade">
      <div
        v-if="showPreferencesModalState"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="flex items-center justify-between border-b border-gray-200 p-6">
            <h3 class="text-xl font-semibold text-gray-900">
              {{ getPreferencesTitle() }}
            </h3>
            <button
              class="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary-200 hover:text-primary-600"
              @click="closePreferencesModal"
            >
              Cerrar
            </button>
          </div>
          
          <div class="max-h-[50vh] overflow-y-auto p-6">
            <div v-if="getCurrentPreferences().length > 0" class="space-y-3">
              <div
                v-for="(item, index) in getCurrentPreferences()"
                :key="index"
                class="rounded-xl border-l-4 border-primary-500 bg-gray-50 p-4"
              >
                <p class="font-medium text-gray-900">{{ getPreferenceItemName(item) }}</p>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <p class="text-gray-500 italic">{{ getEmptyPreferencesMessage() }}</p>
            </div>
          </div>
          
          <div class="border-t border-gray-200 p-6">
            <div class="flex gap-3">
              <button
                class="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                @click="editPreferences"
              >
                ✏️ Editar
              </button>
              <button
                class="flex-1 rounded-xl bg-primary-500 py-3 text-sm font-semibold text-white hover:bg-primary-600"
                @click="closePreferencesModal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Followers Modal -->
    <transition name="fade">
      <div
        v-if="showFollowersModal"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="flex items-center justify-between border-b border-gray-200 p-6">
            <h3 class="text-xl font-semibold text-gray-900">Seguidores</h3>
            <button
              class="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary-200 hover:text-primary-600"
              @click="showFollowersModal = false"
            >
              Cerrar
            </button>
          </div>
          
          <div class="max-h-[50vh] overflow-y-auto p-6">
            <div v-if="followers.length > 0" class="space-y-3">
              <div
                v-for="follower in followers"
                :key="follower.id"
                class="flex items-center gap-3 rounded-xl border border-gray-200 p-4"
              >
                <div class="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                  <span class="text-white font-semibold">
                    {{ follower.name?.charAt(0).toUpperCase() || follower.email?.charAt(0).toUpperCase() || 'U' }}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ follower.name || 'Usuario' }}</p>
                  <p class="text-sm text-gray-500">{{ follower.email }}</p>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <p class="text-gray-500">No tienes seguidores aún</p>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Following Modal -->
    <transition name="fade">
      <div
        v-if="showFollowingModal"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="flex items-center justify-between border-b border-gray-200 p-6">
            <h3 class="text-xl font-semibold text-gray-900">Siguiendo</h3>
            <button
              class="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary-200 hover:text-primary-600"
              @click="showFollowingModal = false"
            >
              Cerrar
            </button>
          </div>
          
          <div class="max-h-[50vh] overflow-y-auto p-6">
            <div v-if="following.length > 0" class="space-y-3">
              <div
                v-for="followedUser in following"
                :key="followedUser.id"
                class="flex items-center gap-3 rounded-xl border border-gray-200 p-4"
              >
                <div class="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                  <span class="text-white font-semibold">
                    {{ followedUser.name?.charAt(0).toUpperCase() || followedUser.email?.charAt(0).toUpperCase() || 'U' }}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ followedUser.name || 'Usuario' }}</p>
                  <p class="text-sm text-gray-500">{{ followedUser.email }}</p>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <p class="text-gray-500">No sigues a nadie aún</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useState } from '#imports'
import { authService } from '~/services/auth'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const router = useRouter()
const loading = ref(true)
const error = ref('')

const API_BASE = 'https://api-coach.recomiendameapp.cl'

const user = ref(null)
const userProfile = ref(null)
const socialProfile = ref(null)
const currentUserId = ref(null)

const showPreferencesModalState = ref(false)
const preferencesType = ref(null)
const showFollowersModal = ref(false)
const showFollowingModal = ref(false)

const followers = ref([])
const following = ref([])

const authUser = useState('auth-user', () => authService.getCachedUser())

const userInitials = computed(() => {
  const name = user.value?.name || user.value?.email || ''
  if (!name) return 'U'
  return name
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('') || 'U'
})

const getAuthToken = () => {
  if (!process.client) return ''
  return localStorage.getItem('recomiendame_access_token') || ''
}

const fetchWithAuth = async (path, options = {}) => {
  const token = getAuthToken()
  if (!token) {
    throw new Error('No se encontró tu sesión. Inicia sesión nuevamente.')
  }

  try {
    return await $fetch(path.startsWith('http') ? path : `${API_BASE}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    })
  } catch (err) {
    if (err?.status === 401) {
      if (process.client) {
        localStorage.removeItem('recomiendame_access_token')
        localStorage.removeItem('recomiendame_refresh_token')
        localStorage.removeItem('recomiendame_user_data')
      }
      authUser.value = null
      router.push('/login')
    }
    throw err
  }
}

const loadUserData = async () => {
  try {
    loading.value = true
    
    // Load user data from localStorage
    if (process.client) {
      const userData = localStorage.getItem('recomiendame_user_data')
      if (userData) {
        user.value = JSON.parse(userData)
      }
    }

    // Load profile from API
    try {
      const profile = await fetchWithAuth('/me/profile')
      userProfile.value = profile.profile || profile
      currentUserId.value = profile.userId
      
      if (profile.user) {
        user.value = { ...user.value, ...profile.user }
      }
      if (profile.email && user.value) {
        user.value.email = profile.email
      }
    } catch (profileError) {
      console.log('Error loading profile:', profileError)
    }

    // Load social stats
    try {
      const socialStats = await fetchWithAuth('/social/users/me/profile')
      socialProfile.value = socialStats
    } catch (socialError) {
      console.log('Error loading social stats:', socialError)
    }
  } catch (err) {
    console.error('Error loading user data:', err)
    error.value = err?.data?.message || err?.statusMessage || err?.message || 'No se pudo cargar el perfil.'
  } finally {
    loading.value = false
  }
}

const getGenderLabel = (sex) => {
  const labels = {
    'MALE': 'Masculino',
    'FEMALE': 'Femenino'
  }
  return labels[sex] || 'No especificado'
}

const getActivityLevelLabel = (level) => {
  const labels = {
    'SEDENTARY': 'Sedentario',
    'LIGHT': 'Ligero',
    'MODERATE': 'Moderado',
    'ACTIVE': 'Activo',
    'VERY_ACTIVE': 'Muy activo'
  }
  return labels[level] || 'No especificado'
}

const showPreferencesModal = (type) => {
  preferencesType.value = type
  showPreferencesModalState.value = true
}

const closePreferencesModal = () => {
  showPreferencesModalState.value = false
  preferencesType.value = null
}

const getPreferencesTitle = () => {
  const titles = {
    'cuisinesLike': '❤️ Cocinas Favoritas',
    'cuisinesDislike': '❌ Cocinas Evitadas',
    'allergies': '🚫 Alergias',
    'conditions': '🏥 Condiciones Médicas'
  }
  return titles[preferencesType.value] || 'Preferencias'
}

const getCurrentPreferences = () => {
  if (!userProfile.value || !preferencesType.value) return []
  return userProfile.value[preferencesType.value] || []
}

const getPreferenceItemName = (item) => {
  if (typeof item === 'string') return item
  return item.name || item.label || 'Sin nombre'
}

const getEmptyPreferencesMessage = () => {
  const messages = {
    'cuisinesLike': 'No has seleccionado cocinas favoritas',
    'cuisinesDislike': 'No has seleccionado cocinas a evitar',
    'allergies': 'No tienes alergias registradas',
    'conditions': 'No tienes condiciones médicas registradas'
  }
  return messages[preferencesType.value] || 'No hay información disponible'
}

const editPreferences = () => {
  // Placeholder for edit functionality
  alert('Funcionalidad de edición próximamente disponible')
  closePreferencesModal()
}

const loadFollowers = async () => {
  if (!currentUserId.value) return
  
  try {
    const response = await fetchWithAuth(`/social/users/${currentUserId.value}/followers`)
    followers.value = response.items || []
  } catch (err) {
    console.error('Error loading followers:', err)
    followers.value = []
  }
}

const loadFollowing = async () => {
  if (!currentUserId.value) return
  
  try {
    const response = await fetchWithAuth(`/social/users/${currentUserId.value}/following`)
    following.value = response.items || []
  } catch (err) {
    console.error('Error loading following:', err)
    following.value = []
  }
}

const handleLogout = () => {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    authService.logout()
    authUser.value = null
    router.push('/login')
  }
}

// Initialize modal states
showFollowersModal.value = false
showFollowingModal.value = false

const openFollowersModal = async () => {
  showFollowersModal.value = true
  await loadFollowers()
}

const openFollowingModal = async () => {
  showFollowingModal.value = true
  await loadFollowing()
}

// Replace the original refs
showFollowersModal = computed({
  get: () => originalShowFollowersModal.value,
  set: (value) => {
    if (value) {
      openFollowersModal()
    } else {
      originalShowFollowersModal.value = false
    }
  }
})

showFollowingModal = computed({
  get: () => originalShowFollowingModal.value,
  set: (value) => {
    if (value) {
      openFollowingModal()
    } else {
      originalShowFollowingModal.value = false
    }
  }
})

onMounted(async () => {
  if (!getAuthToken()) {
    router.push('/login')
    return
  }
  
  authUser.value = authService.getCachedUser()
  await loadUserData()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>