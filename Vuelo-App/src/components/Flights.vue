<template>
  <div>
    <h1>Vuelos</h1>
    <VuelosDisponibles/>
  </div>
</template>

<script>
import VuelosDisponibles from "../components/VuelosDisponibles.vue"; // Asegúrate de que esta ruta sea correcta

export default {
  name: 'Flights',
  components: {
      VuelosDisponibles
  }
  // Aquí puedes agregar la lógica del componente
}
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para el componente */
</style>
