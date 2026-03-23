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

    <!-- Bouton attaquer -->
    <button class="btn-attack" @click="gameStore.attack()">🎲 Attaquer</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const enemyHealthPercent = computed(() => {
  return (gameStore.enemyHp / gameStore.enemyMaxHp) * 100
})
</script>
