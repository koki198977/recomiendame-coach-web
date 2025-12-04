// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  ssr: false, // Deshabilitar SSR para evitar problemas de hidratación
  nitro: {
    prerender: {
      failOnError: false,
      routes: ['/reset-password', '/delete-account', '/request-delete-account', '/verify-email'],
      ignore: ['/auth/verify-email']
    }
  },
  app: {
    head: {
      title: "Recomiéndame Coach - Tu Coach Nutricional con IA",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Recomiéndame Coach es tu asistente nutricional personalizado con inteligencia artificial. Obtén planes de alimentación personalizados, seguimiento de progreso y una comunidad de apoyo.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
