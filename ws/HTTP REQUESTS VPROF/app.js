const express = require("express");
const path = require('path');
const app = express();
const port = 3000;

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


app.listen(port, () => {
  console.log(`Exemple app listening on port ${port}`);
});