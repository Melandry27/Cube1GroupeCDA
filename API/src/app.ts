import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db";
import Route from "./routes/index";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

setupSwagger(app);

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", Route);

connectDB();

export default app;
