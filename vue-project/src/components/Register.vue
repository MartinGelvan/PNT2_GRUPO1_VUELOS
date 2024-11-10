<template>
  <div>
    <form @submit.prevent="registerUser">
      <input v-model="name" type="text" placeholder="Nombre Completo" required />
      <input v-model="username" type="text" placeholder="Nombre de Usuario" required />
      <input v-model="email" type="email" placeholder="Correo Electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const registerUser = async () => {
  try {
    
    const response = await axios.post('http://localhost:5001/api/auth/register', {
      name: name.value, 
      username: username.value,
      email: email.value,
      password: password.value
    });

   
    router.push('/login');  
  } catch (error) {
    console.error('Error en el registro:', error.response?.data?.message || error.message);
  }
};
</script>
