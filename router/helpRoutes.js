import express from "express";

const helpRouter = express.Router();

helpRouter.get("/", async (req, res) => {
      console.log(req.body)
      return res.status(200).send("gg")
});

helpRouter.post("/", async (req, res) => {
      console.log(req.body)
      return res.status(200).send("gg")
});

helpRouter.post("/locations", async (req, res) => {
      console.log('locations')
      console.log(req.body)
      return res.status(200).send("gg")
});


export default helpRouter;