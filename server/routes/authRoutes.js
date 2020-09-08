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

  app.get("/auth/google/callback", passport.authenticate("google"));
  // GOOGLE END

  app.get("/api/logout", (req, res) => {
    req.logout();
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
