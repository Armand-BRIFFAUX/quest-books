<template>
  <div>
    <h2>{{ gameStore.chapter.enemy.name }}</h2>
    <p>{{ gameStore.enemyHp }} / {{ gameStore.enemyMaxHp }}</p>

    <!-- bouton avec clic -->
    <button @click="gameStore.attack()">Attaquer 🎲</button>

    <div>
      <!-- boucle sur un tableau de strings -->
      <p v-for="(message, index) in gameStore.combatLog" :key="index">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
</script>
