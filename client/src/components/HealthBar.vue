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

<style scoped>
.health-bar-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.health-label {
  font-family: var(--font-title);
  color: var(--color-gold);
  font-size: 1rem;
  min-width: 100px;
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

.health-high {
  background: linear-gradient(90deg, var(--color-success-dark), var(--color-success));
}

.health-medium {
  background: linear-gradient(90deg, #e67e22, #f39c12);
}

.health-low {
  background: linear-gradient(90deg, #962d22, var(--color-danger-light));
}

.health-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-muted);
  min-width: 65px;
  text-align: right;
}
</style>
