// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image'
  ],
  devtools: {
    enabled: true
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },
  compatibilityDate: '2024-04-03',
  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  content: {
    experimental: { nativeSqlite: true },
    build: {
      markdown: {
        // Theme used in all color schemes.
        theme: 'github-light',
        highlight: {
          langs: ['java','docker', 'json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml'],
        },
      },
    },
  },
  components: {
    global: true,
    dirs: [
      '~/components'
    ]
  },
  vite: {
    optimizeDeps: {
      include: []
    }
  },
  // 完全禁用字体
  fonts: false,
  // 如果项目使用了 Nuxt UI 的字体功能，也禁用
  ui: {
    fonts: false
  },

})
