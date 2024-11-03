import {createRouter,createWebHistory} from "vue-router"
import Home from "../components/Home.vue"

import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import Flights from "../components/Flights.vue"
import Cart from "../components/Cart.vue"

const routes = [

    {path:'/',component:Home},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/flights',component:Flights},
    {path:'/cart',component:Cart}

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router