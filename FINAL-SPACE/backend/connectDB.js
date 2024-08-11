import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongo DB");   
    } catch (error) {
        console.log("error conencting")
    }
}
export default connectDB;