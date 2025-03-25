import mongoose from "mongoose";

const uri = "";

async function database() {
    mongoose.connection.on('connected', () => console.log('connected'));
    await mongoose.connect(uri)
}

export default database