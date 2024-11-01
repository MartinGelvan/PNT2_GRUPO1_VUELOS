import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
   from:String,
   to:String,
   date:Date,
   seats: [{seatNumber:String,available:Boolean}]
})

const Flight = mongoose.model('Flight',FlightSchema)

export default Flight