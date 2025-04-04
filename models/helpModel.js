import mongoose from "mongoose";

const helpSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
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

const helpModel = mongoose.model('helps', helpSchema);
export default helpModel;