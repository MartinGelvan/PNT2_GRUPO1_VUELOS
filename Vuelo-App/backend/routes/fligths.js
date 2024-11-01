import express from "express"
import Flight from "../models/flight.js"

const router = express.Router()

//Buscar Vuelos

router.get('/',async (req,res) => {
    const {from,to} = req.query
    const flights = await Flight.find({from,to})
    res.json(flights)
})


//Crear vuelo de prueba

router.post('/',async (req,res) => {
    const newFlight = new Flight(req.body)
    await newFlight.save()
    res.status(201).send('Vuelo creado')
})


const FlightRouter = router

export default FlightRouter