import express from "express";
import { createHelp, listHelps } from "../controllers/helpController.js";

const helpRouter = express.Router();

helpRouter.post('/', createHelp)
helpRouter.get('/', listHelps)

export default helpRouter;