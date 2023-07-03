import cloudinary from "../cloud/index.js";
import { Post, FeaturedPost } from "../models/models.js";

const FEATURED_POST_COUNT = 4;
const addToFeaturedPost = async (postId) => {
  const isAlreadyExist = await FeaturedPost.findOne({ post: postId });
  if (isAlreadyExist) return;

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
    const { file } = req;
    const isAlreadyExist = await Post.findOne({ slug });

    if (isAlreadyExist)
      return res.status(401).json({ error: "Please use unique slug!" });

    const newPost = new Post({
      title,
      meta,
      content,
      slug,
      tags,
      author,
    });

    if (file) {
      try {
        const { secure_url: url, public_id } = await cloudinary.uploader.upload(
          file.path
        );
        newPost.thumbnail = { url, public_id };
      } catch (error) {
        console.log("Error uploading file:", error);
        // Handle the error or return an appropriate response
      }
    }
    await newPost.save();

    if (featured) await addToFeaturedPost(newPost._id);

    res.json({
      post: {
        id: newPost._id,
        title, 
        meta,
        slug,
        thumbnail: newPost.thumbnail?.url,
        author: newPost.author,
      },
    });
  } catch (error) {
    next(error); // using next means the app wont crash bcoz of an error then we can catch it in app.js
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
