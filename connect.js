import mongoose from "mongoose";

async function connectMongoDb(url) {
  return mongoose.connect(String(url)).then(() => console.log("Connected!"));
}

export default connectMongoDb;
