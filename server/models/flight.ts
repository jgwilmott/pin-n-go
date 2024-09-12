import { Schema, Types, model } from "mongoose";

interface IFlight {
  airport_departure_code: AirportCode;
  airport_arrival_code: AirportCode;
  departure_date: Date;
  return_date?: Date;
  user: Types.ObjectId;
}

const flightSchema = new Schema(
  {
    airport_departure_code: { type: String, required: true },
    airport_arrival_code: { type: String, required: true },
    departure_date: { type: Date, required: true },
    return_date: { type: Date },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
  },
);

export default model<IFlight>("Flight", flightSchema);
