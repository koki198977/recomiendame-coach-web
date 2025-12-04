export default defineNuxtRouteMiddleware((to, from) => {
  // Solo ejecutar en el cliente
  if (process.server) return

  const getAuthToken = () => {
    if (typeof window === 'undefined') return ''
    try {
      return localStorage.getItem('recomiendame_access_token') || ''
    } catch {
      return ''
    }
  }

  const token = getAuthToken()
  
  // Si hay token, redirigir al dashboard
  if (token) {
    return navigateTo('/dashboard')
  }
})