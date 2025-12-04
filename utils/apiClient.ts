import { ofetch } from 'ofetch'
import {
  getAccessToken,
  clearSession,
  setAccessToken,
  setRefreshToken,
  setUserData
} from './storage'

const API_BASE_URL = 'https://api-coach.recomiendameapp.cl'
const DEFAULT_TIMEOUT = 10000

type RequestContext = {
  request: Request
  options: any
}

const apiClient = ofetch.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  async onRequest({ options }: RequestContext) {
    const token = getAccessToken()
    options.headers = options.headers || {}
    if (token) {
      options.headers.Authorization = `Bearer ${token}`
    }
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'
  },
  async onResponse({ response }) {
    // Some endpoints may refresh tokens automatically
    const headers = response.headers
    const newAccess = headers.get('x-access-token')
    const newRefresh = headers.get('x-refresh-token')
    if (newAccess) {
      setAccessToken(newAccess)
    }
    if (newRefresh) {
      setRefreshToken(newRefresh)
    }
  },
  async onResponseError({ response }) {
    if (response?.status === 401) {
      clearSession()
    }
    throw response ?? new Error('API request failed')
  }
})

export const extractTokenFromResponse = (payload: any) => {
  if (!payload || typeof payload !== 'object') return ''
  const candidates = [
    'access_token',
    'accessToken',
    'token',
    'data.access_token',
    'data.accessToken',
    'data.token',
    'token.access_token',
    'token.accessToken'
  ]

  for (const path of candidates) {
    const value = path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), payload)
    if (typeof value === 'string' && value.trim().length > 0) {
      return value
    }
  }
  return ''
}

export const persistSessionFromResponse = (payload: any) => {
  const accessToken = extractTokenFromResponse(payload)
  if (accessToken) {
    setAccessToken(accessToken)
  }

  const refreshTokenCandidates = [
    'refresh_token',
    'refreshToken',
    'token.refresh_token',
    'token.refreshToken',
    'data.refresh_token',
    'data.refreshToken'
  ]

  for (const path of refreshTokenCandidates) {
    const value = path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), payload)
    if (typeof value === 'string' && value.trim().length > 0) {
      setRefreshToken(value)
      break
    }
  }

  if (payload?.user) {
    setUserData(payload.user)
  }
}

export default apiClient
