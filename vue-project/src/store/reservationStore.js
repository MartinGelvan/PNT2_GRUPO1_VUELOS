import { defineStore } from 'pinia';
import axios from 'axios';

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    reservations: [],  // Aquí almacenamos los vuelos reservados junto con los asientos
  }),

  getters: {
    getReservations(state) {
      return state.reservations;  // Devuelve todas las reservas
    },
  },

  actions: {
    async fetchReservations() {
      try {
        // Hacemos una solicitud al backend para obtener las reservas del usuario
        const response = await axios.get('http://localhost:5001/api/flights/reservations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,  // Agregar el token en el header
          },
        });

        // Asumimos que el backend devuelve las reservas con los vuelos y asientos poblados
        const reservations = response.data;

        // Actualizamos el estado del store con las reservas obtenidas
        // Cada reserva tiene ahora un objeto con vuelo y asientos
        this.reservations = reservations.map((reservation) => ({
          flight: reservation.flightId,
          seats: reservation.seats,  // Los asientos asociados a esta reserva
        }));
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    },

    addReservation(flight, seats) {
      // Agregar una nueva reserva al array
      this.reservations.push({
        flight,  // Vuelo reservado
        seats,   // Asientos reservados
      });
    },
  },
});
