<template>
  <div>
    <!-- affiche ici les PV du joueur, genre "PV : 20 / 20" -->
    <p>PV : {{ gameStore.playerHp }} / {{ gameStore.playerMaxHp }}</p>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
</script>
