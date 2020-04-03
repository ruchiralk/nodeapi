const express = require('express');
const { getPosts, createPost } = require("../controllers/post");
const validator = require('../validators') //automatically load index.js

// may be you need to go to the database and do other stuff,
// give the responsibility to different section, controllers

const router = express.Router();
router.get('/', getPosts);
router.post("/post", validator.createPostValidator, createPost);


module.exports = router;