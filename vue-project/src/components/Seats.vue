<template>
    <div v-if="flightId">
      <h3>Seleccione su asiento para el vuelo {{ flightId }}</h3>
      <div v-for="seat in asientos" :key="seat._id">
        <label>
          <input 
            type="checkbox" 
            v-model="seat.estaOcupado" 
            :disabled="seat.estaOcupado" 
            @change="reserveSeat(seat)">
          Asiento {{ seat.number }}
        </label>
      </div>
      <button @click="submitReservation">Reservar Asientos</button>
    </div>
    <div v-else>
      <p>Por favor, reserve un vuelo antes de seleccionar asientos.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  
  const asientos = ref([]);
  const flightId = ref(null);
  
  // Recibir el id del vuelo reservado como prop
  defineProps({
    flightId: { type: String, required: true }
  });
  
  // Obtener los asientos disponibles para el vuelo
  const getSeats = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/seats?flightId=${flightId.value}`);
      asientos.value = response.data;
    } catch (error) {
      console.error('Error al obtener los asientos:', error);
    }
  };
  
  // Reservar un asiento
  const reserveSeat = async (seat) => {
    try {
      if (seat.estaOcupado) {
        const response = await axios.post('http://localhost:5001/api/seats/reserveSeat', {
          seatId: seat._id,
          estaOcupado: true
        });
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error al reservar asiento:', error);
    }
  };
  
  // Enviar la reserva de los asientos seleccionados
  const submitReservation = async () => {
    const selectedSeats = asientos.value.filter(seat => seat.estaOcupado);
    if (selectedSeats.length > 0) {
      try {
        await axios.post('http://localhost:5001/api/seats/reserveBatch', selectedSeats);
        alert('Asientos reservados con éxito');
      } catch (error) {
        console.error('Error al reservar asientos:', error);
        alert('Hubo un problema al reservar los asientos');
      }
    } else {
      alert('Debe seleccionar al menos un asiento');
    }
  };
  
  // Actualizar los asientos cuando el vuelo cambie
  watch(flightId, getSeats, { immediate: true });
  </script>
  