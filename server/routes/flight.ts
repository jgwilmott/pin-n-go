import express from "express";
import { create, deleteOne, getOne, updateOne } from "@controllers/flight";
const router = express.Router();

router.get("/:id", getOne);
router.post("/", create);
router.patch("/:id", updateOne);
router.delete("/:id", deleteOne);

export default router;
