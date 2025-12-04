<script setup lang="ts">
// Pedimos los datos a la colección 'estudiantes'
const { data: students } = await useAsyncData('lista-estudiantes', () => {
  return queryCollection('estudiantes').all()
})
</script>

<template>
  <main>
    <ContentDoc />

    <v-list lines="two" v-if="students">
      <v-list-item v-for="student in students" :key="student.stem">
        <v-list-item-title>
          <NuxtLink :to="'/' + student.stem">{{ student.name }}</NuxtLink>
        </v-list-item-title>
        
        <v-list-item-subtitle v-if="student.aboutMe">
          {{ student.aboutMe }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <div v-else>
      No se encontraron estudiantes.
    </div>
  </main>
</template>