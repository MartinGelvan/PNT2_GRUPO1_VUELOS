import express from 'express';
import { getFlightById, getFlights, reserveFlight } from '../controllers/flightController.js';
import Reservation from '../models/Reservation.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/', getFlights);
router.post('/reserve', reserveFlight);  // Ruta para reservar vuelo
router.get('/flight',getFlightById)
// Ejemplo de backend para obtener un vuelo específico
/* router.get('/api/flight', (req, res) => {
    const { flightId } = req.query;
    
    // Buscar el vuelo específico por su ID en la base de datos (o lista)
    const flight = flights.find(f => f._id === flightId);
    console.log("Esto es Flight: ", flight)
    
    if (flight) {
      return res.json({ flight }); // Devuelve solo el vuelo encontrado
    } else {
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    }
  });
 */

  router.get('/reservations', async (req, res) => {
    try {
      const token = req.header('Authorization')?.split(' ')[1]; 
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const userId = decoded.userId; 
      const reservations = await Reservation.find({ userId: userId }).populate('flightId seats');
      res.status(200).json(reservations);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
      res.status(500).json({ message: 'Error al obtener las reservas' });
    }
  });
export default router;
