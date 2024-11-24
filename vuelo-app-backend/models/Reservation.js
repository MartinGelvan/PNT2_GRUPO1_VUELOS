
import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Flight', 
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',  // Si el vuelo es una referencia a otro modelo
      },
      seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',  // Aquí se referencia el modelo Seat
        required: true
    }],
});

const Reservation = mongoose.model('Reservation', ReservationSchema);
export default Reservation
