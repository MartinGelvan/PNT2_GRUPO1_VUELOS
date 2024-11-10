import express from 'express';
import { getSeats, reserveBatchSeats } from '../controllers/seatController.js';

const router = express.Router();

router.get('/api/seats', getSeats);  // Obtener asientos de un vuelo
router.post('/api/seats/reserveBatch', reserveBatchSeats);  // Reservar varios asientos

export default router;
