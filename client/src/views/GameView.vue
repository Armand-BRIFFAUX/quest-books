<template>
  <div v-if="gameStore.chapter" class="game-layout">
    <!-- COLONNE GAUCHE : Stats + Inventaire -->
    <aside class="game-sidebar">
      <!-- Toolbar : sauvegarder / charger -->
      <div v-if="isLoggedIn" class="game-toolbar">
        <button class="btn btn-outline btn-sm" @click="gameStore.saveGame()">💾 Sauvegarder</button>
        <button class="btn btn-outline btn-sm" @click="gameStore.loadGame()">📂 Charger</button>
      </div>

      <!-- Barre de vie du joueur -->
      <HealthBar />

      <!-- Inventaire du joueur -->
      <Inventory />
    </aside>

    <!-- COLONNE DROITE : Histoire -->
    <main class="game-content">
      <!-- Chapitre -->
      <div class="card chapter-card">
        <h1 class="chapter-title">{{ gameStore.chapter.title }}</h1>
        <div class="chapter-divider"></div>

        <!-- Alerte piège -->
        <div v-if="gameStore.trapMessage" class="trap-banner">
          <span class="trap-icon">⚠️</span>
          <p class="trap-text">{{ gameStore.trapMessage }}</p>
        </div>

        <p class="narrative-text">{{ gameStore.chapter.text }}</p>

        <!-- Cas 1 : combat en cours -->
        <div v-if="gameStore.isFighting">
          <CombatPanel />
        </div>

        <!-- Cas 2 : combat gagné (seulement si le joueur est vivant) -->
        <div v-else-if="gameStore.chapter.type === 'combat' && !gameStore.isFighting && gameStore.playerHp > 0">
          <div class="victory-banner">
            <h2>⚔️ Victoire !</h2>
          </div>

          <div class="combat-log" v-if="gameStore.combatLog.length">
            <p
              v-for="(message, index) in gameStore.combatLog"
              :key="index"
              class="combat-log-entry"
            >
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
    </main>
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

<style scoped>
.game-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 1.5rem auto;
  padding: 0 1.5rem;
  align-items: start;
}

.game-sidebar {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-sidebar .game-toolbar {
  display: flex;
  gap: 0.5rem;
}

.game-content {
  min-width: 0;
}

.game-toolbar {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card {
  background: linear-gradient(145deg, var(--color-surface) 0%, #15132a 100%);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-gold-dim), transparent);
}

.chapter-card {
  margin-top: 0.5rem;
}

.chapter-title {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.chapter-divider {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-gold), transparent);
  margin: 1rem 0;
}

.trap-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  background: linear-gradient(145deg, rgba(192, 57, 43, 0.12) 0%, rgba(192, 57, 43, 0.04) 100%);
  border: 1px solid rgba(192, 57, 43, 0.3);
  border-radius: 10px;
  animation: trapAppear 0.5s ease forwards;
}

.trap-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.trap-text {
  color: var(--color-danger-light);
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.5;
}

@keyframes trapAppear {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.narrative-text {
  font-size: 1.15rem;
  line-height: 1.9;
  margin: 1.5rem 0;
  font-style: italic;
}

.choices-container {
  margin-top: 2rem;
}

.combat-log {
  max-height: 200px;
  overflow-y: auto;
  margin: 1rem 0;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.combat-log-entry {
  padding: 0.3rem 0;
  font-size: 0.95rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  animation: fadeInLog 0.3s ease;
}

.combat-log-entry:last-child {
  border-bottom: none;
  color: var(--color-gold);
}

.victory-banner {
  text-align: center;
  padding: 1.5rem;
  margin: 1.5rem 0;
  background: linear-gradient(145deg, rgba(46, 204, 113, 0.1) 0%, transparent 100%);
  border: 1px solid rgba(46, 204, 113, 0.2);
  border-radius: 12px;
}

.victory-banner h2 {
  color: var(--color-success);
  font-size: 2rem;
}

.defeat-banner {
  text-align: center;
  padding: 1.5rem;
  margin: 1.5rem 0;
  background: linear-gradient(145deg, rgba(192, 57, 43, 0.1) 0%, transparent 100%);
  border: 1px solid rgba(192, 57, 43, 0.2);
  border-radius: 12px;
}

.defeat-banner h2 {
  color: var(--color-danger-light);
  font-size: 2rem;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-family: var(--font-title);
  font-size: 1.3rem;
  color: var(--color-muted);
  letter-spacing: 2px;
}

.loading::after {
  content: '...';
  animation: dots 1.5s infinite;
}

@keyframes dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
}

@keyframes fadeInLog {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .game-layout {
    grid-template-columns: 1fr;
  }
  .game-sidebar {
    position: static;
  }
}

@media (max-width: 600px) {
  .health-bar-container {
    flex-wrap: wrap;
  }
}
</style>
