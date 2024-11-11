<template>
  <div class="profile">
    <h2>Bienvenido, {{ userStore.getUserName }}</h2>

    <h3>Vuelos disponibles</h3>
    <ul>
      <li v-for="flight in flights" :key="flight._id">
        {{ flight.flightNumber }} - {{ flight.departure }} to {{ flight.destination }} - {{ flight.date }} 
        <button @click="navigateToSeats(flight._id)">Reservar</button> <!-- Pasa el flightId dinámicamente -->
        
        <!-- Input para la cantidad de asientos -->
        <input 
          type="number" 
          v-model="seatCounts[flight._id]"
          :placeholder="'Cantidad de asientos'"
        />
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '../store/userStore.js';
import { useRouter } from 'vue-router';

const flights = ref([]);
const userStore = useUserStore();
const router = useRouter();
const seatCounts = ref({}); 
// Redirigir a login si no está autenticado
/*
if (!localStorage.getItem('auth-token') && !userStore.userName) {
  router.push('/login');
}
*/

onMounted(() => {
  console.log("Por traer vuelos");
  getFlights();
  console.log("vuelos obtenidos");
});

const getFlights = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/flights');
    flights.value = response.data;
  } catch (err) {
    console.error('Error al obtener vuelos:', err);
  }
};

// Reservar un vuelo (usado para manejar la redirección a la página de asientos)
const navigateToSeats = (flightId) => {
  const seats = seatCounts.value[flightId];
  if (!flightId) {
    alert('No se proporcionó un flightId válido');
    return;
  }
  // Navegar a la página de selección de asientos, pasando el flightId como query parameter
  router.push(`/seats?flightId=${flightId}&seatCount=${seats}`);
};

</script>
