<template>
  <div v-if="gameStore.chapter">
    <HealthBar />
    <button v-if="isLoggedIn" @click="gameStore.saveGame()">💾 Sauvegarder</button>
    <button v-if="isLoggedIn" @click="gameStore.loadGame()">📂 Charger ma partie</button>
    <h1>{{ gameStore.chapter.title }}</h1>
    <p>{{ gameStore.chapter.text }}</p>

    <!-- Cas 1 : combat en cours -->
    <div v-if="gameStore.isFighting">
      <CombatPanel />
    </div>

    <!-- Cas 2 : combat gagné, on affiche les choix de victoire -->
    <div v-else-if="gameStore.chapter.type === 'combat' && !gameStore.isFighting">
      <p><strong>⚔️ Victoire !</strong></p>

      <!-- Afficher le journal de combat -->
      <p v-for="(message, index) in gameStore.combatLog" :key="index">
        {{ message }}
      </p>

      <p>{{ gameStore.chapter.onVictory.text }}</p>
      <button
        v-for="choice in gameStore.chapter.onVictory.choices"
        :key="choice.id"
        @click="gameStore.loadChapter(choice.nextChapterId)"
      >
        {{ choice.text }}
      </button>
    </div>

    <div v-else>
      <button
        v-for="choice in gameStore.chapter.choices"
        :key="choice.id"
        @click="gameStore.loadChapter(choice.nextChapterId)"
      >
        {{ choice.text }}
      </button>
    </div>

    <div v-if="gameStore.chapter.type === 'victory'">
      <p>Victoire !!!</p>
      <button @click="gameStore.loadChapter(1)">Recommencer</button>
    </div>

    <div v-else-if="gameStore.chapter.type === 'defeat'">
      <p>Défaite ...</p>
      <button @click="gameStore.loadChapter(1)">Recommencer</button>
    </div>
  </div>

  <p v-else>Chargement...</p>
</template>

<script setup>
import { computed } from 'vue'
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'

import HealthBar from '@/components/HealthBar.vue'
import CombatPanel from '@/components/CombatPanel.vue'

const gameStore = useGameStore()

const isLoggedIn = computed(() => {
  return localStorage.getItem('token') !== null
})

onMounted(() => {
  gameStore.loadChapter(1)
})
</script>
