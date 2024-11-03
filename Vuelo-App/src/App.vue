<template>
    <div id="app">
        <header>
            <Nav :isAuthenticated="isAuthenticated" :logout="logout" />
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import { useAuthStore } from "./stores/authStore.js"
import { onMounted, computed } from "vue";
import Nav from "../src/components/Nav.vue"

export default {
    name: 'App',
    components: {
        Nav
    },
    setup() {
        const authStore = useAuthStore()
        
        // Computed para obtener el estado de autenticación de forma reactiva
        const isAuthenticated = computed(() => authStore.isAuthenticated)

        const logout = () => {
            authStore.logout()
        }
        
        onMounted(() => {
            authStore.loadUser()
        })
        
        return { isAuthenticated, logout }
    }
}
</script>
