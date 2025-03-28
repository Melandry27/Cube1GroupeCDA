import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

connectDB();

export default app;
