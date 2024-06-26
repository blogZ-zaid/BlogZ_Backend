require('dotenv').config();
require("./db/dbinit.js");
const express = require("express");
const cors = require('cors');
const path = require('path');
const app = express();

// For Live
 app.use(cors({ credentials: true, origin: 'https://blogz07.netlify.app' }));

// For Development 
// app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Controllers
const signupController = require("./controllers/signupController.js");
const loginController = require("./controllers/loginController.js");
const addPostController = require("./controllers/addPostController.js");
const getAllPostController = require('./controllers/getAllPostController.js');
const getAllUsersController = require('./controllers/getAllUsersController.js');
const sendFollowRequestController = require('./controllers/sendFollowRequestController.js');
const getUserProfileController = require('./controllers/getUserProfileController.js');

// Routes
app.post("/api/signup", signupController);
app.post("/api/login", loginController);
app.post("/api/addPost", addPostController);
app.get("/api/getAllPublicPost", getAllPostController);
app.get("/api/getAllUsers", getAllUsersController);
app.post("/api/sendFollowRequest", sendFollowRequestController);
app.get("/api/userProfile", getUserProfileController);

// Port Details
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("App is running at port " + port);
});
