import http from "http";
import express from "express";

const app = express();

const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World !!");
});
server.listen(port, hostname, () => {
  console.log(
    `Le serveur est en cours d'exécution sur http://${hostname}:${port}/`
  );
});
