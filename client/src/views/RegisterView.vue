<template>
  <div class="register_container">
    <h1 class="register_h1">Inscription</h1>
    <form class="register_form" @submit.prevent="handleRegister">
      <label for="username">Username</label>
      <input v-model="username" placeholder="Username" type="text" required />

      <label for="email">Email :</label>
      <input v-model="email" placeholder="test123@mail.com" type="email" required />

      <label for="password">Password :</label>
      <input v-model="password" placeholder="********" type="password" required />

      <label for="confirm_password">Confirm password :</label>
      <input v-model="confirmPassword" placeholder="********" type="password" required />

      <button type="submit">S'inscrire</button>
    </form>
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
