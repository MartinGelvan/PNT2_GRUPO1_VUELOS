import express from 'express';
import { getSeatsForFlight , reserveBatchSeats } from '../controllers/seatController.js';
import mongoose from 'mongoose';

const router = express.Router();  // Usa 'router', no 'app'

// Ruta para obtener los asientos de un vuelo específico
router.get('/seats', async (req, res) => {
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
