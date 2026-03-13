<template>
  <div class="register_container">
    <h1 class="register_h1">Login</h1>
    <form class="register_form" @submit.prevent="handleLogin">
      <label for="email">Email :</label>
      <input v-model="email" placeholder="test123@mail.com" type="email" required />

      <label for="password">Password :</label>
      <input v-model="password" placeholder="********" type="password" required />

      <button type="submit">Login</button>
    </form>
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
    alert('Erreur')
  }
}
</script>
