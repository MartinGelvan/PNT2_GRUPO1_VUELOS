import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    userName: '',
  }),
  actions: {
    setUser(user) {
      this.user = user;
      if (user && user.name) {
        this.setUserName(user.name);
      }
      // Guardar el usuario en localStorage
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      // Eliminar el token y los datos del usuario de localStorage
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user');

      this.user = null;
      this.userName = '';

      // No hacemos el redireccionamiento en el store
    },
    setUserName(name) {
      this.userName = name;
    },
    loadUserFromStorage() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);  // Restaurar el usuario desde localStorage
        if (this.user && this.user.name) {
          this.setUserName(this.user.name);
        }
      }
    }
  },
  getters: {
    // Verifica si el usuario está autenticado
    isAuthenticated: (state) => {
      return !!localStorage.getItem('auth-token');
    },
    
    // Obtiene los datos del usuario
    getUser: (state) => state.user,
    
    // Obtiene el nombre del usuario
    getUserName: (state) => {
      if (!!localStorage.getItem('auth-token')) {
        return localStorage.getItem('user-name');
      }
      return null;
    },
    
    // Obtiene el token de autenticación
    getAuthToken: () => {
      return localStorage.getItem('auth-token');
    },
  }
});
