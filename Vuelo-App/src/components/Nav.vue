<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">VuelosApp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-link active">Inicio</router-link>
                    <router-link to="/flights" class="nav-link">Buscar Vuelos</router-link>
                    <router-link to="/cart" class="nav-link">Carrito</router-link>
                    
                    <div v-if="isAuthenticated">
                        <button @click="logout" class="nav-link btn btn-link">Cerrar Sesión</button>
                    </div>
                    <div v-if="!isAuthenticated">
                        <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
                        
                    </div>
                    <div v-if="!isAuthenticated">
                        <router-link to="/register" class="nav-link">Registrarse</router-link>
                        
                    </div>
                    
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
    }
}
</script>
