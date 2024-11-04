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
        // Fetch user data
        const userResponse = await fetch(`/api/auth/${userId}`);
        this.user = await userResponse.json();

        // Fetch user's bookings
        const bookingsResponse = await fetch(`/api/bookings/${userId}`);
        this.bookings = await bookingsResponse.json();
    }
};
</script>

  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1, h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .profile-info {
    display: grid;
    gap: 1rem;
  }
  
  .info-field {
    display: flex;
    justify-content: space-between;
  }
  
  label {
    font-weight: bold;
    margin-right: 1rem;
    width: 40%;
  }
  
  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #646cff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin: 1rem 0;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #535bf2;
  }
  
  .flights-list {
    margin-top: 2rem;
  }
  </style>