import userModel from "../models/userModel.js";

export const createUser = async (req, res) => {
    try {
        const { name, phone, address, contacts, gender, photo} = req.body;

        const newUser = new userModel({
            name,
            phone,
            address,
            contacts,
            gender,
            photo
        });

        await newUser.save();

        return res.status(200).send({success: true, message: "User create successfull."});

      } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
      }
}