import express from 'express';
import multer from "multer";
import fs from "fs";

// router object
const mediaRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname.replace(/\s+/g, "-"));
  },
});

const imageUpload = multer({ storage: storage });

mediaRouter.post('/', imageUpload.single('image'), (req, res) => {
    res.status(200).json({ 
        message: "File uploaded successfully", 
        fileName: req.file.filename 
    });
}, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
})

export default mediaRouter;