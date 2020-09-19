const passport = require("passport");

// Only import the strategy property
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");

// Used to pull out a schema out of mongoose considering it has been created
const User = mongoose.model("users");

// COOKIES START
// User passed from the callback
passport.serializeUser((user, done) => {
  // null = no errors user.id is _id and not googleID
  // reason: many potential login auth providers
  done(null, user.id);
});

// Finds the user in our DB
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
// COOKIES END

// New instance of the google passport strategy
passport.use(
  new GoogleStrategy(
    // On redirect the following details are sent to authenticate the application
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      // Allow for https through the host proxy
      proxy: true
    },
    // User information returned by google (Callback function)
     async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id })
          if (existingUser) {
            return done(null, existingUser);
          }
            const user = await new User({ googleID: profile.id }).save()  
            done(null, user);
         
       
    }
  )
);


passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);



