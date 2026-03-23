<template>
  <nav class="navbar">
    <RouterLink to="/" class="navbar-brand">⚔️ Quest Books</RouterLink>
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
