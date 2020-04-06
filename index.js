const express = require('express');

const jsonfile = require('jsonfile');

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

// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

const file = 'pokedex.json';
let pokemon;
jsonfile.readFile(file, (err, obj) => {
  pokemon = obj.pokemon;

});
// console.log(pokeName)

// app.get("/pokemon/:id", (request, response) => {
//   var pokeId = request.params.id;
//   pokeId = parseInt(pokeId);
//   var pokeName = pokemon[pokeId].name;
//   response.send(pokeName);

// });
app.get('/pokemon/', (request, response) => {
  // send response with some data (a string)
  response.send(`Welcome to the online Pokedex`);
});
app.get("/pokemon/:name", (request, response) => {
  var found = false;
  var foundId;

  for (id in pokemon) {
    // console.log(pokemon[id].name)
    if (pokemon[id].name.toLowerCase().includes(request.params.name)) {
      found = true;
      foundId = id;
      break;
    }
    continue;
  }
  if (found == true) {
    var pokeName = pokemon[foundId].name;
    var pokeWeight = pokemon[foundId].weight;
    var pokeHeight = pokemon[foundId].height;

    var pokeType;
    if (pokemon[foundId].type.length > 1) {
      pokeType = pokemon[foundId].type[0] + "/" + pokemon[foundId].type[1];
    } else {
      pokeType = pokemon[foundId].type[0];
    }



    response.send(`This is ${pokeName}, a ${pokeType} type Pokemon, that weighs ${pokeWeight} and is ${pokeHeight} tall!`);
  }
  else {
    var properName = toProperCase(request.params.name);
    response.status(404);
    response.send(`Could not find information about ${properName} - Is that a new pokemon? Gotta catch em' all!`);

  }

});

app.get('/type/:type', (request, response) => {
  var targetType = request.params.type;
  var outType = getAllPokeOfType(targetType);
  response.send(`${outType}`);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

function toProperCase(string) {
  var firstLetter = string.substring(0, 1);
  var restOfLetter = string.substring(1, string.length);
  firstLetter = firstLetter.toUpperCase();
  restOfLetter = restOfLetter.toLowerCase();
  return firstLetter + restOfLetter;
}

function getAllPokeOfType(type) {
  var resultArr = [];
  for (id in pokemon) {
    var typeArr = pokemon[id].type;
    for (id in typeArr){
      typeArr[id] = typeArr[id].toLowerCase();
    }
    if (typeArr.includes(type)){
     resultArr.push(pokemon[id].name);
    }

  }
  return resultArr;
}