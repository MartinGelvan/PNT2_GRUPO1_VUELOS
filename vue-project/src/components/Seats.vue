<template>
  <div>
    <h1>Asientos disponibles</h1>
    <div v-if="seats.length > 0">
      <ul>
        <li v-for="(seat, index) in seats" :key="index">
          {{ seat }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No hay asientos disponibles.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// Definir las referencias reactivas
const seats = ref([]);
const flightId = ref(null);

// Obtener el objeto de la ruta y extraer el parámetro flightId
const route = useRoute();
flightId.value = route.params.flightId;  // Asigna el parámetro flightId de la URL

// Verifica si el flightId está siendo correctamente asignado
console.log(flightId.value);  // Esto te ayudará a depurar y ver si el flightId se está asignando correctamente

// Método para obtener los asientos
const getSeats = async () => {
  try {
    if (!flightId.value) {
      throw new Error('No se ha proporcionado un flightId válido');
    }

    const response = await axios.get('http://localhost:5001/api/seats', {
      params: { flightId: flightId.value }
    });

    seats.value = response.data;
  } catch (error) {
    console.error('Error al obtener los asientos:', error);
    alert('Ocurrió un error al intentar obtener los asientos.');
  }
};

// Llamar a getSeats cuando el componente se monte
onMounted(() => {
  if (flightId.value) {
    getSeats();
  } else {
    alert('No se proporcionó un flightId válido.');
  }
});
</script>


<style scoped>
/* Aquí puedes agregar tus estilos CSS si lo necesitas */
</style>
