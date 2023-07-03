import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getFeaturedPosts,
  getPost,
} from "../controllers/post.js";
import upload from "../middlewares/multer.js";
import { postValidator, validate } from "../middlewares/postValidator.js";
import { parseData } from "../middlewares/index.js";

const postRouters = Router();
// postRouters.post(
//     "/create",
//     (req, res, next) => {
//       req.on('data', (chunk) => {
//         console.log(chunk);
//         next()
//       });
//     },
//     createPost
//   ); thats where express.json comes in

postRouters.post(
  "/create",
  upload.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  createPost
);

postRouters.put(
  "/:postId",
  upload.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  editPost
);

postRouters.delete("/:postId", deletePost);
postRouters.get("/single/:postId", getPost);
postRouters.get("/featured-posts", getFeaturedPosts);

export default postRouters; // or module.exports = postRouters
