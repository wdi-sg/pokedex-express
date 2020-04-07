const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';
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

app.get('/', (request, response) => {
  // send response with some data (a string)
  response.send('hello brian');
});

app.get('/pokemon/:id', (request, response, obj) => {
  jsonfile.readFile(file, (err,obj) => {
    const checkPokemon = request.params.id;
    const listOfPokemon = obj.pokemon.length;
    // If number show which pokemon 
    if (!isNaN(checkPokemon)) {
      console.log(obj.pokemon[checkPokemon].name);
      response.send(obj.pokemon[checkPokemon].name);
      //If NaN show which pokemon 
    } else if (isNaN(checkPokemon)) {
        const pokemonName = checkPokemon.toLowerCase();
        for (i = 0; i < listOfPokemon; i++) {
        const checkPokemonName = obj.pokemon[i].name.toLowerCase();
          if (checkPokemon === checkPokemonName) {
            console.log(obj.pokemon[i].name);
            console.log(obj.pokemon[i].id);
            response.send(obj.pokemon[i].name + " is " + obj.pokemon[i].weight);
          }
        }
      }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
