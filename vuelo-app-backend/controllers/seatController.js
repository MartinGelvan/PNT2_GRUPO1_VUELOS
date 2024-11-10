import Seat from "../models/Seat.js";

export const getSeats = async (req, res) => {
  const { flightId } = req.query;
  try {
    const seats = await Seat.find({ flightId });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reserveBatchSeats = async (req, res) => {
  const seatsToReserve = req.body;
  try {
    // Reservar múltiples asientos
    for (let seat of seatsToReserve) {
      const seatData = await Seat.findById(seat._id);
      if (seatData && !seatData.estaOcupado) {
        seatData.estaOcupado = true;
        await seatData.save();
      }
    }
    res.status(200).json({ message: 'Asientos reservados con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
