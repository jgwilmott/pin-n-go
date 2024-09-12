import express from "express";
import {
  addFlight,
  deleteFlight,
  getFlight,
  updateFlight,
} from "@controllers/flight";
import { basicUserAuth } from "@middleware/auth";
const router = express.Router();

router.get("/:id", basicUserAuth, getFlight);
router.post("/", basicUserAuth, addFlight);
router.patch("/:id", basicUserAuth, updateFlight);
router.delete("/:id", basicUserAuth, deleteFlight);

export default router;
