<template>
  <div class="space-y-10">
    <!-- Loader -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 text-gray-500">
      <span class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-400"></span>
      <p class="mt-6 text-sm">{{ loadingMessage }}</p>
    </div>

    <div v-else>
      <!-- Onboarding reminder -->
      <section
        v-if="needsOnboarding"
        class="rounded-3xl border border-amber-200 bg-amber-50 px-8 py-10 text-amber-900 shadow-sm"
      >
        <div class="flex flex-col gap-6">
          <div>
            <p class="text-sm uppercase tracking-[0.35em] text-amber-500">
              Completa tu perfil
            </p>
            <h2 class="mt-3 text-2xl font-semibold text-amber-900">
              Antes de continuar necesitamos conocer más de ti
            </h2>
            <p class="mt-2 text-sm text-amber-700">
              Ingresa tu peso, estatura, alergias y objetivo nutricional para generar planes personalizados.
            </p>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              class="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
              @click="openOnboarding"
            >
              Completar mi perfil
              <span>→</span>
            </button>
            <p class="text-xs text-amber-700">
              Puedes completar tu perfil desde la app móvil de Recomiéndame Coach.
            </p>
          </div>
        </div>
      </section>

      <template v-else>
        <div class="space-y-10">
      <!-- Header -->
      <section
        class="rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm"
      >
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.35em] text-primary-500">
              Hola, {{ user?.name || user?.firstName || 'Usuario' }}
            </p>
            <h1 class="mt-3 text-3xl font-semibold text-gray-900">
              {{ weeklyPlan ? 'Tu plan nutricional de hoy' : 'Crea tu plan nutricional' }}
            </h1>
            <p class="mt-2 text-sm text-gray-500">
              Semana {{ currentWeek }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-primary-200 hover:text-primary-600"
              @click="reloadData"
            >
              Recargar datos
            </button>
            <button
              v-if="!weeklyPlan"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
              @click="handleGeneratePlan"
              :disabled="isGenerating"
            >
              <span>🤖</span>
              Crear plan con IA
            </button>
          </div>
        </div>
      </section>

      <!-- Error banner -->
      <section v-if="error" class="rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-red-700">
        <div class="flex items-start gap-3">
          <span class="mt-0.5 text-lg">⚠️</span>
          <div>
            <p class="font-medium">Algo salió mal</p>
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>
          <button class="ml-auto text-sm underline" @click="error = ''">
            Ocultar
          </button>
        </div>
      </section>

      <template v-if="weeklyPlan">
        <!-- Check-in card -->
        <section
          class="rounded-3xl border border-gray-200 bg-white p-8 text-gray-900 shadow-sm"
        >
          <div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div class="flex items-center gap-3">
                <h2 class="text-xl font-semibold text-gray-900">Check-in diario</h2>
                <span
                  v-if="hasTodayCheckin"
                  class="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600"
                >
                  Completado
                </span>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Registra cómo te sientes hoy para ajustar tu plan en tiempo real.
              </p>
            </div>

            <button
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-100 px-5 py-3 text-sm font-semibold text-primary-600 transition hover:bg-primary-50"
              @click="openCheckinModal"
            >
              {{ hasTodayCheckin ? 'Actualizar check-in' : 'Registrar check-in' }}
              <span>📝</span>
            </button>
          </div>

          <div v-if="hasTodayCheckin" class="mt-6 grid gap-6 md:grid-cols-2">
            <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>Peso</span>
                <span v-if="todayCheckin?.recordedAt || todayCheckin?.date" class="text-xs">
                  {{ formatDate(todayCheckin.recordedAt || todayCheckin.date) }}
                </span>
              </div>
              <p class="mt-2 text-2xl font-semibold text-gray-900">
                {{ todayCheckin.weightKg ?? todayCheckin.weight_kg ?? '—' }} kg
              </p>
            </div>

            <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>Adherencia y hambre</span>
              </div>
              <div class="mt-3 flex items-center gap-6 text-gray-900">
                <div>
                  <p class="text-2xl font-semibold">{{ todayCheckin.adherencePct ?? todayCheckin.adherence_pct ?? '—' }}%</p>
                  <p class="text-xs text-gray-500">Adherencia</p>
                </div>
                <div>
                  <p class="text-2xl font-semibold">{{ todayCheckin.hungerLvl ?? todayCheckin.hunger_lvl ?? '—' }}/10</p>
                  <p class="text-xs text-gray-500">Hambre</p>
                </div>
              </div>
            </div>

            <div v-if="todayCheckin?.notes" class="md:col-span-2 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <p class="text-sm text-gray-500">Notas</p>
              <p class="mt-2 font-medium text-gray-800">“{{ todayCheckin.notes }}”</p>
            </div>
          </div>

          <div
            v-else
            class="mt-6 rounded-2xl border border-dashed border-primary-200 bg-primary-50 px-5 py-6 text-sm text-primary-700"
          >
            Aún no registras tu check-in de hoy. Haz clic en "Registrar check-in" para actualizar tu progreso.
          </div>

          <div
            v-if="gamification"
            class="mt-6 rounded-2xl border border-primary-100 bg-primary-50 p-5 text-primary-700"
          >
            <p class="text-sm uppercase tracking-[0.35em] text-primary-500">Logros recientes</p>
            <div class="mt-3 flex flex-wrap items-center gap-6 text-lg font-semibold">
              <span>🔥 Racha: {{ gamification.streakDays }} días</span>
              <span>⭐ Puntos: {{ gamification.totalPoints }}</span>
            </div>
          </div>
        </section>

        <!-- Progress card -->
        <section class="grid gap-6 lg:grid-cols-3">
          <article class="rounded-3xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm">
            <p class="text-sm uppercase tracking-[0.35em] text-gray-400">Progreso de hoy</p>
            <div class="mt-6 grid grid-cols-3 gap-5 text-center">
              <div>
                <p class="text-3xl font-semibold text-gray-900">{{ totalConsumedToday }}</p>
                <p class="mt-2 text-xs text-gray-500">Planificadas</p>
              </div>
              <div>
                <p class="text-3xl font-semibold text-gray-900">{{ caloriesTarget }}</p>
                <p class="mt-2 text-xs text-gray-500">Objetivo</p>
              </div>
              <div>
                <p class="text-3xl font-semibold text-primary-500">{{ remainingCalories }}</p>
                <p class="mt-2 text-xs text-gray-500">Restantes</p>
              </div>
            </div>
            <div class="mt-6 h-2 rounded-full bg-gray-100">
              <div
                class="h-2 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all"
                :style="{ width: progressPct + '%' }"
              ></div>
            </div>
          </article>

          <article class="rounded-3xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm lg:col-span-2">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="text-sm uppercase tracking-[0.35em] text-gray-400">Macros objetivo</p>
              <div class="flex gap-3 text-sm text-gray-600">
                <span>Proteína: {{ macroValue('protein') }} g</span>
                <span>Carbohidratos: {{ macroValue('carbs') }} g</span>
                <span>Grasas: {{ macroValue('fat') }} g</span>
              </div>
            </div>
            <div class="mt-6 grid gap-6 md:grid-cols-3">
              <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p class="text-xs uppercase tracking-[0.35em] text-gray-400">Proteína</p>
                <p class="mt-4 text-2xl font-semibold text-gray-900">{{ macroValue('protein') }} g</p>
                <p class="mt-2 text-sm text-gray-500">Mantén la saciedad con proteína magra.</p>
              </div>
              <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p class="text-xs uppercase tracking-[0.35em] text-gray-400">Carbos</p>
                <p class="mt-4 text-2xl font-semibold text-gray-900">{{ macroValue('carbs') }} g</p>
                <p class="mt-2 text-sm text-gray-500">Prioriza carbohidratos complejos.</p>
              </div>
              <div class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p class="text-xs uppercase tracking-[0.35em] text-gray-400">Grasas</p>
                <p class="mt-4 text-2xl font-semibold text-gray-900">{{ macroValue('fat') }} g</p>
                <p class="mt-2 text-sm text-gray-500">Incluye grasas saludables para energía.</p>
              </div>
            </div>
          </article>
        </section>

        <!-- Meals -->
        <section class="rounded-3xl border border-gray-200 bg-white p-8 text-gray-900 shadow-sm">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Comidas de hoy</h2>
              <p class="mt-1 text-sm text-gray-500">
                Sigue el plan para mantener tu objetivo calórico.
              </p>
            </div>
            <div>
              <button
                class="inline-flex items-center gap-2 rounded-xl border border-primary-100 px-5 py-3 text-sm font-medium text-primary-600 transition hover:bg-primary-50"
                @click="handleGenerateShoppingList"
              >
                🛒 Lista de compras
              </button>
            </div>
          </div>

          <div v-if="todayMeals.length" class="mt-8 grid gap-6 lg:grid-cols-2">
            <article
              v-for="meal in todayMeals"
              :key="meal.id || meal.title"
              class="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:border-primary-200 hover:bg-primary-50"
            >
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span class="text-gray-700">{{ getMealSlotLabel(meal.slot || meal.type) }}</span>
                <span class="font-semibold text-primary-500">{{ meal.kcal ?? meal.calories ?? 0 }} kcal</span>
              </div>
              <h3 class="mt-3 text-lg font-semibold text-gray-900">
                {{ meal.title || 'Comida planificada' }}
              </h3>
              <p v-if="meal.description" class="mt-2 text-sm text-gray-500">
                {{ meal.description }}
              </p>
              <div class="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                <span>P: {{ meal.protein_g ?? meal.protein ?? 0 }}g</span>
                <span>C: {{ meal.carbs_g ?? meal.carbs ?? 0 }}g</span>
                <span>G: {{ meal.fat_g ?? meal.fat ?? 0 }}g</span>
              </div>
            </article>
          </div>
          <div v-else class="mt-8 rounded-2xl border border-dashed border-primary-200 bg-primary-50 p-10 text-center text-primary-700">
            No hay comidas planificadas para hoy. Genera un plan para comenzar.
          </div>
        </section>

        <!-- Notes -->
        <section v-if="weeklyPlan.notes" class="rounded-3xl border border-gray-200 bg-white p-8 text-gray-900 shadow-sm">
          <h2 class="text-lg font-semibold text-gray-900">Motivación</h2>
          <p class="mt-3 text-sm text-gray-600">
            {{ weeklyPlan.notes }}
          </p>
        </section>
      </template>

      <!-- Empty state -->
      <section
        v-else
        class="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-8 py-16 text-center text-gray-900 shadow-sm"
      >
        <div class="rounded-2xl border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600">
          Aún no tienes plan
        </div>
        <h2 class="mt-6 text-2xl font-semibold text-gray-900">
          ¡Crea tu primer plan personalizado!
        </h2>
        <p class="mt-3 max-w-xl text-sm text-gray-600">
          Generaremos un plan semanal adaptado a tus objetivos y preferencias. Solo toma unos segundos.
        </p>
        <button
          class="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-600"
          @click="handleGeneratePlan"
        >
          🤖 Crear plan con IA
        </button>
      </section>
        </div>
      </template>
    </div>

    <!-- Plan generating modal -->
    <transition name="fade">
      <div
        v-if="isGenerating"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-gray-900 shadow-xl">
          <p class="text-sm uppercase tracking-[0.35em] text-primary-500">
            Generando plan
          </p>
          <h3 class="mt-3 text-xl font-semibold text-gray-900">
            Estamos creando tu plan nutricional
          </h3>
          <p class="mt-2 text-sm text-gray-600">
            Este proceso puede tardar un par de minutos. Te avisaremos cuando esté listo.
          </p>
          <div class="mt-6 h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              class="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
              :style="{ width: generationProgress + '%' }"
            ></div>
          </div>
          <p class="mt-3 text-right text-sm text-gray-500">
            {{ Math.round(generationProgress) }}%
          </p>
        </div>
      </div>
    </transition>

    <!-- Shopping list modal -->
    <transition name="fade">
      <div
        v-if="showShoppingListModal"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 text-gray-900 shadow-xl">
          <button
            class="absolute right-5 top-5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary-200 hover:text-primary-600"
            @click="closeShoppingListModal"
          >
            Cerrar
          </button>
          <h3 class="text-xl font-semibold">Lista de compras</h3>
          <p class="mt-2 text-sm text-gray-500">
            Ingredientes sugeridos para tu plan semanal.
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

    <!-- Daily check-in modal -->
    <transition name="fade">
      <div
        v-if="showCheckinModal"
        class="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/60 backdrop-blur"
      >
        <div class="relative w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-gray-900 shadow-xl">
          <button
            class="absolute right-5 top-5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary-200 hover:text-primary-600"
            @click="closeCheckinModal"
          >
            Cerrar
          </button>
          <h3 class="text-xl font-semibold text-gray-900">
            {{ hasTodayCheckin ? 'Actualizar check-in' : 'Registrar check-in' }}
          </h3>
          <p class="mt-2 text-sm text-gray-600">
            Cuéntanos cómo te sientes hoy para ajustar tu plan.
          </p>
          <form class="mt-6 space-y-5" @submit.prevent="submitCheckin">
            <div>
              <label class="text-xs uppercase tracking-[0.35em] text-gray-400">Peso (kg)</label>
              <input
                v-model="checkinForm.weightKg"
                type="number"
                step="0.1"
                min="0"
                class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Ej: 81.4"
              />
            </div>
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label class="text-xs uppercase tracking-[0.35em] text-gray-400">Adherencia (%)</label>
                <input
                  v-model="checkinForm.adherencePct"
                  type="number"
                  min="0"
                  max="100"
                  class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="Ej: 90"
                />
              </div>
              <div>
                <label class="text-xs uppercase tracking-[0.35em] text-gray-400">Nivel de hambre (1-10)</label>
                <input
                  v-model="checkinForm.hungerLvl"
                  type="number"
                  min="1"
                  max="10"
                  class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  placeholder="Ej: 4"
                />
              </div>
            </div>
            <div>
              <label class="text-xs uppercase tracking-[0.35em] text-gray-400">Notas</label>
              <textarea
                v-model="checkinForm.notes"
                rows="3"
                class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="¿Cómo te fue hoy?"
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full rounded-xl bg-primary-500 py-3 text-sm font-semibold text-white shadow hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="submittingCheckin"
            >
              {{ submittingCheckin ? 'Guardando...' : hasTodayCheckin ? 'Actualizar check-in' : 'Guardar check-in' }}
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useState } from '#imports'
import { authService } from '~/services/auth'
import { setUserData } from '~/utils/storage'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const router = useRouter()
const loading = ref(true)
const loadingMessage = ref('Cargando tu plan personalizado...')
const error = ref('')

const API_BASE = 'https://api-coach.recomiendameapp.cl'

const user = ref(null)
const userProfile = ref(null)
const weeklyPlan = ref(null)
const todayCheckin = ref(null)
const gamification = ref(null)
const currentWeek = ref('')

const isGenerating = ref(false)
const generationProgress = ref(0)
const pollTimeoutId = ref(null)

const showShoppingListModal = ref(false)
const shoppingListItems = ref([])
const loadingShoppingList = ref(false)

const showCheckinModal = ref(false)
const submittingCheckin = ref(false)
const checkinForm = reactive({
  weightKg: '',
  adherencePct: '',
  hungerLvl: '',
  notes: ''
})

const authUser = useState('auth-user', () => authService.getCachedUser())

const getProfileValue = (payload, paths) => {
  if (!payload) return undefined
  for (const path of paths) {
    const value = path.split('.').reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return acc[key]
      }
      return undefined
    }, payload)

    if (value !== undefined && value !== null) {
      if (typeof value === 'string' && value.trim().length === 0) {
        continue
      }
      return value
    }
  }
  return undefined
}

const needsOnboarding = computed(() => {
  const profile = userProfile.value
  if (!profile) return true

  const height = Number(
    getProfileValue(profile, ['metrics.heightCm', 'metrics.height', 'heightCm', 'height_cm', 'height'])
  )
  const weight = Number(
    getProfileValue(profile, ['metrics.weightKg', 'metrics.weight', 'weightKg', 'weight_kg', 'weight'])
  )
  const activity = getProfileValue(profile, ['activityLevel', 'activity_level', 'lifestyle.activity'])
  const country = getProfileValue(profile, ['country', 'location.country', 'address.country'])

  const hasHeight = Number.isFinite(height) && height > 0
  const hasWeight = Number.isFinite(weight) && weight > 0
  const hasActivity = Boolean(activity)
  const hasCountry = Boolean(country)

  return !hasHeight || !hasWeight || !hasActivity || !hasCountry
})

const todayMeals = computed(() => {
  const plan = weeklyPlan.value
  if (!plan?.days) return []
  const isoDay = getIsoDay(new Date())
  const dayMatch = plan.days.find(day => {
    const index = day.dayIndex ?? day.day_index ?? day.day
    if (typeof index === 'number') {
      return index === isoDay
    }
    if (typeof index === 'string') {
      return Number(index) === isoDay || index.toLowerCase() === isoDayName(isoDay)
    }
    return false
  })
  return dayMatch?.meals ?? []
})

const totalConsumedToday = computed(() => {
  return todayMeals.value.reduce((sum, meal) => sum + Number(meal.kcal ?? meal.calories ?? 0), 0)
})

const caloriesTarget = computed(() => {
  const macros = weeklyPlan.value?.macros
  if (!macros) return 0
  return Number(macros.kcalTarget ?? macros.kcal_target ?? macros.calories ?? 0)
})

const remainingCalories = computed(() => {
  return Math.max(0, caloriesTarget.value - totalConsumedToday.value)
})

const hasTodayCheckin = computed(() => {
  return Boolean(todayCheckin.value)
})

const progressPct = computed(() => {
  if (!caloriesTarget.value) return 0
  return Math.min(100, (totalConsumedToday.value / caloriesTarget.value) * 100)
})

const macroValue = type => {
  const macros = weeklyPlan.value?.macros
  if (!macros) return 0
  const map = {
    protein: macros.protein_g ?? macros.protein ?? 0,
    carbs: macros.carbs_g ?? macros.carbs ?? 0,
    fat: macros.fat_g ?? macros.fat ?? 0
  }
  return Number(map[type] ?? 0)
}

const getMealSlotLabel = slot => {
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

const itemQuantityLabel = item => {
  const rawQuantity = item?.qty ?? item?.quantity ?? 0
  const quantity = Number(rawQuantity ?? 0)
  const unit = item?.unit
  if (!quantity) return 'Sin cantidad'
  const unitLabel = unit && unit.trim().length > 0 ? unit.trim() : 'unidad'
  const formattedQuantity = Number.isInteger(quantity) ? quantity : Number(quantity.toFixed(2))
  return `${formattedQuantity} ${unitLabel}`
}

const itemCategoryLabel = item => {
  if (item?.category) return item.category
  return 'General'
}

const formatDate = value => {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
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

const getCurrentWeekLabel = () => {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), 0, 1)
  const pastDays = Math.floor((now - firstDay) / 86400000)
  const weekNumber = Math.ceil((pastDays + firstDay.getDay() + 1) / 7)
  return `${now.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`
}

const reloadData = async () => {
  try {
    loading.value = true
    loadingMessage.value = 'Actualizando información...'
    await loadData()
  } finally {
    loading.value = false
  }
}

const loadData = async () => {
  try {
    const week = currentWeek.value || getCurrentWeekLabel()
    currentWeek.value = week

    const profileRes = await safeFetch(() => fetchWithAuth('/me/profile'))

    const profileUser = profileRes?.user ? { ...profileRes.user } : null
    const storedUser = authUser.value ? { ...authUser.value } : null
    const resolvedUser = profileUser || storedUser

    if (resolvedUser && profileRes?.email) {
      resolvedUser.email = profileRes.email
    }

    user.value = resolvedUser
    authUser.value = resolvedUser
    if (resolvedUser) {
      setUserData(resolvedUser)
    }
    userProfile.value = profileRes?.profile ?? profileRes

    if (needsOnboarding.value) {
      weeklyPlan.value = null
      todayCheckin.value = null
      gamification.value = null
      error.value = ''
      return
    }

    const [planRes, checkinRes] = await Promise.all([
      safeFetch(() => fetchWithAuth(`/plans?week=${encodeURIComponent(week)}`)),
      safeFetch(() => fetchWithAuth('/checkins/today'))
    ])

    weeklyPlan.value = planRes

    const hasCheckin =
      Boolean(checkinRes?.hasCheckin) ||
      Boolean(checkinRes?.checkin?.id) ||
      Boolean(checkinRes?.checkin?.date)

    if (hasCheckin) {
      todayCheckin.value = checkinRes?.checkin ?? checkinRes
    } else {
      todayCheckin.value = null
    }

    gamification.value = checkinRes?.gamification ?? null

    if (todayCheckin.value) {
      checkinForm.weightKg = todayCheckin.value.weightKg ?? todayCheckin.value.weight_kg ?? ''
      checkinForm.adherencePct = todayCheckin.value.adherencePct ?? todayCheckin.value.adherence_pct ?? ''
      checkinForm.hungerLvl = todayCheckin.value.hungerLvl ?? todayCheckin.value.hunger_lvl ?? ''
      checkinForm.notes = todayCheckin.value.notes ?? ''
    } else {
      checkinForm.weightKg = ''
      checkinForm.adherencePct = ''
      checkinForm.hungerLvl = ''
      checkinForm.notes = ''
    }
  } catch (err) {
    console.error('Error loading data:', err)
    error.value =
      err?.data?.message ||
      err?.statusMessage ||
      err?.message ||
      'No se pudo cargar la información. Intenta nuevamente.'
  }
}

const handleGeneratePlan = async () => {
  if (!currentWeek.value) {
    currentWeek.value = getCurrentWeekLabel()
  }

  if (isGenerating.value) return

  try {
    isGenerating.value = true
    generationProgress.value = 5

    const response = await fetchWithAuth(`/plans/generate?week=${encodeURIComponent(currentWeek.value)}`, {
      method: 'POST',
      body: {}
    })

    if (response?.planId) {
      pollForPlan(response.planId)
    } else {
      generationProgress.value = 100
      await loadData()
      setTimeout(() => {
        isGenerating.value = false
        generationProgress.value = 0
      }, 800)
    }
  } catch (err) {
    console.error('Error generating plan:', err)
    isGenerating.value = false
    generationProgress.value = 0
    error.value =
      err?.data?.message ||
      err?.statusMessage ||
      err?.message ||
      'No se pudo generar el plan. Intenta nuevamente en unos minutos.'
  }
}

const pollForPlan = async (planId, attempt = 0) => {
  const maxAttempts = 20
  const interval = 6000
  generationProgress.value = Math.min(95, (attempt / maxAttempts) * 100)

  try {
    const plan = await fetchWithAuth(`/plans?week=${encodeURIComponent(currentWeek.value)}`)

    if (plan && (plan.id === planId || plan.planId === planId)) {
      generationProgress.value = 100
      setTimeout(async () => {
        weeklyPlan.value = plan
        await loadData()
        isGenerating.value = false
        generationProgress.value = 0
      }, 1000)
      return
    }

    if (attempt >= maxAttempts) {
      isGenerating.value = false
      generationProgress.value = 0
      error.value =
        'Tu plan está tardando más de lo esperado. Actualiza la página en unos minutos para revisar si está listo.'
      return
    }

    pollTimeoutId.value = window.setTimeout(() => {
      pollForPlan(planId, attempt + 1)
    }, interval)
  } catch (err) {
    console.error('Polling error:', err)
    if (attempt >= maxAttempts) {
      isGenerating.value = false
      generationProgress.value = 0
      error.value = 'No pudimos verificar tu plan. Actualiza la página y vuelve a intentarlo.'
      return
    }
    pollTimeoutId.value = window.setTimeout(() => {
      pollForPlan(planId, attempt + 1)
    }, interval)
  }
}

const handleGenerateShoppingList = async () => {
  const planIdentifier = weeklyPlan.value?.id ?? weeklyPlan.value?.planId
  if (!planIdentifier) {
    error.value = 'Genera un plan antes de solicitar la lista de compras.'
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
    error.value =
      err?.data?.message ||
      err?.statusMessage ||
      err?.message ||
      'No pudimos generar la lista de compras en este momento.'
  } finally {
    loadingShoppingList.value = false
  }
}

const closeShoppingListModal = () => {
  showShoppingListModal.value = false
  shoppingListItems.value = []
}

const openCheckinModal = () => {
  showCheckinModal.value = true
}

const closeCheckinModal = () => {
  showCheckinModal.value = false
}

const submitCheckin = async () => {
  if (submittingCheckin.value) return

  try {
    submittingCheckin.value = true
    await fetchWithAuth('/checkins', {
      method: 'POST',
      body: {
        weightKg: checkinForm.weightKg ? Number(checkinForm.weightKg) : undefined,
        adherencePct: checkinForm.adherencePct ? Number(checkinForm.adherencePct) : undefined,
        hungerLvl: checkinForm.hungerLvl ? Number(checkinForm.hungerLvl) : undefined,
        notes: checkinForm.notes || undefined
      }
    })

    await loadData()
    showCheckinModal.value = false
  } catch (err) {
    console.error('Check-in error:', err)
    error.value =
      err?.data?.message ||
      err?.statusMessage ||
      err?.message ||
      'No se pudo guardar el check-in. Intenta nuevamente.'
  } finally {
    submittingCheckin.value = false
  }
}

const openOnboarding = () => {
  if (router) {
    router.push('/download')
  }
}

const safeFetch = async fetcher => {
  try {
    return await fetcher()
  } catch (err) {
    if (err?.status === 404) {
      return null
    }
    throw err
  }
}

const getIsoDay = date => {
  const day = date.getDay()
  return day === 0 ? 7 : day
}

const isoDayName = isoDay => {
  const names = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
    7: 'sunday'
  }
  return names[isoDay] || ''
}

onMounted(async () => {
  if (!getAuthToken()) {
    router.push('/login')
    return
  }
  authUser.value = authService.getCachedUser()
  currentWeek.value = getCurrentWeekLabel()
  await loadData()
  loading.value = false
})

onBeforeUnmount(() => {
  if (pollTimeoutId.value) {
    clearTimeout(pollTimeoutId.value)
  }
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
