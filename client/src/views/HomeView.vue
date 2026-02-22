<template>
  <div v-if="adventure">
    <h1>{{ adventure.title }}</h1>
    <p>{{ adventure.description }}</p>
    <RouterLink to="/game">Commencer l'aventure</RouterLink>
  </div>

  <p v-else>Chargement...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const adventure = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/adventure')
    const data = await response.json()
    adventure.value = data
  } catch (error) {
    console.error('Erreur lors du chargement :', error)
  }
})
</script>
