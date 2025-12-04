import apiClient, { persistSessionFromResponse } from '../utils/apiClient'
import {
  clearSession,
  getUserData,
  setUserData,
  storage,
  USER_DATA_KEY
} from '../utils/storage'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  name?: string
  role?: 'USER' | 'COACH'
}

export interface AuthUser {
  id: string
  email: string
  name?: string
  role?: string
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  access_token?: string
  accessToken?: string
  refresh_token?: string
  refreshToken?: string
  user?: AuthUser
  [key: string]: any
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: payload
    })
    persistSessionFromResponse(response)
    if (!response.user && payload.email) {
      setUserData({
        id: response?.user?.id ?? `user-${Date.now()}`,
        email: payload.email,
        name: payload.email.split('@')[0] ?? payload.email
      })
    }
    return response
  },

  async register(payload: RegisterPayload): Promise<any> {
    const response = await apiClient('/users', {
      method: 'POST',
      body: payload
    })
    return response
  },

  async logout() {
    clearSession()
  },

  async requestPasswordReset(email: string) {
    await apiClient('/auth/request-reset', {
      method: 'POST',
      body: { email }
    })
  },

  async resendVerification(email: string) {
    await apiClient('/auth/resend-email-verification', {
      method: 'POST',
      body: { email }
    })
  },

  async getProfile() {
    const profile = await apiClient('/me/profile')
    setUserData(profile)
    return profile
  },

  getCachedUser<T = AuthUser>() {
    return getUserData<T>()
  },

  clearCachedUser() {
    storage.removeItem(USER_DATA_KEY)
  }
}
