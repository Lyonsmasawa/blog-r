import { isValidObjectId } from "mongoose";
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

const removeFromFeaturedPost = async (postId) => {
  await FeaturedPost.findOneAndDelete({ post: postId });
};

const isFeaturedPost = async (postId) => {
  const post = await FeaturedPost.findOne({ post: postId });
  return post ? true : false;
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
  // const { title, meta, content, slug, tags, author } = req.body;import upload from './../middlewares/multer';

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

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!isValidObjectId(postId))
      return res.status(401).json({ error: "Invalid request!" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found!" });

    const { public_id } = post.thumbnail || false;
    if (public_id) {
      const { result } = await cloudinary.uploader.destroy(public_id);

      if (result !== "ok")
        return res.status(404).json({ error: "Could not remove thumbnail!" });
    }

    await Post.findByIdAndDelete(postId);
    await removeFromFeaturedPost(postId);
    res.json({ message: "Post removed successfully!" });
  } catch (error) {
    next(error);
  }
};

export const editPost = async (req, res, next) => {
  try {
    const { title, meta, content, slug, tags, author, featured } = req.body;
    const { file } = req;
    const { postId } = req.params;

    if (!isValidObjectId(postId))
      return res.status(401).json({ error: "Invalid request!" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found!" });

    const { public_id } = post.thumbnail || false;
    if (public_id && file) {
      const { result } = await cloudinary.uploader.destroy(public_id);

      if (result !== "ok")
        return res.status(404).json({ error: "Could not remove thumbnail!" });
    }

    if (file) {
      try {
        const { secure_url: url, public_id } = await cloudinary.uploader.upload(
          file.path
        );
        post.thumbnail = { url, public_id };
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    }

    post.title = title;
    post.meta = meta;
    post.content = content;
    post.slug = slug;
    post.tags = tags;
    post.author = author;

    if (featured) await addToFeaturedPost(post._id);
    else await removeFromFeaturedPost(post._id);

    await post.save();

    res.json({
      post: {
        id: post._id,
        title,
        meta,
        content,
        slug,
        tags,
        thumbnail: post.thumbnail?.url,
        author,
        featured,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug) return res.status(401).json({ error: "Invalid request!" });

    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ error: "Post not found!" });

    const featured = await isFeaturedPost(post._id);
    const { title, meta, content, tags, author, createdAt } = post;
    res.json({
      post: {
        id: post._id,
        title,
        meta,
        content,
        slug,
        thumbnail: post.thumbnail?.url,
        author,
        tags,
        featured,
        createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedPosts = async (req, res, next) => {
  try {
    const featuredPosts = await FeaturedPost.find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .populate("post");

    res.json({
      posts: featuredPosts.map(({ post }) => ({
        post: {
          id: post._id,
          title: post.title,
          meta: post.meta,
          slug: post.slug,
          author: post.author,
          thumbnail: post.thumbnail?.url,
        },
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { pageNo = 0, limit = 10 } = req.query;

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(parseInt(pageNo) * parseInt(limit))
      .limit(parseInt(limit));

    res.json({
      posts: posts.map((post) => ({
        post: {
          id: post._id,
          title: post.title,
          meta: post.meta,
          slug: post.slug,
          author: post.author,
          thumbnail: post.thumbnail?.url,
        },
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const searchPost = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (!title)
      return res.status(401).json({ error: "search query is missing!" });

    const posts = await Post.find({ title: { $regex: title, $options: "i" } });

    res.json({
      posts: posts.map((post) => ({
        post: {
          id: post._id,
          title: post.title,
          meta: post.meta,
          slug: post.slug,
          author: post.author,
          thumbnail: post.thumbnail?.url,
        },
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const getRelatedPosts = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!isValidObjectId(postId))
      return res.status(401).json({ error: "Invalid request!" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found!" });

    const relatedPosts = await Post.find({
      tags: { $in: [...post.tags] },
      _id: { $ne: post._id },
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      posts: relatedPosts.map((post) => ({
        post: {
          id: post._id,
          title: post.title,
          meta: post.meta,
          slug: post.slug,
          author: post.author,
          thumbnail: post.thumbnail?.url,
        },
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const { file } = req;

    if (!file)
      return res.status(401).json({ error: "file is missing!" });

    try {
      const { secure_url: url } = await cloudinary.uploader.upload(file.path);
      res.status(201).json({ image: url });
    } catch (error) {
      console.log("Error uploading file:", error);
      res.status(401).json({ error: error });
    }
  } catch (error) {
    next(error);
  }
};
