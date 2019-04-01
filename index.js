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


app.get("/:pokemonName", (request, response) => {

    let pokemonName = request.params.pokemonName;
//   // response.send(request.params.number);

  jsonfile.readFile(file, (err, obj) => {

    let pokemonFound = false;


    console.log(obj["pokemon"].length);
    for (var i = 0; i < obj["pokemon"].length; i++) {
        if (pokemonName.toLowerCase() === obj["pokemon"][i]["name"].toLowerCase()) {
            response.send(obj["pokemon"][i]["name"]+ "'s weight is " +obj["pokemon"][i]["weight"] + ". It is a " + obj["pokemon"][i]["type"][0] + " Pokémon.");
            pokemonFound = true;
        }
    }

    if (!pokemonFound) {
        response.send(pokemonName + " does not exist!");
    }


  // jsonfile.writeFile(file, obj, (err) => {
  //   console.log(err)
  // });
});
});

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send("Welcome to the online Pokédex!");
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));