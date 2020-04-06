/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
let pokedex = [];
let filePromise = jsonfile.readFile(file).then((obj) => {
  console.log("get!");
  pokedex = obj.pokemon;
});

const express = require('express');
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(request.path);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
