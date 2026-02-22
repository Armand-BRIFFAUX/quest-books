<template>
  <div v-if="chapter">
    <h1>{{ chapter.title }}</h1>
    <p>{{ chapter.text }}</p>
    <button v-for="choice in chapter.choices" :key="choice.id"  @click="loadChapter(choice.nextChapterId)">
  {{ choice.text }}
</button>

 <div v-if="chapter.type === 'victory'">
  <p>Victoire !!!</p>
  <button @click="loadChapter(1)">Recommencer</button>
  </div>
  
  <div v-else-if="chapter.type === 'defeat'">
  <p>Défaite ...</p>
  <button @click="loadChapter(1)">Recommencer</button>
  </div>

  </div>

  <p v-else>Chargement...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const chapter = ref(null);

const loadChapter = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/chapters/${id}`)
    const data = await response.json()
    chapter.value = data
  } catch (error) {
    console.error('Erreur lors du chargement :', error)
  }
}

onMounted(() => {
  loadChapter(1)
})
</script>
