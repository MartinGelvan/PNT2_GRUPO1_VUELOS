// Ejemplo en el store (usando Pinia)
import { defineStore } from 'pinia';

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    reservedFlight: null, // Esto debe ser un objeto, no un array
    reservedSeats: [],
  }),
  getters: {
    getReservedFlight(state) {
      return state.reservedFlight; // Debería ser un objeto de vuelo
    },
    getReservedSeats(state) {
      return state.reservedSeats;
    }
  },
  actions: {
    setReservation(flight, seats) {
      // Asegúrate de que flight es un objeto, no un array
      if (Array.isArray(flight)) {
        this.reservedFlight = flight[0]; // Si es un array, tomar el primer elemento
      } else {
        this.reservedFlight = flight;
      }
      this.reservedSeats = seats;
    }
  }
});
