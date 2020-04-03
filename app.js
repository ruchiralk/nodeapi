const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require('body-parser'); // parse request body
const dotenv = require('dotenv');
dotenv.config();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});
// bring in routes
const postRoutes = require('./routes/post');

const myOwnMiddleware = (req, res, next) => { 
    console.log('middleware applied'); // if stop here, middleware is not continuing the process
    next(); // move to next pace
};

// middleware
app.use(morgan("dev")); // pass the 'dev' option to morgan so that you can what's happening in development mode
app.use(bodyParser.json()); // any request has the body, will be parsed to json format
// we are going to write lot of routes, so it don't make sense to have all at the same location
// move routes to a separate folder
app.use("/", postRoutes); // using as a middle wear // instead of using app.get , use it as a middle wear

const port = process.env.PORT || 8080;
app.listen(port, () => { console.log(`Node API is listening on port: ${port}`)});