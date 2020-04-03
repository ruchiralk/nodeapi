const { body } = require("express-validator");

exports.createPostValidator =  [ // title
    body("title", "Write a title").notEmpty(),
    body("title", "Title must be between 4 to 150 characters").isLength({
      min: 4,
      max: 150
    }),
    // body
    body("body", "Write a body").notEmpty(),
    body("body", "Body must be between 4 to 2000 characters").isLength({
      min: 4,
      max: 2000
    })
]
