const express = require("express");
const jsonfile = require("jsonfile");

const file = "./pokedex.json";
var pokedex;
// Getting the Data from JSON Object
jsonfile.readFile(file, function(err, obj) {
  if (err) {
    console.error(err);
  } else {
    pokedex = obj;
  }
});

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

app.get("*", (request, response) => {
  // send response with some data (a string)
  let pokeName = request.path.substring(1).toLowerCase(); // using substring(1) gets rid of the slash in request.path. index(0) is dropped.
  let pokemon = findPokemon(pokeName);
  response.send(pokemon.name + "'s weight is : " + pokemon.weight);
});

var findPokemon = pokemon => {
  let pokeArr = pokedex.pokemon;
  for (var i = 0; i < pokeArr.length; i++) {
    let poke = pokeArr[i];
    if (pokemon == poke.name.toLowerCase()) {
      return poke;
    }
  }
  return undefined;
};

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);
