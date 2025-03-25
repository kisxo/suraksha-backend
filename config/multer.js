import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
        console.log(file.originalname);

        console.log("incoming file")

    }
})

export default storage