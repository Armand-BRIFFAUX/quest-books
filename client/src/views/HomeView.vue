<template>
  <div class="home-container">
    <h1 class="home-title">Quest Books</h1>
    <p class="home-subtitle">Incarnez un héros, faites vos choix, forgez votre destin.</p>

    <div v-if="adventure" class="card-parchment home-adventure-card">
      <h2 class="home-adventure-title">{{ adventure.title }}</h2>
      <p class="home-adventure-desc">{{ adventure.description }}</p>
      <RouterLink to="/game" class="btn btn-gold">Commencer l'aventure</RouterLink>
    </div>

    <p v-else class="loading">Chargement</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const adventure = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/adventure')
    const data = await response.json()
    adventure.value = data
  } catch (error) {
    console.error('Erreur lors du chargement :', error)
  }
})
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
}

.home-title {
  font-family: var(--font-title);
  font-size: 4rem;
  color: var(--color-gold);
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 20px rgba(212, 166, 71, 0.3);
  letter-spacing: 3px;
}

.home-subtitle {
  font-size: 1.3rem;
  color: var(--color-muted);
  margin-bottom: 2.5rem;
  max-width: 500px;
  font-style: italic;
}

.home-adventure-card {
  max-width: 550px;
  width: 100%;
  text-align: left;
  background: linear-gradient(170deg, var(--color-parchment) 0%, var(--color-parchment-dark) 100%);
  color: var(--color-text-dark);
  border: none;
  border-radius: 12px;
  padding: 2rem;
  box-shadow:
    var(--shadow-lg),
    inset 0 0 60px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.home-adventure-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}

.home-adventure-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--color-gold-dim), transparent);
}

.home-adventure-card h2 {
  color: #4a3520;
}

.home-adventure-title {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.home-adventure-desc {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #3a2a1a;
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

@media (max-width: 600px) {
  .home-title {
    font-size: 2.5rem;
  }
}
</style>
