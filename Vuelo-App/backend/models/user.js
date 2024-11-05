import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: false },
    lastName: { type: String, required: false },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    password: { type: String, required: true }
});


const User = mongoose.model('User', UsersSchema)
export default User;