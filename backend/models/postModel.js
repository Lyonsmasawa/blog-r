import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  meta: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    trim: true,
    required: true,
  },
  tags: [String],
  author: {
    type: String,
    default: "Admin",
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Author'
  },
  thumbnail: {
    type: Object,
    url: {
        type: URL,
    },
    public_id: {
        type: URL,
    }
  }
}, {
    timestamps: true
});


export default postSchema