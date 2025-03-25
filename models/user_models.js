import mongoose,{Schema} from "mongoose";

const user=new Schema({
    name:{
        type:String,
    },
    address:{
        type:{}
    },
    contacts:{
        type:{}
    },
    location:{
        type:[]
    }
})

const user_model=mongoose.model('user_model',user)
export default user_model