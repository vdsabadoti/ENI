const express = require("express");
const path = require('path');
const app = express();
const port = 3000;
const { body, validationResult } = require('express-validator');

"use script";

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const cities = ["Nantes", "Paris", "Quimper"];

app.get("/cities", (req, res) => {
  res.render("cities", { cities: cities });
});

app.post("/cities", (req, res) => {
  cities.push(req.body.city);
  res.redirect("/cities");
});

app.post('/citiesWithValidation', 
body('city')
.isLength({ min:3})
.withMessage('City name must be at least 3 characters long'),
body('city2')
.isLength({ min:1})
.withMessage('City2 name must be at least 1 character long'),
(req, res) =>
{
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).render("cities.ejs", {
      errors: errors.array(),
      cities: cities,
      city: req.body.city,
      city2: req.body.city2,
    });
  } else {
      cities.push(req.body.city);
      res.redirect('/cities');
  }
});


app.listen(port, () => {
  console.log(`Exemple app listening on port ${port}`);
});