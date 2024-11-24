<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2 class="text-center">Bienvenido, {{ userName }}</h2>

      <!-- Mostrar todos los vuelos reservados -->
      <div v-if="reservedFlights.length > 0" class="reserved-flights-section">
        <h3 class="text-center">Vuelos Reservados</h3>

        <!-- Iterar sobre las reservas -->
        <div v-for="(reservation, index) in reservedFlights" :key="index" class="reserved-flight-item">
          <p class="flight-details">
            <strong>Vuelo:</strong> {{ reservation.flight.flightNumber }} - 
            {{ reservation.flight.departure }} a {{ reservation.flight.destination }}<br />
            <strong>Fecha:</strong> {{ formatDate(reservation.flight.date) }}<br />
            <strong>Asientos reservados:</strong> 
            {{ reservation.seats.map(seat => seat.seatNumber).join(', ') }}
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
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useReservationStore } from '../store/reservationStore.js';
import { useUserStore } from '../store/userStore.js';

const reservationStore = useReservationStore();
const userStore = useUserStore();
const router = useRouter();

// Computed properties para acceder a las reservas completas
const reservedFlights = computed(() => reservationStore.getReservations);
const userName = localStorage.getItem('user-name');

// Función para formatear la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

// Verificar si el token existe al montar el componente
onMounted(() => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    userStore.logout();  // Desloguear si no hay token
    router.push('/login');  // Redirigir al login
  } else {
    reservationStore.fetchReservations();  // Si hay token, obtener las reservas
  }
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
