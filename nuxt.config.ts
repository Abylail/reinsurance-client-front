// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: undefined,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, viewport-fit=cover",
      "apple-touch-icon": "/logo.svg",
      lang: "ru",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    },
  },
  css: ["~/assets/styles/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`
        }
      }
    },
  },

  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL,
    }
  },

  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt',
    // 'nuxt-delay-hydration',
    ['@nuxt/image', {
      format: ['png', 'webp'],
    }],
    ['nuxt-lazy-load', {
      loadingClass: "skeleton-loading"
    }],
  ],

  delayHydration: {
    debug: process.env.NODE_ENV === "development",
    mode: "init",
    postIdleTimeout: {
      mobile: 1000,
      desktop: 1000
    }
  },

  build: {
    transpile: ['vue-i18n']
  },
})
