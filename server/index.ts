import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "@config/db";

const app = express();
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
