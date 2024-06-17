import mongoose from "mongoose";

async function handleMongoDBConnect(url){
    await mongoose.connect(url).then(()=> console.log("MongoDB connected successfully")).catch((err)=> console.log(err));
}

export default handleMongoDBConnect;