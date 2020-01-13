const express = require('express');
const file = 'pokedex.json';
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

app.get('/', (request, response) => {
  response.send('Hello! Go to /pokemon for more.');
});

app.get('/pokemon', (request, response) => {
  response.send("Welcome to the online Pokdex!");
});

app.get('/pokemon/:id', (request, response, obj) => {
  // send response with some data (a string)
  jsonfile.readFile(file, (err,obj) => {
    const checkPokemon = request.params.id;
    const listOfPokemon = obj.pokemon.length;
    if (!isNaN(checkPokemon)) {
      response.send("This is " + obj.pokemon[checkPokemon].name + "! He is " + obj.pokemon[checkPokemon].weight + " in weight! He also " );
    } else if (isNaN(checkPokemon)) {
        //console.log(request.path + "this is " + checkPokemon + obj.pokemon.length);
        let pokemonName = checkPokemon.toUpperCase();
        for (i = 0; i < listOfPokemon; i++) {
        let checkPokemonName = obj.pokemon[i].name.toUpperCase();
          if (pokemonName === checkPokemonName) {
            console.log(obj.pokemon[i].name);
            console.log(obj.pokemon[i].id);
            response.send("Name: " + obj.pokemon[i].name + "<br> Weight: " + obj.pokemon[i].weight);
          }
        }
        response.send("You got: " + obj.pokemon.name);
      }
  });
});


/**
 * ===================================
 * Read files or whatever
 * ===================================
 */



/**

 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
