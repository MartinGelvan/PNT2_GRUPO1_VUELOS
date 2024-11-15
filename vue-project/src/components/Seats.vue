<template>
  <div class="seats-container">
    <h1 class="title">Selecciona tus asientos</h1>

    <div v-if="seats.length > 0" class="seats-list">
      <h2 class="subtitle">Asientos Disponibles</h2>
      <div class="seats-grid">
        <!-- Mostrar los asientos disponibles en una cuadrícula -->
        <div 
          v-for="(seat, index) in seats" 
          :key="seat._id" 
          class="seat-item"
        >
          <label :for="'seat' + seat.number" class="seat-label">
            <input 
              type="checkbox" 
              v-model="selectedSeats" 
              :value="seat.number"    
              :disabled="seat.isBooked || selectedSeats.length >= seatCount"  
              :id="'seat' + seat.number"
              class="seat-checkbox"
            />
            <span class="seat-number">{{ seat.number }}</span>
          </label>
        </div>
      </div>

      <!-- Mostrar los asientos seleccionados -->
      <div class="selected-seats">
        <h3>Asientos seleccionados:</h3>
        <ul>
          <li v-for="(seat, index) in selectedSeats" :key="index" class="selected-seat-item">
            {{ seat }}
          </li>
        </ul>
        <button @click="saveSeats" class="btn-save">Guardar Selección</button>
      </div>

    </div>

    <div v-else>
      <p class="no-seats">No hay asientos disponibles en este vuelo.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useReservationStore } from '../store/reservationStore.js';

const seats = ref([]);
const selectedSeats = ref([]);
const seatCount = ref(0);
const flight = ref(null);

const route = useRoute();
const router = useRouter();
const reservationStore = useReservationStore();
const flightId = route.query.flightId;
const seatCountFromRoute = route.query.seatCount;

seatCount.value = parseInt(seatCountFromRoute, 10);

const getSeats = async () => {
  try {
    if (!flightId) {
      throw new Error('No se ha proporcionado un flightId válido');
    }

    const responseFlight = await axios.get('http://localhost:5001/api/flights/flight', {
      params: { flightId: flightId }
    });
    flight.value = responseFlight.data;

    const response = await axios.get('http://localhost:5001/api/seats', {
      params: { flightId: flightId }
    });
    seats.value = response.data.filter(seat => !seat.isBooked);

    if (seats.value.length < seatCount.value) {
      alert('No hay suficientes asientos disponibles para la cantidad solicitada.');
    }

  } catch (error) {
    console.error('Error al obtener los asientos:', error);
    alert('Ocurrió un error al intentar obtener los asientos.');
  }
};

const saveSeats = async () => {
  try {
    if (selectedSeats.value.length !== seatCount.value) {
      alert(`Debes seleccionar exactamente ${seatCount.value} asientos.`);
      return;
    }

    if (!flight.value) {
      const response = await axios.get('http://localhost:5001/api/flights/flight', {
        params: { flightId: flightId },
      });

      flight.value = Array.isArray(response.data.flight) ? response.data.flight[0] : response.data.flight;
    }

    const reservationResponse = await axios.post('http://localhost:5001/api/seats/reserve-seats', {
      flightId: flightId,
      selectedSeats: selectedSeats.value,
    });

    if (reservationResponse.data.success) {
      reservationStore.addReservation(flight.value, selectedSeats.value);
      alert('Asientos reservados con éxito');
      router.push('/profile');
    } else {
      alert('Error al reservar los asientos');
    }
  } catch (error) {
    console.error('Error al guardar los asientos:', error);
    alert('Ocurrió un error al guardar los asientos.');
  }
};

onMounted(() => {
  if (flightId) {
    getSeats();
  } else {
    alert('No se proporcionó un flightId válido.');
  }
});
</script>

<style scoped>
/* Estilo general */
.seats-container {
  font-family: 'Arial', sans-serif;
  background-color: #f4f7fc;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 8px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.subtitle {
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 20px;
  text-align: center;
}

.seats-list {
  margin-top: 20px;
}

.seats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  justify-items: center;
}

.seat-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  border: 2px solid #007bff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.seat-item:hover {
  transform: scale(1.1);
}

.seat-label {
  display: flex;
  justify-content: center;
  align-items: center;
}

.seat-checkbox {
  margin-right: 10px;
}

.seat-number {
  font-size: 1.2rem;
  font-weight: bold;
}

.selected-seats {
  margin-top: 30px;
}

.selected-seats h3 {
  font-size: 1.5rem;
  color: #333;
}

.selected-seat-item {
  font-size: 1.2rem;
  color: #333;
}

.btn-save {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.btn-save:hover {
  background-color: #0056b3;
}

.no-seats {
  color: #e74c3c;
  text-align: center;
  font-size: 1.2rem;
}
</style>
