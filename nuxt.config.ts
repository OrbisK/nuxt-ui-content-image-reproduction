export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/image'],
  // Registers the Prose* components without @nuxt/content
  ui: { prose: true },
  app: { baseURL: '/base/' },
})
