import mongoose from "mongoose";
import process from "node:process";
// import dotenv from "dotenv";
// dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("❌ MONGO_URI is not defined in the .env file");
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME || "myDatabase", 
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000, 
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

// Handling Unexpected Disconnects
mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB Disconnected! Reconnecting...");
    connectDB(); // Automatically reconnect
});

export default connectDB;