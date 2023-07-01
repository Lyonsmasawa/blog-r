import { Router } from "express"
import { createPost } from "../controllers/post.js"
const postRouters = Router()

postRouters.post('/create', createPost)

export default postRouters // or module.exports = postRouters