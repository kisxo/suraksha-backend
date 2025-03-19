import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    phone:{
        type: String,
    },
    address:{
        type: String
    },
    contacts:{
        type: []
    },
    gender: {
        type: String
    },
    photo: {
        type: String
    }
})

const userModel = mongoose.model('user', userSchema);
export default userModel;