import mongoose from "mongoose";

const helpSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            default: null,
        },
        phone:{
            type: String,
        },
        status:{
            type: String,
        },
        accessKey:{
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const helpModel = mongoose.model('help', helpSchema);
export default helpModel;