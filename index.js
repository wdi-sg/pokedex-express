const express = require("express");
const jsonfile = require("jsonfile");

const pokedex = "pokedex.json";

// const jsonfile = require('jsonfile');

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

jsonfile.readFile(pokedex, (err, obj) => {
  app.get("/*", (request, response) => {
    // send response with some data (a string)
    let pokemonArray = obj["pokemon"];
    let pokemonName = request.path;
    let pokemonNameWithoutSlash = pokemonName.split("/")[1];
    // console.log(pokemonName);
    // console.log(pokemonArray[0].name);
    let pokemonFound = false;
    for (let index = 0; index < pokemonArray.length; index++) {
      const pokemon = pokemonArray[index];
      if (pokemonName === "/" + pokemon.name.toLowerCase()) {
        pokemonFound = true;
        response.send(pokemon.name + " weighs " + pokemon.weight);
      }
    }
    if (pokemonFound === false) {
      response.send("Could not find information about " + pokemonNameWithoutSlash);
    }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);
