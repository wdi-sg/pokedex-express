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

const doPokemon = (request, response) => {
    console.log("pokemon request");

    const file = 'pokedex.json';
    // var pokedex = obj["pokemon"];
    app.get('/pokemon/:pokemonName', doPokemon);

    jsonfile.readFile(file, (err, obj) => {
         const pokedex = obj["pokemon"];

        if (err) {
            console.log("ERR", err);
            response.send("404 not found!");
        } else {
            var pokemonPar = request.params.pokemonName;
            for (let i = 0; i < pokedex.length; i++) {
                if (pokedex[i].name === pokemonName) {
                    // response.send(obj.pokemon.name+ " this pokemon");
                    response.send(" meoew");

                }
            }

        }

        // console.log("WOW FINISHED READING", obj.pokemon[1])
        // const firstPoke = obj.pokemon[1];

        // console.log("NAME: " + firstPoke.name);
        // response.send("WHOA: " + firstPoke.name);
    })


};











//     // var pokemonName =  obj.pokemon[1];
//     // response.send(pokemonName.name + " this pokemon");
//   // send response with some data (a string)


//
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));