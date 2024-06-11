require('dotenv').config();
require("./db/dbinit.js");
const express = require("express");
const cors = require('cors');
const app = express();

//For Live
 app.use(cors({ credentials: true, origin: 'https://blogz07.netlify.app' }));

// For Development 
//app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Controllers
const signupController = require("./controllers/signupController.js");
const loginController = require("./controllers/loginController.js");
const addPostController = require("./controllers/addPostController.js");

// Routes
app.post("/api/signup", signupController);
app.post("/api/login", loginController);
app.post("/api/addPost", addPostController);

// Port Details
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("App is running at port " + port);
});
