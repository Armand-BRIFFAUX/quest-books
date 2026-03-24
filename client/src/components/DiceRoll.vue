<template>
  <div v-if="isVisible" class="dice-zone">
    <div class="dice-scene">
      <!-- Dés du joueur -->
      <div class="dice-group">
        <span class="dice-group-label">Vous</span>
        <div class="dice-pair">
          <div class="dice" :class="{ rolling: isRolling, landed: hasLanded, 'dice-player': true }">
            <div class="dice-face">
              <DiceDots :value="displayDice[0]" />
            </div>
          </div>
          <div
            class="dice"
            :class="{ rolling: isRolling, landed: hasLanded, 'dice-player': true }"
            style="animation-delay: 0.1s"
          >
            <div class="dice-face">
              <DiceDots :value="displayDice[1]" />
            </div>
          </div>
        </div>
        <span v-if="hasLanded" class="dice-total dice-total-player">{{ result.playerRoll }}</span>
      </div>

      <!-- VS -->
      <div class="dice-vs" :class="{ show: hasLanded }">VS</div>

      <!-- Dés du monstre -->
      <div class="dice-group">
        <span class="dice-group-label">{{ enemyName }}</span>
        <div class="dice-pair">
          <div class="dice" :class="{ rolling: isRolling, landed: hasLanded, 'dice-enemy': true }">
            <div class="dice-face">
              <DiceDots :value="displayDice[2]" />
            </div>
          </div>
          <div
            class="dice"
            :class="{ rolling: isRolling, landed: hasLanded, 'dice-enemy': true }"
            style="animation-delay: 0.15s"
          >
            <div class="dice-face">
              <DiceDots :value="displayDice[3]" />
            </div>
          </div>
        </div>
        <span v-if="hasLanded" class="dice-total dice-total-enemy">{{ result.enemyRoll }}</span>
      </div>
    </div>

    <!-- Résultat -->
    <div
      v-if="showResult"
      class="dice-result"
      :class="result.playerHits ? 'result-hit' : 'result-miss'"
    >
      {{ result.playerHits ? '⚔️ Vous touchez !' : '🩸 Le monstre riposte !' }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import DiceDots from './DiceDots.vue'

const props = defineProps({
  result: { type: Object, default: null },
  enemyName: { type: String, default: 'Ennemi' },
})

const emit = defineEmits(['done'])

const isVisible = ref(false)
const isRolling = ref(false)
const hasLanded = ref(false)
const showResult = ref(false)
const displayDice = ref([1, 1, 1, 1])

let rollInterval = null
let timeouts = []

const clearAllTimers = () => {
  if (rollInterval) {
    clearInterval(rollInterval)
    rollInterval = null
  }
  timeouts.forEach((t) => clearTimeout(t))
  timeouts = []
}

const randomFace = () => Math.floor(Math.random() * 6) + 1

watch(
  () => props.result,
  (val) => {
    if (!val) {
      // Reset quand le parent met result à null
      isVisible.value = false
      isRolling.value = false
      hasLanded.value = false
      showResult.value = false
      clearAllTimers()
      return
    }
    clearAllTimers()

    // Lancer l'animation
    isVisible.value = true
    isRolling.value = true
    hasLanded.value = false
    showResult.value = false

    // Faces aléatoires pendant le lancer
    rollInterval = setInterval(() => {
      displayDice.value = [randomFace(), randomFace(), randomFace(), randomFace()]
    }, 80)

    // Arrêt du lancer → afficher les vrais résultats
    timeouts.push(
      setTimeout(() => {
        clearInterval(rollInterval)
        rollInterval = null
        isRolling.value = false
        hasLanded.value = true
        displayDice.value = [
          val.playerDice[0],
          val.playerDice[1],
          val.enemyDice[0],
          val.enemyDice[1],
        ]
      }, 1000),
    )

    // Afficher le texte de résultat
    timeouts.push(
      setTimeout(() => {
        showResult.value = true
      }, 1400),
    )

    // Signaler la fin → le parent applique les dégâts
    timeouts.push(
      setTimeout(() => {
        emit('done')
      }, 3000),
    )
  },
)

onUnmounted(clearAllTimers)
</script>

<style scoped>
.dice-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1.25rem 0;
  padding: 1.25rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  animation: zoneAppear 0.3s ease forwards;
}

.dice-scene {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.dice-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.dice-group-label {
  font-family: var(--font-title);
  font-size: 0.85rem;
  color: var(--color-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.dice-pair {
  display: flex;
  gap: 0.6rem;
}

.dice {
  width: 56px;
  height: 56px;
}

.dice-face {
  width: 100%;
  height: 100%;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    var(--shadow-sm),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.08);
}

.dice-player .dice-face {
  background: linear-gradient(145deg, #2a2548 0%, #1a1832 100%);
  border: 2px solid var(--color-gold-dim);
}

.dice-enemy .dice-face {
  background: linear-gradient(145deg, #3a1a1a 0%, #2a1010 100%);
  border: 2px solid rgba(192, 57, 43, 0.5);
}

.dice.rolling {
  animation: diceRoll 0.3s ease-in-out infinite;
}

.dice.rolling:nth-child(2) {
  animation-delay: 0.1s;
}

.dice.landed {
  animation: diceBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.dice.landed:nth-child(2) {
  animation-delay: 0.08s;
}

.dice-total {
  font-family: var(--font-title);
  font-size: 1.4rem;
  letter-spacing: 2px;
  animation: fadeUp 0.3s ease forwards;
}

.dice-total-player {
  color: var(--color-gold);
  text-shadow: 0 0 15px rgba(212, 166, 71, 0.4);
}

.dice-total-enemy {
  color: var(--color-danger-light);
  text-shadow: 0 0 15px rgba(231, 76, 60, 0.4);
}

.dice-vs {
  font-family: var(--font-title);
  font-size: 1.1rem;
  color: var(--color-muted);
  opacity: 0;
  transition: opacity 0.3s ease;
  letter-spacing: 2px;
}

.dice-vs.show {
  opacity: 1;
}

.dice-result {
  font-family: var(--font-title);
  font-size: 1.15rem;
  letter-spacing: 1px;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  animation: resultAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.result-hit {
  color: var(--color-gold);
  background: rgba(212, 166, 71, 0.1);
  border: 1px solid rgba(212, 166, 71, 0.25);
}

.result-miss {
  color: var(--color-danger-light);
  background: rgba(192, 57, 43, 0.1);
  border: 1px solid rgba(192, 57, 43, 0.25);
}

@keyframes zoneAppear {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes diceRoll {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(12deg) scale(1.05);
  }
  50% {
    transform: rotate(-8deg) scale(0.95);
  }
  75% {
    transform: rotate(5deg) scale(1.02);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

@keyframes diceBounce {
  0% {
    transform: scale(0.7) rotate(-10deg);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.15) rotate(3deg);
  }
  70% {
    transform: scale(0.95) rotate(-1deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes resultAppear {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 600px) {
  .dice-scene {
    gap: 0.75rem;
  }
  .dice {
    width: 44px;
    height: 44px;
  }
}
</style>
