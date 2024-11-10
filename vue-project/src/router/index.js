import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Flights from '@/components/FlightList.vue'
import Profile from '@/components/Profile.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Seats from '@/components/Seats.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home, // Este es el componente para la página principal
  },
  {
    path: '/flights',
    name: 'flights',
    component: Flights,
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
    props: route => ({ flightId: route.query.flightId }),  // Esto pasará el `flightId` a tu componente Seats
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
