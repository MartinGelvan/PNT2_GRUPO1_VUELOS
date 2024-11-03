<template>
    <div class="register container mt-5 p-4 shadow rounded" style="max-width: 400px; background-color: #f8f9fa;">
        <h1 class="text-center mb-4">Registro</h1>
        <form @submit.prevent="registerUser">
            <div class="mb-3">
                <label for="userName" class="form-label">Nombre de Usuario:</label>
                <input type="text" id="userName" v-model="username" class="form-control" placeholder="Ingrese su usuario" required />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico:</label>
                <input type="email" id="email" v-model="email" class="form-control" placeholder="Ingrese su correo electrónico" required />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña:</label>
                <input type="password" id="password" v-model="password" class="form-control" placeholder="Ingrese su contraseña" required />
            </div>
            <button type="submit" class="btn btn-primary w-100">Registrarse</button>
        </form>
        <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
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
