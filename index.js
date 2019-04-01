const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';

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


//Expose a new route for /weaknesses/some-weakness that returns a message listing the names of all pokemon that have the specified weakness (eg. /weakness/rock).

app.get("/weakness/:weaknessType", (request, response) => {

    let weakness = request.params.weaknessType;

  jsonfile.readFile(file, (err, obj) => {

    let pokemonWithThisWeakness = [];
    let pokemonWeaknessMatch = false;

    for (var i = 0; i < obj["pokemon"].length; i++) {

        let stringify = obj["pokemon"][i]["weaknesses"].toString();

        if (stringify.toLowerCase().includes(weakness.toLowerCase())) {
            pokemonWithThisWeakness.push(obj["pokemon"][i]["name"]);
            pokemonWeaknessMatch = true;
        }
    }

    let printPokemonWithThisWeakness = pokemonWithThisWeakness.join(', ');

        if (pokemonWeaknessMatch === false) {
            response.status(404).send('Weakness not found!');
        } else {
            response.send("These Pokémon are weak against " +weakness+ " attacks: " +printPokemonWithThisWeakness);
        }

  // jsonfile.writeFile(file, obj, (err) => {
  //   console.log(err)
  // });
});
});


app.get("/:pokemonName", (request, response) => {

    let pokemonName = request.params.pokemonName;
//   // response.send(request.params.number);

  jsonfile.readFile(file, (err, obj) => {

    let pokemonFound = false;

    console.log(obj["pokemon"].length);
    for (var i = 0; i < obj["pokemon"].length; i++) {

        let pokemonObj = obj["pokemon"][i];



        if (pokemonName.toLowerCase() === obj["pokemon"][i]["name"].toLowerCase()) {
            response.send(

            //pokemon name, weight, height
                pokemonObj["name"]+ " weighs " +pokemonObj["weight"] + ", and is " +pokemonObj["height"]+ " tall! It uses " +pokemonObj["candy"]+"."

                );

            pokemonFound = true;
        }
    }

    if (!pokemonFound) {
        response.status(404).send('Pokémon not found!');
    }


  // jsonfile.writeFile(file, obj, (err) => {
  //   console.log(err)
  // });
});
});

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send("Welcome to the online Pokédex!");
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));