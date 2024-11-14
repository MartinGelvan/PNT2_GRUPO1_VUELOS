<template>
  <div class="register-container">
    <div class="register-card">
      <h3 class="text-center mb-4">Crear Cuenta</h3>
      <form @submit.prevent="registerUser">
        <!-- Campo de nombre completo -->
        <div class="mb-3">
          <input 
            v-model="name" 
            type="text" 
            placeholder="Nombre Completo" 
            class="form-control" 
            required />
        </div>

        <!-- Campo de nombre de usuario -->
        <div class="mb-3">
          <input 
            v-model="username" 
            type="text" 
            placeholder="Nombre de Usuario" 
            class="form-control" 
            required />
        </div>

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

        <!-- Botón de registro -->
        <button type="submit" class="btn btn-primary w-100">Registrarse</button>
      </form>
      
      <!-- Mensaje de error (si lo hay) -->
      <p v-if="errorMessage" class="error-message text-center mt-3">{{ errorMessage }}</p>
    </div>
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
const errorMessage = ref('');
const router = useRouter();

const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/register', {
      name: name.value, 
      username: username.value,
      email: email.value,
      password: password.value
    });
    
    // Redirigir a login después del registro exitoso
    router.push('/login');
  } catch (error) {
    // Mostrar mensaje de error en caso de fallo
    errorMessage.value = error.response?.data?.message || 'Error en el registro';
    console.error('Error en el registro:', error.response?.data?.message || error.message);
  }
};
</script>

<style scoped>
/* Fondo de la página */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fc;
}

/* Estilo de la tarjeta de registro */
.register-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

/* Título del formulario de registro */
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

/* Botón de registro */
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
