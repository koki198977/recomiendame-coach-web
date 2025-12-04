#!/bin/bash

# Script de deployment para Recomiéndame Coach Web
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando deployment de Recomiéndame Coach Web..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# 1. Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. ¿Estás en el directorio correcto?"
    exit 1
fi

print_success "Directorio verificado"

# 2. Detener contenedores existentes
echo ""
echo "📦 Deteniendo contenedores existentes..."
docker-compose down || print_warning "No había contenedores corriendo"

# 3. Limpiar imágenes antiguas (opcional)
read -p "¿Deseas limpiar imágenes antiguas? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 Limpiando imágenes antiguas..."
    docker system prune -f
    print_success "Imágenes limpiadas"
fi

# 4. Construir nueva imagen
echo ""
echo "🔨 Construyendo nueva imagen..."
docker-compose build --no-cache

if [ $? -eq 0 ]; then
    print_success "Imagen construida exitosamente"
else
    print_error "Error al construir la imagen"
    exit 1
fi

# 5. Iniciar contenedores
echo ""
echo "🚀 Iniciando contenedores..."
docker-compose up -d

if [ $? -eq 0 ]; then
    print_success "Contenedores iniciados"
else
    print_error "Error al iniciar contenedores"
    exit 1
fi

# 6. Esperar a que la aplicación esté lista
echo ""
echo "⏳ Esperando a que la aplicación esté lista..."
sleep 5

# 7. Verificar que el contenedor está corriendo
if docker ps | grep -q "recomiendame-coach-web"; then
    print_success "Contenedor corriendo correctamente"
else
    print_error "El contenedor no está corriendo"
    echo ""
    echo "Logs del contenedor:"
    docker-compose logs --tail=50
    exit 1
fi

# 8. Probar la aplicación
echo ""
echo "🧪 Probando la aplicación..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081 || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
    print_success "Aplicación respondiendo correctamente (HTTP $HTTP_CODE)"
else
    print_warning "La aplicación respondió con código HTTP $HTTP_CODE"
    echo ""
    echo "Logs recientes:"
    docker-compose logs --tail=20
fi

# 9. Mostrar información
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment completado"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Información del deployment:"
echo "   • URL Local: http://localhost:8081"
echo "   • Contenedor: recomiendame-coach-web"
echo "   • Puerto: 8081 → 3000"
echo ""
echo "📝 Comandos útiles:"
echo "   • Ver logs:      docker-compose logs -f"
echo "   • Reiniciar:     docker-compose restart"
echo "   • Detener:       docker-compose down"
echo "   • Estado:        docker-compose ps"
echo ""

# 10. Preguntar si desea ver los logs
read -p "¿Deseas ver los logs en tiempo real? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📋 Mostrando logs (Ctrl+C para salir)..."
    docker-compose logs -f
fi
