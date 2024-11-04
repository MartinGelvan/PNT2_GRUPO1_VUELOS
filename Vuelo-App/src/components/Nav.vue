<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">VuelosApp</a>
            <div class="navbar-nav ms-auto">
                <router-link to="/" class="nav-link">Inicio</router-link>
                <router-link to="/flights" class="nav-link">Reservar Vuelo</router-link>
                <router-link to="/cart" class="nav-link">Carrito</router-link>
                
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Usuario
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li v-if="!isAuthenticated">
                            <router-link to="/login" class="dropdown-item">Iniciar Sesión</router-link>
                        </li>
                        <li v-if="!isAuthenticated">
                            <router-link to="/register" class="dropdown-item">Registrarse</router-link>
                        </li>
                        <li v-if="isAuthenticated">
                            <router-link to="/profile" class="dropdown-item">Perfil</router-link>
                        </li>
                    </ul>
                </div>
                
                <div v-if="isAuthenticated">
                    <button @click="logout" class="nav-link btn btn-link">Cerrar Sesión</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        isAuthenticated: Boolean,
        logout: Function
    },
    methods: {
        goToProfile() {
            if (!this.isAuthenticated) {
                this.$router.push('/'); 
            }
        },

}
    }

</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    padding: 1rem 2rem;
    background-color: #003366;
    color: #ffffff;
}

.navbar-brand {
    font-size: 1.5rem;
    color: #ffffff; 
    text-decoration: none;
}

.navbar-nav {
    display: flex;
    align-items: center; 
    gap: 2rem; 
    margin-left: auto;
}

.nav-link {
    color: #ffffff; 
    text-decoration: none;
    font-weight: 600; 
    transition: color 0.3s;
}

.nav-link:hover {
    color: #4a90e2;
}
</style>