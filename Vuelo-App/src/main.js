import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./routes/index.js"; // Asegúrate de que la ruta sea correcta

const app = createApp(App); // Crea la instancia de la aplicación
const pinia = createPinia(); // Crea la tienda de Pinia

app.use(pinia); // Usa Pinia
app.use(router); // Usa el router

app.mount('#app'); // Monta la aplicación solo una vez
