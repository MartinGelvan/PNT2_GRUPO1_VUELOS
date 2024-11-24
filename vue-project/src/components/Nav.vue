<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Logo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/flights" class="nav-link">Reservar Vuelo</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">Perfil</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/register">Register</router-link>
          </li>

          <li v-if="isAuthenticated">
            <button @click="logout">Logout</button>
          </li>
        </ul>
        <div id="bienvenido" v-if="isAuthenticated">
          <h5>Bienvenido, {{ userName }}</h5>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '../store/userStore.js'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'vue-router';

const userStore = useUserStore();

// Computed properties para verificar autenticación y nombre de usuario
const isAuthenticated = computed(() => userStore.isAuthenticated);
const userName = computed(() => userStore.getUserName || 'Usuario'); // Si no hay nombre, mostrar 'Usuario'

// Acceso al router para redirección
const router = useRouter();

// Cargar datos del usuario desde localStorage al montar el componente
onMounted(() => {
  userStore.loadUserFromStorage(); // Asegura que los datos del usuario se carguen
});

// Función para hacer logout y redirigir al login
function logout() {
  userStore.logout();  // Realizamos el logout
  window.location.replace('/login');  // Redirigimos al login
}
</script>

<style>
#bienvenido {
  color: wheat;
  padding: 20px;
}
</style>
