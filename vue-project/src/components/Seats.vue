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
              :disabled="seat.estaOcupado"  
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

// Definir las referencias reactivas
const seats = ref([]);
const selectedSeats = ref([]);  // Usa un array para almacenar los asientos seleccionados
// Obtener el objeto de la ruta y extraer el parámetro flightId
const route = useRoute();
const flightId = route.query.flightId;  // Asigna el parámetro flightId de la URL
const seatCount = route.query.seatCount;

const getSeats = async () => {
  try {
    if (!flightId) {
      throw new Error('No se ha proporcionado un flightId válido');
    }

    const response = await axios.get('http://localhost:5001/api/seats', {
      params: { flightId: flightId }
    });

    // Verificar que hay suficientes asientos disponibles
    const availableSeats = response.data.filter(seat => !seat.estaOcupado);
    if (availableSeats.length >= seatCount) {
      seats.value = response.data;
    } else {
      throw new Error("No hay asientos disponibles para la cantidad requerida");
    }

  } catch (error) {
    console.error('Error al obtener los asientos:', error);
    alert('Ocurrió un error al intentar obtener los asientos.');
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
