<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Connexion</h1>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" placeholder="votre@email.com" type="email" required />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input v-model="password" placeholder="••••••••" type="password" required />
        </div>

        <button type="submit" class="btn btn-gold form-submit">Se connecter</button>
      </form>

      <p class="auth-footer">
        Pas encore de compte ?
        <RouterLink to="/register">S'inscrire</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  if (!password.value || !email.value) {
    alert('Mot de passe ou e-mail incorrect')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error)
      return
    }

    localStorage.setItem('token', data.token)

    router.push('/game')
  } catch (error) {
    console.error(error)
    alert('Erreur de connexion')
  }
}
</script>
