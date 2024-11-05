<template>
    <div>
        <h2>Selecciona tu asiento</h2>
        <div class="seats">
            <div
                v-for="seat in seats"
                :key="seat.number"
                :class="['seat', { 'selected': seat.selected, 'available': seat.estaDisponible }]"
                @click="selectSeat(seat)"
                :style="{ backgroundColor: seat.selected ? 'green' : 'initial' }"
            >
                Asiento {{ seat.number }}
            </div>
        </div>
        <button @click="confirmSelection" class="btn btn-primary">Confirmar Selección</button>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'SeleccionAsientos',
    setup() {
        const seats = ref([
            { number: 1, estaDisponible: true, selected: false },
            { number: 2, estaDisponible: true, selected: false },
            { number: 3, estaDisponible: false, selected: false },
            // Agrega más asientos según sea necesario
        ]);

        const selectSeat = (seat) => {
            if (seat.estaDisponible) {
                seat.selected = !seat.selected; // Cambia el estado del asiento
            }
        };

   

        const confirmSelection = async () => {
    const selectedSeats = seats.value.filter(seat => seat.selected);

    if (selectedSeats.length > 0) {
        try {
            const userId = 'ID_DEL_USUARIO'; // Aquí debes obtener el ID del usuario desde su sesión o algún otro lugar
            const flightId = 'ID_DEL_VUELO'; // ID del vuelo en el que estás reservando los asientos

            // Enviar la solicitud al backend para crear la reserva
            const response = await fetch('/api/bookings/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    flightId,
                    selectedSeats: selectedSeats.map(seat => seat.number),
                }),
            });

            // Verificar si la respuesta fue correcta
            if (!response.ok) {
                // Si la respuesta no fue exitosa, intentamos leer la respuesta como JSON
                const errorData = await response.json().catch(() => ({})); // Añadimos un fallback en caso de que no sea JSON válido
                throw new Error(errorData.error || 'Error desconocido');
            }

            // Si la respuesta es OK, leer los datos de la reserva
            const data = await response.json();
            alert('Reserva realizada con éxito');
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
            alert(`Hubo un error al realizar la reserva: ${error.message}`);
        }
    } else {
        alert('No has seleccionado ningún asiento.');
    }
};


        return {
            seats,
            selectSeat,
            confirmSelection,
        };
    },
};
</script>

<style scoped>
.seats {
    display: flex;
    flex-wrap: wrap;
}

.seat {
    width: 50px;
    height: 50px;
    border: 1px solid #000;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.seat.available {
    background-color: lightblue; /* Color para asientos disponibles */
}

.seat.selected {
    background-color: green; /* Color para asientos seleccionados */
}
</style>
