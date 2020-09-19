// CommonJS way of importing
const express = require("express");
const mongoose = require("mongoose");
require("./models/User");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const cors = require("cors");
// Nothing is assigned to passport so we can just use require

require("./services/passport");

// MongoDB server connection
mongoose.connect(keys.mongoURI);

// Express appilcation in app object
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  cors({
    origin: "/", // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(
  cookieSession({
    // 30 days in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // Used to encrypt
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Call authRoutes with the app object
require("./routes/authRoutes")(app);

// This will default the port to 5000 when in the development environment
// When hosted the port will be dynamically provided by the hosting service
const PORT = process.env.PORT || 5000;
app.listen(PORT);
