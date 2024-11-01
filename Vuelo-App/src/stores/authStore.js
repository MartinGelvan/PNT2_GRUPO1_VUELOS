import { defineStore } from "pinia";
import axios from "axios"

export const useAuthStore = defineStore('auth',{
    state: ()=>({
        user:null,
        token:null,
    }),
    getters:{
        isAuthenticated: (state) => !!state.token,
    },
    actions:{

        async register(username, email, password) {
            try {
                const response = await axios.post('http://localhost:5000/api/register', { userName: username, email, password });
                this.user = response.data.user; // Si tienes un objeto de usuario en la respuesta
                this.token = response.data.token; // Si también devuelves un token
            } catch (error) {
                console.error('Error en el registro:', error.response?.data);
                throw new Error(error.response?.data?.message || 'Error en el registro');
            }
        }
        
        ,
        
        
        // En authStore.js
async login(userName, password) {
    try {
        const response = await axios.post('http://localhost:5000/api/login', {
            userName,
            password,
        });
        this.token = response.data.token; // Asegúrate de que esto coincida con lo que envía tu backend
        this.user = userName;
        localStorage.setItem('token', this.token);
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error; // Re-lanzar el error para manejarlo en el componente
    }
}

        ,
        logout(){
            this.token = null
            this.user = null
            localStorage.removeItem('token')
        },
        loadUser(){
            const token = localStorage.getItem('token')
            if(token){
                this.token = token
            }
        }
    }
})