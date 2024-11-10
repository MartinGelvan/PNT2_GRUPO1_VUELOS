import express from 'express';
import { getFlights, reserveFlight } from '../controllers/flightController.js';

const router = express.Router();

router.get('/api/flights', getFlights);
router.post('/api/flights/reserve', reserveFlight);  // Ruta para reservar vuelo

export default router;
