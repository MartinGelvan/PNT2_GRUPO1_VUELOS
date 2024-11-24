<template>
  <div class="container mt-4">
    <h3 class="mb-4">Vuelos disponibles</h3>
    
    <div class="row">
      <div class="col-md-4 mb-4" v-for="flight in flights" :key="flight._id">
        
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ flight.flightNumber }} - {{ flight.departure }} to {{ flight.destination }}</h5>
            <p class="card-text">Fecha: {{ formatDate(flight.date) }}</p>
            <p class="card-text">Asientos disponibles: {{ flight.availableSeats }}</p>
            
            <div class="mb-3">
              <input 
                type="number" 
                v-model="seatCounts[flight._id]"
                :placeholder="'Cantidad de asientos'"
                :min="1"  
                :max="flight.availableSeats"  
                class="form-control"
              />
            </div>
            
            <p v-if="seatCounts[flight._id] > flight.availableSeats" class="text-danger">
              Solo hay {{ flight.availableSeats }} asientos disponibles para este vuelo.
            </p>
            
            <button 
  class="btn btn-primary" 
  @click="navigateToSeats(flight._id)"
  :disabled="!seatCounts[flight._id] || seatCounts[flight._id] <= 0 || seatCounts[flight._id] > flight.availableSeats"
>
  Reservar
</button>
          </div>
        </div>

      </div>
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
  const year = date.getFullYear();
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const getFlights = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/flights');
    flights.value = response.data;
   
    console.log("Esto me trae flights: " , flights.value)
  } catch (err) {
    console.error('Error al obtener vuelos:', err);
  }
};


console.log("ReserveFLightssss: " , reservedFlight.value)


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

li{
  margin: 50px;
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.05);
}

.text-danger {
  font-size: 0.9rem;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Estilos para la sección de error */
.error-text {
  color: red;
  font-size: 0.9em;
  margin-left: 10px;
}
</style>
