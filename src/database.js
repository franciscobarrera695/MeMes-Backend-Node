import mongoose from 'mongoose';
import { MONGODB_URI } from "./config/dotenv.js";

export async function connectDB(){
    try {
        const db = await mongoose.connect(MONGODB_URI)
        console.log('db is connected to',db.connection.name)
    } catch (error) {
        console.log(error)
    }
}