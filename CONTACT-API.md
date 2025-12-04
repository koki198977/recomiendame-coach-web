# API de Contacto - Configuración

## 📧 Endpoint Configurado

La web envía los mensajes de contacto a:

```
POST https://api-coach.recomiendameapp.cl/contact/send-email
```

## 📝 Formato del Request

```bash
curl --location 'https://api-coach.recomiendameapp.cl/contact/send-email' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "to": "coach-contacto@recomiendameapp.cl",
    "from": "usuario@email.com",
    "replyTo": "usuario@email.com",
    "subject": "[Soporte técnico] Contacto Web - Juan Pérez",
    "html": "<!DOCTYPE html><html>...</html>",
    "text": "Versión en texto plano del mensaje"
  }'
```

## 📊 Campos del Body

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `to` | string | ✅ | Email destino (coach-contacto@recomiendameapp.cl) |
| `from` | string | ✅ | Email del usuario que envía |
| `replyTo` | string | ✅ | Email para responder (mismo que from) |
| `subject` | string | ✅ | Asunto del email con formato: `[Tipo] Contacto Web - Nombre` |
| `html` | string | ✅ | Contenido HTML del email (con estilos inline) |
| `text` | string | ✅ | Versión texto plano (fallback) |

## 🎨 Tipos de Asunto

El formulario web mapea estos valores:

| Valor en Form | Texto en Subject |
|---------------|------------------|
| `support` | Soporte técnico |
| `feedback` | Comentarios y sugerencias |
| `business` | Consultas comerciales |
| `privacy` | Privacidad y datos |
| `other` | Otro |

## ✅ Respuesta Exitosa

```json
{
  "success": true,
  "message": "Email enviado exitosamente"
}
```

Status Code: `200`

## ❌ Respuesta de Error

```json
{
  "error": "Failed to send email",
  "details": "..."
}
```

Status Code: `500`

## 🧪 Testing

### 1. Probar el endpoint directamente

```bash
curl --location 'https://api-coach.recomiendameapp.cl/contact/send-email' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "to": "coach-contacto@recomiendameapp.cl",
    "from": "test@example.com",
    "replyTo": "test@example.com",
    "subject": "Test desde curl",
    "html": "<h1>Mensaje de prueba</h1><p>Este es un test del formulario de contacto</p>",
    "text": "Mensaje de prueba\n\nEste es un test del formulario de contacto"
  }'
```

### 2. Probar desde la web local

```bash
# Terminal 1: Iniciar el servidor
npm run dev

# Terminal 2: Probar el endpoint
./test-contact.sh http://localhost:3000
```

### 3. Verificar logs

```bash
# Ver logs en tiempo real
npm run dev | grep "MENSAJE DE CONTACTO"
```

## 🔧 Implementación en el Backend

El backend debe tener este endpoint configurado. Ejemplo con Express + Nodemailer:

```typescript
import express from 'express'
import nodemailer from 'nodemailer'

const router = express.Router()

// Configurar transporter (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// POST /contact/send-email
router.post('/send-email', async (req, res) => {
  try {
    const { to, from, replyTo, subject, html, text } = req.body
    
    // Validar campos
    if (!to || !from || !subject || !html) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      })
    }
    
    // Enviar email
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // Email verificado
      to,
      replyTo,
      subject,
      html,
      text
    })
    
    console.log('Email enviado:', info.messageId)
    
    res.json({ 
      success: true,
      message: 'Email enviado exitosamente'
    })
    
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    })
  }
})

export default router
```

## 🔐 Variables de Entorno Requeridas

```env
# Gmail (Desarrollo)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion

# O usar SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# O usar Resend (Recomendado)
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

## 📋 Checklist de Configuración

- [ ] Endpoint `/contact/send-email` creado en el backend
- [ ] Servicio de email configurado (Nodemailer/SendGrid/Resend)
- [ ] Variables de entorno configuradas
- [ ] CORS habilitado para el dominio de la web
- [ ] Email de destino verificado (coach-contacto@recomiendameapp.cl)
- [ ] Probado con curl
- [ ] Probado desde el formulario web
- [ ] Emails llegan correctamente (revisar spam)

## 🚨 Troubleshooting

### El endpoint retorna 404
- Verifica que la ruta sea `/contact/send-email` (sin `/api`)
- Verifica que el backend esté corriendo
- Revisa los logs del backend

### El endpoint retorna 500
- Revisa los logs del backend para ver el error específico
- Verifica las credenciales del servicio de email
- Verifica que el email de origen esté verificado

### Los emails no llegan
- Revisa la bandeja de spam
- Verifica que el email de destino sea correcto
- Revisa los logs del servicio de email
- Verifica que el dominio esté verificado (SendGrid/Resend)

### Timeout
- Aumenta el timeout en `server/api/contact.post.ts`
- Optimiza el envío de emails en el backend
- Considera usar una cola de trabajos

---

**Estado Actual**: ✅ Configurado para usar `https://api-coach.recomiendameapp.cl/contact/send-email`

**Fallback**: Si el endpoint falla, los mensajes se guardan en los logs del servidor para procesamiento manual.
