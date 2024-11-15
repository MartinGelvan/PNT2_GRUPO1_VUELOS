// Ejemplo en el store (usando Pinia)
import { defineStore } from 'pinia';

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    reservedFlights: [], // Esto debe ser un objeto, no un array
    reservedSeats: [],
  }),
  getters: {
    getReservedFlights(state) {
      return state.reservedFlights;  // Devuelve todos los vuelos reservados
    },
    getReservedSeats(state) {
      return state.reservedSeats;
    }
  },
  actions: {
    addReservation(flight, seats) {
      // Agregar una nueva reserva al array
      this.reservedFlights.push({
        flight,  // Vuelo reservado
        seats,   // Asientos reservados
      });
  }
}
});
