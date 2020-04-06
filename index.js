const express = require('express');
const jsonfile = require('jsonfile');
const allPokemon = 'pokedex.json';

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

app.get('/pokemon/:name', (request, response) => {
  // send response with some data (a string)

  jsonfile.readFile(allPokemon, (err, obj) => {
    let i = 0;
    let pokemonWeight;
    while(i < obj.pokemon.length){
      if(obj.pokemon[i].name.toLowerCase() === request.params.name){
        pokemonWeight = obj.pokemon[i].weight;
      }
      i++
    }
    response.send("Weight of " + request.params.name + " = " + pokemonWeight);
  });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));