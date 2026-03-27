// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@pinia/nuxt',
  ],
  
  css: ['~/assets/main.css'],
  
  nitro: {
    compressPublicAssets: true,
  },
  
  typescript: {
    strict: true,
  },
  
  routeRules: {
    '/': { prerender: true },
  },
  
  app: {
    head: {
      title: 'elsfa-vue',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
