const express = require('express');
const jsonfile = require('jsonfile');

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

app.get('/pokemon/:name', (request, response) => {
    // send response with some data (a string)
    const file = 'pokedex.json';
    const pokemonName = request.params.name;

    jsonfile.readFile(file, function(err, obj) {
        if (err) { console.error(err) }

        const pokemon = obj.pokemon;

        const selectedPokemon = pokemon.filter(pokemon => pokemon.name === pokemonName);

        if (selectedPokemon.length) {
            const responseStr = `Pokemon: ${selectedPokemon[0].name} --- Weight: ${selectedPokemon[0].weight}`;

            response.send(responseStr);
        } else {
            response.status(404).send(`Could not find information about ${pokemonName} - Is that a new pokemon? Gotta catch em' all!`);
        }
    });
});


app.get('/', (req,res) => {
    res.send("Welcome to the online Pokedex!");
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));