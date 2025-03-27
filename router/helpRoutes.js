import express from "express";
import { createHelp, listHelps, getHelp, logLocations, closeHelp} from "../controllers/helpController.js";

const helpRouter = express.Router();

helpRouter.post('/', createHelp)
helpRouter.get('/', listHelps)
helpRouter.post('/close', closeHelp)
helpRouter.post('/locations', logLocations)
helpRouter.get('/:helpId', getHelp)


export default helpRouter;