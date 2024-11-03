import { defineStore } from 'pinia';
import axios from 'axios';

export const useFlightStore = defineStore('flight', {
    state: () => ({
        flights: [], // Lista de vuelos disponibles
    }),
    actions: {
        // Método para obtener todos los vuelos desde la API
        async fetchFlights() {
            try {
                const response = await axios.get('http://localhost:5000/api/flights');
                this.flights = response.data; // Asumiendo que la API devuelve una lista de vuelos
            } catch (error) {
                console.error('Error al obtener vuelos:', error);
            }
        },

        // Método para agregar un vuelo a la base de datos
        async addFlight(from, to, date, seats) {
            try {
                const response = await axios.post('http://localhost:5000/api/flights', {
                    from,
                    to,
                    date,
                    seats,
                });
                this.flights.push(response.data); // Añadir el nuevo vuelo a la lista local
            } catch (error) {
                console.error('Error al agregar vuelo:', error);
            }
        },
    },
});
