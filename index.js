const express = require("express");
const jsonfile = require("jsonfile");
const file = "./pokedex.json";
const app = express();

app.get("/", (request, response) => {
  response.send(`Welcome to the online Pokedex!
  <p>Search Pokemon: <i>localhost:3000/pokemon/pokemon-name</i></p>
  <p>Search Pokemon types: <i>localhost:3000/pokemon/type/pokemon-type</i></p>`);
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
      response.send(`<p>You searched for: <h1 style="color:#3C59A3; text-decoration: underline;">${
        foundPokemon.name
      }!</h1></p> 
      <ul>
      <li>Id: ${foundPokemon.id}</li>
      <li>Num: ${foundPokemon.num}</li>
      <li>Name: ${foundPokemon.name}</li>
      <li>Image: <img src="${foundPokemon.img}"></li>
      <li>Type: ${foundPokemon.type.join(", ")}</li>
      <li>Height: ${foundPokemon.height}</li>
      <li>Weight: ${foundPokemon.weight}</li>
      <li>Weaknesses: ${foundPokemon.weaknesses.join(", ")}</li>
      </ul>
      `);
    } else {
      response
        .status(404)
        .send(
          `Error: could not find information on ${name}. Is that a new Pokemon? Gotta catch em' all! `
        );
    }
  });
});

app.get("/type/:type", (request, response) => {
  const typeParam = request.params.type.toLowerCase();
  const foundType = [];
  jsonfile.readFile(file, function(err, obj) {
    const pokemonArray = obj["pokemon"];
    for (let i = 0; i < pokemonArray.length; i++) {
      const pokemon = pokemonArray[i];
      const typeArray = pokemon["type"];
      for (let j = 0; j < typeArray.length; j++) {
        const type = typeArray[j].toLowerCase();
        if (typeParam === type) {
          foundType.push(pokemon["name"]);
        }
      }
    }
    const firstLetter = typeParam.charAt(0).toUpperCase();
    const remainingLetters = typeParam.slice(1);
    const joinTypeName = firstLetter.concat(remainingLetters);
    if (foundType.length !== 0) {
      response.send(`You searched for <h1>${joinTypeName}!</h1>
    <p>Pokemon with ${typeParam} type:</p>
    <p>${foundType.join(", ")}</p>`);
    } else {
      response.send(
        `Didn't find any Pokemon with ${joinTypeName}! Are you sure you typed ${joinTypeName} correctly?`
      );
    }
  });
});

app.get("/weaknesses/:weakness", (request, response) => {
  const foundPokemon = [];
  const weaknessParam = request.params.weakness.toLowerCase();
  jsonfile.readFile(file, (err, obj) => {
    const pokemonArray = obj["pokemon"];
    for (let i = 0; i < pokemonArray.length; i++) {
      let pokemon = pokemonArray[i];
      let pokemonWeaknesses = pokemon["weaknesses"];
      for (let j = 0; j < pokemonWeaknesses.length; j++) {
        const pokemonWeakness = pokemonWeaknesses[j].toLowerCase();
        if (weaknessParam === pokemonWeakness) {
          foundPokemon.push(pokemon["name"]);
        }
      }
    }
    const firstLetter = weaknessParam.charAt(0).toUpperCase();
    const remainingLetters = weaknessParam.slice(1);
    const joinWeaknessName = firstLetter.concat(remainingLetters);
    response.send(`You searched for <h1>${joinWeaknessName}!</h1>
    <p>Pokemon weak to ${joinWeaknessName}:</p>
    <p>${foundPokemon.join(", ")}</p>`);
  });
});

app.get("/nextevolution/:name", (request, response) => {
  let foundPokemon;
  let notFoundString = "<h1>No such Pokemon!</h1>";
  const evoParam = request.params.name.toLowerCase();
  let foundEvo = [];
  jsonfile.readFile(file, (err, obj) => {
    const pokemonArray = obj["pokemon"];
    for (let i = 0; i < pokemonArray.length; i++) {
      const pokemon = pokemonArray[i];
      const pokemonName = pokemon["name"].toLowerCase();
      const previousEvos = pokemon["prev_evolution"];
      if (evoParam === pokemonName) {
        if (previousEvos !== undefined) {
          for (let j = 0; j < previousEvos.length; j++) {
            foundEvo.push(previousEvos[j]["name"]);
          }
        } else {
          notFoundString = "No evolutions were found!";
        }
      }
    }
    const firstLetter = evoParam.charAt(0).toUpperCase();
    const remainingLetters = evoParam.slice(1);
    const joinName = firstLetter.concat(remainingLetters);
    if (foundEvo.length > 0) {
      response.send(`You searched for evolutions of <h1>${joinName}!</h1>
    ${foundEvo.join(", ")}`);
    } else {
      response.send(`You searched for evolutions of <h1>${joinName}!</h1>
      <p>${notFoundString}</p>`);
    }
    console.log(foundPokemon);
  });
});

app.get("*", (request, response) => {
  response.send("NO SUCH PAGE")
});

app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);
