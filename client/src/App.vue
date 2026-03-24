<template>
  <nav class="navbar">
    <RouterLink to="/" class="navbar-brand">⚔️ Le livre dont vous etes le héro</RouterLink>
    <div class="navbar-links">
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/game">Jouer</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login">Connexion</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/register">Inscription</RouterLink>
      <a v-if="isLoggedIn" href="#" @click.prevent="logout">Déconnexion</a>
    </div>
  </nav>
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoggedIn = computed(() => {
  return localStorage.getItem('token') !== null
})

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: linear-gradient(180deg, rgba(15, 14, 23, 0.95) 0%, rgba(15, 14, 23, 0.7) 100%);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--color-gold);
  text-decoration: none;
  letter-spacing: 1px;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.navbar-links a {
  font-family: var(--font-body);
  color: var(--color-muted);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  position: relative;
}

.navbar-links a:hover,
.navbar-links a.router-link-active {
  color: var(--color-gold);
}

.navbar-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-gold);
  border-radius: 1px;
}

@media (max-width: 600px) {
  .navbar {
    padding: 0.75rem 1rem;
  }
  .navbar-links {
    gap: 1rem;
  }
}
</style>
