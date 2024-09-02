import { deleteUser, login, register, updateUserRole } from "@controllers/user";
import express from "express";
const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.patch("/:id", updateUserRole);
router.delete("/:id", deleteUser);

export default router;
