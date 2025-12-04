# Changelog - Recomiéndame Coach Web

## [2.0.0] - 2025-12-04

### 🎨 Rediseño Completo de la Web

#### ✨ Página Principal (index.vue)
- **Hero Section Renovado**
  - Integración de Chapi promocionando como imagen principal
  - Gradiente mejorado: primary → secondary
  - Elementos decorativos de fondo
  - Badge con "Coaching Nutricional + Fitness + Red Social"
  - Estadísticas inline (100% Personalizado, 24/7 IA, ∞ Comunidad)
  - Animación flotante para Chapi

- **Sección de Funcionalidades (6 Cards)**
  1. Plan Nutricional IA - 7 días, cambio de comidas, lista de compras, escaneo
  2. Rutinas de Ejercicio - Escaneo equipamiento, videos YouTube, tracking
  3. Red Social Motivadora - Posts, likes, comentarios, seguir usuarios
  4. Tracking Completo - Gráficas, checkin diario, fotos antes/después
  5. Sistema de Logros - Trofeos, celebraciones, galería
  6. Chapi Compañero - Tips, motivación, asistente flotante

- **Proceso en 3 Pasos Mejorado**
  - Diseño con conectores visuales
  - Iconos más grandes con gradientes
  - Imagen de Chapi ejercitándose al final

- **Showcase de Chapi (4 Contextos)**
  - Chapi con lista de compras
  - Chapi ejercitándose
  - Chapi escaneando alimentos
  - Chapi en red social

- **Galería de Screenshots**
  - 5 pantallas de la app
  - Etiquetas actualizadas: Home, Mi Programa, Ejercicios, Social, Perfil

- **Sección de Beneficios**
  - Layout de 2 columnas con imagen de Chapi
  - 5 beneficios principales con iconos

- **Estadísticas de Comunidad**
  - 10K+ Usuarios Activos
  - 50K+ Planes Generados
  - 100K+ Comidas Registradas
  - 25K+ Posts Compartidos

- **CTA Final**
  - Chapi promocionando en el centro
  - Diseño en card con gradiente
  - Beneficios destacados (Gratis, Sin tarjeta, iOS/Android)

#### 🎯 Nueva Página de Funcionalidades (features.vue)
Página completa dedicada a mostrar todas las funcionalidades en detalle:

1. **Onboarding & Perfil**
   - Registro rápido
   - Perfil completo
   - Edición flexible

2. **Home Dashboard**
   - Resumen diario
   - Checkin diario
   - Chapi bubble

3. **Mi Programa (6 Cards)**
   - Generación inteligente
   - 7 días completos
   - Flexibilidad total
   - Lista de compras
   - Registro manual
   - Navegación semanal

4. **Ejercicios**
   - Escaneo de equipamiento
   - Objetivos personalizados
   - Videos integrados
   - Tracking de progreso

5. **Red Social (4 Cards)**
   - Feed personalizado
   - Crear posts
   - Interacciones
   - Comunidad

6. **Progreso (3 Cards)**
   - Gráficas de evolución
   - Comparación de fotos
   - Checkins históricos

7. **Sistema de Logros (8 Trofeos)**
   - Primer checkin
   - 7 días seguidos
   - 30 días seguidos
   - Primera comida
   - 50 comidas
   - Primer post
   - 10 posts
   - 100 likes

#### 📱 Página de Descarga Mejorada (download.vue)
- **Hero Renovado**
  - Layout de 2 columnas
  - Chapi promocionando
  - Beneficios destacados
  - Animación flotante

- **Preview de Funcionalidades**
  - 4 cards con imágenes de Chapi
  - Enlace a página de funcionalidades completa

- **Requisitos del Sistema**
  - iOS y Android con iconos mejorados

- **FAQ Actualizado**
  - Preguntas sobre la app

#### 💬 Página de Contacto Mejorada (contact.vue)
- **Hero Renovado**
  - Layout de 2 columnas
  - Chapi promocionando
  - Beneficios destacados
  - Animación flotante

- **Preview de Funcionalidades**
  - 4 cards con imágenes de Chapi
  - Enlace a página de funcionalidades completa

- **Requisitos del Sistema**
  - iOS y Android con iconos mejorados

- **FAQ Actualizado**
  - Preguntas sobre la app

#### 💬 Página de Contacto Mejorada (contact.vue)
- **Hero con Chapi**
  - Gradiente primary → secondary
  - Chapi promocionando con animación flotante
  - Título "¡Hablemos!" más amigable

- **Formulario Funcional**
  - Envío real de emails a coach-contacto@recomiendameapp.cl
  - Validación de campos
  - Estados de carga
  - Mensajes de éxito mejorados con emojis
  - Mensajes de error descriptivos

- **Chapi al Final**
  - Imagen de Chapi motivando
  - Mensaje "¡Chapi está esperando tu mensaje! 💪"

- **Mejoras Visuales**
  - Sombras mejoradas (shadow-medium)
  - Iconos en títulos
  - Diseño más moderno

#### 🔧 API Backend (server/api/contact.post.ts)
- **Endpoint de Contacto**
  - Validación de campos requeridos
  - Validación de formato de email
  - Mapeo de subjects a texto legible
  - Email HTML formateado con estilos
  - Email de texto plano alternativo
  - Integración con backend de Recomiéndame
  - Manejo de errores robusto
  - Logs de errores para debugging

#### 🎨 Estilos y Animaciones (main.css)
- **Animación Flotante**
  ```css
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  ```
- Aplicada a todas las imágenes de Chapi en hero sections

#### 📝 SEO Mejorado
- **Meta Tags Actualizados**
  - Títulos descriptivos con todas las funcionalidades
  - Descriptions completas
  - Keywords relevantes
  - Open Graph tags para redes sociales

#### 🎨 Assets
- **Imágenes de Chapi Integradas**
  - chapi-3d-promocionando.png - Hero sections
  - chapi-3d-compras.png - Lista de compras
  - chapi-3d-ejercicio-2.png - Motivación
  - chapi-3d-ejercicio-3.png - Rutinas
  - chapi-3d-foto-alimento.png - Escaneo
  - chapi-3d-post.png - Red social

#### 🔧 Mejoras Técnicas
- Componentes más modulares
- Mejor estructura semántica HTML5
- Gradientes consistentes en toda la web
- Sombras y efectos visuales mejorados
- Transiciones suaves
- Hover states en todos los elementos interactivos

### 📚 Documentación
- README.md actualizado con todas las funcionalidades
- CHANGELOG.md creado para tracking de cambios

---

## Resumen de Cambios

### Páginas Modificadas
- ✅ `pages/index.vue` - Rediseño completo
- ✅ `pages/download.vue` - Hero y preview mejorados
- ✅ `pages/contact.vue` - Hero con Chapi, formulario funcional
- ✅ `assets/css/main.css` - Animación flotante agregada

### Páginas Nuevas
- ✅ `pages/features.vue` - Página detallada de funcionalidades

### API Endpoints Nuevos
- ✅ `server/api/contact.post.ts` - Endpoint para envío de emails de contacto

### Archivos Actualizados
- ✅ `README.md` - Documentación completa con sección de contacto
- ✅ `CHANGELOG.md` - Este archivo
- ✅ `TROUBLESHOOTING.md` - Guía de solución de problemas
- ✅ `server/api/README.md` - Documentación del endpoint de contacto
- ✅ `test-contact.sh` - Script de prueba del formulario

### Assets Utilizados
- ✅ 6 imágenes de Chapi integradas en la web

---

**Desarrollado con ❤️ para Recomiéndame Coach**
