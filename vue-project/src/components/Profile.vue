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
          :min="1"  
          :max="flight.availableSeats"  
        />
        <p v-if="seatCounts[flight._id] > flight.availableSeats" class="error-text">
          Solo hay {{ flight.availableSeats }} asientos disponibles para este vuelo.
        </p>
      </li>
    </ul>

    <!-- Mostrar información de la reserva -->
   <div v-if="reservedFlight && reservedSeats.length > 0">
  <h3>Vuelo reservado:</h3>
  <p>
    {{ reservedFlight.flightNumber }} - {{ reservedFlight.departure }} to {{ reservedFlight.destination }}<br />
    Fecha: {{ reservedFlight.date }}<br />
    Asientos reservados: {{ reservedSeats.join(', ') }}
  </p>
</div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '../store/userStore.js';
import { useRouter } from 'vue-router';
import { useReservationStore } from '../store/reservationStore.js';

const flights = ref([]);
const seatCounts = ref({}); 

const userStore = useUserStore();
const reservationStore = useReservationStore();
const router = useRouter();

// Computed properties para acceder a los valores reactivos desde la store
const reservedFlight = computed(() => reservationStore.getReservedFlight);
const reservedSeats = computed(() => reservationStore.getReservedSeats);

onMounted(() => {
  console.log("Por traer vuelos");
  getFlights();
  // Verifica si los datos del vuelo y asientos están correctos
  console.log("reservedFlight:", reservedFlight.value);
  console.log("reservedSeats:", reservedSeats.value);
  console.log("vuelos obtenidos");
});



const getFlights = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/flights');
    flights.value = response.data;
   
    console.log("Esto me trae flights: " , flights.value)
  } catch (err) {
    console.error('Error al obtener vuelos:', err);
  }
};


console.log("ReserveFLightssss: " , reservedFlight)


const navigateToSeats = (flightId) => {
  console.log('Flight ID:', flightId); // Verifica que el flightId esté pasando correctamente
  const seats = seatCounts.value[flightId];
  const selectedFlight = flights.value.find(flight => flight._id === flightId);
  console.log('Cantidad de asientos seleccionados:', seats);  // Verifica los asientos seleccionados
  if (!flightId) {
    alert('No se proporcionó un flightId válido');
    return;
  }

  // Verificar si el vuelo no se encontró
  if (!selectedFlight) {
    alert('El vuelo no se encuentra disponible.');
    return;
  }
  
  if (!seats || seats <= 0) {
    alert('Por favor ingresa una cantidad válida de asientos');
    return;
  }

  if (seats > selectedFlight.availableSeats) {
    alert(`Solo hay ${selectedFlight.availableSeats} asientos disponibles para este vuelo.`);
    return;
  }
  // Navegar a la página de selección de asientos, pasando el flightId como query parameter
  router.push(`/seats?flightId=${flightId}&seatCount=${seats}`);
};

</script>

<style scoped>
/* Estilos para la sección de error */
.error-text {
  color: red;
  font-size: 0.9em;
  margin-left: 10px;
}
</style>
