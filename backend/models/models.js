import mongoose from "mongoose";
import postSchema from "./postModel.js";
import featuredPostSchema from "./featuredPost.js";

export const Post = mongoose.model("Post", postSchema);
export const FeaturedPost = mongoose.model("FeaturedPost", featuredPostSchema);