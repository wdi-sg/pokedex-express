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
 jsonfile.readFile(pokedex, (err, obj) => {

    app.get('/pokemon/*', (request, response) => {

        let pokemonList = obj.pokemon;

        for (let i = 0; i < pokemonList.length; i++) {
            if (request.params[0] === pokemonList[i].name.toLowerCase() || request.params[0] == pokemonList[i].id) {
                console.log(' pokemon i: ' + pokemonList[i].name)
                console.log('request: ' + request.params[0]);
                response.send(`<h1>${pokemonList[i].name}</h1>
                    <h2>${pokemonList[i].weight}</h2>
                    <h2>${pokemonList[i].type.join(', ')}</h2>
                    <img src='${pokemonList[i].img}'>
                    `);
            }
        }
     });

    app.get('*', (request, response) => {
      // send response with some data (a string)
      response.send(request.path);
    });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));