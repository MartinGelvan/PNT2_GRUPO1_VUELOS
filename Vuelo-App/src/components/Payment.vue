<template>
    <div class="payment">
      <BookingProgress :currentStage="3" />
      <h1>Información de Pago</h1>
      <form @submit.prevent="submitPayment">
        <div>
          <label for="cardNumber">Número de tarjeta:</label>
          <input type="text" v-model="cardNumber" required />
        </div>
        <div>
          <label for="expiry">Fecha de caducidad:</label>
          <input type="text" v-model="expiry" placeholder="MM/YY" required />
        </div>
        <div>
          <label for="cvv">CVV:</label>
          <input type="text" v-model="cvv" required />
        </div>
        <button type="submit">Confirmar Reserva</button>
      </form>
    </div>
  </template>
  
  <style scoped>
  .payment {
    padding: 20px;
    background-color: #f0f4f8; /* Light background color */
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  form button {
    padding: 10px 15px;
    background-color: #007bff; /* Match navbar color */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  