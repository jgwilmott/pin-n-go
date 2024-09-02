import express from "express";
import {
  addFlight,
  deleteFlight,
  getFlight,
  updateFlight,
} from "@controllers/flight";
const router = express.Router();

router.get("/:id", getFlight);
router.post("/", addFlight);
router.patch("/:id", updateFlight);
router.delete("/:id", deleteFlight);

export default router;
