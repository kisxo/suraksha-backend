import mongoose from "mongoose";

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log(`Mongodb Connected ${mongoose.connection.host}`);
    } catch (error) {
      console.log(`Mongodb Server Issue ${error}`);
    }
  };

export default connectDB;