import { readFileSync, writeFileSync, appendFileSync } from "fs";

("use strict");

function readCities() {
  let cities = "";
  try {
    cities = readFileSync("cities.csv", "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Le fichier cities.csv n'existe pas.`);
    } else {
      console.error(err);
    }
  }
  return cities.split("\n");
}
let cities = ["Nantes", "Paris", "Saint-Nazaire", "Angers"];
writeFileSync("cities.csv", cities.join("\n"));
cities = readCities();
cities.forEach((city) => console.log(`City : ${city}`));
appendFileSync("cities.csv", "\nToulouse", "utf8");
cities = readCities();
cities.forEach((city) => console.log(`City : ${city}`));
