export default defineEventHandler(() => {
  return {
    message: 'Hello from Nuxt.js Server!',
    timestamp: new Date().toISOString(),
  }
})
