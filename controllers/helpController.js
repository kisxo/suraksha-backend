import redisClient from "../config/redis.js";

import helpModel from "../models/helpModel.js";
import userModel from "../models/userModel.js";
import locationModel from "../models/locationModel.js";
import { sendMessageToRoom } from "../server.js";


export const createHelp = async (req, res) => {
    try {
    const { token } = req.body;
    
    console.log("Create help", token)
    const currentUser = await userModel.findOne({ token: token});

    if (!currentUser)
    {
        return res.status(404).send({success: false, message: "User not found."});
    }

    //delete old help from redis
    const helpList = await helpModel.find({active: true, phone: currentUser.phone})
    helpList.forEach((help) => {
        redisClient.del(String(help._id))
    })
    //close duplicate / older active helps
    await helpModel.updateMany({active: true, phone: currentUser.phone}, {active: false, status: "user closed"})

    const newHelp = new helpModel({
        user: currentUser._id,
        phone: currentUser.phone,
        active: true,
        status: "new"
    });

    await newHelp.save();

    const data = {
        help_id: newHelp._id,
    }

    const redisData = {
        id: String(newHelp._id),
        token: currentUser.token,
        counter: 0
    }

    // store help id to check if help is still active while storing location
    await redisClient.hSet(String(newHelp._id), redisData);

    return res.status(200).send({success: true, data: data, message: "Help created successfull."});

    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: error.message });
    }
}


export const listHelps = async (req, res) => {
    try {

        const helpList = await helpModel.find({}).populate('user')

    return res.status(200).send({success: true, message: "Help List successfull", data: helpList});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

export const getHelp = async (req, res) => {
    try {
        const helpId = req.params.helpId;
        const helpInDb = await helpModel.findById(helpId)

    return res.status(200).send({success: true, data:helpInDb, message: "Help got successfull"});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

export const closeHelp = async (req, res) => {
    try{
        const { token } = req.body;
        
        console.log("close help", token)
        const currentUser = await userModel.findOne({ token: token});

        if (!currentUser)
        {
            return res.status(404).send({success: false, message: "User not found."});
        }

        //delete old help from redis
        const helpList = await helpModel.find({active: true, phone: currentUser.phone})

        helpList.forEach((help) => {
            redisClient.del(String(help._id))
        })
        //close duplicate / older active helps

        await helpModel.updateMany({active: true, phone: currentUser.phone}, {active: false, status: "user closed"})

        return res.status(200).send({success: true, data:helpInDb, message: "Help closed successfull"});

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

export const logLocations = async (req, res) => {
    try {
        const { helpId, token, latitude, longitude } = req.body;
        if(!helpId)
        {
            return res.status(400).send({ success: false, message: "Please provide a help id" });
        }

        //check if the help id given exists or not
        let currentHelp = await redisClient.hGetAll(helpId);
        if(!currentHelp.id)
        {
            return res.status(404).send({ success: false, message: "Current help is not active" });
        }

        // match access token with help
        if(currentHelp.token != token)
        {
            return res.status(403).send({ success: false, message: "Auth failed"});
        }

        // check latitude and longitude
        if(longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90)
        {
            return res.status(403).send({ success: false, message: "Invalid location"});
        }

        //set current latitude and longitude
        currentHelp.latitude = latitude;
        currentHelp.longitude = longitude;

        //check if help counter is 12 ie (12 x 5 seconds = 1 minute) 
        //if its greater than 12 store the location point in database
        if (parseInt(currentHelp.counter) >= 12)
        {
            currentHelp.counter = 0

            //save the location snapshot in database(every 1 minute)
            const newLocation = new locationModel({
                help: currentHelp.id,
                latitude: currentHelp.latitude,
                longitude: currentHelp.longitude,
            });
        
            await newLocation.save();
        }else
        {   
            currentHelp.counter = parseInt(currentHelp.counter) + 1;
        }
        console.log(currentHelp);
        await redisClient.hSet(currentHelp.id, currentHelp);

        sendMessageToRoom(currentHelp.id, currentHelp);
        return res.status(200).send({ success: true });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: error.message });
    }
}