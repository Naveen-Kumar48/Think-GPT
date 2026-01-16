import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect=await mongoose.connect(process.env.MONGODB_URL)
    console.log("Connect sucessfully ")
  } catch (error) {
    console.log(error)
  }
};

export default connectDB;
