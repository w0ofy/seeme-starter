// Importing Node modules and initializing Express
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  // logger = require('morgan'),
  router = require('./router'),
  mongoose = require('mongoose'),
  config = require('./config/main'),
  aws = require('aws-sdk'),
  s3Router = require('./config/s3router');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seeme-starter';
// mongodb://<dbuser>:<dbpassword>@ds157682.mlab.com:57682/heroku_385mbj0p
// Database Setup
mongoose.connect(MONGODB_URI, { useMongoClient: true });


// // Start the server
let server;
server = app.listen(process.env.PORT);
app.listen(process.env.PORT);



// const io = require('socket.io').listen(server);

// socketEvents(io);

// Set static file location for production
app.use(express.static('./public'));

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
// app.use(logger('dev')); // Log requests to API using morgan


// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://seemeapp.herokuapp.com');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/s3', s3Router({
  bucket: 'seemedev',
  ACL: 'public-read'
}))


// Import routes to be served
router(app);

// necessary for testing
module.exports = server;