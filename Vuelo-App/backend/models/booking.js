import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'flight',
        required: true
    },
    seatsBooked: {
        type: Number,
        required: true
    },
    luggage: {
        type: Number,
        required: true
    },
    selectedSeats: [{ type: Number }],
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
