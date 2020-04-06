const express = require("express");

const app = express();

const jsonFile = require("jsonfile");

const dataFile = "pokedex.json";

const POKEMON = "pokemon";

// let dataObj = jsonFile.readFile(dataFile, (err, obj) => {
//   return obj;
// });

app.get("/pokemon/:name", (request, response) => {
  jsonFile.readFile(dataFile, (err, obj) => {
    // console.log(request.params);
    let matchingPokemonObj = obj[POKEMON].find((element) => {
      return element.name.toLowerCase() === request.params.name.toLowerCase();
    });
    // console.log(matchingPokemonObj);
    if (matchingPokemonObj === undefined) {
      response.status(404).send("Could not find information about " + request.params.name + " - Is that a new pokemon? Gotta catch em' all!");
    } else {
      // response.send(request.params.name + " weight: " + matchingPokemonObj.weight);
      // console.log(matchingPokemonObj);
      response.send(matchingPokemonObj);
    }
  });
});

app.get("/type/:sometype", (request, response) => {
  jsonFile.readFile(dataFile, (err, obj) => {
    let matchingPokemonArr = obj[POKEMON].filter((element) => {
      for (let i = 0; i < element.type.length; i++) {
        return element.type[i].toLowerCase() === request.params.sometype.toLowerCase();
      }
    });
    response.send(matchingPokemonArr.map(element => element.name));
  });
});

app.get("/weaknesses/:someweakness", (request, response) => {
  jsonFile.readFile(dataFile, (err, obj) => {
    let matchingPokemonArr = obj[POKEMON].filter((element) => {
      for (let i = 0; i < element.weaknesses.length; i++) {
        return element.weaknesses[i].toLowerCase() === request.params.someweakness.toLowerCase();
      }
    });
    response.send(matchingPokemonArr.map(element => element.name));
  });
});

app.get("/prevevolution/:somename", (request, response) => {
  jsonFile.readFile(dataFile, (err, obj) => {
    let matchingPokemonObj = obj[POKEMON].find((element) => {
      return element.name.toLowerCase() === request.params.somename.toLowerCase();
    });
    if (!matchingPokemonObj) {
      response.send(request.params.somename + " cannot be found");
    }
    else if (!matchingPokemonObj.prev_evolution) {
      response.send(request.params.somename + " does not have a previous evolution");
    }
    else {
      response.send(matchingPokemonObj.prev_evolution.map(element => element.name));
    }
  });
});

app.get("*", (request, response) => {
  response.send("Welcome to the online Pokedex!");
});

app.listen(3000, () => {
  console.log("locating port 3000");
});
