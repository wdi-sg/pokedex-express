const express = require("express");
const jsonfile = require("jsonfile");

const file = "./pokedex.json";

// Getting the Data from JSON Object
jsonfile.readFile(file, (err, obj) => {
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

// Further Part 2. Just check whether the request path is empty or `not. If empty, welcome user to the Pokedex
app.get("/", (request, response) => {
  response.send("Welcome to the online pokedex.");
});

app.get("*", (request, response) => {
  // send response with some data (a string)
  let pokemonName = request.path.substring(1).toLowerCase(); // using substring(1) gets rid of the slash in request.path.
  let pokemonResult = findPokemon(pokemonName);
  let requestPath = request.path.split("/"); // Breaking the request path into different parts
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
  } else if (requestPath[1] == "type") {
    // Matching the request path to type
    let typeResult = findPokemonByType(requestPath[2]);
    response.send(typeResult);
  } else if (requestPath[1] == "weakness") {
    // Matching the request path to weaknesses
    let weaknessResult = findPokemonByWeakness(requestPath[2]);
    response.send(weaknessResult);
  } else if (requestPath[1] == "nextevolution") {
    // Matching the request path to type
    let evolutionResult = findPokemonByNextEvo(requestPath[2]);
    response.send(evolutionResult);
  } else {
    response.send(
      `Could not find information about ${pokemonName} - Is that a new pokemon? Gotta catch em' all!`
    );
  }
});

var findPokemon = pokemonResult => {
  const pokeArray = pokedex.pokemon;
  for (var i = 0; i < pokeArray.length; i++) {
    let pokemon = pokeArray[i];
    if (pokemonResult == pokemon.name.toLowerCase()) {
      return pokemon;
    }
  }
  return undefined;
};

const findPokemonByType = pokemonType => {
  const pokeArray = pokedex.pokemon;
  let arr = [];
  for (var i = 0; i < pokeArray.length; i++) {
    for (var j = 0; j < pokeArray[i].type.length; j++) {
      if (pokemonType === pokeArray[i].type[j].toLowerCase()) {
        arr.push(pokeArray[i].name);
      }
    }
  }
  return arr;
};

const findPokemonByWeakness = pokemonWeakness => {
  const pokeArray = pokedex.pokemon;
  let arr = [];
  for (var i = 0; i < pokeArray.length; i++) {
    for (var j = 0; j < pokeArray[i].weaknesses.length; j++) {
      if (pokemonWeakness === pokeArray[i].weaknesses[j].toLowerCase()) {
        arr.push(pokeArray[i].name);
      }
    }
  }
  return arr;
};

const findPokemonByNextEvo = pokemonEvo => {
  const pokeArray = pokedex.pokemon;
  let arr = [];
  for (var i = 0; i < pokeArray.length; i++) {
    if (
      pokeArray[i].prev_evolution &&
      pokeArray[i].name.toLowerCase() === pokemonEvo
    ) {
      for (var j = 0; j < pokeArray[i].prev_evolution.length; j++) {
        arr.push(pokeArray[i].prev_evolution[j].name);
      }
    }
  }
  return arr;
};

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);
