const passport = require("passport");

// Only import the strategy property
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
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
    },
    // User information returned by google (Callback function)
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id })
        // This is a promise
        .then((existingUser) => {
          if (existingUser) {
            // We already have a record with the given profile ID so no need to save
            // err(Error) = null because user was found
            done(null, existingUser);
          } else {
            // Creates a new instance of a user and saves the user ID to the database
            new User({ googleID: profile.id })
              .save()
              // Letting passport know that the save has been complete with no errors
              .then((user) => done(null, user));
          }
        });
    }
  )
);
