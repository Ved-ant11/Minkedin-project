const express = require("express");
const { createPost, getPosts } = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost); 

module.exports = router;
