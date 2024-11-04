<template>
    <div class="container mt-4">
        <h2 class="text-center mb-4">Vuelos Disponibles</h2>
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">De</th>
                    <th scope="col">A</th>
                    <th scope="col">Fecha/Hora</th>
                    <th scope="col">Asientos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="flights.length === 0">
                    <td colspan="4" class="text-center">No hay vuelos disponibles.</td>
                </tr>
                <tr v-for="flight in flights" :key="flight.id">
                    <td>{{ flight.from }}</td>
                    <td>{{ flight.to }}</td>
                    <td>{{ formatDate(new Date(flight.date)) }}</td>
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

        const flights = computed(() => flightStore.flights);

        const formatDate = (date) => {
            return date.toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        };

        return {
            flights,
            formatDate, // Asegúrate de devolver formatDate para que esté disponible en la plantilla
        };
    },
};
</script>


<style scoped>
.table {
    margin-top: 20px; /* Espaciado superior para la tabla */
    margin: auto; /* Centrar la tabla horizontalmente */
}

.table th, .table td {
    vertical-align: middle; /* Centrar contenido verticalmente */
}

.thead-light {
    background-color: #babbbc; /* Color de fondo claro para el encabezado */
}
</style>
