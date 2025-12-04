const isClient = () => typeof window !== 'undefined'

export const ACCESS_TOKEN_KEY = 'recomiendame_access_token'
export const REFRESH_TOKEN_KEY = 'recomiendame_refresh_token'
export const USER_DATA_KEY = 'recomiendame_user_data'

export const storage = {
  getItem(key: string) {
    if (!isClient()) return null
    try {
      return window.localStorage.getItem(key)
    } catch (err) {
      console.error('Error getting item from storage:', err)
      return null
    }
  },
  setItem(key: string, value: string) {
    if (!isClient()) return
    try {
      window.localStorage.setItem(key, value)
    } catch (err) {
      console.error('Error setting item in storage:', err)
    }
  },
  removeItem(key: string) {
    if (!isClient()) return
    try {
      window.localStorage.removeItem(key)
    } catch (err) {
      console.error('Error removing item from storage:', err)
    }
  },
  clearKeys(keys: string[]) {
    keys.forEach(key => storage.removeItem(key))
  }
}

export const getAccessToken = () => storage.getItem(ACCESS_TOKEN_KEY) ?? ''

export const setAccessToken = (token: string) => {
  if (token) {
    storage.setItem(ACCESS_TOKEN_KEY, token)
  }
}

export const setRefreshToken = (token: string) => {
  if (token) {
    storage.setItem(REFRESH_TOKEN_KEY, token)
  }
}

export const clearSession = () => {
  storage.clearKeys([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY])
}

export const setUserData = (data: Record<string, any>) => {
  try {
    storage.setItem(USER_DATA_KEY, JSON.stringify(data))
  } catch (err) {
    console.error('Error saving user data:', err)
  }
}

export const getUserData = <T = any>(): T | null => {
  const raw = storage.getItem(USER_DATA_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch (err) {
    console.error('Error parsing user data from storage:', err)
    return null
  }
}
