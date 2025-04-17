import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db";
import Route from "./routes/index";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", Route);

connectDB();

export default app;
