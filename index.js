const express = require('express');
const jsonfile = require('jsonfile');
const pokedex = "pokedex.json";
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

app.get("/:name", (request, response) => {
    let isFound = false;
    // reads pokemon.json
    jsonfile.readFile(pokedex, (err, obj) => {
        for (let i = 0; i < obj.pokemon.length; i++){
            Object.keys(obj.pokemon[i].find((key) => {
            if(obj.pokemon[i].name === name)
            {
                isFound = true;
                let weight = obj.pokemon[i].weight;
                response.status(200).send("Return result: " + request.params.name + "Weight: " + obj.pokemon[i].weight);
            };


    });
            if (isFound ==- false) {
                response.status(404).send("No information found" + request.params.name);
            };

        };
    });

});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


