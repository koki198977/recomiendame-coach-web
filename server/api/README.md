# API Endpoints - Recomiéndame Coach Web

## Contacto (POST /api/contact)

Endpoint para procesar mensajes del formulario de contacto.

### Funcionamiento

El endpoint intenta enviar el email usando dos métodos:

1. **Método Principal**: `POST https://api-coach.recomiendameapp.cl/contact/send-email`
2. **Fallback**: Si falla, guarda el mensaje en los logs del servidor para procesamiento manual

### Configuración del Backend

Para que el envío de emails funcione correctamente, necesitas configurar uno de estos endpoints en tu backend:

#### Endpoint Requerido

```typescript
// POST /contact/send-email
{
  "to": "coach-contacto@recomiendameapp.cl",
  "from": "usuario@email.com",
  "replyTo": "usuario@email.com",
  "subject": "[Asunto] Contacto Web - Nombre Apellido",
  "html": "...", // HTML del email
  "text": "..."  // Texto plano alternativo
}
```

**Ejemplo de curl:**
```bash
curl --location 'https://api-coach.recomiendameapp.cl/contact/send-email' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "to": "coach-contacto@recomiendameapp.cl",
    "from": "usuario@email.com",
    "replyTo": "usuario@email.com",
    "subject": "[Soporte técnico] Contacto Web - Juan Pérez",
    "html": "<h1>Test</h1>",
    "text": "Test"
  }'
```

### Configuración de Servicio de Email

En tu backend, puedes usar cualquiera de estos servicios:

#### Nodemailer (Recomendado)

```bash
npm install nodemailer
```

```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// Enviar email
await transporter.sendMail({
  from: emailData.from,
  to: emailData.to,
  replyTo: emailData.replyTo,
  subject: emailData.subject,
  html: emailData.html,
  text: emailData.text
})
```

#### SendGrid

```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

await sgMail.send({
  to: emailData.to,
  from: 'noreply@recomiendameapp.cl', // Email verificado en SendGrid
  replyTo: emailData.replyTo,
  subject: emailData.subject,
  html: emailData.html,
  text: emailData.text
})
```

#### Resend (Moderno y Simple)

```bash
npm install resend
```

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'Recomiéndame Coach <noreply@recomiendameapp.cl>',
  to: emailData.to,
  replyTo: emailData.replyTo,
  subject: emailData.subject,
  html: emailData.html
})
```

### Variables de Entorno

Agrega estas variables en tu backend:

```env
# Para Nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicacion

# Para SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Para Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Testing

Para probar el endpoint localmente:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan@example.com",
    "subject": "support",
    "message": "Hola, necesito ayuda con..."
  }'
```

### Logs

El endpoint registra todos los intentos en la consola del servidor:

- ✅ Éxito: "Email enviado exitosamente"
- ⚠️ Fallback: "Email enviado por endpoint alternativo"
- 📝 Logs: "MENSAJE DE CONTACTO (FALLBACK)" - El mensaje se guardó en logs

### Troubleshooting

#### Error: "Oops, algo salió mal"

1. Verifica que el backend esté corriendo
2. Revisa los logs del servidor web (npm run dev)
3. Verifica que el endpoint del backend exista
4. Comprueba las credenciales del servicio de email
5. Revisa los logs del backend

#### Los emails no llegan

1. Verifica la bandeja de spam
2. Confirma que el email de destino sea correcto
3. Revisa los logs del servicio de email
4. Verifica que el dominio esté verificado (SendGrid/Resend)

#### Timeout

Si el backend tarda mucho:
- Aumenta el timeout en `server/api/contact.post.ts`
- Optimiza el envío de emails en el backend
- Considera usar una cola de trabajos (Bull, BullMQ)

### Mejoras Futuras

- [ ] Implementar rate limiting
- [ ] Agregar CAPTCHA para prevenir spam
- [ ] Guardar mensajes en base de datos
- [ ] Enviar email de confirmación al usuario
- [ ] Implementar webhooks para notificaciones
- [ ] Dashboard para ver mensajes recibidos

---

**Nota**: Actualmente el endpoint usa un sistema de fallback que garantiza que ningún mensaje se pierda, guardándolos en los logs del servidor si los métodos principales fallan.
