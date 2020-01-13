const express = require("express");
const jsonfile = require("jsonfile");
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

app.get("/pokemon/", (request, response) => {
  response.send("Welcome to the online Pokedex!");
});

app.get("/pokemon/:name", (request, response) => {
  // send response with some data (a string)
  // response.send(request.path);
  let foundPokemon;
  const name = request.params.name.toLowerCase();
  jsonfile.readFile(file, function(err, obj) {
    const pokemonArray = obj["pokemon"];
    if (err) console.error(err);
    for (let i = 0; i < pokemonArray.length; i++) {
      const pokemonJson = pokemonArray[i];
      const pokemonName = pokemonJson.name.toLowerCase();
      if (name === pokemonName) {
        foundPokemon = pokemonJson;
      }
    }
    if (foundPokemon !== undefined) {
      response.send(`<html>You searched for <b>${foundPokemon.name}</b>.
      <p>Id: ${foundPokemon.id}</p>
      <p>Num: ${foundPokemon.num}</p>
      <p>Name: ${foundPokemon.name}</p>
      <p>Image: <img src="${foundPokemon.img}"></p>
      <p>Type: ${foundPokemon.type.join(", ")}</p>
      <p>Height: ${foundPokemon.height}</p>
      <p>Weight: ${foundPokemon.weight}</p>
      </html>`);
    } else {
      request.statusCode = 404;
      response.send(
        `Error ${request.statusCode}: could not find information on ${name}. Is that a new Pokemon? Gotta catch em' all! `
      );
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
