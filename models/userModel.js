import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
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
        },
        token: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const userModel = mongoose.model('users', userSchema);
export default userModel;