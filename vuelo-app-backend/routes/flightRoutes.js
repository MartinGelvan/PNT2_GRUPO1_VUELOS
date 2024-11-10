import express from 'express';
import { getFlights, reserveFlight } from '../controllers/flightController.js';

const router = express.Router();

router.get('/', getFlights);
router.post('/reserve', reserveFlight);  // Ruta para reservar vuelo

export default router;
