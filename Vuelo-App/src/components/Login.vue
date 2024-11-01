<template>
    <div class="login">
        <h1>Iniciar Sesión</h1>
        <form @submit.prevent="loginUser">
            <div>
                <label for="userName">Nombre de Usuario:</label>
                <input type="text" id="userName" v-model="userName" required />
            </div>
            <div>
                <label for="password">Contraseña:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
