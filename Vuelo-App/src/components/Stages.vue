<template>
    <div class="booking-progress">
      <ul>
        <li :class="{ active: isActive(1) }">Buscar Vuelos</li>
        <li :class="{ active: isActive(2) }">Seleccionar Vuelo</li>
        <li :class="{ active: isActive(3) }">Pago</li>
        <li :class="{ active: isActive(4) }">Confirmación</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['currentStage'],
    methods: {
      isActive(stage) {
        return this.currentStage >= stage;
      }
    }
  };
  </script>
  
  <style scoped>
  .booking-progress ul {
    list-style-type: none;
    padding: 0;
    display: flex;
  }
  
  .booking-progress li {
    margin-right: 20px;
  }
  
  .booking-progress li.active {
    font-weight: bold;
    color: green;
  }
  </style>
  