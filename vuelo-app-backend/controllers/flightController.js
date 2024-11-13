import Flight from "../models/Flight.js";
import Seat from "../models/Seat.js";

export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();  // Obtener todos los vuelos
    // Para cada vuelo, verificar la cantidad de asientos disponibles
    for (let flight of flights) {
      const seats = await Seat.find({ flightId: flight._id });
      const availableSeats = seats.filter(seat => !seat.estaOcupado);
      flight.availableSeats = availableSeats.length;  // Añadir la cantidad de asientos disponibles
    }
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findOne({_id: req.query.flightId});  // Obtener todos los vuelos
    console.log("Este es mi unico Flight: ", flight)
    
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para reservar asientos de un vuelo
export const reserveFlight = async (req, res) => {
  const { flightId, seatNumbers } = req.body;
  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    }

    // Obtener todos los asientos del vuelo
    const seats = await Seat.find({ flightId });
    const unavailableSeats = seats.filter(seat => 
      seatNumbers.includes(seat.number) && seat.estaOcupado
    );

    if (unavailableSeats.length > 0) {
      return res.status(400).json({ message: 'Algunos asientos ya están ocupados' });
    }

    // Marcar los asientos seleccionados como ocupados
    for (let seatNumber of seatNumbers) {
      const seat = await Seat.findOne({ flightId, number: seatNumber });
      if (seat && !seat.estaOcupado) {
        seat.estaOcupado = true;
        await seat.save();
      }
    }

    // Verificar si todos los asientos están ocupados
    const allSeatsOccupied = seats.every(seat => seat.estaOcupado);
    if (allSeatsOccupied) {
      flight.booked = true;  // El vuelo se marca como reservado solo cuando todos los asientos están ocupados
      await flight.save();
    }

    res.status(200).json({ message: 'Reserva realizada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
