import mongoose from "mongoose";
import { _config } from "./config.js";
import { rateLimiterInit } from "./rateLimiter.js";

const connectdb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("mongodb successfully connected!!");
    });

    mongoose.connection.on("error", (err) => {
      console.log("connection error in db ", err);
    });

    await mongoose.connect(_config.MONGO_URI);
    rateLimiterInit(mongoose.connection);
    console.log("rate limieter")
  } catch (error) {
    console.log("mongodb connection errror : ", error);

    process.exit(1);
  }


};



export default connectdb;