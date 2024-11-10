
import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  booked: { type: Boolean, default: false },
});

const Flight = mongoose.model('Flight', FlightSchema);
export default Flight
