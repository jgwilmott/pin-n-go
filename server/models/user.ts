import { Schema, model } from "mongoose";

interface IUser {
  username: String;
  password: String;
  role: "basic" | "admin";
}

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, minlength: 6, required: true },
  role: { type: String, default: "basic", required: true },
});

export default model<IUser>("User", userSchema);
