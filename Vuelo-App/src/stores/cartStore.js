import { defineStore } from "pinia";

export const useCartStore = defineStore('cart',{
    state:()=>({
        flights: []
    }),
    actions:{
        addFlight(flight){
            this.flights.push(flight)
        },
        removeFlight(flightId){
            this.flights = this.flights.filter(flight => flight.flight.id !== flightId)
        },
    },
})