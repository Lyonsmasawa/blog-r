import { Post, FeaturedPost } from "../models/models.js";

const FEATURED_POST_COUNT = 4;
const addToFeaturedPost = async (postId) => {
  const featuredPost = new FeaturedPost({ post: postId });
  await featuredPost.save();

  const featuredPosts = await FeaturedPost.find({}).sort({ createdAt: -1 });
  featuredPosts.forEach(async (post, index) => {
    if (index >= FEATURED_POST_COUNT)
      await FeaturedPost.findByIdAndDelete(post._id);
  });
};

export const createPost = async (req, res, next) => {
  // console.log(req.body); // - cant without express.json() middleware - see middleware on postRouter
  try {
    const { title, meta, content, slug, tags, author, featured } = req.body;

    const newPost = new Post({
      title,
      meta,
      content,
      slug,
      tags,
      author,
    });

    await newPost.save();

    if (featured) await addToFeaturedPost(newPost._id);

    res.json(newPost);
  } catch (error) {
    next(error); // using next means the app wont crash then we can catch it in app.js
  }

  // // to not use the try-catch we can use a package called -express-async-errors - import it in app.js as a middleware and remoove try catch block
  // const { title, meta, content, slug, tags, author } = req.body;

  // const newPost = new post({
  //   title,
  //   meta,
  //   content,
  //   slug,
  //   tags,
  //   author,
  // });

  // await newPost.sade();

  // res.json(newPost);
};
