#!/bin/bash

# Script para probar el endpoint de contacto
# Uso: ./test-contact.sh [URL]
# Ejemplo: ./test-contact.sh http://localhost:3000

URL="${1:-http://localhost:3000}"

echo "🧪 Probando endpoint de contacto en: $URL/api/contact"
echo ""

# Datos de prueba
DATA='{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@example.com",
  "subject": "support",
  "message": "Hola, este es un mensaje de prueba desde el script de testing. ¿Pueden confirmar que recibieron este mensaje?"
}'

echo "📤 Enviando mensaje de prueba..."
echo ""

# Hacer la petición
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$URL/api/contact" \
  -H "Content-Type: application/json" \
  -d "$DATA")

# Separar el cuerpo de la respuesta y el código HTTP
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

echo "📊 Código HTTP: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ ¡Éxito! El mensaje fue enviado correctamente"
  echo ""
  echo "📧 Respuesta del servidor:"
  echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
elif [ "$HTTP_CODE" = "400" ]; then
  echo "❌ Error de validación (400)"
  echo ""
  echo "Respuesta:"
  echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
elif [ "$HTTP_CODE" = "500" ]; then
  echo "❌ Error del servidor (500)"
  echo ""
  echo "Respuesta:"
  echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
  echo ""
  echo "💡 Sugerencias:"
  echo "  1. Verifica que el servidor esté corriendo (npm run dev)"
  echo "  2. Revisa los logs del servidor"
  echo "  3. Verifica la configuración del backend"
else
  echo "⚠️  Código HTTP inesperado: $HTTP_CODE"
  echo ""
  echo "Respuesta:"
  echo "$HTTP_BODY"
fi

echo ""
echo "📝 Revisa los logs del servidor para más detalles"
