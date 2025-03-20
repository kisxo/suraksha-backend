import userModel from "../models/userModel.js";

export const createUser = async (req, res) => {
    try {
    const { name, phone, address, contacts, gender, photo} = req.body;

    const currentUser = await userModel.findOne({ phone: phone });
    if(currentUser)
    {
        return res.status(400).send({success: false, message: "User already exists."});
    }

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


export const listUsers = async (req, res) => {
    try {

        const userList = await userModel.find({});

    return res.status(200).send({success: true, message: "User List successfull", data: userList});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}