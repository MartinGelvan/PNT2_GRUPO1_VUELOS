import {createRouter,createWebHistory} from "vue-router"
import Home from "../components/Home.vue"
import Seats from "../components/Seats.vue"

import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import Flights from "../components/Flights.vue"
import Cart from "../components/Cart.vue"
import Profile from "../components/Profile.vue"
import FlightDetails from "../components/Booking.vue"
import Payment from "../components/Payment.vue"

const routes = [

    {path:'/',component:Home},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/flights',component:Flights},
    {path:'/cart',component:Cart},
    {path:'/profile',name:'Profile',component: Profile},
    {path: '/flights/:id', name: 'flightDetails', component: FlightDetails },
    {path: '/payment/:flightId/:numSeats', name: 'payment', component: Payment },
    {path: '/seats',component: Seats },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router