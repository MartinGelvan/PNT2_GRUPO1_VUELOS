<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2 class="text-center">Bienvenido, {{ userStore.getUserName }}</h2>
      
      <!-- Información de la reserva -->
      <div v-if="reservedFlight && reservedSeats.length > 0" class="reserved-flight-section">
        <h3 class="text-center">Vuelo Reservado</h3>
        <p class="flight-details">
          <strong>Vuelo:</strong> {{ reservedFlight.flightNumber }} - {{ reservedFlight.departure }} to {{ reservedFlight.destination }}<br />
          <strong>Fecha:</strong> {{ reservedFlight.date }}<br />
          <strong>Asientos reservados:</strong> {{ reservedSeats.join(', ') }}
        </p>
      </div>

      <!-- Si no hay vuelo reservado -->
      <div v-else>
        <p class="no-reservation text-center">No tienes ninguna reserva activa.</p>
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

const userStore = useUserStore();
const reservationStore = useReservationStore();
const router = useRouter();

// Computed properties para acceder a los valores reactivos desde la store
const reservedFlight = computed(() => reservationStore.getReservedFlight);
const reservedSeats = computed(() => reservationStore.getReservedSeats);

// Traer vuelos al montar el componente
onMounted(() => {
  console.log("Profile cargado");
});

const navigateToSeats = (flightId) => {
  if (!flightId) {
    alert('No hay vuelo seleccionado.');
    return;
  }
  router.push(`/seats?flightId=${flightId}`);
};
</script>

<style scoped>
/* Estilo general de la página */
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
.reserved-flight-section {
  margin-top: 20px;
  background-color: #e9f7fe;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
