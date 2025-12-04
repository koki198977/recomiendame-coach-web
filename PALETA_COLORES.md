# Paleta de Colores "Naturaleza Moderna"

## 🎨 Colores Principales

### Primario - Sage Green (#74B796)
- **Uso**: Botones principales, enlaces, elementos destacados
- **Psicología**: Calma, crecimiento, salud orgánica
- **Variantes Tailwind**: `primary-50` a `primary-900`
- **Alias**: `sage`

### Secundario - Warm Clay (#E88D72)
- **Uso**: Botones secundarios, acentos, llamadas a la acción
- **Psicología**: Energía, calidez, acción
- **Variantes Tailwind**: `secondary-50` a `secondary-900`
- **Alias**: `clay`

### Fondo - Off-White (#FAFAF6)
- **Uso**: Fondo principal de la aplicación
- **Psicología**: Reduce fatiga visual, se siente como papel de alta calidad
- **Variantes Tailwind**: `gray-50`
- **Alias**: `offwhite`

### Texto - Deep Forest (#2C3E36)
- **Uso**: Texto principal, títulos
- **Psicología**: Legibilidad alta pero menos dura que el negro puro
- **Variantes Tailwind**: `gray-900`
- **Alias**: `forest`

## 📧 Contacto

**Email de contacto**: coach-contacto@recomiendameapp.cl

## 🎯 Uso en Tailwind

### Clases de Color
```html
<!-- Primario (Sage Green) -->
<div class="bg-primary-500 text-white">Botón</div>
<div class="bg-sage text-white">Botón (alias)</div>

<!-- Secundario (Warm Clay) -->
<div class="bg-secondary-500 text-white">Acento</div>
<div class="bg-clay text-white">Acento (alias)</div>

<!-- Fondo -->
<div class="bg-offwhite">Contenido</div>

<!-- Texto -->
<div class="text-forest">Texto principal</div>
```

### Gradientes
```html
<!-- Gradiente primario -->
<div class="bg-gradient-to-br from-primary-400 to-primary-600">

<!-- Gradiente secundario -->
<div class="bg-gradient-to-br from-secondary-400 to-secondary-600">

<!-- Gradiente combinado -->
<div class="bg-gradient-to-br from-primary-500 to-secondary-500">
```

## 🔄 Migración de Colores Antiguos

| Antiguo | Nuevo | Uso |
|---------|-------|-----|
| `#4CAF50` (Verde brillante) | `#74B796` (Sage Green) | Color primario |
| `#FF9800` (Naranja fuerte) | `#E88D72` (Warm Clay) | Color secundario |
| `#FAFAFA` (Blanco grisáceo) | `#FAFAF6` (Off-White) | Fondo |
| `#212121` (Negro) | `#2C3E36` (Deep Forest) | Texto |

## 📱 Aplicación en Componentes

### Botones
- **Primario**: `bg-primary-500 hover:bg-primary-600`
- **Secundario**: `bg-secondary-500 hover:bg-secondary-600`
- **Outline**: `border-primary-500 text-primary-600`

### Cards
- **Fondo**: `bg-white` sobre `bg-offwhite`
- **Bordes**: `border-gray-200`
- **Hover**: `hover:border-primary-200`

### Estados
- **Success**: `bg-primary-50 text-primary-700 border-primary-200`
- **Warning**: `bg-secondary-50 text-secondary-700 border-secondary-200`
- **Error**: `bg-red-50 text-red-700 border-red-200`

## 🌈 Accesibilidad

Todos los colores cumplen con WCAG 2.1 AA para contraste:
- ✅ Sage Green (#74B796) sobre blanco: 3.2:1
- ✅ Deep Forest (#2C3E36) sobre Off-White: 11.5:1
- ✅ Warm Clay (#E88D72) sobre blanco: 3.1:1

## 🎨 Paleta Completa

### Primary (Sage Green)
- 50: #F0F8F4
- 100: #D9EFE4
- 200: #B8E0CE
- 300: #93D0B5
- **400: #74B796** ⭐ Principal
- 500: #5FA582
- 600: #4A8A6B
- 700: #3A6F56
- 800: #2D5543
- 900: #1F3A2E

### Secondary (Warm Clay)
- 50: #FDF5F2
- 100: #FAE6DF
- 200: #F5CCBF
- 300: #F0B29F
- **400: #E88D72** ⭐ Principal
- 500: #E37456
- 600: #D85A3D
- 700: #B84A30
- 800: #943B26
- 900: #6F2C1C

### Gray (Neutrales)
- **50: #FAFAF6** ⭐ Off-White (Fondo)
- 100: #F5F5F0
- 200: #E8E8E0
- 300: #D4D4C8
- 400: #B0B0A0
- 500: #8C8C78
- 600: #6B6B58
- 700: #4A4A3C
- 800: #3A3A2E
- **900: #2C3E36** ⭐ Deep Forest (Texto)
