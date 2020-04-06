const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const pokedex = 'pokedex.json'
/**
 * ===================================
 * Routes
 * ===================================
 */
let pokemonNames = [];

jsonfile.readFile(pokedex, (err, obj) => {

    let pokemonList = obj.pokemon;

    app.get('/pokemon/type/:type', (request, response) => {
        console.log(request.params.type)
        for (let i = 0; i < pokemonList.length; i++) {
            let pokemonTypeString = pokemonList[i].type.join(', ').toLowerCase();

            if (pokemonTypeString.includes(request.params.type)) {
                pokemonNames.push(pokemonList[i].name);
            }
        }
        response.send(`<p><font size='4'>These are all the <strong>${request.params.type}</strong> type Pokemon:<br> ${pokemonNames.join(', ')}</font></p>`);
    });

    app.get('/pokemon/weaknesses/:weakness', (request, response) => {
        for (let i = 0; i < pokemonList.length; i++) {
            let pokemonWeaknessString = pokemonList[i].weaknesses.join(', ').toLowerCase();

            if (pokemonWeaknessString.includes(request.params.weakness)) {
                pokemonNames.push(pokemonList[i].name);
            }
        }
        response.send(`<p><font size='4'>These are all the Pokemon which are weak against <strong>${request.params.weakness}</strong>:<br> ${pokemonNames.join(', ')}</font></p>`);
    });

    app.get('/pokemon/*', (request, response) => {
        for (let i = 0; i < pokemonList.length; i++) {
            if (request.params[0] == pokemonList[i].id || request.params[0] === pokemonList[i].name.toLowerCase()) {
                response.send(`<p><font size='4'>This is <strong>${pokemonList[i].name}</strong>, it is <strong>${pokemonList[i].weight}</strong> in weight and <strong>${pokemonList[i].height}</strong> in height!<br>
                    It is a <strong>${pokemonList[i].type.join(', ')}</strong> Pokemon, and is weak to <strong>${pokemonList[i].weaknesses.join(', ')}</strong> types.</font></p>
                    <img src='${pokemonList[i].img}'>`);
            }
        }
    });

    // app.get('/pokemon/:name', (request, response) => {
    //     for (let i = 0; i < pokemonList.length; i++) {
    //         if (request.params.name == pokemonList[i].name) {
    //             response.send(`<p><font size='4'>This is <strong>${pokemonList[i].name}</strong>, it is <strong>${pokemonList[i].weight}</strong> in weight and <strong>${pokemonList[i].height}</strong> in height!<br>
    //                 It is a <strong>${pokemonList[i].type}</strong> Pokemon, and is weak to <strong>${pokemonList[i].weaknesses.join(', ')}</strong> types.</font></p>
    //                 <img src='${pokemonList[i].img}'>`);
    //         }
    //     }
    // });

    // app.get('/pokemon/*', (request, response) => {
    //     if (request.params[0] !== pokemonList[i].id && request.params[0] !== pokemonList[i].name.toLowerCase()) {
    //         for (let i = 0; i < pokemonList.length; i++) {
    //             response.status(404).send(`Could not find information about ${request.params[0]} - Is that a new pokemon? Gotta catch em' all!`);
    //         }
    //     }
    // });

    app.get('*', (request, response) => {
      // send response with some data (a string)
      response.send('Welcome to the online Pokedex!');
    });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));