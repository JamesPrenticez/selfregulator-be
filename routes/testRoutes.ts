import express from "express";
import * as testController from "../controllers/testControllers";

const router = express.Router();

router.get("/api/test/env", testController.testENV);
router.post("/api/test/somedata", testController.someData);

export default router;
