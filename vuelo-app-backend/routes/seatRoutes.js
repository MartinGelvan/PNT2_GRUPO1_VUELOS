import express from 'express';
import { getSeatsForFlight , reserveBatchSeats } from '../controllers/seatController.js';
import Seat from '../models/Seat.js';
import Flight from '../models/Flight.js';
import mongoose from 'mongoose';
import Reservation from '../models/Reservation.js';
const router = express.Router();  // Usa 'router', no 'app'
import jwt from 'jsonwebtoken'; 
import { Types } from 'mongoose';  // Para trabajar con ObjectId, si es necesario

// Ruta para obtener los asientos de un vuelo específico
router.get('/', async (req, res) => {
    try {
      const { flightId } = req.query;  // Asegúrate de que flightId esté llegando correctamente
  
      if (!flightId) {
        return res.status(400).json({ error: 'El parámetro flightId es obligatorio' });
      }
  
  
      // Aquí iría la lógica para obtener los asientos del vuelo
      const seats = await getSeatsForFlight(flightId);  // Suponiendo que existe una función que obtiene los asientos
      
      if (!seats) {
        return res.status(404).json({ error: 'No se encontraron asientos para este vuelo' });
      }
  
      res.json(seats);
    } catch (error) {
      console.error('Error al obtener los asientos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Endpoint para reservar asientos
// Endpoint para reservar asientos
router.post('/reserve-seats', async (req, res) => {
  const { flightId, selectedSeats } = req.body;
  const token = req.header('Authorization')?.split(' ')[1]; 
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET); 

  if (!flightId || !selectedSeats || selectedSeats.length === 0) {
    return res.status(400).json({ success: false, message: 'Datos incompletos' });
  }

  try {
    // Buscar el vuelo por su ID
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Vuelo no encontrado' });
    }

 

    // Contar los asientos disponibles
    const availableSeatsCount = await Seat.countDocuments({
      flightId: flightId,
      isBooked: false, // Solo contar asientos disponibles
    });

    // Verificar si la cantidad de asientos seleccionados es mayor que los disponibles
    if (selectedSeats.length > availableSeatsCount) {
      return res.status(400).json({
        success: false,
        message: `Solo hay ${availableSeatsCount} asientos disponibles para este vuelo.`,
      });
    }

    // Verificar que los asientos seleccionados no estén ocupados
    const seatsToUpdate = await Seat.find({
      flightId: flightId,
      seatNumber: { $in: selectedSeats },
    });

    const unavailableSeats = seatsToUpdate.filter(seat => seat.isBooked);
    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Los siguientes asientos ya están ocupados: ${unavailableSeats.map(seat => seat.seatNumber).join(', ')}`,
      });
    }

    // Marcar los asientos seleccionados como ocupados
    await Seat.updateMany(
      { flightId: flightId, seatNumber: { $in: selectedSeats } },
      { $set: { isBooked: true } }
    );
    const seatsIds = seatsToUpdate.map(seat => seat._id);
    const newReservation = new Reservation({
      flightId: new mongoose.Types.ObjectId(flightId),  // Explicit use of 'new'
      userId: new mongoose.Types.ObjectId(decoded.userId),      // Explicit use of 'new'
      seats: seatsIds,  // seatsIds should already be an array of ObjectIds
    });

    // Guardar la reserva en la base de datos
    await newReservation.save();
    // Responder con éxito
    res.json({ success: true, message: 'Asientos reservados con éxito' });

  } catch (error) {
    console.error('Error al reservar asientos:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Ruta para reservar varios asientos
router.post('/reserveBatch', async (req, res) => {
    try {
      const { flightId, seats } = req.body;  // Obtiene el flightId del cuerpo de la solicitud
  
      if (!flightId) {
        return res.status(400).json({ error: 'No se proporcionó un flightId válido' });
      }
  
      // Procesa la reserva
      await reserveBatchSeats(flightId, seats);
  
      res.status(200).json({ message: 'Reserva exitosa' });
    } catch (error) {
      console.error('Error al reservar los asientos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });  // No es necesario poner '/api/seats' aquí

// Exporta el router para ser usado en el servidor
export default router;
