
import User from '../models/User.js';
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';  








export const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'Por favor, complete todos los campos' });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword, 
    });

    await user.save();
    
    res.status(201).json({ message: 'Usuario registrado correctamente' });

  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};










export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Datos recibidos en login:", req.body);  

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Contraseña incorrecta");
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login exitoso', token , name: user.name});

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
