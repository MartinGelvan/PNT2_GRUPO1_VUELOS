<template>
    <div class="container mt-4">
        <h2 class="mb-4 text-center">Agregar Vuelo</h2>
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="submitFlight">
                    <div class="row g-3"> <!-- Agregar g-3 para espacio entre columnas -->
                        <div class="col mb-3">
                            <label for="from" class="form-label">De</label>
                            <input type="text" id="from" v-model="from" class="form-control" required />
                        </div>
                        <div class="col mb-3">
                            <label for="to" class="form-label">A</label>
                            <input type="text" id="to" v-model="to" class="form-control" required />
                        </div>
                        <div class="col mb-3">
                            <label for="date" class="form-label">Fecha</label>
                            <input type="datetime-local" id="date" v-model="date" class="form-control" required />
                            
                        </div>
                        <div class="col mb-3">
                            <label for="seats" class="form-label">Asientos</label>
                            <input type="number" id="seats" v-model="seats" class="form-control" min="1" required />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Agregar Vuelo</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useFlightStore } from '../stores/flightStore';
import { useRouter } from 'vue-router';

export default {
    name: 'AgregarVuelo',
    setup() {
        const flightStore = useFlightStore();
        const router = useRouter();
        const from = ref('');
        const to = ref('');
        const date = ref('');
        const seats = ref(0);

        const submitFlight = async () => {
            try {
                await flightStore.addFlight(from.value, to.value, date.value, seats.value);
                from.value = '';
                to.value = '';
                date.value = '';
                seats.value = 0;
                alert('Vuelo agregado exitosamente');
                router.push('/seats');
            } catch (error) {
                console.error('Error al agregar vuelo:', error);
                alert('Hubo un error al agregar el vuelo');
            }
        };

        return {
            from,
            to,
            date,
            seats,
            submitFlight,
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
