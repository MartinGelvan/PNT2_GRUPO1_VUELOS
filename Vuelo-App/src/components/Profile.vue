<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Perfil del Usuario</h2>
      
      <div v-if="loading" class="text-center">Cargando...</div>
      <div v-else>
        <form @submit.prevent="updateUserProfile">
            <input type="text" v-model="profile.id" class="form-control"  required />
          <div class="form-group">
            <label for="name">Nombre</label>
            <input type="text" v-model="profile.name" class="form-control" id="name" required />
          </div>
          <div class="form-group">
            <label for="lastName">Apellido</label>
            <input type="text" v-model="profile.lastName" class="form-control" id="lastName" required />
          </div>
          <div class="form-group">
            <label for="userName">Nombre de Usuario</label>
            <input type="text" v-model="profile.userName" class="form-control" id="userName" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="profile.email" class="form-control" id="email" required />
          </div>
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input type="text" v-model="profile.phone" class="form-control" id="phone" />
          </div>
          <button type="submit" class="btn btn-primary">Actualizar Perfil</button>
        </form>
  
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { useProfileStore } from '../stores/profileStore';
  import { onMounted } from 'vue';
  
  export default {
    name: 'Profile',
    setup() {
      const profileStore = useProfileStore();
  
      // Cargar el perfil al montar el componente
      onMounted(() => {
        profileStore.loadProfile();
      });
  
      // Método para actualizar el perfil
      const updateUserProfile = () => {
        profileStore.updateProfile(profileStore.profile);
      };
  
      return {
        profile: profileStore.profile,
        loading: profileStore.loading,
        error: profileStore.error,
        updateUserProfile,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: auto;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  </style>
  