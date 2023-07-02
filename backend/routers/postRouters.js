import { Router } from "express";
import { createPost } from "../controllers/post.js";
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

postRouters.post("/create", createPost);

export default postRouters; // or module.exports = postRouters
