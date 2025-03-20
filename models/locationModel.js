import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
    {
        helpId: {
            type: String,
            default: null,
        },
        latitude:{
            type: String,
        },
        longitude:{
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const locationModel = mongoose.model('location', locationSchema);
export default locationModel;