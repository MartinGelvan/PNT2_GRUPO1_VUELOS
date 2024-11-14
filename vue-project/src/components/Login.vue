<template>
  <div class="login-container">
    <div class="login-card">
      <h3 class="text-center mb-4">Iniciar Sesión</h3>
      <form @submit.prevent="loginUser">
        <!-- Campo de correo electrónico -->
        <div class="mb-3">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Correo Electrónico" 
            class="form-control" 
            required />
        </div>

        <!-- Campo de contraseña -->
        <div class="mb-3">
          <input 
            v-model="password" 
            type="password" 
            placeholder="Contraseña" 
            class="form-control" 
            required />
        </div>

        <!-- Botón de inicio de sesión -->
        <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
      </form>

      <!-- Mensaje de error -->
      <p v-if="errorMessage" class="error-message text-center mt-3">{{ errorMessage }}</p>
    </div>
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

    userStore.setUserName(response.data.name);
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
/* Fondo de la página */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fc;
}

/* Estilo de la tarjeta de login */
.login-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

/* Título del login */
h3 {
  font-size: 30px;
  font-weight: bold;
  color: #333;
}

/* Estilo de los inputs */
input {
  font-size: 16px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
}

/* Botón de login */
button {
  font-size: 16px;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Estilo del mensaje de error */
.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
}

/* Animación de hover */
input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}
</style>
