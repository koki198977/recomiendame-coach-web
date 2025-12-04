# Recomiéndame Coach - Sitio Web 🎯

Sitio web oficial de Recomiéndame Coach, tu coach nutricional y fitness con inteligencia artificial. App móvil completa con planes personalizados, rutinas de ejercicio, red social y Chapi, tu compañero 3D.

## 🚀 Características

- **Diseño Moderno**: Interfaz actualizada con gradientes y animaciones
- **Chapi Integrado**: Mascota 3D presente en toda la web
- **Páginas Completas**: Inicio, funcionalidades detalladas, descarga y más
- **Responsive**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Meta tags completos y estructura semántica
- **Rendimiento**: Construido con Nuxt.js 3 y Tailwind CSS

## 🎨 Paleta de Colores

### Colores Principales
- **Verde Principal**: `#4CAF50` - Color primario de la marca
- **Verde Claro**: `#81C784` - Acentos y elementos secundarios  
- **Verde Oscuro**: `#2E7D32` - Textos y elementos de contraste
- **Naranja**: `#FF9800` - Elementos de acción y destacados

### Colores de Soporte
- **Fondo**: `#f5f5f5` - Fondo general de la aplicación
- **Blanco**: `#fff` - Tarjetas y elementos principales
- **Grises**: `#333`, `#666`, `#999` - Textos y elementos neutros

## 📱 Páginas Incluidas

### Páginas Principales
- **`/`** - Página de inicio renovada con:
  - Hero section con Chapi promocionando
  - 6 funcionalidades principales (Nutrición, Ejercicios, Social, Progreso, Logros, Chapi)
  - Proceso en 3 pasos
  - Showcase de Chapi en diferentes contextos
  - Galería de screenshots
  - Sección de beneficios
  - Estadísticas de comunidad
  - CTA final con Chapi

- **`/features`** - Página detallada de funcionalidades con:
  - Onboarding & Perfil
  - Home Dashboard
  - Mi Programa (Plan Nutricional IA)
  - Ejercicios (Rutinas Personalizadas)
  - Red Social (Motivación Comunitaria)
  - Progreso (Tracking Completo)
  - Sistema de Logros con trofeos

- **`/download`** - Descarga mejorada con:
  - Hero con Chapi
  - Preview de funcionalidades con imágenes de Chapi
  - Requisitos del sistema
  - FAQ
  - Enlaces a App Store y Google Play

### Páginas de Soporte
- **`/terms`** - Términos y condiciones completos
- **`/privacy`** - Política de privacidad
- **`/reset-password`** - Formulario para restablecer contraseña
- **`/verify-email`** - Verificación de correo electrónico
- **`/delete-account`** - Proceso de eliminación de cuenta
- **`/request-delete-account`** - Solicitud de eliminación

## 🛠 Tecnologías

- **Nuxt.js 3** - Framework Vue.js para aplicaciones web
- **Tailwind CSS** - Framework de CSS utilitario
- **Vue 3** - Framework JavaScript reactivo
- **TypeScript** - Tipado estático para JavaScript

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🐳 Deployment con Docker

```bash
# Deployment automático (Recomendado)
./deploy.sh

# O manual
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Ver logs
docker-compose logs -f
```

Ver `DEPLOYMENT.md` para guía completa de deployment.

## 📁 Estructura del Proyecto

```
recomiendame-web/
├── assets/
│   └── css/
│       └── main.css          # Estilos globales y Tailwind
├── layouts/
│   └── default.vue           # Layout principal con navegación
├── pages/
│   ├── index.vue            # Página de inicio
│   ├── download.vue         # Descarga de la app
│   ├── contact.vue          # Contacto
│   ├── terms.vue            # Términos y condiciones
│   ├── reset-password.vue   # Restablecer contraseña
│   ├── verify-email.vue     # Verificar email
│   └── delete-account.vue   # Eliminar cuenta
├── nuxt.config.ts           # Configuración de Nuxt
├── tailwind.config.js       # Configuración de Tailwind
└── package.json             # Dependencias del proyecto
```

## 🎯 Funcionalidades de la App Destacadas en la Web

### 1. Onboarding & Perfil
- Registro/Login con email y contraseña
- Perfil completo: edad, peso, altura, género, nivel de actividad, objetivos
- Edición flexible de información

### 2. Home (Dashboard)
- Resumen diario: calorías, macros, comidas registradas
- Checkin diario: peso, adherencia, nivel de hambre, notas
- Chapi bubble: asistente flotante con tips

### 3. Mi Programa (Plan Nutricional)
- Generación con IA basada en perfil y preferencias
- 7 días completos: desayuno, almuerzo, cena, snacks
- Detalles: calorías, macros, ingredientes, instrucciones
- Cambiar comidas individuales o regenerar días
- Lista de compras semanal automática
- Registro manual: buscar, escanear, fotografiar alimentos

### 4. Ejercicios (Workout Plan)
- Generación personalizada (1-7 días/semana)
- Escaneo de equipamiento con fotos
- Objetivos: pérdida de peso, ganancia muscular, mantenimiento
- Videos de YouTube integrados
- Tracking: series, repeticiones, peso

### 5. Social (Red Social)
- Feed: "Todos" y "Siguiendo"
- Crear posts: texto (500 chars) + imagen
- Interacciones: likes, comentarios anidados
- Buscar usuarios, seguir/dejar de seguir
- Notificaciones de interacciones

### 6. Progreso (Progress Tracking)
- Gráficas: peso, adherencia, nivel de hambre (30 días)
- Checkins históricos con notas
- Comparación de fotos antes/después

### 7. Sistema de Logros 🏆
- Trofeos por consistencia (7, 30 días)
- Logros de comidas (primera, 50 comidas)
- Logros sociales (posts, likes)
- Celebraciones animadas con Chapi

### Componentes Web
- ✅ Navegación responsive con menú móvil
- ✅ Footer completo con enlaces
- ✅ Animación flotante de Chapi
- ✅ Gradientes y efectos visuales modernos
- ✅ Showcase de Chapi en diferentes contextos

### SEO y Accesibilidad
- ✅ Meta tags optimizados por página (title, description, keywords, OG tags)
- ✅ Estructura semántica HTML5
- ✅ Navegación accesible por teclado
- ✅ Contraste de colores adecuado
- ✅ Imágenes con alt text descriptivo

## 🔧 Personalización

### Colores
Los colores están definidos en `tailwind.config.js` y pueden modificarse fácilmente:

```javascript
colors: {
  primary: {
    500: '#4CAF50', // Verde principal
    // ... otros tonos
  },
  secondary: {
    500: '#FF9800', // Naranja
    // ... otros tonos
  }
}
```

### Componentes
Los estilos de componentes están en `assets/css/main.css`:

```css
.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 shadow-soft hover:shadow-medium;
}
```

## 📱 Responsive Design

El sitio está optimizado para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🔗 Enlaces Importantes

- **App Store**: Configurar enlace real en `pages/download.vue`
- **Google Play**: Configurar enlace real en `pages/download.vue`
- **Email de Contacto**: coach-contacto@recomiendameapp.cl

## 📧 Configuración del Formulario de Contacto

El formulario de contacto está completamente funcional y envía emails a `coach-contacto@recomiendameapp.cl`.

### Configuración del Backend

Para que funcione correctamente, necesitas configurar el endpoint en tu backend:

```bash
# Ver documentación completa
cat server/api/README.md
```

### Probar el Formulario

```bash
# Iniciar el servidor de desarrollo
npm run dev

# En otra terminal, probar el endpoint
./test-contact.sh http://localhost:3000
```

### Sistema de Fallback

El formulario tiene 3 niveles de respaldo:
1. Intenta enviar al endpoint principal del backend
2. Si falla, intenta con un endpoint alternativo
3. Como último recurso, guarda el mensaje en los logs del servidor

Esto garantiza que ningún mensaje se pierda.

## 📞 Soporte

Para soporte técnico o consultas sobre el sitio web:
- Email: hola@recomiendamecoach.com
- Formulario de contacto: `/contact`

---

Desarrollado con ❤️ para Recomiéndame Coach