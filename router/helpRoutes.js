import express from "express";
import { createHelp } from "../controllers/helpController.js";

const helpRouter = express.Router();

helpRouter.post('/', createHelp)

// helpRouter.get("/", async (req, res) => {
//       console.log(req.body)
//       return res.status(200).send("gg")
// });

// helpRouter.post("/", async (req, res) => {
//       console.log(req.body)
//       return res.status(200).send("gg")
// });

// helpRouter.post("/locations", async (req, res) => {
//       console.log('locations')
//       console.log(req.body)
//       return res.status(200).send("gg")
// });


export default helpRouter;