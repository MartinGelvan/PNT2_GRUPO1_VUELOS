import express from "express";
import Flight from "../models/flight.js"; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Obtener todos los vuelos
router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (error) {
        res.status(500).send('Error al obtener los vuelos');
    }
});

// Crear un nuevo vuelo
router.post('/', async (req, res) => {
    const { from, to, date, seats } = req.body;

    try {
        const newFlight = new Flight({ from, to, date, seats });
        await newFlight.save();
        res.status(201).json(newFlight); // Devuelve el vuelo creado
    } catch (error) {
        res.status(400).send('Error al crear el vuelo');
    }
});

// Actualizar un vuelo existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { from, to, date, seats } = req.body;

    try {
        const updatedFlight = await Flight.findByIdAndUpdate(id, { from, to, date, seats }, { new: true });
        if (!updatedFlight) {
            return res.status(404).send('Vuelo no encontrado');
        }
        res.json(updatedFlight);
    } catch (error) {
        res.status(400).send('Error al actualizar el vuelo');
    }
});

// Eliminar un vuelo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFlight = await Flight.findByIdAndDelete(id);
        if (!deletedFlight) {
            return res.status(404).send('Vuelo no encontrado');
        }
        res.status(204).send(); // Sin contenido
    } catch (error) {
        res.status(500).send('Error al eliminar el vuelo');
    }
});

export default router;
