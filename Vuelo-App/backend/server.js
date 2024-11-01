import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import flightRoutes from "./routes/fligths.js"


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/vueloApp')
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));


app.use('/api',authRoutes)
app.use('/api/flights',flightRoutes)

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})