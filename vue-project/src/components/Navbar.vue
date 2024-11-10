<template>
  <nav>
    <ul>
      <li><router-link to="/home">Home</router-link></li>
      <li><router-link to="/flights">Flights</router-link></li>
      <li><router-link to="/profile">Profile</router-link></li>

     
      <li v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link>
      </li>

    
      <li v-if="isAuthenticated">
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/store/userStore.js';
import { computed } from 'vue';


const userStore = useUserStore();


const logout = () => {
  userStore.logout();  
  localStorage.removeItem('auth-token');  
  window.location.href = '/login';  
};


const isAuthenticated = computed(() => userStore.isAuthenticated);
</script>
