

<template>
  <div id="app">
    <!-- Incluir el componente Navbar aquí -->
   <!--  <Navbar /> -->
     <Nav></Nav>
    
    <!-- Aquí se cargarán las vistas de la aplicación según el router -->
    <router-view />
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue';
import Navbar from './components/Navbar.vue'; 
import { onMounted } from 'vue';
import {useUserStore} from './store/userStore.js';

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUserFromStorage();  // Cargar el usuario desde localStorage al montar el componente
});
</script>

<style>
/* Estilos globales (si es necesario) */
</style>
