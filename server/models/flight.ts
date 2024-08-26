import { Schema, model } from "mongoose";

interface IFlight {
  airport_departure_code: AirportCode;
  airport_arrival_code: AirportCode;
  departure_date: Date;
  return_date?: Date;
}

const flightSchema = new Schema(
  {
    airport_departure_code: { type: String, required: true },
    airport_arrival_code: { type: String, required: true },
    departure_date: { type: Date, required: true },
    return_date: { type: Date },
  },
  {
    timestamps: true,
  },
);

export default model<IFlight>("Flight", flightSchema);
