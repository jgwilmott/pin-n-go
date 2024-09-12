import { Model, Schema, Types, model } from "mongoose";
import { pbkdf2Sync as deriveKeySync, randomBytes } from "crypto";

interface IUser {
  username: String;
  role: "basic" | "admin";
  hash: String;
  salt: String;
  flights: [Types.ObjectId];
}

interface IUserMethods {
  setPassword(password: string): void;
  passwordIsValid(password: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: { type: String, unique: true, required: true },
  role: { type: String, default: "basic", required: true },
  hash: String,
  salt: String,
  flights: [{type: Schema.ObjectId, ref: "Flight"}]
});

userSchema.method("setPassword", function setPassword(password: string) {
  this.salt = randomBytes(16).toString("hex");
  this.hash = deriveKeySync(password, this.salt as string, 10, 64, "sha512").toString("hex");
});

userSchema.method("passwordIsValid", function passwordIsValid(password: string) {
  const hash = deriveKeySync(password, this.salt as string, 10, 64, "sha512").toString("hex");
  return this.hash === hash;
});

export default model<IUser, UserModel>("User", userSchema);
