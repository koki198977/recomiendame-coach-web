<template>
  <div class="space-y-6">
    <!-- Header with gradient background -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 px-8 py-12 text-white shadow-xl">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10"></div>
      <div class="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5"></div>
      
      <div class="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="rounded-2xl bg-white/20 p-3">
              <span class="text-2xl">🍽️</span>
            </div>
            <div>
              <p class="text-sm font-medium text-primary-100">
                Plan Nutricional
              </p>
              <h1 class="text-3xl font-bold">
                Tu semana completa
              </h1>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-4 text-sm">
            <span class="rounded-full bg-white/20 px-3 py-1 font-medium">
              📅 Semana {{ currentWeek }}
            </span>
            <span class="rounded-full bg-white/20 px-3 py-1 font-medium">
              🍴 {{ totalMeals }} comidas
            </span>
            <span class="rounded-full bg-white/20 px-3 py-1 font-medium">
              🎯 {{ caloriesTarget }} kcal/día
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            class="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
            @click="reloadPlan"
          >
            🔄 Actualizar
          </button>
          <button
            v-if="weeklyPlan"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-lg transition hover:bg-gray-50"
            @click="generateShoppingList"
          >
            🛒 Lista de compras
          </button>
        </div>
      </div>
    </section>

    <!-- Week Navigation -->
    <section class="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <button
        class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200"
        @click="navigateWeek('prev')"
      >
        ←
      </button>
      
      <div class="text-center">
        <p class="text-lg font-semibold text-gray-900">Semana {{ currentWeek }}</p>
        <p class="text-sm text-gray-500">{{ getWeekDateRange() }}</p>
      </div>
      
      <button
        class="flex h-10 w-10 items-center justify-center rounded-xl transition"
        :class="canNavigateNext() 
          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
          : 'bg-gray-50 text-gray-300 cursor-not-allowed'"
        @click="navigateWeek('next')"
        :disabled="!canNavigateNext()"
      >
        →
      </button>
    </section>

    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 text-gray-500">
      <span class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-400"></span>
      <p class="mt-6 text-sm">Cargando tu plan semanal...</p>
    </div>

    <!-- Error state -->
    <section v-if="error" class="rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700">
      <div class="flex items-start gap-3">
        <span class="mt-0.5 text-lg">⚠️</span>
        <div>
          <p class="font-medium">Error al cargar el plan</p>
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
        <button class="ml-auto text-sm underline" @click="error = ''">
          Ocultar
        </button>
      </div>
    </section>

    <!-- Plan content -->
    <div v-if="!loading && weeklyPlan" class="space-y-6">
      <!-- Weekly overview with improved design -->
      <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 border border-blue-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="rounded-xl bg-blue-500 p-2">
              <span class="text-white text-lg">🎯</span>
            </div>
            <div>
              <p class="text-xs font-medium text-blue-600 uppercase tracking-wide">Objetivo Diario</p>
              <p class="text-2xl font-bold text-blue-900">{{ caloriesTarget }}</p>
            </div>
          </div>
          <p class="text-sm text-blue-700">kcal por día</p>
        </div>

        <div class="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 border border-green-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="rounded-xl bg-green-500 p-2">
              <span class="text-white text-lg">🍴</span>
            </div>
            <div>
              <p class="text-xs font-medium text-green-600 uppercase tracking-wide">Comidas</p>
              <p class="text-2xl font-bold text-green-900">{{ totalMeals }}</p>
            </div>
          </div>
          <p class="text-sm text-green-700">esta semana</p>
        </div>

        <div class="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 border border-purple-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="rounded-xl bg-purple-500 p-2">
              <span class="text-white text-lg">💪</span>
            </div>
            <div>
              <p class="text-xs font-medium text-purple-600 uppercase tracking-wide">Proteína</p>
              <p class="text-2xl font-bold text-purple-900">{{ avgProtein }}g</p>
            </div>
          </div>
          <p class="text-sm text-purple-700">promedio diario</p>
        </div>

        <div class="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-6 border border-orange-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="rounded-xl bg-orange-500 p-2">
              <span class="text-white text-lg">⚡</span>
            </div>
            <div>
              <p class="text-xs font-medium text-orange-600 uppercase tracking-wide">Macros</p>
              <p class="text-lg font-bold text-orange-900">{{ avgCarbs }}g | {{ avgFat }}g</p>
            </div>
          </div>
          <p class="text-sm text-orange-700">carbos | grasas</p>
        </div>
      </section>

      <!-- Day selector with improved mobile design -->
      <section class="rounded-2xl bg-white p-4 shadow-sm">
        <div class="mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Selecciona un día</h2>
          <p class="text-sm text-gray-500">Toca un día para ver sus comidas</p>
        </div>
        
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="(day, index) in weekDays"
            :key="day.dayIndex"
            class="relative cursor-pointer rounded-xl p-3 text-center transition-all duration-200"
            :class="[
              selectedDay === index 
                ? 'bg-primary-500 text-white shadow-lg scale-105 ring-2 ring-primary-300' 
                : day.isToday 
                  ? 'bg-orange-50 text-orange-900 border-2 border-orange-200 hover:bg-orange-100'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            ]"
            @click="selectedDay = index"
          >
            <div class="text-xs font-medium mb-1">{{ getDayName(day.dayIndex).slice(0, 3) }}</div>
            <div class="text-lg font-bold">{{ day.dateNumber }}</div>
            <div class="text-xs mt-1 opacity-75">
              {{ getDayMealsCount(day) }} comidas
            </div>
            
            <!-- Today indicator -->
            <div v-if="day.isToday" class="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-orange-400 border-2 border-white pulse-ring"></div>
            
            <!-- Selected indicator -->
            <div v-if="selectedDay === index" class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      <!-- Selected day meals with improved design -->
      <section class="space-y-4">
        <!-- Day header -->
        <div class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
                {{ getDayName(weekDays[selectedDay]?.dayIndex) }}
                <span v-if="isToday(weekDays[selectedDay]?.dayIndex)" class="text-lg">🌟</span>
              </h2>
              <p class="text-gray-600 mt-1">
                {{ formatSelectedDayDate() }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-primary-600">{{ getSelectedDayCalories() }}</p>
              <p class="text-sm text-gray-500">kcal totales</p>
            </div>
          </div>
          
          <!-- Day progress bar -->
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-500"
              :style="{ width: `${Math.min(100, (getSelectedDayCalories() / caloriesTarget) * 100)}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>0 kcal</span>
            <span>{{ caloriesTarget }} kcal objetivo</span>
          </div>
        </div>

        <!-- Meals grid -->
        <div v-if="getSelectedDayMeals().length" class="grid gap-4 md:grid-cols-2">
          <article
            v-for="(meal, index) in getSelectedDayMeals()"
            :key="meal.id || `${meal.title}-${index}`"
            class="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          >
            <!-- Meal type indicator -->
            <div class="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium"
                 :class="getMealTypeColor(meal.slot || meal.type)">
              {{ getMealSlotLabel(meal.slot || meal.type) }}
            </div>
            
            <div class="p-6">
              <!-- Meal header -->
              <div class="mb-4">
                <div class="flex items-start gap-3">
                  <div class="rounded-xl p-2 text-2xl"
                       :class="getMealIconBg(meal.slot || meal.type)">
                    {{ getMealIcon(meal.slot || meal.type) }}
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-900 leading-tight">
                      {{ meal.title || 'Comida planificada' }}
                    </h3>
                    <p v-if="meal.description" class="text-sm text-gray-600 mt-1 line-clamp-2">
                      {{ meal.description }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Calories -->
              <div class="mb-4 rounded-xl bg-gray-50 p-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">Calorías</span>
                  <span class="text-xl font-bold text-primary-600">{{ meal.kcal ?? meal.calories ?? 0 }}</span>
                </div>
              </div>

              <!-- Macros -->
              <div class="grid grid-cols-3 gap-3 mb-4">
                <div class="text-center">
                  <div class="text-lg font-bold text-blue-600">{{ meal.protein_g ?? meal.protein ?? 0 }}g</div>
                  <div class="text-xs text-gray-500">Proteína</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-green-600">{{ meal.carbs_g ?? meal.carbs ?? 0 }}g</div>
                  <div class="text-xs text-gray-500">Carbos</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-orange-600">{{ meal.fat_g ?? meal.fat ?? 0 }}g</div>
                  <div class="text-xs text-gray-500">Grasas</div>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="flex gap-2">
                <button class="flex-1 rounded-xl bg-gray-100 py-2 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-200">
                  📋 Ver receta
                </button>
                <button class="rounded-xl bg-primary-100 p-2 text-primary-600 transition hover:bg-primary-200">
                  ❤️
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty state for selected day -->
        <div v-else class="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <div class="text-6xl mb-4">🍽️</div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No hay comidas planificadas</h3>
          <p class="text-gray-600 mb-6">Este día no tiene comidas asignadas en tu plan semanal.</p>
          <button class="rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-600">
            ➕ Agregar comida
          </button>
        </div>
      </section>

      <!-- Notes -->
      <section v-if="weeklyPlan.notes" class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900">Notas del plan</h2>
        <p class="mt-3 text-sm text-gray-600">
          {{ weeklyPlan.notes }}
        </p>
      </section>
    </div>

    <!-- Empty state -->
    <section
      v-if="!loading && !weeklyPlan"
      class="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-8 py-16 text-center shadow-sm"
    >
      <div class="rounded-2xl border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600">
        Sin plan activo
      </div>
      <h2 class="mt-6 text-2xl font-semibold text-gray-900">
        No tienes un plan semanal
      </h2>
      <p class="mt-3 max-w-xl text-sm text-gray-600">
        Ve a la página de inicio para generar tu primer plan nutricional personalizado.
      </p>
      <NuxtLink
        to="/app"
        class="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-600"
      >
        🏠 Ir al inicio
      </NuxtLink>
    </section>

    <!-- Shopping list modal -->
    <transition name="fade">
      <div
        v-if="showShoppingListModal"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
          <button
            class="absolute right-5 top-5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary-200 hover:text-primary-600"
            @click="closeShoppingListModal"
          >
            Cerrar
          </button>
          <h3 class="text-xl font-semibold">Lista de compras semanal</h3>
          <p class="mt-2 text-sm text-gray-500">
            Ingredientes para toda la semana.
          </p>

          <div v-if="loadingShoppingList" class="mt-8 flex flex-col items-center justify-center gap-3 py-12 text-gray-500">
            <span class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary-400"></span>
            <p class="text-sm">Generando lista...</p>
          </div>

          <div v-else class="mt-6 max-h-[50vh] space-y-4 overflow-y-auto pr-2">
            <div
              v-for="item in shoppingListItems"
              :key="item.id || item.name"
              class="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3"
            >
              <p class="text-sm font-semibold text-gray-800">
                {{ item.name }}
              </p>
              <p class="mt-1 text-xs text-gray-500">
                {{ itemQuantityLabel(item) }} · {{ itemCategoryLabel(item) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
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

const weeklyPlan = ref(null)
const currentWeek = ref('')

const showShoppingListModal = ref(false)
const shoppingListItems = ref([])
const loadingShoppingList = ref(false)

const authUser = useState('auth-user', () => authService.getCachedUser())

const weekDays = computed(() => {
  if (!currentWeek.value) return []
  
  // Generar los 7 días de la semana basado en currentWeek
  const [year, weekNum] = currentWeek.value.split('-W')
  const weekNumber = parseInt(weekNum)
  const yearNum = parseInt(year)
  
  // Calcular el lunes de la semana especificada usando ISO 8601
  const jan1 = new Date(yearNum, 0, 1)
  const firstThursday = new Date(jan1)
  
  // Encontrar el primer jueves del año
  const dayOfWeek = jan1.getDay() || 7 // Domingo = 7
  if (dayOfWeek <= 4) {
    firstThursday.setDate(jan1.getDate() + (4 - dayOfWeek))
  } else {
    firstThursday.setDate(jan1.getDate() + (11 - dayOfWeek))
  }
  
  // Calcular el lunes de la semana objetivo
  const targetMonday = new Date(firstThursday)
  targetMonday.setDate(firstThursday.getDate() - 3 + (weekNumber - 1) * 7)
  
  const today = new Date()
  const days = []
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(targetMonday)
    date.setDate(targetMonday.getDate() + i)
    
    const dayIndex = i + 1 // 1 = lunes, 7 = domingo
    const isToday = 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    
    // Buscar las comidas para este día en el plan
    const dayPlan = weeklyPlan.value?.days?.find(day => {
      const planDayIndex = day.dayIndex ?? day.day_index ?? day.day ?? 0
      return planDayIndex === dayIndex
    })
    
    days.push({
      dayIndex,
      date,
      dateNumber: date.getDate(),
      isToday,
      meals: dayPlan?.meals || []
    })
  }
  
  return days
})

const totalMeals = computed(() => {
  return weekDays.value.reduce((sum, day) => sum + (day.meals?.length || 0), 0)
})

const caloriesTarget = computed(() => {
  const macros = weeklyPlan.value?.macros
  if (!macros) return 0
  return Number(macros.kcalTarget ?? macros.kcal_target ?? macros.calories ?? 0)
})

const avgProtein = computed(() => {
  const macros = weeklyPlan.value?.macros
  if (!macros) return 0
  return Number(macros.protein_g ?? macros.protein ?? 0)
})

const avgCarbs = computed(() => {
  const macros = weeklyPlan.value?.macros
  if (!macros) return 0
  return Number(macros.carbs_g ?? macros.carbs ?? 0)
})

const avgFat = computed(() => {
  const macros = weeklyPlan.value?.macros
  if (!macros) return 0
  return Number(macros.fat_g ?? macros.fat ?? 0)
})

const getDayName = (dayIndex) => {
  const names = {
    1: 'Lunes',
    2: 'Martes', 
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
    7: 'Domingo'
  }
  return names[dayIndex] || `Día ${dayIndex}`
}

const isToday = (dayIndex) => {
  const today = new Date()
  const todayIndex = today.getDay() === 0 ? 7 : today.getDay()
  return dayIndex === todayIndex
}

const getDayCalories = (day) => {
  return day.meals?.reduce((sum, meal) => sum + Number(meal.kcal ?? meal.calories ?? 0), 0) || 0
}

const getMealSlotLabel = (slot) => {
  if (!slot) return 'Comida'
  const normalized = String(slot).toUpperCase()
  const map = {
    BREAKFAST: 'Desayuno',
    LUNCH: 'Almuerzo', 
    DINNER: 'Cena',
    SNACK: 'Snack'
  }
  return map[normalized] ?? normalized
}

const itemQuantityLabel = (item) => {
  const rawQuantity = item?.qty ?? item?.quantity ?? 0
  const quantity = Number(rawQuantity ?? 0)
  const unit = item?.unit
  if (!quantity) return 'Sin cantidad'
  const unitLabel = unit && unit.trim().length > 0 ? unit.trim() : 'unidad'
  const formattedQuantity = Number.isInteger(quantity) ? quantity : Number(quantity.toFixed(2))
  return `${formattedQuantity} ${unitLabel}`
}

const itemCategoryLabel = (item) => {
  if (item?.category) return item.category
  return 'General'
}

const getCurrentWeekLabel = () => {
  const now = new Date()
  
  // Implementación correcta del estándar ISO 8601 para semanas
  const getISOWeek = (date) => {
    const target = new Date(date.valueOf())
    const dayNr = (date.getDay() + 6) % 7
    target.setDate(target.getDate() - dayNr + 3)
    const firstThursday = target.valueOf()
    target.setMonth(0, 1)
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7)
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000)
  }
  
  const getISOYear = (date) => {
    const target = new Date(date.valueOf())
    const dayNr = (date.getDay() + 6) % 7
    target.setDate(target.getDate() - dayNr + 3)
    return target.getFullYear()
  }
  
  const weekNumber = getISOWeek(now)
  const isoYear = getISOYear(now)
  
  console.log('Debug semana ISO:', {
    fecha: now.toLocaleDateString('es-CL'),
    diaSemana: now.getDay(),
    weekNumber,
    isoYear,
    resultado: `${isoYear}-W${String(weekNumber).padStart(2, '0')}`
  })
  
  return `${isoYear}-W${String(weekNumber).padStart(2, '0')}`
}

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

const loadPlan = async (week) => {
  try {
    loading.value = true
    const targetWeek = week || currentWeek.value || getCurrentWeekLabel()
    currentWeek.value = targetWeek

    const planRes = await fetchWithAuth(`/plans?week=${encodeURIComponent(targetWeek)}`)
    weeklyPlan.value = planRes
  } catch (err) {
    console.error('Error loading plan:', err)
    error.value = err?.data?.message || err?.statusMessage || err?.message || 'No se pudo cargar el plan.'
  } finally {
    loading.value = false
  }
}

const reloadPlan = async () => {
  await loadPlan(currentWeek.value)
}

const generateShoppingList = async () => {
  const planIdentifier = weeklyPlan.value?.id ?? weeklyPlan.value?.planId
  if (!planIdentifier) {
    error.value = 'No se encontró el plan para generar la lista.'
    return
  }

  try {
    loadingShoppingList.value = true
    showShoppingListModal.value = true

    const response = await fetchWithAuth(`/plans/${planIdentifier}/shopping-list`)
    shoppingListItems.value = response?.items ?? []
  } catch (err) {
    console.error('Shopping list error:', err)
    showShoppingListModal.value = false
    error.value = err?.data?.message || err?.statusMessage || err?.message || 'No se pudo generar la lista de compras.'
  } finally {
    loadingShoppingList.value = false
  }
}

const closeShoppingListModal = () => {
  showShoppingListModal.value = false
  shoppingListItems.value = []
}

// Nuevas funciones auxiliares para el diseño mejorado
const selectedDay = ref(0)

const getWeekDateRange = () => {
  if (weekDays.value.length === 0) return ''
  const firstDay = weekDays.value[0]
  const lastDay = weekDays.value[6]
  if (!firstDay || !lastDay) return ''
  
  const firstDate = new Date(firstDay.date)
  const lastDate = new Date(lastDay.date)
  
  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}`
  }
  
  return `${formatDate(firstDate)} - ${formatDate(lastDate)}`
}

const getDayMealsCount = (day) => {
  const dayPlan = weeklyPlan.value?.days?.find(d => d.dayIndex === day.dayIndex)
  return dayPlan?.meals?.length || 0
}

const getSelectedDayMeals = () => {
  if (!weeklyPlan.value || !weekDays.value[selectedDay.value]) return []
  
  const selectedDayInfo = weekDays.value[selectedDay.value]
  const dayPlan = weeklyPlan.value.days.find(day => day.dayIndex === selectedDayInfo.dayIndex)
  return dayPlan?.meals || []
}

const getSelectedDayCalories = () => {
  return getSelectedDayMeals().reduce((sum, meal) => sum + Number(meal.kcal ?? meal.calories ?? 0), 0)
}

const formatSelectedDayDate = () => {
  const day = weekDays.value[selectedDay.value]
  if (!day) return ''
  
  const date = new Date(day.date || Date.now())
  return date.toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
}

const getMealIcon = (slot) => {
  const icons = {
    'BREAKFAST': '🌅',
    'LUNCH': '☀️', 
    'DINNER': '🌙',
    'SNACK': '🥜'
  }
  return icons[slot?.toUpperCase()] || '🍽️'
}

const getMealIconBg = (slot) => {
  const colors = {
    'BREAKFAST': 'bg-yellow-100',
    'LUNCH': 'bg-orange-100',
    'DINNER': 'bg-purple-100',
    'SNACK': 'bg-green-100'
  }
  return colors[slot?.toUpperCase()] || 'bg-gray-100'
}

const getMealTypeColor = (slot) => {
  const colors = {
    'BREAKFAST': 'bg-yellow-100 text-yellow-800',
    'LUNCH': 'bg-orange-100 text-orange-800',
    'DINNER': 'bg-purple-100 text-purple-800',
    'SNACK': 'bg-green-100 text-green-800'
  }
  return colors[slot?.toUpperCase()] || 'bg-gray-100 text-gray-800'
}

const navigateWeek = (direction) => {
  const [year, weekNum] = currentWeek.value.split('-W')
  let newWeek = parseInt(weekNum) + (direction === 'next' ? 1 : -1)
  let newYear = parseInt(year)
  
  // Manejar cambio de año
  if (newWeek > 52) {
    newWeek = 1
    newYear++
  } else if (newWeek < 1) {
    newWeek = 52
    newYear--
  }
  
  const newWeekString = `${newYear}-W${newWeek.toString().padStart(2, '0')}`
  
  // Para navegación hacia adelante, verificar que no vayamos más allá de la semana actual
  if (direction === 'next') {
    const currentWeekString = getCurrentWeekLabel()
    if (newWeekString > currentWeekString) {
      return // No permitir ir al futuro
    }
  }
  
  loadPlan(newWeekString)
}

const canNavigateNext = () => {
  const currentWeekString = getCurrentWeekLabel()
  return currentWeek.value < currentWeekString
}

// Inicializar el día seleccionado como hoy
const initializeSelectedDay = () => {
  nextTick(() => {
    const todayIndex = weekDays.value.findIndex(day => day.isToday)
    if (todayIndex !== -1) {
      selectedDay.value = todayIndex
    } else {
      // Si no hay día de hoy en esta semana, seleccionar el primer día
      selectedDay.value = 0
    }
  })
}

// Watch para actualizar el día seleccionado cuando cambien los días de la semana
watch(weekDays, () => {
  initializeSelectedDay()
}, { immediate: true })

// Watch para reinicializar cuando cambie la semana
watch(currentWeek, () => {
  initializeSelectedDay()
})

onMounted(async () => {
  if (!getAuthToken()) {
    router.push('/login')
    return
  }
  authUser.value = authService.getCachedUser()
  
  // Debug: verificar qué semana está calculando
  const calculatedWeek = getCurrentWeekLabel()
  console.log('Semana calculada:', calculatedWeek)
  console.log('Fecha actual:', new Date().toISOString())
  
  await loadPlan()
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

/* Animaciones suaves para las tarjetas */
.group:hover {
  transform: translateY(-2px);
}

/* Limitador de líneas para descripciones */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Gradientes personalizados */
.bg-gradient-custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Sombras suaves */
.shadow-soft {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Animación de pulso para el indicador de hoy */
@keyframes pulse-ring {
  0% {
    transform: scale(0.33);
  }
  40%, 50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}

.pulse-ring::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 100%;
  border: 2px solid #f97316;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .grid-cols-7 {
    gap: 0.25rem;
  }
  
  .grid-cols-7 > div {
    padding: 0.5rem 0.25rem;
  }
}
</style>