import Flight from '../models/Flight.js';



export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const reserveFlight = async (req, res) => {
  const { flightId } = req.body;
  try {
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: 'Vuelo no encontrado' });

    if (flight.booked) return res.status(400).json({ message: 'Este vuelo ya está reservado' });

    flight.booked = true;
    await flight.save();
    
    res.status(200).json({ message: 'Vuelo reservado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
