<template>
  <div class="profile">
   
    <h2>Bienvenido, {{ userStore.getUserName}}</h2> 

    <h3>Vuelos disponibles</h3>
    <ul>
      <li v-for="flight in flights" :key="flight._id">
        {{ flight.flightNumber }} - {{ flight.departure }} to {{ flight.destination }} - {{ flight.date }}
        <button @click="reserveFlight(flight._id)" :disabled="flight.booked">Reservar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '../store/userStore.js';  

const flights = ref([]);


const userStore = useUserStore();


if (!localStorage.getItem('auth-token') && !userStore.userName) {
 
  router.push('/login');
}


const userName = userStore.getUserName  

onMounted(() => {
  getFlights();
});

const getFlights = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/flights');
    flights.value = response.data;
  } catch (err) {
    console.error('Error al obtener vuelos:', err);
  }
};

const reserveFlight = async (flightId) => {
  try {
    await axios.post('http://localhost:5001/api/flights/reserve', { flightId });
    getFlights(); 
  } catch (err) {
    console.error('Error al reservar el vuelo:', err);
  }
};
</script>

<style scoped>
button {
  margin-left: 10px;
}
</style>
