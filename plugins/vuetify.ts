// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxt) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            primary: '#F57C00',   // Naranja UNELLEZ
            secondary: '#FFFFFF', // Blanco
            background: '#121212', // Fondo oscuro 
            surface: '#1E1E1E',    // Color de las tarjetas
            error: '#CF6679',
          },
        },
      },
    }
  })

  nuxt.vueApp.use(vuetify)
})