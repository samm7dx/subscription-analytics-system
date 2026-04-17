import express from "express";
import { runQuery } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/run-query/:type", runQuery);

export default router;
