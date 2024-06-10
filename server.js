require('dotenv').config();
require("./db/dbinit.js");
const express = require("express");
const expressSession = require("express-session");
const MongoSessionStore = require('connect-mongodb-session')(expressSession);
const cors = require('cors');

const app = express();
const authMiddleware = require("./middleware/authMiddleware");

// Middleware
//For Live
 app.use(cors({ credentials: true, origin: 'https://blogz07.netlify.app' }));
// For Development 
// app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session store configuration
const store = new MongoSessionStore({
  uri: process.env.DBURL,
  collection: 'sessions',
});

// Session middleware
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// Controllers
const signupController = require("./controllers/signupController.js");
const loginController = require("./controllers/loginController.js");
const checkingAuthenticationController = require("./controllers/checkingAuthenticationController.js");
const logoutController = require("./controllers/logoutController.js")(store); // Pass store to the logout controller
const addPostController = require("./controllers/addPostController.js");

// Routes
app.post("/api/signup", signupController);
app.post("/api/login", loginController);
app.get("/checkAuth", authMiddleware, checkingAuthenticationController);
app.post("/api/addPost", authMiddleware, addPostController);
app.get("/api/logout", logoutController);

// Port Details
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("App is running at port " + port);
});
