<template>
  <div id="app">
    <!-- Incluir el componente Navbar aquí -->
    <Navbar />
    
    <!-- Aquí se cargarán las vistas de la aplicación según el router -->
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';  // Asegúrate de importar el componente Navbar
</script>

<style>
/* Estilos globales (si es necesario) */
</style>
