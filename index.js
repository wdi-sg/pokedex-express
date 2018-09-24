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
  let pokemonName = request.path.substring(1).toLowerCase(); // using substring(1) gets rid of the slash in request.path.
  let pokemonResult = findPokemon(pokemonName);
  // Further Part 1
  // Just needed to add a if/else conditional for Further Part 1.
  if (pokemonResult) {
    // This means if pokemon exists. If it doesn't exist, function will return undefined.
    // Further Part 3. Adding information to the result response.
    response.send(
      `This is ${pokemonResult.name}. His weight is : ${
        pokemonResult.weight
      }. His height is : ${pokemonResult.height}.`
    );
    // Further Part 2. Just check whether the request path is empty or `not. If empty, welcome user to the Pokedex
  } else if (pokemonName === "") {
    response.send("Welcome to the online pokedex.");
  } else {
    response.send(
      `Could not find information about ${pokemonName} - Is that a new pokemon? Gotta catch em' all!`
    );
  }
});

var findPokemon = pokemonResult => {
  let pokeArr = pokedex.pokemon;
  for (var i = 0; i < pokeArr.length; i++) {
    let pokemon = pokeArr[i];
    if (pokemonResult == pokemon.name.toLowerCase()) {
      return pokemon;
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
