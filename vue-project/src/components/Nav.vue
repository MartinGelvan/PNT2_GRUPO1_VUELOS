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
            <h5>Bienvenido, {{ name }}</h5>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useUserStore } from '../store/userStore.js'; // Asegúrate de que la ruta sea correcta
  
  export default {
    setup() {
      const userStore = useUserStore();
  
      const isAuthenticated = computed(() => userStore.isAuthenticated);
      const name = computed(() => userStore.user?.name || 'Usuario'); // Cambia 'username' a 'name'
  
      const logout = () => {
        userStore.logout();
      };
  
      return { isAuthenticated, name, logout };
    },
  };
  </script>
  
  <style>
  #bienvenido {
    color: wheat;
    padding: 20px;
  }
  </style>
  