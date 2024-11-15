<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2 class="text-center">Bienvenido, {{ userStore.getUserName }}</h2>

      <!-- Mostrar todos los vuelos reservados -->
      <div v-if="reservedFlights.length > 0" class="reserved-flights-section">
        <h3 class="text-center">Vuelos Reservados</h3>
        
        <!-- Iterar sobre los vuelos reservados -->
        <div v-for="(reservation, index) in reservedFlights" :key="index" class="reserved-flight-item">
          <p class="flight-details">
            <strong>Vuelo:</strong> {{ reservation.flight.flightNumber }} - {{ reservation.flight.departure }} to {{ reservation.flight.destination }}<br />
            <strong>Fecha:</strong> {{ reservation.flight.date }}<br />
            <strong>Asientos reservados:</strong> {{ reservation.seats.join(', ') }}
          </p>
        </div>
      </div>

      <!-- Si no hay vuelos reservados -->
      <div v-else>
        <p class="no-reservation text-center">No tienes ninguna reserva activa.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../store/userStore.js';
import { useReservationStore } from '../store/reservationStore.js';

const userStore = useUserStore();
const reservationStore = useReservationStore();

// Computed properties para acceder a todos los vuelos reservados
const reservedFlights = computed(() => reservationStore.getReservedFlights);

// No necesitas hacer ninguna llamada a la API, ya que las reservas están en el store
onMounted(() => {
  console.log("Profile cargado");
});
</script>

<style scoped>
/* Estilos */
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fc;
}

.profile-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

h2 {
  font-size: 30px;
  font-weight: bold;
  color: #333;
}

h3 {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 20px;
}

.flight-details {
  font-size: 18px;
  color: #333;
  line-height: 1.6;
}

.no-reservation {
  font-size: 18px;
  color: #e74c3c;
}

button {
  font-size: 16px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Estilo de los textos y elementos dentro de la tarjeta */
.reserved-flights-section {
  margin-top: 20px;
  background-color: #e9f7fe;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reserved-flight-item {
  margin-bottom: 15px;
}
</style>
