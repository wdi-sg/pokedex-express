const express = require('express');
const jsonfile = require('jsonfile');
const file = "pokedex.json";

// const jsonfile = require('jsonfile');

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



app.get('/pokedex/:name', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let chosenPokemon;
        // let pokemonName;
        // let pokemonWeight;
        let nameInput = request.params.name;
        let match;

        for (i=0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase() == nameInput.toLowerCase()){
                chosenPokemon = obj.pokemon[i];
                // pokemonName = obj.pokemon[i].name;
                // pokemonWeight = obj.pokemon[i].weight;
                match = true;
            } else if (i == (obj.pokemon.length - 1) && match != true) {
                match = false;
            }
            console.log(match)
        }

        if (match == true) {
            // response.send(pokemonName + "'s weight is " + pokemonWeight);
            response.send(chosenPokemon.num + ". " + chosenPokemon.name + " is a " + chosenPokemon.type + " type pokemon and weighs " + chosenPokemon.weight + "."  );

        } else if (match == false) {
            response.send(404, "Could not find information about " + nameInput + ". Is that a new pokemon? Gotta catch em' all!");
        } else if (nameInput == undefined) {
            response.send("Welcome to the online Pokedex!");

        }

    });
});

app.get('/pokedex', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        response.send("Welcome to the online Pokedex!");
    });
});

// app.get('/type/:pokeType', (request, response) => {
//     jsonfile.readFile(file, (err, obj) => {
//         let chosenType = request.params.pokeType;
//         let typeArray = [];
//         for (i=0; i < obj.pokemon.length; i++) {
//             for (j=0; i < obj.pokemon[i].type.length; j++) {
//                 if (obj.pokemon[i].type[j].includes(chosenType) ) {
//                     typeArray.push(obj.pokemon[i].name);
//                 }
//             }
//         }
//         response.send(typeArray);
//     });
// }); WHY NOT WORKING SIA

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
