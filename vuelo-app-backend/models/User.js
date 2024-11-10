
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'], 
  },
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'], 
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],  
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],  
  }
});

const User = mongoose.model('User', userSchema);

export default User;
