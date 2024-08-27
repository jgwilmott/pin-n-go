import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "@config/db";
import flightRouter from "@routes/flight";

const app = express();
dotenv.config();
connectDB();

// Request body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/flights", flightRouter);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message ?? "Server error" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
