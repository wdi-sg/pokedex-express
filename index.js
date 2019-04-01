const express = require('express');

const jsonfile = require('jsonfile');

const file = 'pokedex.json';

const app = express();

// find pokemon's weight by name input
app.get("/:pokemon", (request, response) => {
    let pokemonName = request.params.pokemon;
    jsonfile.readFile(file, (err, obj) => {
        let pokemonFound = false;
        for (let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].name.toLowerCase() === pokemonName.toLowerCase()) {
                let pokemonWeight = obj.pokemon[i].weight;
                let pokemonHeight = obj.pokemon[i].height;
                let candy = obj.pokemon[i].candy;
                let id = obj.pokemon[i].id;
                response.send("This is " + pokemonName + ", it weighs " + pokemonWeight + "! It's height is " + pokemonHeight + " and it loves " + candy + ". " + pokemonName + "'s Pokedex number is " + id + ".");
                response.send(pokemonName + "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.")
                pokemonFound = true;
            }
        }
        if (!pokemonFound) {
            response.send(404, "Could not find information about " + pokemonName + "- is that a new pokemon? Gotta catch em' all!");
        }
    });
    // when you read the file, get the specific pokemon that is being requested

    // response.send(pokemonName + "'s weight is: " + pokemonWeight);
});

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('*', (request, response) => {
    // send response with some data (a string)
    // response.send(request.path);
    response.send("Welcome to the online Pokedex!");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));