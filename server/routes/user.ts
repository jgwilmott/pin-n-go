import { deleteUser, login, register, updateUserRole } from "@controllers/user";
import { adminUserAuth, basicUserAuth } from "@middleware/auth";
import express from "express";
const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.patch("/:id", adminUserAuth, updateUserRole);
router.delete("/:id", adminUserAuth, deleteUser);

export default router;
