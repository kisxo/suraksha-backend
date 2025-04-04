import userModel from "../models/userModel.js";
import helpModel from "../models/helpModel.js";
import redisClient from "../config/redis.js";
import { sendWhatsapp } from "../utils/notification.js";
import { checkPhone, generateAccessToken, generateOTP, verifyToken, verifyOtp} from "../utils/security.js";

export const createUser = async (req, res) => {
    try {
    const { name, phone, address, contacts, gender, photo, otp} = req.body;

    const parsed_phone = checkPhone(phone);
    if(!parsed_phone)
    {
        return res.status(402).send({success: false, message: "Invalid Phone Number"});
    }
    
    if(await verifyOtp(phone, otp) != true)
    {
        return res.status(400).send({success: false, message: "Invalid otp"});
    }
    
    const currentUser = await userModel.findOne({ phone: phone });
    if(currentUser)
    {
        return res.status(400).send({success: false, message: "User already exists."});
    }

    const token = generateAccessToken()
    const newUser = new userModel({
        name,
        phone,
        address,
        contacts,
        gender,
        photo,
        token
    });

    await newUser.save();

    // delete otp after signup
    redisClient.del(`otp-${phone}`)
    return res.status(200).send({success: true, message: "User create successfull.", data: {token}});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}
export const loginUser = async (req, res) => {
    try {
    const { phone, otp} = req.body;

    const parsed_phone = checkPhone(phone);
    if(!parsed_phone)
    {
        return res.status(402).send({success: false, message: "Invalid Phone Number"});
    }
    
    if(await verifyOtp(phone, otp) != true)
    {
        return res.status(400).send({success: false, message: "Invalid otp"});
    }
    
    const currentUser = await userModel.findOne({ phone: phone });
    if(! currentUser)
    {
        return res.status(400).send({success: false, message: "User not found."});
    }

    const token = generateAccessToken()
    currentUser.token = token;
    currentUser.save();

    // delete otp after signup
    redisClient.del(`otp-${phone}`)

    //update access token for old help from redis
    const helpList = await helpModel.find({active: true, phone: currentUser.phone})

    helpList.forEach(async (help) => {
        let currentHelp = await redisClient.hGetAll(String(help._id));
        if(currentHelp.id)
        {
            currentHelp.token = currentUser.token;
            await redisClient.hSet(currentHelp.id, currentHelp);
        }
    })

    return res.status(200).send({success: true, message: "User login successfull.", data: {token}});

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

export const getUserByToken = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await userModel.findOne({ token });

    return res.status(200).send({success: true, message: "User got successfull", data: user});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

export const addContact = async (req, res) => {
    try {
        const { token, phone } = req.body;
        const currentUser = await userModel.findOne({ token });

        if(! currentUser)
        {
            return res.status(400).send({success: false, message: "User not found."});
        }

        currentUser.contacts.push(phone);
        currentUser.save()

    return res.status(200).send({success: true, message: "Contact add successfull"});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

export const removeContact = async (req, res) => {
    try {
        const { token, phone } = req.body;
        const currentUser = await userModel.findOne({ token });

        if(! currentUser)
        {
            return res.status(400).send({success: false, message: "User not found."});
        }

        currentUser.contacts.pop(phone);
        currentUser.save()

        return res.status(200).send({success: true, message: "Contact removed successfull"});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}