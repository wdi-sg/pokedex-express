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
  var check = false;

  let pathRoute = request.path.split("/");
  // console.log(pathRoute);

  if (pathRoute[1] === "") {

    response.send("Welcome to the online Pokdex!");

  } else if (pathRoute[1] === "type") {

    if (pathRoute[2] === undefined) {

        response.send("Enter a type to search");

    } else {

        var path = pathRoute[2][0].toUpperCase() + pathRoute[2].toLowerCase().substring(1);
        iterateArray("type", path, response);

    }

    check = true;

  } else if (pathRoute[1] === "weaknesses"){

    if (pathRoute[2] === undefined) {

        response.send("Enter a type to search");


    } else {

    var path = pathRoute[2][0].toUpperCase() + pathRoute[2].toLowerCase().substring(1);
    iterateArray("weaknesses", path, response);

    }

    check = true;

  } else {

    var path = pathRoute[1][0].toUpperCase() + pathRoute[1].toLowerCase().substring(1);
    // console.log(path);

    for (let i = 0; i < listOfPokemon['pokemon'].length; i++) {

        if (listOfPokemon['pokemon'][i]['name'] === path) {

            response.send(listOfPokemon['pokemon'][i]);
            check = true;

        }

    }

  }

  if (check === false ) {

    response.status(404);
    response.send("Could not find information about " + path);

  }


});


function iterateArray(key, searchFor, response) {

    const list = [];

    for (let i = 0; i < listOfPokemon['pokemon'].length; i++) {

        if (listOfPokemon['pokemon'][i][key].includes(searchFor)) {

            list.push(listOfPokemon['pokemon'][i]);

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






