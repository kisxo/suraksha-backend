import userModel from "../models/userModel.js";
import redisClient from "../config/redis.js";
import { sendWhatsapp } from "../utils/notification.js";
import { checkPhone, generateOTP } from "../utils/security.js";

export const createUser = async (req, res) => {
    try {
    const { name, phone, address, contacts, gender, photo, token} = req.body;

    if(!token)
    {
        return res.status(402).send({success: false, message: "Please provide a token"});
    }

    return res.status(402).send(redisClient.get(`token-${phone}`));

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

export const sendOtp = async (req, res) => {
    try {
        const {phone} = req.body;
        const parsed_phone = checkPhone(phone)
        if(!parsed_phone || parsed_phone < 1000000000)
        {
            return res.status(402).send({success: false, message: "Invalid Phone Number"});
        }

        const otp = generateOTP()

        //set expire time to 15 minutes
        const message = `Suraksha App:\nYour OTP for verification is ${otp}.\nIt is valid for 15 minutes. For your security, please do not share this code with anyone.`
        sendWhatsapp(parsed_phone, message);
        redisClient.set(`otp-${phone}`, otp, {EX: 60*15});

        return res.status(200).send({success: true, message: "Otp send successfull"});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}