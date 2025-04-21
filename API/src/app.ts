import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db";
import Route from "./routes/index";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();

setupSwagger(app);

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", Route);

connectDB();

export default app;
