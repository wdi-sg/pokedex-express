const express = require("express");

const app = express();

const jsonFile = require("jsonfile");

const dataFile = "pokedex.json";

const POKEMON = "pokemon";

app.get("/pokemon/:name", (request, response) => {
  jsonFile.readFile(dataFile, (err, obj) => {
    console.log(request.params);
    let matchingPokemonObj = obj[POKEMON].find((element) => {
      return element.name.toLowerCase() == request.params.name.toLowerCase();
    });
    console.log(matchingPokemonObj);
    response.send(request.params.name + " weight: " + matchingPokemonObj.weight);
  });
});

app.listen(3000, () => {console.log("locating port 3000")});
