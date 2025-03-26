import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
    {
        help: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'helps',
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

const locationModel = mongoose.model('locations', locationSchema);
export default locationModel;