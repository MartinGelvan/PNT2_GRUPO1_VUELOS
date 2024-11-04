import express from 'express';
import Booking from '../models/booking.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
    const { userId, flightId, seats, luggage } = req.body;
    try {
        const newBooking = new Booking({ userId, flightId, seats, luggage });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).send('Error creating booking');
    }
});

// Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const bookings = await Booking.find({ userId }).populate('flightId');
        res.json(bookings);
    } catch (error) {
        res.status(500).send('Error retrieving bookings');
    }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).send('Error retrieving bookings');
    }
});

export default router;