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


 //Expose a new route for `/type/some-type` that returns a message listing the names of all pokemon that have the specified type (eg. `/type/grass` should show a page with names of all pokemon of grass type).

app.get("/type/:typeType", (request, response) => {

    let type = request.params.typeType;

  jsonfile.readFile(file, (err, obj) => {

    let pokemonWithThisType = [];
    let pokemonTypeMatch = false;

    for (var i = 0; i < obj["pokemon"].length; i++) {

        let stringify = obj["pokemon"][i]["type"].toString();

        if (stringify.toLowerCase().includes(type.toLowerCase())) {
            pokemonWithThisType.push(obj["pokemon"][i]["name"]);
            pokemonTypeMatch = true;
        }
    }

    let printPokemonWithThisType = pokemonWithThisType.join(', ');

        if (pokemonTypeMatch === false) {
            response.status(404).send('Pokémon type not found!');
        } else {
            response.send("These are " +type+ " Pokémon: " +printPokemonWithThisType);
        }

  // jsonfile.writeFile(file, obj, (err) => {
  //   console.log(err)
  // });
});
});


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

// Get Pokemon previous "evolutions"
// Expose a new route for `/nextevolution/some-name` that returns a message listing the names of all pokemon that the pokemon evolves *from* (eg. `/nextevolution/charizard`). -> this is supposed to show charmander and charmeleon?

app.get("/nextevolution/:pokemonName", (request, response) => {

    let pokemonName = request.params.pokemonName;

    jsonfile.readFile(file, (err, obj) => {

    let pokemonFound = false;

    //this variable store ALL pokemon info (with "num") that came before the pokemon queried
    let pokemonOldSelf = [];

    //this variable stores names of pokemon from pokemonOldSelf
    let pokemonOldSelfName = [];

    for (var i = 0; i < obj["pokemon"].length; i++) {

        let pokemonObj = obj["pokemon"][i];

        if (pokemonName.toLowerCase() === pokemonObj["name"].toLowerCase()) {

            //to send 404 if pokemon is not found later
            pokemonFound = true;

            //saving this so pokemon names'll get printed out with titlecase later
            pokemonName = pokemonObj["name"];

            //if "prev_evolution" exists, it indcates that pokemon queried has previous evolutions
            if (pokemonObj["prev_evolution"]) {

                pokemonOldSelf.push(pokemonObj["prev_evolution"]);

                //loop through pokemonOldSelf array, push pokemon names into pokemonOldSelfName
                for (var j = 0; j < pokemonObj["prev_evolution"].length; j++) {
                    pokemonOldSelfName.push(pokemonObj["prev_evolution"][j]["name"]);
                }
            }

        }
    }

    let printPokemonOldSelfName = pokemonOldSelfName.join(', ');

    if (!pokemonFound) {
        response.status(404).send('Pokémon not found!');

    // if pokemonOldSelf.length === 0; this means that pokemon has no previous evolutions
    } else if (pokemonOldSelf.length === 0) {
        response.send(pokemonName+ " has no previous evolutions.");
    } else if (pokemonOldSelfName) {
        response.send(pokemonName+ "'s previous evolutions: " +printPokemonOldSelfName);
    }

  // jsonfile.writeFile(file, obj, (err) => {
  //   console.log(err)
  // });
});
});


// Get Pokemon info

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