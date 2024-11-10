<template>
  <div>
    <form @submit.prevent="loginUser">
      <input v-model="email" type="email" placeholder="Correo Electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Iniciar sesión</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore.js';  

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const userStore = useUserStore();

const loginUser = async () => {
  try {
    console.log('Datos enviados al backend:', {
      email: email.value,
      password: password.value
    });  
    
    const response = await axios.post('http://localhost:5001/api/auth/login', {
      email: email.value,
      password: password.value
    });

   
    userStore.setUserName(response.data.name)
    localStorage.setItem('auth-token', response.data.token);

    
    router.push('/profile');
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || 'Error al iniciar sesión';
    } else {
      errorMessage.value = 'Error en la respuesta del servidor';
    }
    console.error('Error en la respuesta del servidor:', error.response?.data || error.message);
  }
};

</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
