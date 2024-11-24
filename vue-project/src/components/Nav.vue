<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">

  <nav class="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
        <i class="bi bi-airplane-fill me-2 icon-white"></i>
        <span>Vuelos App</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">Inicio</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/flights" class="nav-link">Reservar Vuelo</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/profile" class="nav-link">Perfil</router-link>
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <div id="bienvenido" v-if="isAuthenticated" class="me-3 text-light">
            <h6 class="m-0">{{ userName }}</h6>
          </div>
          <ul class="navbar-nav">
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/login" class="btn btn-outline-light btn-sm me-2">Login</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/register" class="btn btn-light btn-sm">Register</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <button @click="logout" class="btn btn-danger btn-sm">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '../store/userStore.js';
import { useRouter } from 'vue-router';

const userStore = useUserStore();

const isAuthenticated = computed(() => userStore.isAuthenticated);
const userName = computed(() => userStore.getUserName || 'Usuario');

const router = useRouter();

onMounted(() => {
  userStore.loadUserFromStorage();
});

function logout() {
  userStore.logout();
  window.location.replace('/login');
}
</script>

<style>
.navbar {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(90deg, #2a2a72, #009ffd);
}

.navbar-brand {
  font-size: 1.5rem;
  color: #ffdd00;
  text-decoration: none;
}

.navbar-brand .icon-white {
  font-size: 1.8rem;
  color: white;
}

.nav-link {
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ffdd00 !important;
}

#bienvenido {
  color: #fff8dc;
}

.btn-outline-light {
  color: #fff;
  border-color: #fff;
}

.btn-outline-light:hover {
  color: #2a2a72;
  background-color: #ffdd00;
  border-color: #ffdd00;
}

.btn-light {
  background-color: #ffdd00;
  color: #2a2a72;
}

.btn-light:hover {
  background-color: #ffe680;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
