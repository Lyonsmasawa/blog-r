import mongoose from "mongoose";

const featuredPostSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  }
}, {
    timestamps: true
});


export default featuredPostSchema