import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Flights from '@/components/FlightList.vue';
import Profile from '@/components/Profile.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Seats from '@/components/Seats.vue';
import { useUserStore } from '../store/userStore.js'; // Asegúrate de tener acceso al store

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/flights',
    name: 'flights',
    component: Flights,
    meta: { requiresAuth: true }, // Añadido meta para proteger la ruta
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/seats',
    name: 'Seats',
    component: Seats,
    props: route => ({ flightId: route.query.flightId }), // Pasar el flightId a Seats
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated; // O revisa en localStorage

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirigir al login si no está autenticado
  } else {
    next(); // Permitir navegación si está autenticado o la ruta no requiere autenticación
  }
});

export default router;
