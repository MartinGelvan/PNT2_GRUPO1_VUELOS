import Seat from '../models/Seat.js';
import mongoose from 'mongoose';

export const getSeats = async (req, res) => {
  const { flightId } = req.query;

  // Verificar si flightId es válido
  if (!mongoose.Types.ObjectId.isValid(flightId)) {
    console.error('El flightId no es válido:', flightId);
    return res.status(400).json({ message: 'ID de vuelo no válido.' });
  }

  try {
    // Hacer la búsqueda de los asientos
    const seats = await Seat.find({ flightId: mongoose.Types.ObjectId(flightId) });

    if (!seats || seats.length === 0) {
      console.error('No se encontraron asientos para el vuelo:', flightId);
      return res.status(404).json({ message: 'No se encontraron asientos para este vuelo.' });
    }

    res.json(seats);
  } catch (error) {
    console.error('Error al obtener los asientos:', error.message);
    res.status(500).json({ message: 'Error interno en el servidor.' });
  }
};

export const reserveBatchSeats = async (req, res) => {
  const seatsToReserve = req.body;
  try {
    // Reservar múltiples asientos
    for (let seat of seatsToReserve) {
      const seatData = await Seat.findById(seat._id);
      if (seatData && !seatData.isBooked) {
        seatData.isBooked = true;
        await seatData.save();
      }
    }
    res.status(200).json({ message: 'Asientos reservados con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSeatsForFlight = async (flightId) => {
  try {
    const seats = await Seat.find({ flightId });  // Asumiendo que 'Seat' es el modelo de MongoDB
    return seats;
  } catch (error) {
    console.error('Error al obtener los asientos:', error);
    throw new Error('Error al obtener los asientos');
  }
};

