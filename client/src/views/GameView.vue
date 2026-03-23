<template>
  <div v-if="gameStore.chapter" class="page-container">
    <!-- Toolbar : sauvegarder / charger -->
    <div v-if="isLoggedIn" class="game-toolbar">
      <button class="btn btn-outline btn-sm" @click="gameStore.saveGame()">💾 Sauvegarder</button>
      <button class="btn btn-outline btn-sm" @click="gameStore.loadGame()">📂 Charger</button>
    </div>

    <!-- Barre de vie du joueur -->
    <HealthBar />
    <!-- Inventaire du joueur -->
    <Inventory />

    <!-- Chapitre -->
    <div class="card chapter-card">
      <h1 class="chapter-title">{{ gameStore.chapter.title }}</h1>
      <div class="chapter-divider"></div>
      <p class="narrative-text">{{ gameStore.chapter.text }}</p>

      <!-- Cas 1 : combat en cours -->
      <div v-if="gameStore.isFighting">
        <CombatPanel />
      </div>

      <!-- Cas 2 : combat gagné -->
      <div v-else-if="gameStore.chapter.type === 'combat' && !gameStore.isFighting">
        <div class="victory-banner">
          <h2>⚔️ Victoire !</h2>
        </div>

        <div class="combat-log" v-if="gameStore.combatLog.length">
          <p v-for="(message, index) in gameStore.combatLog" :key="index" class="combat-log-entry">
            {{ message }}
          </p>
        </div>

        <p class="narrative-text">{{ gameStore.chapter.onVictory.text }}</p>

        <div class="choices-container">
          <button
            v-for="choice in availableVictoryChoices"
            :key="choice.id"
            class="btn-choice"
            @click="gameStore.loadChapter(choice.nextChapterId)"
          >
            {{ choice.text }}
          </button>
        </div>

        <!-- Impasse après victoire -->
        <div v-if="availableVictoryChoices.length === 0">
          <p class="narrative-text">Vous avez déjà exploré tous les chemins...</p>
          <button class="btn btn-gold" @click="gameStore.loadChapter(1)">
            Recommencer l'aventure
          </button>
        </div>
      </div>

      <!-- Cas 3 : chapitre normal -->
      <div v-else>
        <div class="choices-container">
          <button
            v-for="choice in availableChoices"
            :key="choice.id"
            class="btn-choice"
            @click="gameStore.loadChapter(choice.nextChapterId)"
          >
            {{ choice.text }}
          </button>
        </div>

        <!-- Impasse : tous les chemins ont été explorés -->
        <div v-if="availableChoices.length === 0 && gameStore.chapter.choices.length > 0">
          <p class="narrative-text">Vous avez déjà exploré tous les chemins...</p>
          <button class="btn btn-gold" @click="gameStore.loadChapter(1)">
            Recommencer l'aventure
          </button>
        </div>
      </div>

      <!-- Victoire finale -->
      <div v-if="gameStore.chapter.type === 'victory'">
        <div class="victory-banner">
          <h2>🏆 Victoire !</h2>
          <p>Vous avez triomphé de Sombrebois !</p>
        </div>
        <button class="btn btn-gold" @click="gameStore.loadChapter(1)">
          Recommencer l'aventure
        </button>
      </div>

      <!-- Défaite -->
      <div v-else-if="gameStore.chapter.type === 'defeat'">
        <div class="defeat-banner">
          <h2>💀 Défaite</h2>
          <p>Votre aventure s'arrête ici...</p>
        </div>
        <button class="btn btn-danger" @click="gameStore.loadChapter(1)">
          Retenter l'aventure
        </button>
      </div>
    </div>
  </div>

  <p v-else class="loading">Chargement</p>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import HealthBar from '@/components/HealthBar.vue'
import CombatPanel from '@/components/CombatPanel.vue'
import Inventory from '@/components/Inventory.vue'

const gameStore = useGameStore()

const isLoggedIn = computed(() => {
  return localStorage.getItem('token') !== null
})

const availableChoices = computed(() => {
  if (!gameStore.chapter || !gameStore.chapter.choices) return []
  return gameStore.chapter.choices.filter(
    (choice) => !gameStore.visitedChapters.includes(choice.nextChapterId),
  )
})

const availableVictoryChoices = computed(() => {
  if (!gameStore.chapter || !gameStore.chapter.onVictory) return []
  return gameStore.chapter.onVictory.choices.filter(
    (choice) => !gameStore.visitedChapters.includes(choice.nextChapterId),
  )
})

onMounted(() => {
  gameStore.loadChapter(1)
})
</script>
