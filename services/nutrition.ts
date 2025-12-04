import apiClient from '../utils/apiClient'

export interface WeeklyPlan {
  id: string
  userId?: string
  weekStart?: string
  notes?: string
  macros?: {
    kcalTarget: number
    protein_g: number
    carbs_g: number
    fat_g: number
  }
  days: WeeklyPlanDay[]
  [key: string]: any
}

export interface WeeklyPlanDay {
  dayIndex: number
  meals: WeeklyPlanMeal[]
  [key: string]: any
}

export interface WeeklyPlanMeal {
  slot: string
  title: string
  kcal: number
  protein_g?: number
  carbs_g?: number
  fat_g?: number
  description?: string
  tags?: string[]
  [key: string]: any
}

export interface ShoppingListItem {
  name: string
  unit?: string
  qty?: number
  quantity?: number
  estimatedCost?: number
  category?: string
  [key: string]: any
}

export interface ShoppingListResponse {
  planId: string
  items: ShoppingListItem[]
  total?: number
  nextCursor?: string | null
}

export interface CheckinPayload {
  weightKg?: number
  adherencePct?: number
  hungerLvl?: number
  notes?: string
}

export interface CheckinResponse {
  ok?: boolean
  id?: string
  date?: string
  checkin?: any
  gamification?: {
    streakDays: number
    pointsAdded?: number
    unlocked?: string[]
    totalPoints: number
  }
  [key: string]: any
}

export const getCurrentWeekLabel = (): string => {
  const now = new Date()
  const thursday = new Date(now.getTime())
  thursday.setDate(now.getDate() + 3 - ((now.getDay() + 6) % 7))
  const year = thursday.getFullYear()
  const jan4 = new Date(year, 0, 4)
  const firstThursday = new Date(jan4.getTime())
  firstThursday.setDate(jan4.getDate() + 3 - ((jan4.getDay() + 6) % 7))
  const weekNumber = Math.floor((thursday.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
  return `${year}-W${String(weekNumber).padStart(2, '0')}`
}

export const nutritionService = {
  async getProfile() {
    return apiClient('/me/profile')
  },

  async upsertProfile(profile: Record<string, any>) {
    return apiClient('/me/profile', {
      method: 'POST',
      body: profile
    })
  },

  async updateProfile(profile: Record<string, any>) {
    return apiClient('/me/profile', {
      method: 'PUT',
      body: profile
    })
  },

  async updatePreferences(preferences: Record<string, any>) {
    return apiClient('/me/preferences', {
      method: 'POST',
      body: preferences
    })
  },

  async getWeeklyPlan(week?: string): Promise<WeeklyPlan | null> {
    try {
      const targetWeek = week || getCurrentWeekLabel()
      return await apiClient<WeeklyPlan>(`/plans?week=${targetWeek}`)
    } catch (err: any) {
      if (err?.status === 404) {
        return null
      }
      throw err
    }
  },

  async getCurrentPlan() {
    try {
      return await apiClient('/plans/current')
    } catch (err: any) {
      if (err?.status === 404) return null
      throw err
    }
  },

  async listPlans() {
    return apiClient('/plans')
  },

  async getPlanById(id: string) {
    return apiClient(`/plans/${id}`)
  },

  async generatePlan(week?: string) {
    const targetWeek = week || getCurrentWeekLabel()
    return apiClient('/plans/generate', {
      method: 'POST',
      query: { week: targetWeek }
    })
  },

  async regenerateDay(planId: string, dayIndex: number) {
    return apiClient(`/plans/${planId}/days/${dayIndex}/regenerate`, {
      method: 'POST'
    })
  },

  async swapMeal(planId: string, dayIndex: number, mealIndex: number) {
    return apiClient(`/plans/${planId}/days/${dayIndex}/meals/${mealIndex}/swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  async getShoppingList(planId: string, take = 500): Promise<ShoppingListResponse> {
    return apiClient(`/plans/${planId}/shopping-list`, {
      query: { take }
    })
  },

  async exportShoppingList(planId: string) {
    return apiClient<string>(`/plans/${planId}/shopping-list.csv`, {
      responseType: 'text'
    })
  },

  async createCheckin(payload: CheckinPayload) {
    return apiClient<CheckinResponse>('/checkins', {
      method: 'POST',
      body: payload
    })
  },

  async getTodayCheckin() {
    try {
      return await apiClient('/checkins/today')
    } catch (err: any) {
      if (err?.status === 404) return null
      throw err
    }
  },

  async getCheckinHistory(query: { from?: string; to?: string } = {}) {
    try {
      const response = await apiClient('/checkins', {
        query
      })

      if (Array.isArray(response?.items)) {
        return response.items
      }

      if (Array.isArray(response)) {
        return response
      }

      return []
    } catch (err: any) {
      if (err?.status === 404) {
        return []
      }
      throw err
    }
  },

  async getProgress(date: string) {
    try {
      return await apiClient(`/progress/${date}`)
    } catch (err: any) {
      if (err?.status === 404) return null
      throw err
    }
  },

  async getProgressRange(startDate: string, endDate: string) {
    return apiClient('/progress', {
      query: { startDate, endDate }
    })
  },

  async logProgress(payload: Record<string, any>) {
    return apiClient('/progress', {
      method: 'POST',
      body: payload
    })
  },

  async updateProgress(date: string, payload: Record<string, any>) {
    return apiClient(`/progress/${date}`, {
      method: 'PUT',
      body: payload
    })
  },

  async getWeightHistory() {
    return apiClient('/weight')
  },

  async logWeight(payload: Record<string, any>) {
    return apiClient('/weight', {
      method: 'POST',
      body: payload
    })
  },

  async searchFoods(query: string) {
    return apiClient('/foods/search', {
      query: { q: query }
    })
  },

  async getFood(id: string) {
    return apiClient(`/foods/${id}`)
  },

  async getCuisines(params: { search?: string; take?: number; skip?: number } = {}) {
    try {
      return await apiClient('/taxonomies/cuisines', {
        query: params
      })
    } catch (err) {
      return apiClient('/admin/taxonomies/cuisines', {
        query: params
      })
    }
  },

  async getAllergies(params: { search?: string; take?: number; skip?: number } = {}) {
    try {
      return await apiClient('/taxonomies/allergies', {
        query: params
      })
    } catch (err) {
      return apiClient('/admin/taxonomies/allergies', {
        query: params
      })
    }
  },

  async getConditions(params: { search?: string; take?: number; skip?: number } = {}) {
    try {
      return await apiClient('/taxonomies/conditions', {
        query: params
      })
    } catch (err) {
      return apiClient('/admin/taxonomies/conditions', {
        query: params
      })
    }
  }
}
