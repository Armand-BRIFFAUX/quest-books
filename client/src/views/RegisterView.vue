<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Inscription</h1>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Nom d'aventurier</label>
          <input v-model="username" placeholder="Votre pseudo" type="text" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" placeholder="votre@email.com" type="email" required />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input v-model="password" placeholder="••••••••" type="password" required />
        </div>

        <div class="form-group">
          <label for="confirm_password">Confirmer le mot de passe</label>
          <input v-model="confirmPassword" placeholder="••••••••" type="password" required />
        </div>

        <button type="submit" class="btn btn-gold form-submit">Créer mon compte</button>
      </form>

      <p class="auth-footer">
        Déjà un compte ?
        <RouterLink to="/login">Se connecter</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if (confirmPassword.value !== password.value) {
    alert('Confirmation du mot de passe incorrecte')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error)
      return
    }

    router.push('/login')
  } catch (error) {
    console.error(error)
    alert("Erreur lors de l'inscription")
  }
}
</script>
