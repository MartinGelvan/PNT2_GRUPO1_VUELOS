import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import flightRoutes from './routes/flightRoutes.js'; 
import seatsRoutes from './routes/seatRoutes.js'; 
import cors from 'cors'; 

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));

app.use(express.json());  

app.use('/api/seats', seatsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);


app.listen(5001, () => {
  console.log('Servidor corriendo en el puerto 5001');
});
