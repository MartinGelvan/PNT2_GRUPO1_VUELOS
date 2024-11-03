<template>
    <div class="login container mt-5 p-4 shadow rounded" style="max-width: 400px; background-color: #f8f9fa;">
        <h1 class="text-center mb-4">Iniciar Sesión</h1>
        <form @submit.prevent="loginUser">
            <div class="mb-3">
                <label for="userName" class="form-label">Nombre de Usuario:</label>
                <input type="text" id="userName" v-model="userName" class="form-control" placeholder="Ingrese su usuario" required />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña:</label>
                <input type="password" id="password" v-model="password" class="form-control" placeholder="Ingrese su contraseña" required />
            </div>
            <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
        <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
    </div>
</template>


<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore.js';
import { useRouter } from 'vue-router';

export default {
    name: 'Login',
    setup() {
        const authStore = useAuthStore();
        const userName = ref(''); // Asegúrate de que esta variable esté definida
        const password = ref('');
        const errorMessage = ref('');
        const router = useRouter(); // Obtener el router

        const loginUser = async () => {
            try {
                await authStore.login(userName.value, password.value); // Asegúrate de usar userName aquí
                // Redirigir después de iniciar sesión
                router.push('/'); // O la ruta que desees
            } catch (error) {
                console.error("Error en el inicio de sesión:", error);
                errorMessage.value = error.response?.data?.message || 'Error en el inicio de sesión';
            }
        };

        return {
            userName,
            password,
            errorMessage,
            loginUser,
        };
    },
};
</script>

<style scoped>
.login {
    max-width: 400px;
    margin: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.error {
    color: red;
}
</style>
