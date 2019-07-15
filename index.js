const express = require('express');

const jsonfile = require('jsonfile');
const file = "./pokedex.json";
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

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
   
    // extract input data from request
    var name =  request.params.name ;

    var pokemon
    var pokemon_weight;

    // find pokemon from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let matchedPokemon = obj.pokemon[i];

      if( matchedPokemon.name === name){
      	pokemon = matchedPokemon;
        pokemon_weight = matchedPokemon.weight;
      }
    }

    if (pokemon===undefined) {

      // send 404 back
      response.status(404);
      response.send(`Could not find information about ${name}- Is that a new pokemon? Gotta catch em' all!`);
    } else {

    var msg = `${name} weighs ${pokemon_weight}`
      response.send(msg);
    }
  });
});


app.get('/', (request, response) => {
  response.send("Which pokemon are you looking at?");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
