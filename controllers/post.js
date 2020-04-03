const Post = require('../models/post')
const { validationResult } = require("express-validator");
exports.getPosts = (req, res) => {
  const posts = Post.find().select("_id title body")
  .then((posts) => {
      res.json({posts }) // by default set the status code to 200, when you have the key and value, you can use just the value
  })
  .catch( err => {
      res.status(400).json({error: err})
  })
};

exports.createPost = (req, res) => {
       // check for errors
    const errors = validationResult(req);
    // if error show the first one as they happen
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()});
    }

    const post = new Post(req.body); // by default express doesn't parse body, there is a popular package call body parser
    post.save()
    .then(result => {
        res.json({
            post: result
        });
    });
};