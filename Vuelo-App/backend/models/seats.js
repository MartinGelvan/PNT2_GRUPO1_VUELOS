import mongoose from "mongoose";

const SeatsSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    idVuelo: { type: String, required: true },
    estaDisponible:{type:Boolean, required: true}
});


const Seats = mongoose.model('Seat',SeatsSchema)
export default Seats