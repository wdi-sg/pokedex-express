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

// Root

app.get("/", (request, response) => {
  response.send("Welcome to the online Pokedex!");
  
});
// Return pokemon's weight 
app.get("/:pokemon", (request, response) => {
  let pokemonName = request.params.pokemon;
  jsonfile.readFile(file, (err, obj) => {
    let pokemonFound = false;
    for (let i = 0; i < obj.pokemon.length; i++) {
      if (obj.pokemon[i].name.toLowerCase() === pokemonName.toLowerCase()) {
        let pokemonWeight = obj.pokemon[i].weight;
        response.send(pokemonName + "'s weight is: " + pokemonWeight);
        pokemonFound = true;
      }
    }
    if (!pokemonFound) {
      response.send("Could not find information about " + pokemonName + "- is that a new pokemon? Gotta catch em' all!");
    }
  });
    // when you read the file, get the specific pokemon that is being requested

    // response.send(pokemonName + "'s weight is: " + pokemonWeight);
  });

app.get("/type/:type", (request, response) => {
  let pokemonType = request.params.type;
  jsonfile.readFile(file, (err, obj) => {
    let pokemonFound = false;
    for (let i = 0; i < obj.pokemon.length; i++) {
      // Loop through pokemon type
      for (let t = 0; t < obj.pokemon[i].type.length; t++) {
        // if lowercased pokemonType (obj.pokemon[i].type[t]) === the lowercased input
        if (obj.pokemon[i].type[t].toLowerCase() === pokemonType.toLowerCase()) {
          let pokemonName = obj.pokemon[i].name;
          response.send(pokemonName + ' has type: ' + pokemonType);
          pokemonFound = true;
        }
      }
      if (!pokemonFound) {
        response.send(":(");
      }
    }
  })
  });

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
