const express = require('express');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const file = './pokedex.json';
// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/c/:x/f", (request, response) => {
  response.send(`Your temperature in Fahrenheit: ${convertCelsiusToFahrenheit(parseInt(request.params.x))}`)
});


app.get('/pokemon/:number', (request, response) => {
    jsonfile.readFile(file, function (err, obj) {
        if (err) console.error(err);
        let searchNumber = parseInt(request.params.number);
// send response with some data (a string)
    response.send(obj["pokemon"][searchNumber]);
    })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));