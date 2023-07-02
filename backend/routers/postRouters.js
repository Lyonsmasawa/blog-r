import { Router } from "express";
import { createPost } from "../controllers/post.js";
import upload from "../middlewares/multer.js";
import { postValidator, validate } from "../middlewares/postValidator.js";

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

postRouters.post("/create", upload.single('thumbnail'), postValidator, validate, createPost);

export default postRouters; // or module.exports = postRouters
