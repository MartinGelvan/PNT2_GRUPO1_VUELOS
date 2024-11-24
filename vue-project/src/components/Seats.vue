<template>
  <div class="seats-container">
    <h1 class="title">Selecciona tus asientos</h1>

    <div v-if="seats.length > 0" class="seats-list">
      <h2 class="subtitle">Asientos Disponibles</h2>
      <div class="seats-grid">
        <!-- Mostrar los asientos disponibles en una cuadrícula -->
        <div 
          v-for="seat in seats" 
          :key="seat._id" 
          class="seat-item"
        >
          <button 
            :class="['seat-button', { 'selected': selectedSeats.includes(seat.seatNumber), 'booked': seat.isBooked }]" 
            :disabled="seat.isBooked || (selectedSeats.length >= seatCount && !selectedSeats.includes(seat.seatNumber))"
            @click="toggleSeat(seat.seatNumber)"
          >
            {{ seat.seatNumber }}
          </button>
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
const token = localStorage.getItem('auth-token');
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
  }, {
    headers: {
      'Authorization': `Bearer ${token}`  // Agregar el token en el header
    }
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

const toggleSeat = (seatNumber) => {
  const index = selectedSeats.value.indexOf(seatNumber);
  if (index === -1) {
    // Agregar el asiento si no está seleccionado y no se supera el límite
    if (selectedSeats.value.length < seatCount.value) {
      selectedSeats.value.push(seatNumber);
    }
  } else {
    // Quitar el asiento si ya está seleccionado
    selectedSeats.value.splice(index, 1);
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
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  justify-items: center;
}

.seat-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.seat-button {
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #f0f8ff;
  border: 2px solid #007bff;
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* Asiento seleccionado */
.seat-button.selected {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

/* Asiento reservado */
.seat-button.booked {
  background-color: #f44336;
  color: white;
  cursor: not-allowed;
  border-color: #f44336;
}

/* Deshabilitado */
.seat-button:disabled {
  background-color: #e0e0e0;
  color: #757575;
  cursor: not-allowed;
}

/* Hover effects */
.seat-button:not(:disabled):hover {
  background-color: #ffffff;
  border-color: #0056b3;
  transform: scale(1.1);
}
 /* Estilo para el botón seleccionado cuando pasa el mouse (hover) */
.seat-button.selected:hover {
  background-color: #388e3c; /* Fondo verde más oscuro cuando se pasa el mouse por encima */
  border-color: #388e3c; /* Borde verde más oscuro */
  transform: scale(1.1); /* Efecto de escala */
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
  color: rgb(255, 255, 255);
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
