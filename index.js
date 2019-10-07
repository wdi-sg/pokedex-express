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
            const responseStr = `This is ${selectedPokemon[0].name}, it is ${selectedPokemon[0].weight} in weight.`;

            response.send(responseStr);
        } else {
            response.status(404).send(`Could not find information about ${pokemonName} - Is that a new pokemon? Gotta catch em' all!`);
        }
    });
});

app.get('/type/:type', (request, response) => {
    // send response with some data (a string)
    const file = 'pokedex.json';
    const pokemonType = request.params.type;

    jsonfile.readFile(file, function(err, obj) {
        if (err) { console.error(err) }

        const pokemon = obj.pokemon;

        const selectedPokemon = pokemon.filter(pokemon => pokemon.type.includes(pokemonType));

        if (selectedPokemon.length) {
            let pokemonList = "";
            selectedPokemon.forEach(pokemon => {pokemonList += `${pokemon.name} *** `});

            const responseStr = `List of ${pokemonType} type Pokemon: ` + pokemonList;

            response.send(responseStr);
        } else {
            response.status(404).send(`Could not find information about Pokemon type ${pokemonType} - Is that a new pokemon type? Gotta catch em' all!`);
        }
    });
});

app.get('/weakness/:weakness', (request, response) => {
    // send response with some data (a string)
    const file = 'pokedex.json';
    const pokemonWeakness = request.params.weakness;

    jsonfile.readFile(file, function(err, obj) {
        if (err) { console.error(err) }

        const pokemon = obj.pokemon;

        const selectedPokemon = pokemon.filter(pokemon => pokemon.weaknesses.includes(pokemonWeakness));

        if (selectedPokemon.length) {
            let pokemonList = "";
            selectedPokemon.forEach(pokemon => {pokemonList += `${pokemon.name} *** `});

            const responseStr = `List of Pokemon with weakness ${pokemonWeakness}: ` + pokemonList;

            response.send(responseStr);
        } else {
            response.status(404).send(`Could not find information about Pokemon with weakness ${pokemonWeakness} - Is that a new pokemon type? Gotta catch em' all!`);
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