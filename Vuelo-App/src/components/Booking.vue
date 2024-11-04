<template>
  <div>
      <h2>Book Your Flight</h2>
      <form @submit.prevent="bookFlight">
          <label for="seats">Seats:</label>
          <input type="number" v-model="seats" required />
          <br>
          <label for="luggage">Luggage:</label>
          <input type="text" v-model="luggage" />
          <br>
          <button type="submit">Confirm Booking</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          seats: 1,
          luggage: '',
      };
  },
  methods: {
      async bookFlight() {
          try {
              const response = await axios.post('/api/bookings', {
                  userId: this.$store.state.userId, // Adjust according to how you manage user state
                  flightId: this.flightId, // Pass the current flight ID
                  seats: this.seats,
                  luggage: this.luggage,
              });
              alert('Booking confirmed: ' + response.data._id);
              // Optionally, navigate to the user's profile or bookings page
          } catch (error) {
              console.error('Error booking flight:', error);
          }
      },
  },
};
</script>