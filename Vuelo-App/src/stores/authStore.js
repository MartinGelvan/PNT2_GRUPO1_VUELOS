import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    getters: {
        // Devuelve true si hay un token, lo que indica que el usuario está autenticado
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async register(username, email, password) {
            try {
                const response = await axios.post('http://localhost:5000/api/register', { userName: username, email, password });
                this.user = response.data.user; // Guarda los datos del usuario
                this.token = response.data.token; // Guarda el token
                localStorage.setItem('token', this.token); // Guarda el token en localStorage
            } catch (error) {
                console.error('Error en el registro:', error.response?.data);
                throw new Error(error.response?.data?.message || 'Error en el registro');
            }
        },

        async login(userName, password) {
            try {
                const response = await axios.post('http://localhost:5000/api/login', {
                    userName,
                    password,
                });
                this.token = response.data.token;
                this.user = userName; // Puedes ajustar esto si tu API devuelve más datos del usuario
                localStorage.setItem('token', this.token); // Guarda el token en localStorage
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                throw error; // Re-lanza el error para manejarlo en el componente
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token'); // Limpia el token de localStorage
        },

        loadUser() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                // Aquí podrías cargar el perfil del usuario si es necesario
            }
        }
    }
});
