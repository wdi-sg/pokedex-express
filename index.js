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
  app.get("/nextevolution/:pokemon", (request, response) => {
    let pokemonArray = obj["pokemon"];
    let pokemonNEXT = request.params.pokemon;
    let pokemonArrayByNEXT = [];
    for (let index = 0; index < pokemonArray.length; index++) {
      const pokemon = pokemonArray[index];
      if (pokemon.next_evolution === undefined) {
      } else {
        const pokemonNEXTArrayLength = pokemon.next_evolution.length;
        for (let i = 0; i < pokemonNEXTArrayLength; i++) {
          const nextEvolution = pokemon.next_evolution[i].name.toLowerCase();
          if (pokemonNEXT === nextEvolution) {
            pokemonArrayByNEXT.push(pokemon.name);
          }
        }
      }
    }
    response.send(pokemonArrayByNEXT);
  });
  app.get("/weakness/:type", (request, response) => {
    let pokemonArray = obj["pokemon"];
    let pokemonType = request.params.type;
    let pokemonArrayByWeakness = [];
    for (let index = 0; index < pokemonArray.length; index++) {
      const pokemon = pokemonArray[index];
      const pokemonTypeArrayLength = pokemon.type.length;
      for (let i = 0; i < pokemonTypeArrayLength; i++) {
        const element = pokemon.weaknesses[i].toLowerCase();
        if (pokemonType === element) {
          pokemonArrayByWeakness.push(pokemon.name);
        }
      }
    }
    response.send(pokemonArrayByWeakness);
  });
  app.get("/type/:type", (request, response) => {
    let pokemonArray = obj["pokemon"];
    let pokemonType = request.params.type;
    let pokemonArrayByType = [];
    for (let index = 0; index < pokemonArray.length; index++) {
      const pokemon = pokemonArray[index];
      const pokemonTypeArrayLength = pokemon.type.length;
      for (let i = 0; i < pokemonTypeArrayLength; i++) {
        const element = pokemon.type[i].toLowerCase();
        if (pokemonType === element) {
          pokemonArrayByType.push(pokemon.name);
        }
      }
    }
    response.send(pokemonArrayByType);
  });

  app.get("/:pokemon", (request, response) => {
    // send response with some data (a string)
    let pokemonArray = obj["pokemon"];
    let pokemonName = request.params.pokemon;
    // console.log(pokemonName);
    // console.log(pokemonArray[0].name);
    let pokemonFound = false;
    if (pokemonName === "") {
      response.send("Welcome to the online Pokdex!");
    } else {
      for (let index = 0; index < pokemonArray.length; index++) {
        const pokemon = pokemonArray[index];
        if (pokemonName === pokemon.name.toLowerCase()) {
          pokemonFound = true;
          response.send(
            "This is " +
              pokemon.name +
              ", he is " +
              pokemon.weight +
              " in weight! He is also " +
              pokemon.height +
              " tall."
          );
        }
      }
      if (pokemonFound === false) {
        response
          .status(404)
          .send("Could not find information about " + pokemonName);
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
