import mongoose from "mongoose";

const connectDB = () => {
  return mongoose
    .connect("mongodb://127.0.0.1:27017/blogX")
    .then(() => console.log("db connected"))
    .catch((err) => console.log("db connection failed", err.message || err));
};

export default connectDB;
