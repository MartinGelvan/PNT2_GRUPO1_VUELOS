import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bdVuelosApp")
    .then(() => console.log("Conectado a la base de datos MongoDB"))
    .catch(err => console.log("Error al conectar a la base de datos MongoDB", err));
  
    console.log('Conectado a la base de datos MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB', err);
    process.exit(1); 
  }
};

export default connectDB;
