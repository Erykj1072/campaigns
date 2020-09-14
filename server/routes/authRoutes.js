const passport = require("passport");

module.exports = (app) => {
  // GOOGLE START
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // What the application wants access to
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), 
  (req,res) => {
    res.redirect('/surveys');
  });
  // GOOGLE END

  // LOCAL START
  app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  // LOCAL END

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
