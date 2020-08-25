// CommonJS way of importing
const express = require("express");

// Express appilcation in app object
const app = express();

// Get route handler
app.get("/", (req, res) => {
  res.send({ ok: "pal" });
});

// This will default the port to 5000 when in the development environment
// When hosted the port will be dynamically provided by the hosting service
const PORT = process.env.PORT || 5000;
app.listen(PORT);
