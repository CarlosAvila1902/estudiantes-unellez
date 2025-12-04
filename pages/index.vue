<script setup lang="ts">
// Solicitamos los datos a la colección 'estudiantes'
const { data: students } = await useAsyncData('lista-estudiantes', () => {
  return queryCollection('estudiantes').all()
})

const logoUnellez = "https://upload.wikimedia.org/wikipedia/commons/a/af/Logo_UNELLEZ.png"
</script>

<template>
  <v-container>
    <v-row justify="center" class="mb-8 mt-4">
      <v-col cols="12" class="text-center">
        <v-img
          :src="logoUnellez"
          height="120"
          class="mb-4"
          alt="Logo UNELLEZ"
        ></v-img>
        <h1 class="text-h4 font-weight-bold text-primary mb-2">
          Ingeniería en Informática
        </h1>
        <h2 class="text-subtitle-1 text-medium-emphasis">
          Directorio de Estudiantes UNELLEZ Barinitas
        </h2>
      </v-col>
    </v-row>

    <v-row v-if="students && students.length > 0">
      <v-col
        v-for="student in students"
        :key="student.stem"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card 
          elevation="4" 
          class="h-100 d-flex flex-column hover-card"
          :to="'/' + student.stem"
        >
          <v-card-item>
            <template v-slot:prepend>
              <v-avatar color="primary" size="48" class="mr-2">
                <span class="text-h6 text-white font-weight-bold">
                  {{ (student.name || '?' ).charAt(0) }}
                </span>
              </v-avatar>
            </template>
            <v-card-title class="text-h6 font-weight-bold">
              {{ student.name }}
            </v-card-title>
          </v-card-item>

          <v-card-text class="pt-2 flex-grow-1">
            <p class="text-body-2 text-medium-emphasis mb-3 line-clamp-3">
              {{ student.aboutMe || "Sin descripción disponible." }}
            </p>
            
            <div class="d-flex flex-wrap gap-1" v-if="student.techSkills">
              <v-chip
                v-for="skill in student.techSkills.slice(0, 3)"
                :key="skill"
                size="x-small"
                color="primary"
                variant="outlined"
                class="mr-1 mb-1"
              >
                {{ skill }}
              </v-chip>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              variant="text" 
              color="primary" 
              append-icon="mdi-arrow-right"
            >
              Ver Perfil
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert
      v-else
      icon="mdi-school-outline"
      title="No hay estudiantes registrados"
      text="Parece que la base de datos está vacía."
      type="info"
      variant="tonal"
      class="mt-6"
    ></v-alert>

  </v-container>
</template>

<style scoped>
/* Efecto suave al pasar el mouse por encima, osea Bloat */
.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(245, 124, 0, 0.2) !important;
}
/* Limitar texto a 3 líneas para que las tarjetas sean iguales */
.line-clamp-3 {
display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
