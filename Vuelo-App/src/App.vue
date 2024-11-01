<template>
  <div id="app">
      <header>
          <nav>
              <router-link to="/">Inicio</router-link>
              <router-link to="/flights">Buscar Vuelos</router-link>
              <router-link to="/cart">Carrito</router-link>
              <div v-if="isAuthenticated">
                  <button @click="logout">Cerrar Sesion</button>
              </div>
              <div v-else>
                  <router-link to="/login">Iniciar Sesion</router-link>
                  <router-link to="/register">Registrarse</router-link>
              </div>

              
          </nav>
      </header>
      <main>
          <router-view></router-view>
      </main>
  </div>
</template>


<script>
  import {useAuthStore} from "./stores/authStore.js"
  import { onMounted } from "vue";

  export default{
      name: 'App',
      setup(){
          const authStore = useAuthStore()
          const isAuthenticated = authStore.isAuthenticated

          const logout = () =>{
              authStore.logout()
          }
          onMounted(()=> {
              authStore.loadUser()
          })
          return {isAuthenticated,logout}
      }
  }


</script>