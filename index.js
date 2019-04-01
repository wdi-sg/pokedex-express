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
    if (request.path === "/") {
      response.send("Welcome to the online Pokdex!")
    } else{
      for (let index = 0; index < pokemonArray.length; index++) {
        const pokemon = pokemonArray[index];
        if (pokemonName === "/" + pokemon.name.toLowerCase()) {
          pokemonFound = true;
          response.send( "This is " + pokemon.name + ", he is " + pokemon.weight + " in weight! He is also " + pokemon.height + " tall.");
        }
      }
      if (pokemonFound === false) {
        response.status(404).send("Could not find information about " + pokemonNameWithoutSlash);
      }
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
