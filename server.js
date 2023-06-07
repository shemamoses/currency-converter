const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

app.post("/convert", (req, res) => {
  res.send("you sent money to convert");
});

app.get("/", (req, res) => {
  res.send("this is a route");
});

app.listen(port, () => {
  console.log("server is running successfully");
});
