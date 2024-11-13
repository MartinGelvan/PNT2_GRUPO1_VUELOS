<template>
  <div>
    <h1>Asientos disponibles</h1>

    <div v-if="seats.length > 0">
      <ul>
        <li v-for="(seat, index) in seats" :key="seat._id">
          <!-- Mostrar número de asiento y un checkbox -->
          <label>
            <input 
              type="checkbox" 
              v-model="selectedSeats" 
              :value="seat.number"    
              :disabled="seat.estaOcupado || selectedSeats.length >= seatCount"  
            />
            {{ seat.number }}
          </label>
        </li>
      </ul>

      <!-- Mostrar los asientos seleccionados -->
      <div>
        <h2>Asientos seleccionados:</h2>
        <ul>
          <!-- Mostrar los números de los asientos seleccionados -->
          <li v-for="(seat, index) in selectedSeats" :key="index">
            {{ seat }}  <!-- Mostrar el número de cada asiento seleccionado -->
          </li>
           <!-- Botón para enviar la selección de asientos -->
          <button @click="saveSeats">Guardar selección</button>
        </ul>
      </div>

    </div>

    <div v-else>
      <p>No hay asientos disponibles.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useReservationStore } from '../store/reservationStore.js';

// Definir las referencias reactivas
const seats = ref([]);
const selectedSeats = ref([]);  // Usa un array para almacenar los asientos seleccionados
const seatCount = ref(0); // Usar una referencia para la cantidad de asientos seleccionados
const flight = ref(null); // Almacenar la información del vuelo

// Obtener el objeto de la ruta y extraer el parámetro flightId y seatCount
const route = useRoute();
const router = useRouter()
const reservationStore = useReservationStore();
const flightId = route.query.flightId;  // Asigna el parámetro flightId de la URL
const seatCountFromRoute = route.query.seatCount;
console.log("flightId en Seats.vue:", flightId);

// Convertir seatCount en un número entero
seatCount.value = parseInt(seatCountFromRoute, 10);



const getSeats = async () => {
  try {
    if (!flightId) {
      throw new Error('No se ha proporcionado un flightId válido');
    }

    const response = await axios.get('http://localhost:5001/api/seats', {
      params: { flightId: flightId }
    });
    flight.value = response.data;

    // Filtrar solo los asientos disponibles
    seats.value = response.data.filter(seat => !seat.estaOcupado); // Sólo mostrar asientos no ocupados

    // Si la cantidad de asientos disponibles es menor que la cantidad solicitada, mostrar mensaje
    if (seats.value.length < seatCount.value) {
      alert('No hay suficientes asientos disponibles para la cantidad solicitada.');
    }

  } catch (error) {
    console.error('Error al obtener los asientos:', error);
    alert('Ocurrió un error al intentar obtener los asientos.');
  }
};

// Función para guardar la selección de asientos
const saveSeats = async () => {
  try {
    if (selectedSeats.value.length !== seatCount.value) {
      alert(`Debes seleccionar exactamente ${seatCount.value} asientos.`);
      return;
    }

    // Verificar si ya tenemos el vuelo cargado
    if (!flight.value) {
      console.log("Obteniendo vuelo con flightId:", flightId);

      const response = await axios.get('http://localhost:5001/api/flights/flight', {
        params: { flightId: flightId },
      });

      console.log("Respuesta de la API para el vuelo:", response.data);

      // Verificar que la respuesta contiene un solo vuelo (en lugar de un array)
      if (response.data && response.data.flight) {
        // Aquí debes asegurarte de que `flight` no sea un array
        flight.value = Array.isArray(response.data.flight) ? response.data.flight[0] : response.data.flight;
        console.log("Vuelo obtenido:", flight.value);
      } else {
        throw new Error('No se pudo obtener el vuelo');
      }
    }

    // Verifica que tenemos el vuelo correctamente asignado
    console.log("Vuelo a reservar:", flight.value);

    // Enviar los asientos seleccionados al backend
    const reservationResponse = await axios.post('http://localhost:5001/api/seats/reserve-seats', {
      flightId: flightId,
      selectedSeats: selectedSeats.value,
    });

    if (reservationResponse.data.success) {
      // Guardamos la reserva en el store
      reservationStore.setReservation(flight.value, selectedSeats.value);

      alert('Asientos reservados con éxito');
      
      // Redirigir a la página de perfil
      router.push('/profile');
    } else {
      alert('Error al reservar los asientos');
    }
  } catch (error) {
    console.error('Error al guardar los asientos:', error);
    alert('Ocurrió un error al guardar los asientos.');
  }
};


// Llamar a getSeats cuando el componente se monte
onMounted(() => {
  if (flightId) {
    getSeats();
  } else {
    alert('No se proporcionó un flightId válido.');
  }
});
</script>
