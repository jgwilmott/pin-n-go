import Flight from "@models/flight";
import { isAirportCode } from "@utils/validate";
import { RequestHandler } from "express";

export const getFlight: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const flight = await Flight.findById(id);
  if (!flight)
    return res.status(404).json({
      message: "Flight information not found",
    });

  const {
    airport_departure_code,
    airport_arrival_code,
    departure_date,
    return_date,
  } = flight;

  return res.status(200).json({
    id,
    airport_departure_code,
    airport_arrival_code,
    departure_date,
    return_date,
  });
};

export const addFlight: RequestHandler = async (req, res, next) => {
  const {
    airport_departure_code,
    airport_arrival_code,
    departure_date,
    return_date,
  } = req.body;

  if (!isAirportCode(airport_departure_code))
    return res.status(400).json({ message: "Invalid departure airport code" });

  if (!isAirportCode(airport_arrival_code))
    return res.status(400).json({ message: "Invalid arrival airport code" });

  if (return_date && return_date <= departure_date)
    return res
      .status(400)
      .json({ message: "Return date must be after departure date" });

  try {
    const flight = await Flight.create({
      airport_departure_code,
      airport_arrival_code,
      departure_date,
      return_date,
    });

    res.status(201).json({
      id: flight._id,
    });
  } catch (error) {
    next(new Error("Could not create flight"));
  }
};

export const updateFlight: RequestHandler = async (req, res, next) => {
  const {
    airport_departure_code,
    airport_arrival_code,
    departure_date,
    return_date,
  } = req.body;

  if (airport_departure_code && !isAirportCode(airport_departure_code))
    return res.status(400).json({ message: "Invalid departure airport code" });

  if (airport_arrival_code && !isAirportCode(airport_arrival_code))
    return res.status(400).json({ message: "Invalid arrival airport code" });

  if (return_date && return_date <= departure_date)
    return res
      .status(400)
      .json({ message: "Return date must be after departure date" });

  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      {
        airport_departure_code,
        airport_arrival_code,
        departure_date,
        return_date,
      },
      { new: true },
    );
    res.status(200).json(updatedFlight);
  } catch (error) {
    next(new Error("Could not update flight info"));
  }
};

export const deleteFlight: RequestHandler = async (req, res, next) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deletion successful", ...deletedFlight});
  } catch (error) {
    next(new Error("Could not delete flight"));
  }
};
