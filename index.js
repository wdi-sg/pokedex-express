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

        const selectedPokemon = pokemon.find(pokemon => pokemon.name === pokemonName);

        if (selectedPokemon) {
            const responseStr = `<h1 style="text-align:center">${selectedPokemon.name}</h1><br>\
                                <img style="margin: 0 auto;display:block" src='${selectedPokemon.img}'/><br>\
                                <p style="text-align:center"><strong>Weight: </strong>${selectedPokemon.weight}\
                                <p style="text-align:center"><strong>Height: </strong>${selectedPokemon.height}`;

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
            selectedPokemon.forEach(pokemon => {
                pokemonList += `<img style="display:block;margin: 0 auto" src=${pokemon.img} /><br>\
                                <p style="text-align:center">${pokemon.name}</p><br><hr>` });

            const responseStr = `<h1 style="text-align:center">List of ${pokemonType} type Pokemon: </h1><br>` + pokemonList;

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

            selectedPokemon.forEach(pokemon => {
                pokemonList += `<img style="display:block;margin: 0 auto" src=${pokemon.img} /><br>\
                                <p style="text-align:center">${pokemon.name}</p><br><hr>` });

            const responseStr = `<h1 style="text-align:center">List of Pokemon with ${pokemonWeakness} weakness: </h1><br>` + pokemonList;

            response.send(responseStr);
        } else {
            response.status(404).send(`Could not find information about Pokemon with weakness ${pokemonWeakness} - Is that a new pokemon weakness? Gotta catch em' all!`);
        }
    });
});

app.get('/nextevolution/:name', (request, response) => {
    const file = 'pokedex.json';
    const pokemonName = request.params.name;

    jsonfile.readFile(file, function(err, obj) {
        console.log("nextevolution");
        if (err) { console.error(err) }

        const pokemon = obj.pokemon;

        const selectedPokemon = pokemon.find(pokemon => pokemon.name === pokemonName);

        if (selectedPokemon) {

            if ("prev_evolution" in selectedPokemon) {
                let prevEvolutionPokemon = "";

                selectedPokemon.prev_evolution.forEach((pokemon, index, array) => {
                    prevEvolutionPokemon += pokemon.name + (index === array.length - 1 ? "" : " & ");
                });

                const responseStr = `${pokemonName} evolves from  ${prevEvolutionPokemon}`;

                response.send(responseStr);
            } else {
                response.send(`${pokemonName} does not evolve from another Pokemon.`);
            }

        } else {
            response.status(404).send(`Could not find information about this Pokemon ${pokemonName} - Is that a new pokemon type? Gotta catch em' all!`);
        }
    });
});

app.get('/', (req, res) => {
    res.send("Welcome to the online Pokedex!");
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));