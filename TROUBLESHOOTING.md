# Troubleshooting - Recomiéndame Coach Web

## 🔴 Error: "Oops, algo salió mal" en Formulario de Contacto

### Síntomas
- Al enviar el formulario de contacto aparece: "Oops, algo salió mal - Error al enviar el mensaje. Por favor intenta de nuevo."
- El formulario no envía el email

### Causas Posibles

#### 1. Backend no está configurado
El endpoint `https://api-coach.recomiendameapp.cl/contact/send-email` no existe o no está respondiendo.

**Solución:**
```bash
# Verificar que el backend esté corriendo
curl https://api-coach.recomiendameapp.cl/health

# Si no responde, iniciar el backend
cd /ruta/al/backend
npm run dev
```

#### 2. Endpoint no existe en el backend
El backend no tiene configurado el endpoint de contacto.

**Solución:**
Crear el endpoint en tu backend. Ver `server/api/README.md` para ejemplos completos.

**Ejemplo rápido con Express:**
```typescript
// backend/routes/contact.ts
import express from 'express'
import nodemailer from 'nodemailer'

const router = express.Router()

// Configurar transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// POST /contact/send-email
router.post('/send-email', async (req, res) => {
  try {
    const { to, from, replyTo, subject, html, text } = req.body
    
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      replyTo,
      subject,
      html,
      text
    })
    
    res.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

export default router
```

#### 3. Servicio de email no configurado
El backend no tiene configurado un servicio de email (SMTP, SendGrid, etc.)

**Solución:**

**Opción A: Gmail (Desarrollo)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion
```

**Nota**: Necesitas crear una "Contraseña de aplicación" en tu cuenta de Google:
1. Ve a https://myaccount.google.com/security
2. Activa "Verificación en 2 pasos"
3. Ve a "Contraseñas de aplicaciones"
4. Genera una nueva contraseña para "Correo"

**Opción B: SendGrid (Producción)**
```bash
npm install @sendgrid/mail
```

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

**Opción C: Resend (Recomendado)**
```bash
npm install resend
```

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

#### 4. CORS bloqueando la petición
El backend no permite peticiones desde el dominio de la web.

**Solución:**
```typescript
// backend/server.ts
import cors from 'cors'

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://recomiendameapp.cl',
    'https://coach.recomiendameapp.cl'
  ],
  credentials: true
}))
```

#### 5. Timeout de la petición
El backend tarda mucho en responder.

**Solución temporal:**
Aumentar el timeout en `server/api/contact.post.ts`:
```typescript
timeout: 30000 // 30 segundos
```

### Debugging Paso a Paso

#### 1. Verificar logs del servidor web
```bash
# Terminal donde corre npm run dev
# Deberías ver:
# === Recibiendo solicitud de contacto ===
# Datos recibidos: { firstName: '...', ... }
```

#### 2. Probar el endpoint local
```bash
./test-contact.sh http://localhost:3000
```

#### 3. Verificar el backend
```bash
# Probar directamente el backend
curl -X POST https://api-coach.recomiendameapp.cl/contact/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "coach-contacto@recomiendameapp.cl",
    "from": "test@example.com",
    "replyTo": "test@example.com",
    "subject": "Test",
    "html": "<p>Test</p>",
    "text": "Test"
  }'
```

#### 4. Revisar logs del navegador
```javascript
// Abrir DevTools (F12) > Console
// Deberías ver el error específico
```

### Solución Temporal (Mientras configuras el backend)

Si necesitas que el formulario funcione YA, puedes usar el sistema de fallback que ya está implementado:

Los mensajes se guardan en los logs del servidor. Para verlos:

```bash
# Ver logs en tiempo real
npm run dev | grep "MENSAJE DE CONTACTO"

# O revisar el archivo de logs si usas PM2
pm2 logs recomiendame-web | grep "MENSAJE DE CONTACTO"
```

Luego puedes copiar manualmente los mensajes y enviarlos por email.

### Solución Definitiva

#### Opción 1: Usar Resend (Más fácil)

1. Crear cuenta en https://resend.com (gratis hasta 3000 emails/mes)
2. Verificar tu dominio
3. Obtener API key
4. Crear endpoint en backend:

```typescript
// backend/routes/contact.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

router.post('/send-email', async (req, res) => {
  try {
    const { to, replyTo, subject, html } = req.body
    
    await resend.emails.send({
      from: 'Recomiéndame Coach <noreply@recomiendameapp.cl>',
      to,
      replyTo,
      subject,
      html
    })
    
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})
```

#### Opción 2: Usar Gmail (Desarrollo)

1. Activar verificación en 2 pasos en Google
2. Crear contraseña de aplicación
3. Configurar Nodemailer (ver ejemplo arriba)

#### Opción 3: Usar SendGrid

1. Crear cuenta en https://sendgrid.com
2. Verificar dominio
3. Obtener API key
4. Instalar `@sendgrid/mail`
5. Configurar (ver `server/api/README.md`)

### Verificar que Funciona

1. Enviar un mensaje de prueba desde el formulario
2. Verificar logs del servidor web
3. Verificar logs del backend
4. Revisar bandeja de entrada de coach-contacto@recomiendameapp.cl
5. Revisar spam si no llega

### Contacto de Emergencia

Si nada funciona, los usuarios pueden contactar directamente:
- Email: coach-contacto@recomiendameapp.cl
- Chat en la app (si está disponible)

---

## Otros Problemas Comunes

### Build falla

```bash
# Limpiar cache
rm -rf .nuxt .output node_modules
npm install
npm run build
```

### Imágenes no cargan

Verificar que las imágenes de Chapi estén en `/assets/`:
```bash
ls -la assets/chapi-3d-*.png
```

### Estilos no se aplican

```bash
# Regenerar Tailwind
npm run dev
# Ctrl+C y volver a iniciar
```

---

**¿Necesitas más ayuda?** Revisa los logs del servidor y comparte el error específico.
