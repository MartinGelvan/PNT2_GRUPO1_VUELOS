import express from 'express';
import { getFlightById, getFlights, reserveFlight } from '../controllers/flightController.js';

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
export default router;
