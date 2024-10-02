import express from "express";
import * as authController from "../controllers/authControllers";

const router = express.Router();

router.post("/api/login", authController.login);
router.post("/api/logout", authController.logout);
router.post("/api/register", authController.register);

export default router;
