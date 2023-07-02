import mongoose from "mongoose";
import postSchema from "./postModel.js";

export const postModelSchema = mongoose.model("Post", postSchema);