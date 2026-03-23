<template>
  <div class="home-container">
    <h1 class="home-title">Quest Books</h1>
    <p class="home-subtitle">Incarnez un héros, faites vos choix, forgez votre destin.</p>

    <div v-if="adventure" class="card-parchment home-adventure-card">
      <h2 class="home-adventure-title">{{ adventure.title }}</h2>
      <p class="home-adventure-desc">{{ adventure.description }}</p>
      <RouterLink to="/game" class="btn btn-gold">Commencer l'aventure</RouterLink>
    </div>

    <p v-else class="loading">Chargement</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const adventure = ref(null)

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
