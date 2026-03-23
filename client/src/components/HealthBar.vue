<template>
  <div class="health-bar-container">
    <span class="health-label">❤️ Vie</span>
    <div class="health-bar-wrapper">
      <div
        class="health-bar-fill"
        :class="healthColor"
        :style="{ width: healthPercent + '%' }"
      ></div>
    </div>
    <span class="health-text">{{ gameStore.playerHp }} / {{ gameStore.playerMaxHp }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const healthPercent = computed(() => {
  return (gameStore.playerHp / gameStore.playerMaxHp) * 100
})

const healthColor = computed(() => {
  if (healthPercent.value > 60) return 'health-high'
  if (healthPercent.value > 30) return 'health-medium'
  return 'health-low'
})
</script>
