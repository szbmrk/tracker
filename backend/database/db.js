import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, clientOptions);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}