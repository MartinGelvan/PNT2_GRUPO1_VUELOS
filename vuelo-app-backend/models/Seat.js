import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'el numero es obligatorio'], 
    unique: true,
  },
  estaOcupado: {
    type: Boolean,
    
  },
});

const Seat = mongoose.model('Seat', seatSchema);

export default Seat;
