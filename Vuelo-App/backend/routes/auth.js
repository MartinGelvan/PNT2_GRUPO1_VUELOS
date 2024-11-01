import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"


const router = express.Router()

//Registro

router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('Usuario Registrado'); // Mensaje de éxito
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('El nombre de usuario ya está en uso.');
        }
        res.status(500).send('Error en el registro');
    }
});


//Inicio de Sesion

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

const Router = router

export default Router