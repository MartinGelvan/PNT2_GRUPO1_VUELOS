<template>
  <div class="container mt-4">
      <h2 class="text-center mb-4">Buscar Vuelos</h2>
      
      <!-- Add Flight Button -->
      <button class="btn btn-primary mb-4" @click="showAddFlight = !showAddFlight">
          {{ showAddFlight ? 'Cancelar Agregar Vuelo' : 'Agregar Vuelo' }}
      </button>

      <!-- Conditional Rendering for AgregarVuelo Component -->
      <AgregarVuelo v-if="showAddFlight" />

      <!-- Vuelos Disponibles Component -->
      <VuelosDisponibles />
  </div>
</template>

<script>
import VuelosDisponibles from './VuelosDisponibles.vue';
import AgregarVuelo from './AgregarVuelo.vue'; // Import the AgregarVuelo component

export default {
  name: 'Flights',
  components: {
      VuelosDisponibles,
      AgregarVuelo
  },
  data() {
      return {
          showAddFlight: false // Control for showing the AgregarVuelo component
      };
  }
};
</script>

<style scoped>
.container {
  max-width: 800px; /* Set a maximum width for the container */
  margin: 0 auto; /* Center the container */
}

.btn {
  width: 100%; /* Make the button full width */
}
</style>
