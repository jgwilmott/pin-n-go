import { connect, connection } from "mongoose";

export default async function connectDB() {
  try {
    await connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.log(
      "Connection Error ",
      error instanceof Error ? error.message : "",
    );
  }

  if (connection.readyState >= 1) {
    console.log("Connected to the database");
    return;
  }
  connection.on("error", () => console.log("Database connection failed"));
}
