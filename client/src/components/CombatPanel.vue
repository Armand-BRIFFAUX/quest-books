<template>
  <div class="combat-panel">
    <div class="combat-header">
      <span class="enemy-name">{{ gameStore.chapter.enemy.name }}</span>
      <span class="enemy-hp">❤️ {{ gameStore.enemyHp }} / {{ gameStore.enemyMaxHp }}</span>
    </div>

    <!-- Barre de vie du monstre -->
    <div class="health-bar-wrapper" style="margin-bottom: 1rem">
      <div class="health-bar-fill health-low" :style="{ width: enemyHealthPercent + '%' }"></div>
    </div>

    <!-- Journal de combat -->
    <div class="combat-log" v-if="gameStore.combatLog.length">
      <p
        v-for="(message, index) in gameStore.combatLog"
        :key="index"
        class="combat-log-entry"
        :class="message.includes('infligez') ? 'log-player' : 'log-enemy'"
      >
        {{ message }}
      </p>
    </div>

    <!-- Animation des dés (inline dans le panneau) -->
    <DiceRoll
      :result="diceResult"
      :enemy-name="gameStore.chapter.enemy.name"
      @done="onDiceDone"
    />

    <!-- Bouton attaquer -->
    <button class="btn-attack" :disabled="isAnimating" @click="handleAttack">
      🎲 Attaquer
    </button>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import DiceRoll from './DiceRoll.vue'

const gameStore = useGameStore()

const isAnimating = ref(false)
const diceResult = ref(null)

const enemyHealthPercent = computed(() => {
  return (gameStore.enemyHp / gameStore.enemyMaxHp) * 100
})

const handleAttack = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  // Reset d'abord pour que le watch détecte le changement
  diceResult.value = null
  nextTick(() => {
    diceResult.value = gameStore.rollAttack()
  })
}

const onDiceDone = () => {
  // Sauvegarder le résultat avant de reset
  const result = diceResult.value
  // Masquer les dés
  diceResult.value = null
  isAnimating.value = false
  // Appliquer les dégâts après que les dés ont disparu
  if (result) {
    gameStore.applyAttack(result)
  }
}
</script>

<style scoped>
.combat-panel {
  background: linear-gradient(145deg, rgba(192, 57, 43, 0.08) 0%, rgba(15, 14, 23, 0.5) 100%);
  border: 1px solid rgba(192, 57, 43, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.combat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(192, 57, 43, 0.15);
}

.enemy-name {
  font-family: var(--font-title);
  font-size: 1.4rem;
  color: var(--color-danger-light);
}

.enemy-hp {
  color: var(--color-muted);
  font-size: 0.95rem;
}

.health-bar-wrapper {
  flex: 1;
  height: 18px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 9px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.health-bar-fill {
  height: 100%;
  border-radius: 9px;
  transition:
    width 0.5s ease,
    background 0.5s ease;
  position: relative;
  overflow: hidden;
}

.health-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
}

.health-low {
  background: linear-gradient(90deg, #962d22, var(--color-danger-light));
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

.log-player {
  color: var(--color-success);
}

.log-enemy {
  color: var(--color-danger-light);
}

.btn-attack {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-family: var(--font-title);
  background: linear-gradient(135deg, var(--color-danger) 0%, #7a1a10 100%);
  color: white;
  border: 1px solid rgba(192, 57, 43, 0.4);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.btn-attack:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-danger-light) 0%, var(--color-danger) 100%);
  transform: scale(1.02);
  box-shadow: 0 0 25px rgba(192, 57, 43, 0.3);
}

.btn-attack:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
</style>
