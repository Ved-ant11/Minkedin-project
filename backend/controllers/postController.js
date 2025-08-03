const Post = require("../models/Post");
const User = require("../models/User");


exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required." });
    }
    const post = new Post({
      content,
      author: req.user, 
    });
    await post.save();
    res.status(201).json({ message: "Post created successfully.", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
