import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // Asegúrate de que exista
    password: { type: String, required: true }
});


const User = mongoose.model('User',UsersSchema)
export default User