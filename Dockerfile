# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Asegurar que las imágenes estén en public antes del build
RUN cp assets/logo.png public/ || true
RUN cp assets/screens/screen*.jpeg public/ || true

# Construir la aplicación
RUN npm run build

# Etapa de producción con Node.js
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario para producción
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json /app/package.json

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Exponer puerto 3000 (puerto por defecto de Nuxt)
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0

# Comando para iniciar la aplicación
CMD ["node", ".output/server/index.mjs"]