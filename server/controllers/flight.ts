import Flight from "@models/flight";
import { isAirportCode } from "@utils/validate";
import { RequestHandler } from "express";

export const getOne: RequestHandler = async (req, res) => {
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

export const create: RequestHandler = async (req, res) => {
  const {
    airport_departure_code,
    airport_arrival_code,
    departure_date,
    return_date,
  } = req.body;

  if (!isAirportCode(airport_departure_code))
    return res.status(400).json({message: "Invalid departure airport code"});

  if (!isAirportCode(airport_arrival_code))
    return res.status(400).json({message: "Invalid arrival airport code"});

  if (return_date && return_date <= departure_date) 
    return res.status(400).json({message: "Return date must be after departure date"});

  const flight = await Flight.create({
    airport_departure_code,
    airport_arrival_code,
    departure_date,
    return_date,
  });

  res.status(201).json({
    id: flight._id,
  });
};

export const updateOne: RequestHandler = async (req, res) => {
  const {
    airport_departure_code,
    airport_arrival_code,
    departure_date,
    return_date,
  } = req.body;

  if (airport_departure_code && !isAirportCode(airport_departure_code))
    return res.status(400).json({message: "Invalid departure airport code"});

  if (airport_arrival_code && !isAirportCode(airport_arrival_code))
    return res.status(400).json({message: "Invalid arrival airport code"});

  if (return_date && return_date <= departure_date) 
    return res.status(400).json({message: "Return date must be after departure date"});

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
};

export const deleteOne: RequestHandler = async (req, res) => {
  const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
  res.status(200).json({ ...deletedFlight, message: "Deletion successful" });
};
