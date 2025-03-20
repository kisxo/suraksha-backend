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
        //active or closed
        active:{
            type: Boolean,
        },
        //new, pending, dispatched, user_closed, admin_closed
        status:{
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const helpModel = mongoose.model('help', helpSchema);
export default helpModel;