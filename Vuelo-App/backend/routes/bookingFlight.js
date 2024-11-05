import express from 'express';
import Booking from '../models/booking.js';
import User from '../models/user.js';   // Importa el modelo User
import Flight from '../models/flight.js'; // Importa el modelo Flight

const router = express.Router();

// Ruta para realizar la reserva
// Ruta para realizar la reserva
// Ruta para realizar la reserva
// Ruta para realizar la reserva
// Ruta para realizar la reserva
// Ruta para realizar la reserva
// Ruta para realizar la reserva
router.post('/reserve', async (req, res) => {
    const { userId, flightId, selectedSeats } = req.body;

    try {
        // Verifica que el usuario y el vuelo existan
        const userExists = await User.findById(userId);
        const flightExists = await Flight.findById(flightId);

        if (!userExists) {
            return res.status(400).json({ error: 'El usuario no existe' });
        }

        if (!flightExists) {
            return res.status(400).json({ error: 'El vuelo no existe' });
        }

        // Verifica si los asientos están disponibles
        const seatsExist = await Seat.find({ 
            number: { $in: selectedSeats }, 
            idVuelo: flightId, 
            estaDisponible: true  // Verifica si el asiento está disponible
        });

        // Si no todos los asientos están disponibles, retorna un error
        if (seatsExist.length !== selectedSeats.length) {
            return res.status(400).json({ error: 'Uno o más asientos no están disponibles' });
        }

        // Si todos los asientos están disponibles, procedemos a crear la reserva
        const newBooking = new Booking({
            userId,
            flightId,
            selectedSeats,
        });

        // Guarda la reserva en la base de datos
        await newBooking.save();

        // Responde con éxito y la nueva reserva
        return res.status(201).json({
            message: 'Reserva realizada con éxito',
            booking: newBooking,
        });

    } catch (err) {
        // Si ocurre un error al guardar, responde con un mensaje de error más detallado
        console.error('Error al guardar la reserva:', err.message);
        return res.status(500).json({ error: `Hubo un error al guardar la reserva: ${err.message}` });
    }
});



// Ruta para obtener reservas
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId }).populate('flightId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Hubo un error al obtener las reservas.' });
    }
});

export default router;
