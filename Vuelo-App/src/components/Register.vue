<template>
    <div class="register">
        <h1>Registro</h1>
        <form @submit.prevent="registerUser">
            <div>
                <label for="userName">Nombre de Usuario:</label>
                <input type="text" id="userName" v-model="username" required />
            </div>
            <div>
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Contraseña:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Registrarse</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore.js'; // Ajusta la ruta según tu estructura


export default {
    name: 'Register',
    setup() {
        const authStore = useAuthStore();
        const router = useRouter(); // Obtener el router
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');

        const registerUser = async () => {
            try {
                await authStore.register(username.value, email.value, password.value);
                // Redirigir a la página de inicio o donde desees después del registro
                router.push('/login'); // O la ruta que desees
            } catch (error) {
                console.error("Error en el registro:", error);
                errorMessage.value = error.response?.data?.message || 'Error en el registro';
            }
        };

        return {
            username,
            email,
            password,
            errorMessage,
            registerUser,
        };
    },
};

</script>

<style scoped>
.register {
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
