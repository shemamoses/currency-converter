const express = require("express");
const CC = require("currency-converter-lt");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static("views"));
app.set("view engine", "ejs");

let currencyConverter = new CC();
app.post("/convert", (req, res) => {
  const { amount } = req.body;
  currencyConverter.convert();
  res.send("you sent money to convert");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log("server is running successfully");
});
