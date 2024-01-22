import express from "express";

"use strict";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Exemple app listening on port ${port}`);
});

app.use((req, res, next) => 
{
    console.log(`${req.method} ${req.url} - ${req.get('User-Agent')}`);
    next();
});

app.get("/fun", (req, res) => {
  res.send("Hello World");
});

app.get("/try", (req, res) => {
  res.send("Hello from and to your world");
});




