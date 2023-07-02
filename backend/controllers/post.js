import { postModelSchema } from "../models/models.js";

export const createPost = (req, res) => {
  // console.log(req.body) - cant without expree.json() middleware
  const { title, meta, content, slug, tags, author } = req.body;

  const newPost = new postModelSchema({
    title,
    meta,
    content,
    slug,
    tags,
    author,    
  });
  res.json(newPost)
};
