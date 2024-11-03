<template>
    <div>
        <h2>Vuelos Disponibles</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">De</th>
                    <th scope="col">A</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Asientos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="flight in flights" :key="flight.id">
                    <td>{{ flight.from }}</td>
                    <td>{{ flight.to }}</td>
                    <td>{{ flight.date }}</td>
                    <td>{{ flight.seats }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useFlightStore } from '../stores/flightStore';
import { onMounted, computed } from 'vue';

export default {
    name: 'VuelosDisponibles',
    setup() {
        const flightStore = useFlightStore();

        onMounted(() => {
            flightStore.fetchFlights(); // Cargar vuelos al montar el componente
        });

        // Usa computed para hacer que flights sea reactivo
        const flights = computed(() => flightStore.flights);

        return {
            flights, // Asegúrate de retornar el computed
        };
    },
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para el componente si es necesario */
.table {
    margin-top: 20px; /* Espaciado superior para la tabla */
}
</style>
