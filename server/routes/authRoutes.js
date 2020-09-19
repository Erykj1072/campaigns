const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  // ---------------------GOOGLE AUTH--------------------- //
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // Information that we are requesting access to from the users google profile
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), 
  (req,res) => {
    res.redirect('/surveys');
  });
  // ---------------------LOCAL AUTH---------------------- //

  app.post("/auth/signin", (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No Uuer found");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully authenticated");
          // res.redirect("/surveys");
          console.log(req.user);
        });
      }
    })(req, res);
  });

  app.post("/auth/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) =>{
      if (err) throw err;
      if (doc) res.send("User already exists");
      if (!doc) {
        const hash = await bcrypt.hash(req.body.password, 10);
        await new User({
          username: req.body.username,
          password: hash,
        }).save();
        res.send("Successfuly registered");
      }
    })
  });

// -------------------------API------------------------- //
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
