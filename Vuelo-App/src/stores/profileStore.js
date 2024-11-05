import { defineStore } from "pinia";
import axios from "axios";

export const useProfileStore = defineStore("profile", {
    state: () => ({
        profile: {
            name: null,
            lastName: null,
            userName: null,
            email: null,
            phone: null,
        },
        loading: false,
        error: null,
    }),
    getters: {
        // Devuelve el nombre completo del usuario
        fullName: (state) => `${state.profile.name} ${state.profile.lastName}`.trim(),
    },
    actions: {
        // Cargar el perfil del usuario desde la API
        async loadProfile() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get("http://localhost:5000/api/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                this.profile = response.data; // Carga los datos del perfil
            } catch (error) {
                console.error("Error al cargar el perfil:", error.response?.data);
                this.error = error.response?.data?.message || "Error al cargar el perfil";
            } finally {
                this.loading = false;
            }
        },

        // Actualizar el perfil del usuario en la API
        async updateProfile(profileData) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.put("http://localhost:5000/api/profile", profileData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                this.profile = response.data; // Actualiza el estado con los datos recibidos
            } catch (error) {
                console.error("Error al actualizar el perfil:", error.response?.data);
                this.error = error.response?.data?.message || "Error al actualizar el perfil";
            } finally {
                this.loading = false;
            }
        },

        // Restablece el perfil en caso de logout
        clearProfile() {
            this.profile = {
                name: null,
                lastName: null,
                userName: null,
                email: null,
                phone: null,
            };
        }
    },
});
