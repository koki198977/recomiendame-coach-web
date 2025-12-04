<template>
  <div class="space-y-8">
    <!-- Header -->
    <section class="rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-primary-500">
            Mi progreso
          </p>
          <h1 class="mt-3 text-3xl font-semibold text-gray-900">
            Seguimiento de resultados
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Visualiza tu evolución y logros alcanzados
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-primary-200 hover:text-primary-600"
            @click="loadProgress"
          >
            Actualizar datos
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-600"
          >
            📸 Foto de progreso
          </button>
        </div>
      </div>
    </section>

    <!-- Period Selector -->
    <section class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex rounded-2xl bg-gray-50 p-1">
        <button
          v-for="period in periods"
          :key="period.value"
          class="flex-1 rounded-xl px-4 py-2 text-sm font-medium transition"
          :class="selectedPeriod === period.value 
            ? 'bg-primary-500 text-white shadow-sm' 
            : 'text-gray-600 hover:text-primary-600'"
          @click="selectedPeriod = period.value"
        >
          {{ period.label }}
        </button>
      </div>
    </section>

    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 text-gray-500">
      <span class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-400"></span>
      <p class="mt-6 text-sm">Cargando tu progreso...</p>
    </div>

    <!-- Error state -->
    <section v-if="error" class="rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700">
      <div class="flex items-start gap-3">
        <span class="mt-0.5 text-lg">⚠️</span>
        <div>
          <p class="font-medium">Error al cargar el progreso</p>
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
        <button class="ml-auto text-sm underline" @click="error = ''">
          Ocultar
        </button>
      </div>
    </section>

    <!-- Debug info (temporal) -->
    <section v-if="!loading && checkins.length > 0" class="rounded-2xl border border-blue-200 bg-blue-50 p-4">
      <h3 class="text-sm font-semibold text-blue-900 mb-2">Debug Info (temporal)</h3>
      <div class="text-xs text-blue-800">
        <p>Total checkins: {{ checkins.length }}</p>
        <p>Weight records: {{ weightData.length }}</p>
        <p>Adherence records: {{ adherenceData.length }}</p>
        <p>Período seleccionado: {{ selectedPeriod }}</p>
        <details class="mt-2">
          <summary class="cursor-pointer">Ver primer checkin</summary>
          <pre class="mt-2 text-xs bg-white p-2 rounded">{{ JSON.stringify(checkins[0], null, 2) }}</pre>
        </details>
      </div>
    </section>

    <!-- Progress content -->
    <div v-if="!loading" class="space-y-8">
      <!-- Weight Progress -->
      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Progreso de Peso</h2>
        
        <div v-if="weightData.length > 0" class="space-y-6">
          <div class="grid gap-6 md:grid-cols-3">
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-500">{{ currentWeight }}</p>
              <p class="text-sm text-gray-500 mt-1">Peso actual</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-gray-900">{{ initialWeight }}</p>
              <p class="text-sm text-gray-500 mt-1">Peso inicial</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold" :class="weightLoss > 0 ? 'text-green-500' : 'text-orange-500'">
                {{ weightLoss > 0 ? '-' : '+' }}{{ Math.abs(weightLoss).toFixed(1) }}
              </p>
              <p class="text-sm text-gray-500 mt-1">
                {{ weightLoss > 0 ? 'Perdidos' : 'Ganados' }} (kg)
              </p>
            </div>
          </div>

          <!-- Weight History -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Historial reciente</h3>
            <div class="space-y-3">
              <div
                v-for="record in recentWeightRecords"
                :key="record.id"
                class="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50"
              >
                <span class="text-sm text-gray-600">{{ formatDate(record.date) }}</span>
                <span class="text-sm font-semibold text-gray-900">{{ record.weightKg?.toFixed(1) }} kg</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-lg text-gray-600 mb-2">No hay registros de peso aún</p>
          <p class="text-sm text-gray-500">Registra tu peso en el check-in diario</p>
        </div>
      </section>

      <!-- Adherence Progress -->
      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Adherencia al Plan</h2>
        
        <div v-if="adherenceData.length > 0" class="space-y-6">
          <div class="grid gap-6 md:grid-cols-2">
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-500">{{ averageAdherence }}%</p>
              <p class="text-sm text-gray-500 mt-1">Promedio</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-gray-900">{{ adherenceData.length }}</p>
              <p class="text-sm text-gray-500 mt-1">Días registrados</p>
            </div>
          </div>

          <!-- Adherence History -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Últimos registros</h3>
            <div class="space-y-3">
              <div
                v-for="record in recentAdherenceRecords"
                :key="record.id"
                class="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50"
              >
                <span class="text-sm text-gray-600">{{ formatDate(record.date) }}</span>
                <div class="flex items-center gap-3">
                  <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-primary-500 rounded-full transition-all"
                      :style="{ width: `${record.adherencePct}%` }"
                    ></div>
                  </div>
                  <span class="text-sm font-semibold text-gray-900 w-12">{{ record.adherencePct }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-lg text-gray-600 mb-2">No hay registros de adherencia aún</p>
          <p class="text-sm text-gray-500">Registra tu adherencia en el check-in diario</p>
        </div>
      </section>

      <!-- Achievements -->
      <section class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Logros</h2>
        
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="rounded-2xl p-6 text-center transition hover:scale-105"
            :class="achievement.unlocked ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50 border border-gray-200 opacity-60'"
          >
            <div class="text-3xl mb-3">{{ achievement.icon }}</div>
            <h3 class="font-semibold text-gray-900 mb-1">{{ achievement.title }}</h3>
            <p class="text-xs text-gray-600">{{ achievement.description }}</p>
            <div v-if="!achievement.unlocked" class="mt-2">
              <span class="text-xs text-gray-500">🔒 Próximo logro</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Weekly Summary -->
      <section v-if="weeklyStats" class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Resumen Semanal</h2>
        
        <div class="grid gap-6 md:grid-cols-3">
          <div class="text-center p-4 rounded-xl bg-blue-50">
            <p class="text-2xl font-bold text-blue-600">{{ weeklyStats.checkinsCount }}</p>
            <p class="text-sm text-blue-700 mt-1">Check-ins realizados</p>
          </div>
          <div class="text-center p-4 rounded-xl bg-green-50">
            <p class="text-2xl font-bold text-green-600">{{ weeklyStats.avgAdherence }}%</p>
            <p class="text-sm text-green-700 mt-1">Adherencia promedio</p>
          </div>
          <div class="text-center p-4 rounded-xl bg-purple-50">
            <p class="text-2xl font-bold text-purple-600">{{ weeklyStats.streakDays }}</p>
            <p class="text-sm text-purple-700 mt-1">Días consecutivos</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
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

const selectedPeriod = ref('week')
const checkins = ref([])
const weeklyStats = ref(null)

const authUser = useState('auth-user', () => authService.getCachedUser())

const periods = [
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'year', label: 'Año' }
]

const achievements = ref([
  {
    id: 1,
    icon: '🏆',
    title: 'Primera semana',
    description: 'Completaste tu primera semana',
    unlocked: true
  },
  {
    id: 2,
    icon: '🥗',
    title: '5 días seguidos',
    description: 'Registraste 5 días consecutivos',
    unlocked: true
  },
  {
    id: 3,
    icon: '💪',
    title: 'Meta de peso',
    description: 'Alcanzaste tu objetivo',
    unlocked: false
  },
  {
    id: 4,
    icon: '🔒',
    title: 'Próximo logro',
    description: 'Sigue así para desbloquearlo',
    unlocked: false
  }
])

const weightData = computed(() => {
  if (!Array.isArray(checkins.value)) return []
  
  return checkins.value
    .filter(c => {
      // Manejar diferentes nombres de campos
      const weight = c.weightKg || c.weight_kg || c.weight
      return weight && weight > 0
    })
    .map(c => ({
      ...c,
      weightKg: c.weightKg || c.weight_kg || c.weight,
      date: c.date || c.recordedAt || c.created_at
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const adherenceData = computed(() => {
  if (!Array.isArray(checkins.value)) return []
  
  return checkins.value
    .filter(c => {
      // Manejar diferentes nombres de campos
      const adherence = c.adherencePct || c.adherence_pct || c.adherence
      return adherence !== undefined && adherence !== null
    })
    .map(c => ({
      ...c,
      adherencePct: c.adherencePct || c.adherence_pct || c.adherence,
      date: c.date || c.recordedAt || c.created_at
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const currentWeight = computed(() => {
  const weights = weightData.value
  return weights.length > 0 ? weights[weights.length - 1].weightKg?.toFixed(1) : '0.0'
})

const initialWeight = computed(() => {
  const weights = weightData.value
  return weights.length > 0 ? weights[0].weightKg?.toFixed(1) : '0.0'
})

const weightLoss = computed(() => {
  const weights = weightData.value
  if (weights.length < 2) return 0
  const initial = weights[0].weightKg
  const current = weights[weights.length - 1].weightKg
  return initial - current
})

const averageAdherence = computed(() => {
  const adherence = adherenceData.value
  if (adherence.length === 0) return 0
  const sum = adherence.reduce((acc, c) => acc + (c.adherencePct || 0), 0)
  return Math.round(sum / adherence.length)
})

const recentWeightRecords = computed(() => {
  return weightData.value.slice(-5).reverse()
})

const recentAdherenceRecords = computed(() => {
  return adherenceData.value.slice(-5).reverse()
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

const getDateRange = () => {
  const now = new Date()
  let from

  if (selectedPeriod.value === 'week') {
    // Inicio de la semana actual (lunes)
    const startOfWeek = new Date(now)
    const dayOfWeek = now.getDay()
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    startOfWeek.setDate(now.getDate() - daysToMonday)
    from = startOfWeek.toISOString().split('T')[0]
  } else if (selectedPeriod.value === 'month') {
    // Inicio del mes actual
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    from = startOfMonth.toISOString().split('T')[0]
  } else {
    // Inicio del año actual
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    from = startOfYear.toISOString().split('T')[0]
  }

  const to = now.toISOString().split('T')[0]
  
  console.log('Rango de fechas:', { from, to, period: selectedPeriod.value })
  return { from, to }
}

const loadProgress = async () => {
  try {
    loading.value = true
    const { from, to } = getDateRange()
    
    // Usar el endpoint correcto con parámetros de query
    const history = await fetchWithAuth(`/checkins?from=${from}&to=${to}`)
    
    // El endpoint puede devolver un array directamente o un objeto con items
    if (Array.isArray(history)) {
      checkins.value = history
    } else if (history && Array.isArray(history.items)) {
      checkins.value = history.items
    } else if (history && Array.isArray(history.checkins)) {
      checkins.value = history.checkins
    } else {
      checkins.value = []
    }

    // Cargar estadísticas semanales si está disponible
    try {
      const stats = await fetchWithAuth('/checkins/weekly-stats')
      weeklyStats.value = stats
    } catch (statsError) {
      console.log('Error loading weekly stats:', statsError)
      weeklyStats.value = null
    }
    
    console.log('Checkins cargados:', checkins.value.length, 'registros')
  } catch (err) {
    console.error('Error loading progress:', err)
    error.value = err?.data?.message || err?.statusMessage || err?.message || 'No se pudo cargar el progreso.'
    checkins.value = []
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    
    // Verificar que la fecha sea válida
    if (isNaN(date.getTime())) {
      return dateString // Devolver el string original si no se puede parsear
    }
    
    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'short'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}

watch(selectedPeriod, () => {
  loadProgress()
})

onMounted(async () => {
  if (!getAuthToken()) {
    router.push('/login')
    return
  }
  authUser.value = authService.getCachedUser()
  await loadProgress()
})
</script>