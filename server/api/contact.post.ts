import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  console.log("=== Recibiendo solicitud de contacto ===");

  try {
    const body = await readBody(event);
    console.log("Datos recibidos:", {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      subject: body.subject,
    });

    // Validar campos requeridos
    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.subject ||
      !body.message
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Todos los campos son requeridos",
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email inválido",
      });
    }

    // Mapear el subject a texto legible
    const subjectMap: Record<string, string> = {
      support: "Soporte técnico",
      feedback: "Comentarios y sugerencias",
      business: "Consultas comerciales",
      privacy: "Privacidad y datos",
      other: "Otro",
    };

    const subjectText = subjectMap[body.subject] || body.subject;

    // Preparar el email para enviar al backend
    const emailData = {
      to: "coach-contacto@recomiendameapp.cl",
      from: body.email,
      replyTo: body.email,
      subject: `[${subjectText}] Contacto Web - ${body.firstName} ${body.lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4CAF50 0%, #FF9800 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #4CAF50; }
            .value { margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 Nuevo mensaje de contacto - Recomiéndame Coach</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Nombre:</div>
                <div class="value">${body.firstName} ${body.lastName}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${body.email}">${
        body.email
      }</a></div>
              </div>
              
              <div class="field">
                <div class="label">📋 Asunto:</div>
                <div class="value">${subjectText}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Mensaje:</div>
                <div class="value">${body.message.replace(/\n/g, "<br>")}</div>
              </div>
              
              <div class="footer">
                <p>Este mensaje fue enviado desde el formulario de contacto de recomiendameapp.cl</p>
                <p>Fecha: ${new Date().toLocaleString("es-CL", {
                  timeZone: "America/Santiago",
                })}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nuevo mensaje de contacto - Recomiéndame Coach

Nombre: ${body.firstName} ${body.lastName}
Email: ${body.email}
Asunto: ${subjectText}

Mensaje:
${body.message}

---
Este mensaje fue enviado desde el formulario de contacto de recomiendameapp.cl
Fecha: ${new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })}
      `,
    };

    // Intentar enviar al backend de Recomiéndame
    try {
      // Determinar la URL del backend
      // Si estamos en Docker, usar la variable de entorno; si no, usar el dominio
      const backendUrl = process.env.BACKEND_URL || 'https://api-coach.recomiendameapp.cl'
      const contactEndpoint = `${backendUrl}/contact/send-email`
      console.log('🔗 Intentando enviar a:', contactEndpoint)
      const response = await $fetch(contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: emailData,
        timeout: 10000, // 10 segundos timeout
      });

      console.log("✅ Email enviado exitosamente:", response);

      return {
        success: true,
        message: "Mensaje enviado exitosamente",
      };
    } catch (apiError: any) {
      console.error("Error al enviar al backend:", apiError);
      console.error("Detalles del error:", {
        status: apiError.status,
        statusText: apiError.statusText,
        data: apiError.data,
      });

      // Como último recurso, guardar el mensaje en logs del servidor
      console.log("=== MENSAJE DE CONTACTO (FALLBACK) ===");
      console.log("Fecha:", new Date().toISOString());
      console.log("Nombre:", body.firstName, body.lastName);
      console.log("Email:", body.email);
      console.log("Asunto:", subjectText);
      console.log("Mensaje:", body.message);
      console.log("=====================================");

      // Retornar éxito de todas formas para no frustrar al usuario
      // El mensaje quedó registrado en los logs del servidor
      return {
        success: true,
        message: "Mensaje recibido. Te contactaremos pronto.",
        fallback: true,
      };
    }
  } catch (error: any) {
    console.error("Error general al procesar contacto:", error);

    // Si es un error de validación, retornarlo
    if (error.statusCode === 400) {
      throw error;
    }

    // Error genérico
    throw createError({
      statusCode: 500,
      statusMessage:
        "Error al procesar el mensaje. Por favor escríbenos directamente a coach-contacto@recomiendameapp.cl",
    });
  }
});
