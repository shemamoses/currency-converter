const express = require("express");
const axios = require("axios");
const CC = require("currency-converter-lt");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static("views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const currencyConverter = new CC();

app.post("/convert", async (req, res) => {
  let { amount, fromCurrency, toCurrency } = req.body;

  // Parse the amount as a number
  amount = Number(amount);
  


  //converting

  try {
    const result = await currencyConverter.convert({
      amount,
      from: fromCurrency,
      to: toCurrency,
    });
    res.send(`Converted amount: ${result}`);
  } catch (error) {
    console.error("Currency conversion error:", error);
    
    res.status(500).send("conversion error");
  }
});

app.get("/countries", async (req, res) => {
  const response = await axios.get("https://api.iban.com/clients/api/v4/iban/");
  console.log(response)
  const countries = response.data;

  // Convert the API response object into an array of country objects
  const countryArray = Object.entries(countries).map(([code, name]) => ({
    code,
    name,
  }));

  res.render("index", { countries: countryArray });
});

app.get("/", (req, res) => {
  res.render("index");
  res.redirect("/countries");
});

app.listen(port, () => {
  console.log("server is running successfully");
});
