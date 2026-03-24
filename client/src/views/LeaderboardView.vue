<template>
  <div class="leaderboard-container">
    <h1 class="leaderboard-title">Hall of Fame</h1>
    <p class="leaderboard-subtitle">Les plus grands héros de Sombrebois</p>

    <div v-if="loading" class="loading">Chargement</div>

    <div v-else-if="scores.length === 0" class="leaderboard-empty">
      <p>Aucun héros n'a encore triomphé de l'aventure.</p>
      <RouterLink to="/game" class="btn btn-gold">Relever le défi</RouterLink>
    </div>

    <table v-else class="leaderboard-table">
      <thead>
        <tr>
          <th>Rang</th>
          <th>Joueur</th>
          <th>PV restants</th>
          <th>Temps</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(score, index) in scores"
          :key="score.id"
          :class="{
            'row-gold': index === 0,
            'row-silver': index === 1,
            'row-bronze': index === 2,
            'row-self': score.username === currentUsername,
          }"
        >
          <td class="rank-cell">
            <span v-if="index === 0" class="rank-medal">👑</span>
            <span v-else-if="index === 1" class="rank-medal">🥈</span>
            <span v-else-if="index === 2" class="rank-medal">🥉</span>
            <span v-else class="rank-number">{{ index + 1 }}</span>
          </td>
          <td class="username-cell">{{ score.username }}</td>
          <td class="hp-cell">
            <span class="hp-value">{{ score.playerHp }}</span>
            <span class="hp-label"> PV</span>
          </td>
          <td class="time-cell">{{ formatTime(score.timePlayed) }}</td>
          <td class="date-cell">{{ formatDate(score.completedAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const scores = ref([])
const loading = ref(true)
const currentUsername = ref(null)

// Décoder le username du token JWT
const token = localStorage.getItem('token')
if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    currentUsername.value = payload.username
  } catch {
    // token invalide, on ignore
  }
}

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/leaderboard')
    scores.value = await response.json()
  } catch (error) {
    console.error('Erreur leaderboard:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.leaderboard-container {
  max-width: 750px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

.leaderboard-title {
  font-family: var(--font-title);
  font-size: 2.5rem;
  color: var(--color-gold);
  text-align: center;
  text-shadow: 0 2px 15px rgba(212, 166, 71, 0.3);
}

.leaderboard-subtitle {
  text-align: center;
  color: var(--color-muted);
  font-style: italic;
  margin-bottom: 2rem;
}

.leaderboard-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color-muted);
  font-size: 1.1rem;
}

.leaderboard-empty .btn {
  margin-top: 1.5rem;
}

.leaderboard-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.4rem;
}

.leaderboard-table thead th {
  font-family: var(--font-title);
  color: var(--color-gold-dim);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.leaderboard-table tbody tr {
  background: linear-gradient(145deg, rgba(26, 24, 50, 0.6) 0%, rgba(15, 14, 23, 0.6) 100%);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.leaderboard-table tbody tr:hover {
  background: rgba(212, 166, 71, 0.06);
}

.leaderboard-table td {
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
}

.leaderboard-table td:first-child {
  border-radius: 8px 0 0 8px;
}

.leaderboard-table td:last-child {
  border-radius: 0 8px 8px 0;
}

.rank-cell {
  width: 60px;
  text-align: center;
}

.rank-medal {
  font-size: 1.3rem;
}

.rank-number {
  color: var(--color-muted);
  font-family: var(--font-title);
  font-size: 1.1rem;
}

.username-cell {
  font-weight: 600;
  color: var(--color-text);
}

.hp-cell {
  color: var(--color-success);
}

.hp-value {
  font-weight: 700;
  font-size: 1.05rem;
}

.hp-label {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.time-cell {
  font-family: var(--font-body);
  color: var(--color-muted);
  letter-spacing: 1px;
}

.date-cell {
  font-size: 0.85rem;
  color: var(--color-muted);
}

/* Podium */
.row-gold {
  background: linear-gradient(145deg, rgba(212, 166, 71, 0.12) 0%, rgba(212, 166, 71, 0.04) 100%) !important;
  border-left: 3px solid var(--color-gold);
}

.row-gold .username-cell {
  color: var(--color-gold);
}

.row-silver {
  background: linear-gradient(145deg, rgba(192, 192, 210, 0.08) 0%, transparent 100%) !important;
}

.row-bronze {
  background: linear-gradient(145deg, rgba(180, 120, 60, 0.08) 0%, transparent 100%) !important;
}

/* Ligne du joueur connecté */
.row-self {
  outline: 1px solid var(--color-gold-dim);
}

.row-self .username-cell::after {
  content: ' (vous)';
  font-size: 0.8rem;
  color: var(--color-gold-dim);
  font-weight: 400;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
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

@media (max-width: 600px) {
  .leaderboard-title {
    font-size: 1.8rem;
  }
  .leaderboard-table td,
  .leaderboard-table th {
    padding: 0.6rem 0.5rem;
    font-size: 0.85rem;
  }
  .date-cell {
    display: none;
  }
  thead th:last-child {
    display: none;
  }
}
</style>
