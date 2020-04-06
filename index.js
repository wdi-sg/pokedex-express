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

app.get('/pokemon', (request, response) =>{
  response.send("Welcome to the online Pokedex!");
})

app.get('/pokemon/:name', (request, response) => {
  // send response with some data (a string)

  jsonfile.readFile(allPokemon, (err, obj) => {
    let i = 0;
    let pokemonWeight;
    let pokemonType = [];
    while(i < obj.pokemon.length){
      if(obj.pokemon[i].name.toLowerCase() === request.params.name){
        pokemonWeight = obj.pokemon[i].weight;
        pokemonType = obj.pokemon[i].type;
      }
      i++
    }
    if(pokemonWeight === undefined){
      response.status(404).send("Could not find information about " + request.params.name + " - Is that a new pokemon? Gotta catch em' all!");
    }else {
      response.send(`This is ${request.params.name}!, he weighs ${pokemonWeight} in weight! He has a type of ${pokemonType}`);
    }
  });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));