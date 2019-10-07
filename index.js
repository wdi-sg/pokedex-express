const express = require("express");
const jsonfile = require("jsonfile");

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

const file = "pokedex.json";

/**
 * ===================================
 * Routes
 * ===================================
 */

function printResult(result) {
  return `This is ${result.name}, it is ${result.weight} in weight!`+
    `<br>The following are it's characteristics:<br>id: ${result.id}`+
    `<br>Number: ${result.num}<br><img src=${result.img}>`+
    `<br>Height: ${result.height}<br>Spawn chance: ${result.spawn_time}`+
    `<br>Candy: ${result.candy}<br>Candy Count: ${result.candy_count}`+
    `<br>Average Spawns: ${result.avg_spawns}<br>Egg: ${result.egg}`;
}

app.get("/pokemon/:id", function(req, res) {
  jsonfile.readFile(file, (err, obj) => {
    let result;
    if (!isNaN(Number(req.params.id))) {
      result = obj.pokemon[`${req.params.id - 1}`];
      return res.send(printResult(result));
    } else {
      for (let i = 0; i < obj.pokemon.length; i++) {
        if (obj.pokemon[i].name.toLowerCase() === req.params.id) {
          result = obj.pokemon[i];
          return res.send(printResult(result));
        }
      }
      result = `${req.params.id} - Is that a new pokemon? Gotta catch em' all!`;
      res.send(result);
    }
  });
});

app.get("/type/:type", function(req, res) {
  jsonfile.readFile(file, (err, obj) => {
    let result = [];
    if (!isNaN(Number(req.params.type))) {
    } else {
      for (let i = 0; i < obj.pokemon.length; i++) {
        const typeArr = obj.pokemon[i].type;
        for (let j = 0; j < typeArr.length; j++) {
          if (typeArr[j].toLowerCase() === req.params.type.toLowerCase()) {
            result.push(obj.pokemon[i]);
          }
        }
      }
      if (result.length !== 0) {
        // console.log(result);
        // return res.send(result);
        let printResult = `All pokemons that are of ${req.params.type} type:<br>`;
        for (let i = 0; i < result.length; i++) {
          printResult += `${i + 1}\) ${result[i].name}<br>`;
        }
        // return res.send(result);
        return res.send(printResult);
      }
    }
    result = `${req.params.type} - Is that a new pokemon type? Gotta catch em' all!`;
    res.send(result);
  });
});

app.get("/weakness/:weakness", function(req, res) {
  jsonfile.readFile(file, (err, obj) => {
    let result = [];
    if (!isNaN(Number(req.params.weakness))) {
    } else {
      for (let i = 0; i < obj.pokemon.length; i++) {
        const weaknessArr = obj.pokemon[i].weaknesses;
        for (let j = 0; j < weaknessArr.length; j++) {
          if (
            weaknessArr[j].toLowerCase() === req.params.weakness.toLowerCase()
          ) {
            result.push(obj.pokemon[i]);
          }
        }
      }
      if (result.length !== 0) {
        let printResult = `All pokemons that are weak to ${req.params.weakness}:<br>`;
        for (let i = 0; i < result.length; i++) {
          printResult += `${i + 1}\) ${result[i].name}<br>`;
        }
        return res.send(printResult);
      }
    }
    result = `${req.params.weakness} - Is there such a weakness? Gotta catch em' all!`;
    res.send(result);
  });
});

app.get("/nextevolution/:name", function(req, res) {
  jsonfile.readFile(file, (err, obj) => {
    let result = [];
    if (!isNaN(Number(req.params.name))) {
    } else {
      for (let i = 0; i < obj.pokemon.length; i++) {
        if (obj.pokemon[i].name.toLowerCase() === req.params.name) {
          const evoArr = obj.pokemon[i].next_evolution;
          for (let j = 0; j < evoArr.length; j++) {
            result.push(evoArr[j].name);
          }
        }
      }
    }
    if (result.length !== 0) {
      result = `The next evolutions for ${req.params.name} are ` + result.join(", ");
      return res.send(result);
    }
    result = `${req.params.name} - Is that pokemon able to evolve? Gotta catch em' all!`;
    res.send(result);
  });
});

app.get("/*", (request, response) => {
  const myParams = request.params[0].split("/");
  // send response with some data (a string)
  if (myParams[myParams.length - 1] === "") {
    response.send("Welcome to the online Pokdex!");
  }
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~"),
);
