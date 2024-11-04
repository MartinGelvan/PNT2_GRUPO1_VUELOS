import express from 'express';
import Flight from '../models/flight.js';

const router = express.Router();

// Get all flights
router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (error) {
        res.status(500).send('Error al obtener los vuelos');
    }
});

// Get a flight by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const flight = await Flight.findById(id);
        if (!flight) {
            return res.status(404).send('Flight not found');
        }
        res.json(flight);
    } catch (error) {
        res.status(500).send('Error retrieving flight');
    }
});

// Create a new flight
router.post('/', async (req, res) => {
    const { from, to, date, seats } = req.body;
    try {
        const newFlight = new Flight({ from, to, date, seats });
        await newFlight.save();
        res.status(201).json(newFlight);
    } catch (error) {
        res.status(400).send('Error al crear el vuelo');
    }
});

// Update an existing flight
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { from, to, date, seats } = req.body;

    try {
        const updatedFlight = await Flight.findByIdAndUpdate(id, { from, to, date, seats }, { new: true });
        if (!updatedFlight) {
            return res.status(404).send('Flight not found');
        }
        res.json(updatedFlight);
    } catch (error) {
        res.status(400).send('Error updating flight');
    }
});

// Delete a flight
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFlight = await Flight.findByIdAndDelete(id);
        if (!deletedFlight) {
            return res.status(404).send('Flight not found');
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).send('Error deleting flight');
    }
});

export default router;