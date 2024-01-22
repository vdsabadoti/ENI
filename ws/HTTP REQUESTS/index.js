import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

"use script";

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`Exemple app listening on port ${port}`);
});

const cities = ['Nantes', 'Quimper', 'Lorient', 'Vannes', 'Saint Nazaire', 'Piracicaba'];

// GET REQUEST (to get data from database)
app.get('/cities', (req, res) => {
    res.send(cities.join(', '));
});

// GET REQUEST WITH PARAM, ERROR MANAGER (to get data from database)
app.get("/cities/:id", (req,res) => {
    if (parseInt(req.params.id) > (cities.length-1) || parseInt(req.params.id) < 1 ){
        return res.status(404).send('Error: city nof found')
    } else {
        res.send(cities[parseInt(req.params.id) - 1]);
    }
});


// POST REQUEST ? (to create data in database)
//get request to get html page which contains the form
app.get('/form', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

//post request to deal with the submition of the form
app.post('/cities', (req, res) => {
    cities.push(req.body.city);
    res.redirect("/cities");
});

// PUT REQUEST ? (to change data from database)
app.put('/cities');

// DELETE REQUEST ? (to delete data from database)
app.delete('/cities');

// ANY OTHER REQUEST THAT MIGHT NOT BE YET OR NEVER WILL BE ROUTED => ERROR 404 PAGE NOT FOUND
app.use((req,res)=>
res.status(404).send('Error 404 : error page not found'));