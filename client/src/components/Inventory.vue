<template>
  <div class="inventory-panel">
    <h3 class="inventory-title">🎒 Inventaire</h3>

    <!-- Emplacements d'équipement -->
    <div class="equipment-slots">
      <div class="equipment-slot">
        <span class="slot-label">⚔️ Arme</span>
        <span v-if="gameStore.equipment.weapon" class="slot-item">
          {{ gameStore.equipment.weapon.name }}
        </span>
        <span v-else class="slot-empty">Vide</span>
      </div>
      <div class="equipment-slot">
        <span class="slot-label">🛡️ Armure</span>
        <span v-if="gameStore.equipment.armor" class="slot-item">
          {{ gameStore.equipment.armor.name }}
        </span>
        <span v-else class="slot-empty">Vide</span>
      </div>
    </div>

    <!-- Stats du joueur -->
    <div class="player-stats">
      <span>⚔️ ATK : {{ gameStore.playerAttack }}</span>
      <span>🛡️ DEF : {{ gameStore.playerDefense }}</span>
    </div>

    <!-- Liste des objets -->
    <div v-if="gameStore.inventory.length > 0" class="inventory-items">
      <div v-for="item in gameStore.inventory" :key="item.id" class="inventory-item">
        <div class="item-info">
          <span class="item-icon">{{ item.type === 'potion' ? '🧪' : '✨' }}</span>
          <div>
            <span class="item-name">{{ item.name }}</span>
            <span class="item-desc">{{ item.description }}</span>
          </div>
        </div>
        <button class="btn btn-sm btn-gold" @click="gameStore.useItem(item.id)">
          {{ item.type === 'potion' ? 'Boire' : 'Équiper' }}
        </button>
      </div>
    </div>

    <p v-else class="inventory-empty">Votre sac est vide...</p>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
</script>

<style scoped>
.inventory-panel {
  background: linear-gradient(145deg, rgba(26, 24, 50, 0.9) 0%, rgba(15, 14, 23, 0.9) 100%);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.inventory-title {
  font-family: var(--font-title);
  color: var(--color-gold);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.equipment-slots {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.equipment-slot {
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.slot-label {
  font-size: 0.8rem;
  color: var(--color-muted);
  font-family: var(--font-title);
}

.slot-item {
  color: var(--color-gold);
  font-size: 0.9rem;
  font-weight: 600;
}

.slot-empty {
  color: #444;
  font-size: 0.85rem;
  font-style: italic;
}

.player-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--color-text);
}

.inventory-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.inventory-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  transition: all 0.3s ease;
}

.inventory-item:hover {
  background: rgba(212, 166, 71, 0.06);
  border-color: var(--color-gold-dim);
}

.item-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.item-icon {
  font-size: 1.3rem;
}

.item-name {
  display: block;
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.95rem;
}

.item-desc {
  display: block;
  color: var(--color-muted);
  font-size: 0.8rem;
}

.inventory-empty {
  color: #555;
  font-style: italic;
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem;
}
</style>
