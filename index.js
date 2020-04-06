const express = require('express');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

const file = 'pokedex.json';
let pokemon;
jsonfile.readFile(file, (err, obj) => {
  pokemon = obj.pokemon;

});
// console.log(pokeName)

app.get("/pokemon/:id", (request, response) => {
  var pokeId = request.params.id;
  pokeId = parseInt(pokeId);
  var pokeName = pokemon[pokeId].name;
  response.send(pokeName);

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
