<template>
  <div>
      <h1>User Profile</h1>
      <p>Name: {{ user.name }}</p>
      <p>Last Name: {{ user.lastName }}</p>
      <p>Username: {{ user.userName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phone }}</p>

      <h2>Your Bookings</h2>
      <ul>
          <li v-for="booking in bookings" :key="booking._id">
              Flight: {{ booking.flightId.from }} to {{ booking.flightId.to }} on {{ booking.flightId.date }}
              <p>Selected Seats: {{ booking.selectedSeats.join(', ') }}</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
      return {
          user: {},
          bookings: []
      };
  },
  async created() {
    const userId = this.$route.params.id; // Get user ID from route params
    console.log('User ID:', userId); // Verifica si el userId es correcto

    if (!userId) {
        console.error('User ID is missing!');
        return;
    }

    // Fetch user data
    const userResponse = await fetch(`/api/auth/${userId}`);
    if (!userResponse.ok) {
        console.error('Error fetching user data:', userResponse.statusText);
        return;
    }

    this.user = await userResponse.json();
    console.log('User data:', this.user); // Verifica si los datos del usuario son correctos

    // Fetch user's bookings and include selected seats
    const bookingsResponse = await fetch(`/api/bookings/${userId}`);
    if (!bookingsResponse.ok) {
        console.error('Error fetching bookings data:', bookingsResponse.statusText);
        return;
    }

    this.bookings = await bookingsResponse.json();
    console.log('Bookings data:', this.bookings); // Verifica los datos de las reservas
}

};
</script>
