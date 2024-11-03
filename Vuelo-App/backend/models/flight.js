import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
   from: {
       type: String,
       required: true // Si deseas que este campo sea obligatorio
   },
   to: {
       type: String,
       required: true // Si deseas que este campo sea obligatorio
   },
   date: {
       type: Date,
       required: true // Si deseas que este campo sea obligatorio
   },
   seats: {
       type: Number,
       default: 0 // Establece el valor por defecto para los asientos
   }
});

// Crea el modelo Flight a partir del esquema FlightSchema
const Flight = mongoose.model('Flight', FlightSchema);

export default Flight;
