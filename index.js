const express = require('express');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json'
/**
 * ===================================
 * Routes
 * ===================================
 */
app.get('/pokemon/:name', (request, response) => {
        jsonfile.readFile(file, (err, obj) => {
                if (err) {
                    console.log("ERR", err);
                }
                let found = false;
                for (i = 0; i < obj.pokemon.length; i++) {
                    const pokeName = obj.pokemon[i].name;
                    const pokeWeight = obj.pokemon[i].weight;
                    if (pokeName === request.params.name) {
                        found = true;
                        reponse.send("Name :" + pokeName + ", Weight :" + pokeWeight)
                    }
                }
            });

        });





        //         const choosePokemon = (request, response) => {
        //             console.log("pokemon request");
        //             console.log("THIS IS THE ONE!", obj.pokemon[1])
        //             const firstPokemon = obj.pokemon[1];

        //             console.log("WEIGHT: " + firstPokemon.weight);
        //             response.send("WHOA: " + firstPokemon.weight);
        //         })


        // };


        // const port = 3000;
        // app.listen(port);


        // app.get('*', (request, response) => {
        //         // send response with some data (a string)

        //         response.send(request.path);
        // });
        // *
        //  * ===================================
        //  * Listen to requests on port 3000
        //  * ===================================

        app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));