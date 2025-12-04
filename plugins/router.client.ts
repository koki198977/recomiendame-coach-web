export default defineNuxtPlugin(() => {
  // Plugin del lado del cliente para manejar la navegación
  const router = useRouter()
  
  // Manejar errores de navegación
  router.onError((error) => {
    console.error('Router error:', error)
  })
  
  // Interceptar rutas no encontradas y redirigir apropiadamente
  router.beforeEach((to, from, next) => {
    // Verificar si la ruta existe
    const routes = router.getRoutes()
    const routeExists = routes.some(route => route.path === to.path)
    
    if (!routeExists && to.path.startsWith('/dashboard')) {
      // Si es una ruta del dashboard que no existe, redirigir al dashboard principal
      next('/dashboard')
    } else {
      next()
    }
  })
})