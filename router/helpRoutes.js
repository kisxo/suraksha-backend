import express from "express";
import { createHelp, listHelps, getHelp} from "../controllers/helpController.js";

const helpRouter = express.Router();

helpRouter.post('/', createHelp)
helpRouter.get('/', listHelps)
helpRouter.get('/:helpId', getHelp)

export default helpRouter;