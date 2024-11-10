<template>
  <div class="flight-list">
    <h3>Vuelos disponibles</h3>
    <ul>
      <li v-for="flight in flights" :key="flight._id">
        {{ flight.flightNumber }} - {{ flight.departure }} to {{ flight.destination }} - {{ new Date(flight.date).toLocaleString() }}
        <button @click="reserveFlight(flight._id)" :disabled="flight.booked">Reservar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const flights = ref([]);

// Obtener los vuelos disponibles
const getFlights = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/flights');
    flights.value = response.data;
  } catch (error) {
    console.error('Error al obtener los vuelos:', error);
  }
};

// Reservar vuelo
const reserveFlight = async (flightId) => {
  try {
    const response = await axios.post('http://localhost:5001/api/flights/reserve', { flightId });
    alert(response.data.message);  // Mostrar mensaje de éxito
    getFlights();  // Actualizar la lista de vuelos después de la reserva
  } catch (error) {
    console.error('Error al reservar vuelo:', error);
    alert('Hubo un problema al reservar el vuelo');
  }
};

// Llamar a getFlights cuando el componente se monta
onMounted(() => {
  getFlights();
});
</script>

<style scoped>
ul {
  list-style-type: none;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
