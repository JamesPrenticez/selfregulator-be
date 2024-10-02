import express from "express";
import * as userController from "../controllers/userControllers";
import * as habitsController from "../controllers/habitsControllers";
import { validateJWT } from "../utils";

const router = express.Router();

// Users
router.get("/api/user/:id", validateJWT, userController.getUser);
router.get("/api/users", validateJWT, userController.getAllUsers);

// Habits
router.get("/api/habits", validateJWT, habitsController.getUserHabits);

export default router;
