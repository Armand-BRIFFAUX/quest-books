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

<style scoped>
.auth-container {
  max-width: 440px;
  margin: 3rem auto;
  padding: 0 1.5rem;
}

.auth-card {
  background: linear-gradient(145deg, var(--color-surface) 0%, #15132a 100%);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.auth-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}

.auth-title {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-muted);
  margin-bottom: 0.4rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 1rem;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-gold-dim);
  box-shadow: 0 0 15px rgba(212, 166, 71, 0.1);
}

.form-group input::placeholder {
  color: #555;
}

.form-submit {
  width: 100%;
  margin-top: 0.5rem;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: var(--color-muted);
}

.auth-footer a {
  color: var(--color-gold);
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
