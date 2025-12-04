<script setup lang="ts">
const route = useRoute()

const { data: student } = await useAsyncData(route.path, () => {
  // 1. Obtenemos la ruta actual (ej: /estudiantes/CarlosAvila)
  // 2. Quitamos la barra inicial '/' para que coincida con el 'stem' de la base de datos (ej: estudiantes/CarlosAvila)
  const currentStem = route.path.startsWith('/') ? route.path.slice(1) : route.path
  
  // 3. Buscamos en la colección 'estudiantes'
  return queryCollection('estudiantes').where('stem', '=', currentStem).first()
})
</script>

<template>
  <v-container>
    <v-row justify="center" v-if="student">
      <v-col cols="12" md="8">
        <v-card elevation="10" class="pa-6 rounded-lg">
          
          <div class="d-flex align-center mb-4">
            <div>
              <h1 class="text-h4 font-weight-bold text-primary mb-1">
                {{ student.name }}
              </h1>
              <v-chip v-if="student.experience" size="small" color="info" variant="flat">
                Estudiante de Ingeniería
              </v-chip>
            </div>
          </div>

          <div class="mb-6">
            <h2 class="text-h6 mb-2 d-flex align-center">
              <v-icon icon="mdi-account" start color="primary"></v-icon>
              Acerca de mí
            </h2>
            <p class="text-body-1 text-medium-emphasis-white">
              {{ student.aboutMe }}
            </p>
          </div>

          <v-divider class="mb-6"></v-divider>

          <v-row class="mb-4">
            <v-col cols="12" md="6">
              <h3 class="text-subtitle-1 font-weight-bold mb-3 text-primary">
                Habilidades Técnicas
              </h3>
              <div class="d-flex flex-wrap gap-2">
                <v-chip 
                  v-for="skill in student.techSkills" 
                  :key="skill"
                  color="primary"
                  variant="tonal"
                  class="mr-2 mb-2"
                >
                  {{ skill }}
                </v-chip>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <h3 class="text-subtitle-1 font-weight-bold mb-3 text-success">
                Habilidades Blandas
              </h3>
              <div class="d-flex flex-wrap gap-2">
                <v-chip 
                  v-for="skill in student.softSkills" 
                  :key="skill"
                  color="success"
                  variant="tonal"
                  class="mr-2 mb-2"
                >
                  {{ skill }}
                </v-chip>
              </div>
            </v-col>
          </v-row>

          <div v-if="student.experience && student.experience.length > 0">
            <v-divider class="mb-6"></v-divider>
            <h2 class="text-h6 mb-4 d-flex align-center">
              <v-icon icon="mdi-briefcase" start color="primary"></v-icon>
              Experiencia
            </h2>
            
            <v-timeline density="compact" align="start" side="end">
              <v-timeline-item 
                v-for="(exp, i) in student.experience" 
                :key="i"
                dot-color="primary"
                size="x-small"
              >
                <div class="mb-4">
                  <div class="text-h6 font-weight-bold">{{ exp.role }}</div>
                  <div class="text-subtitle-2 text-primary">{{ exp.organization }} • {{ exp.since }}</div>
                  <div class="text-body-2 mt-2">{{ exp.description }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </div>
          
          <v-card-actions class="mt-4">
            <v-spacer></v-spacer>
            <v-btn 
              to="/" 
              variant="elevated" 
              color="primary"
              prepend-icon="mdi-arrow-left"
            >
              Volver a la lista
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>

    <v-container v-else class="text-center fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6">
          <v-icon icon="mdi-alert-circle-outline" size="64" color="error" class="mb-4"></v-icon>
          <h2 class="text-h4 font-weight-bold mb-2">Estudiante no encontrado</h2>
          <p class="text-body-1 text-medium-emphasis mb-6">
            No pudimos encontrar información para la ruta: {{ route.path }}
          </p>
          <v-btn to="/" color="primary" size="large">Volver al Inicio</v-btn>
        </v-col>
      </v-row>
    </v-container>
    
  </v-container>
</template>