import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Flight',  // Si el vuelo es una referencia a otro modelo
  },
  seatNumber: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const Seat = mongoose.model('Seat', seatSchema);

export default Seat;
