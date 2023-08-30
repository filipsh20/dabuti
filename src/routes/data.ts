import express from "express";
import { Data } from "../controllers/data";

const router = express.Router();

router.post("/auth", Data);

export default router;
