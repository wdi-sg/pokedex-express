const express = require('express');

const jsonfile = require('jsonfile');

const pokedex = 'pokedex.json';

let listOfPokemon;

jsonfile.readFile(pokedex, (err,obj) => {

    listOfPokemon = obj;

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

app.get('*', (request, response) => {
  // send response with some data (a string)

  let pathRoute = request.path.split("/");
  console.log(pathRoute);

  if (pathRoute[1] === "") {

    response.send("Welcome to the online Pokdex!");

  } else if (pathRoute[1] === "type") {

    var path = pathRoute[2][0].toUpperCase() + pathRoute[2].substring(1);

    iterateArray("type", path, response);

  } else if (pathRoute[1] === "weaknesses"){

    var path = pathRoute[2][0].toUpperCase() + pathRoute[2].substring(1);

    iterateArray("weaknesses", path, response);

  } else {

    var path = pathRoute[1][0].toUpperCase() + pathRoute[1].substring(1);
    console.log(path);

    for (let i = 0; i < listOfPokemon['pokemon'].length; i++) {

        if (listOfPokemon['pokemon'][i]['name'] === path) {

            response.send(listOfPokemon['pokemon'][i]);

        }

    }

    response.status(404);
    response.send("Could not find information about " + path);

  }


});


function iterateArray(key, searchFor, response) {

    const list = [];

    for (let i = 0; i < listOfPokemon['pokemon'].length; i++) {

        if (listOfPokemon['pokemon'][i][key].includes(searchFor)) {

            list.push(listOfPokemon['pokemon'][i]);
            check = true;

        }

    }

    response.send(list);


}

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
