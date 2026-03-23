<script setup></script>

<template>
  <nav>
    <RouterLink to="/">Accueil</RouterLink>
    <RouterLink to="/game">Jouer</RouterLink>
    <RouterLink to="/login">Connexion</RouterLink>
    <RouterLink to="/register">Inscription</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped></style>
