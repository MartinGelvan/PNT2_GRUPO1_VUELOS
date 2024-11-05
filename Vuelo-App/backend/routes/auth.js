import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import MongoConnection from "../models/MongoConnection.js"
import { MongoClient, ObjectId } from "mongodb";

const router = express.Router();

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Registro
router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, lastName, userName, email, phone, password: hashedPassword });
        await newUser.save();
        res.status(201).send('Usuario Registrado'); // Mensaje de éxito
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('El nombre de usuario ya está en uso.');
        }
        res.status(500).send('Error en el registro');
    }
});

// Inicio de Sesion
router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
            return res.json({ token });
        }
        return res.status(401).send('Los datos son incorrectos');
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).send('Error en el servidor');
    }
});

// Obtener detalles del usuario
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        console.log(user)
        if (!user) return res.status(404).send('Usuario no encontrado');
        res.json(user);
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        res.status(500).send('Error en el servidor');
    }
});
// Actualizar perfil del usuario
router.put('/profile', authenticateToken, async (req, res) => {
    const { name, lastName, email, phone } = req.body; // Recibir los datos a actualizar

    try {

        const result = await MongoConnection.db.collection("users").updateOne(
            { _id: new ObjectId(id) }, 
            { $set: data } 
        );

        /*
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, // El id del usuario autenticado
            { name, lastName, email, phone }, // Datos a actualizar
            { new: true, runValidators: true } // Opciones: devuelve el documento actualizado y valida los datos
        ).select('-password'); // Excluir la contraseña de la respuesta

        if (!updatedUser) return res.status(404).send('Usuario no encontrado');
        res.json(updatedUser); // Devuelve el usuario actualizado
        */
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        res.status(500).send('Error en el servidor');
    }
});


const Router = router;

export default Router;